/* eslint-disable @typescript-eslint/no-require-imports -- Node-compatible test runner. */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { NextRequest, NextResponse } = require("next/server");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
const load = createTypeScriptLoader();
const { proxy } = load("proxy.ts");
const { projects } = load("data/projects.ts");

function request(path, cookie) {
  return new NextRequest(`https://portfolio.example${path}`, {
    headers: cookie ? { cookie } : undefined,
  });
}

test("Supported pages and localized metadata routes continue without a redirect", () => {
  for (const locale of ["fr", "en"]) {
    for (const path of ["", "/contact", "/a-propos", "/projets", "/mentions-legales", "/politique-confidentialite", "/manifest.webmanifest", "/opengraph-image", ...projects.map(({ slug }) => `/projets/${slug}`)]) {
      const response = proxy(request(`/${locale}${path}`));
      assert.ok(response instanceof NextResponse);
      assert.equal(response.status, 200, path);
      assert.equal(response.headers.get("x-middleware-next"), "1", path);
      assert.equal(response.headers.get("x-middleware-rewrite"), null, path);
      assert.equal(response.headers.get("location"), null, path);
      assert.equal(response.headers.get("x-robots-tag"), null, path);
    }
  }
});

test("Percent-encoded known pages rewrite to their matching route while preserving queries", () => {
  for (const [path, target] of [
    ["/fr/projets/%6Digration-integration-donnees", "/fr/projets/migration-integration-donnees"],
    ["/en/projets/migration%2Dintegration%2Ddonnees", "/en/projets/migration-integration-donnees"],
    ["/fr/%63ontact", "/fr/contact"],
    ["/fr/a%2Dpropos", "/fr/a-propos"],
    ["/%66r/contact", "/fr/contact"],
    ["/%65n/projets", "/en/projets"],
    ["/en/%6Danifest.webmanifest", "/en/manifest.webmanifest"],
  ]) {
    const query = "?source=old%20bookmark&file=brief.pdf";
    const response = proxy(request(path + query));
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("x-middleware-next"), null, path);
    assert.equal(response.headers.get("x-middleware-rewrite"), `https://portfolio.example${target}${query}`, path);
    assert.equal(response.headers.get("location"), null, path);
    assert.equal(response.headers.get("x-robots-tag"), null, path);
  }
});

test("Unknown localized pages keep a real 404 and prevent indexing", () => {
  for (const path of ["/fr/unknown", "/en/projets/unknown", "/fr/contact/extra", "/en/unknown.case"]) {
    const response = proxy(request(path));
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("x-middleware-next"), "1", path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", path);
    assert.equal(response.headers.get("location"), null, path);
  }
});

test("Malformed escapes render a safe translated 404 without exposing the invalid path to routing", () => {
  for (const [path, locale] of [["/fr/projets/%E0%A4%A", "fr"], ["/en/%", "en"], ["/%65n/projets/%C0%AF", "en"], ["/%E0/contact", "fr"]]) {
    const response = proxy(request(path));
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", path);
    assert.equal(response.headers.get("location"), null, path);
    assert.equal(response.headers.get("x-middleware-next"), null, path);
    assert.equal(new URL(response.headers.get("x-middleware-rewrite")).pathname, `/${locale}/__invalid-path__`, path);
  }
});

test("Encoded separators never turn one path segment into a valid route", () => {
  for (const path of ["/fr%2Fcontact", "/en%5Ccontact", "/fr/projets%2Fmigration-integration-donnees", "/en/projets%5Cmigration-integration-donnees", "/fr/projets%252Fmigration-integration-donnees"]) {
    const response = proxy(request(path));
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow", path);
    assert.equal(response.headers.get("location"), null, path);
  }
});

test("The homepage uses a valid locale cookie with private temporary redirects", () => {
  for (const [cookie, locale] of [[undefined, "fr"], ["portfolio-locale=en", "en"], ["portfolio-locale=fr", "fr"], ["portfolio-locale=de", "fr"]]) {
    const response = proxy(request("/?source=home", cookie));
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), `https://portfolio.example/${locale}?source=home`);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(response.headers.get("vary"), "Cookie");
  }
});

test("Legacy page redirects remain permanent and preserve queries independently of preferences", () => {
  for (const path of ["/contact", "/a%2Dpropos", "/projets/migration-integration-donnees", "/unknown"]) {
    const response = proxy(request(`${path}?source=old%20bookmark&file=brief.pdf`, "portfolio-locale=en"));
    assert.equal(response.status, 308, path);
    assert.equal(response.headers.get("location"), `https://portfolio.example/fr${path}?source=old%20bookmark&file=brief.pdf`, path);
    assert.equal(response.headers.get("x-robots-tag"), null, path);
  }
});
