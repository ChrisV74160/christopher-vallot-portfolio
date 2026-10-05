/* eslint-disable @typescript-eslint/no-require-imports -- Node-compatible integration tests. */
const assert = require("node:assert/strict");
const { before, test } = require("node:test");
const { setTimeout: delay } = require("node:timers/promises");
const { createTypeScriptLoader } = require("../load-typescript.cjs");
const { readFileSync, readdirSync } = require("node:fs");
const { join } = require("node:path");
/* eslint-enable @typescript-eslint/no-require-imports */

const baseUrl = new URL(process.env.SITE_TEST_BASE_URL || "http://127.0.0.1:3001");
const { pageRoutes } = createTypeScriptLoader()("i18n/routes.ts");

async function get(path, headers) {
  return fetch(new URL(path, baseUrl), {
    redirect: "manual",
    headers,
    signal: AbortSignal.timeout(10_000),
  });
}

// Wait for the explicitly started server; these checks never start it or send mail.
before(async () => {
  const deadline = Date.now() + 15_000;
  while (true) {
    try {
      const response = await get("/fr");
      await response.body?.cancel();
      if (response.status === 200) return;
    } catch {
      // A CI background server may still be binding its port.
    }
    if (Date.now() >= deadline) {
      throw new Error(`Start the built site at ${baseUrl.origin} before running npm run test:http.`);
    }
    await delay(200);
  }
});

for (const locale of ["fr", "en"]) {
  test(`${locale}: every registered page renders with its own canonical and language`, async () => {
    for (const { path } of pageRoutes) {
      const localized = `/${locale}${path === "/" ? "" : path}`;
      const response = await get(localized);
      const html = await response.text();
      assert.equal(response.status, 200, localized);
      assert.ok(html.includes(`<html lang="${locale}"`), localized);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      assert.ok(canonical, localized);
      assert.equal(new URL(canonical).pathname, localized, localized);
      assert.match(html, /<h1\b/, localized);
      assert.doesNotMatch(html, /Cette page n’existe pas\.|This page does not exist\./, localized);
    }
  });
}

test("Encoded literal segments, locale and case slugs resolve to the same real page", async () => {
  for (const [encoded, canonical] of [
    ["/fr/%63ontact", "/fr/contact"],
    ["/fr/a%2Dpropos", "/fr/a-propos"],
    ["/%66r/contact", "/fr/contact"],
    ["/%65n/projets", "/en/projets"],
    ["/fr/projets/%6Digration-integration-donnees", "/fr/projets/migration-integration-donnees"],
    ["/en/projets/migration%2Dintegration%2Ddonnees", "/en/projets/migration-integration-donnees"],
  ]) {
    const [response, normal] = await Promise.all([get(encoded), get(canonical)]);
    const [html, normalHtml] = await Promise.all([response.text(), normal.text()]);
    assert.equal(response.status, 200, encoded);
    assert.equal(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1], normalHtml.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1], encoded);
    assert.doesNotMatch(html, /Cette page n’existe pas\.|This page does not exist\./, encoded);
  }
});

test("Unknown and malformed paths render a translated HTTP 404", async () => {
  for (const [path, locale] of [
    ["/fr/unknown", "fr"], ["/en/projets/unknown", "en"],
    ["/fr/%", "fr"], ["/en/projets/%E0%A4%A", "en"],
    ["/fr%2Fcontact", "fr"], ["/en/projets%5Cmigration-integration-donnees", "en"],
  ]) {
    const response = await get(path);
    const html = await response.text();
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", path);
    assert.ok(html.includes(`<html lang="${locale}"`), path);
    assert.match(html, locale === "fr" ? /Cette page n’existe pas\./ : /This page does not exist\./, path);
  }
});

test("Redirects preserve queries and distinguish preferences from legacy URLs", async () => {
  for (const [path, cookie, status, target] of [
    ["/?source=qa", "portfolio-locale=en", 307, "/en?source=qa"],
    ["/contact?source=qa", "portfolio-locale=en", 308, "/fr/contact?source=qa"],
  ]) {
    const response = await get(path, { cookie });
    assert.equal(response.status, status);
    const destination = new URL(response.headers.get("location"), baseUrl);
    assert.equal(destination.pathname + destination.search, target);
    await response.body?.cancel();
  }
});

test("All generated vectors, platform icons and portraits are served with their checked bytes", async () => {
  const root = join(__dirname, "../..");
  const files = ["app/icon.png", "app/apple-icon.png", "app/favicon.ico", "public/portrait.webp",
    ...["brand", "artwork", "technologies", "social"].flatMap(directory => readdirSync(join(root, "public", directory))
      .filter(name => /\.(svg|png)$/.test(name)).map(name => `public/${directory}/${name}`))];
  const entries = files.map(file => [`/${file.replace(/^(app|public)\//, "")}`, file]);
  for (const locale of ["fr", "en"]) entries.push([`/${locale}/opengraph-image`, `public/social/${locale}.png`]);
  for (const [path, file] of entries) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("content-type")?.startsWith("image/"), path);
    assert.ok(Buffer.from(await response.arrayBuffer()).equals(readFileSync(join(root, file))), `${path}: altered image response`);
  }
});
