/* eslint-disable @typescript-eslint/no-require-imports -- Node-compatible test runner. */
const assert = require("node:assert/strict");
const { test, beforeEach } = require("node:test");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
const load = createTypeScriptLoader();
const { getSiteUrl, isIndexableDeployment } = load("lib/site-config.ts");
const { default: robots } = load("app/robots.ts");
const { default: sitemap } = load("app/sitemap.ts");
const { pageMetadata } = load("i18n/metadata.ts");

// node:test isolates this configuration from the application and other test files.
beforeEach(() => {
  process.env.NODE_ENV = "production";
  process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example";
  process.env.SITE_ENV = "production";
  delete process.env.NETLIFY;
  delete process.env.CONTEXT;
});

test("Canonical URLs use the configured origin, not a path or query", () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example/path?source=test";
  assert.equal(getSiteUrl(), "https://portfolio.example");
});

test("Production rejects missing, insecure and local canonical URLs", () => {
  for (const value of ["", "invalid", "ftp://portfolio.example", "http://portfolio.example", "https://localhost", "https://127.0.0.1", "https://10.0.0.1", "https://172.16.0.1", "https://192.168.1.1", "https://[::1]"]) {
    process.env.NEXT_PUBLIC_SITE_URL = value;
    assert.throws(getSiteUrl, undefined, value);
  }
});

test("Temporary preview hosts cannot become canonical origins", () => {
  for (const host of ["test.trycloudflare.com", "test.vercel.app", "test.pages.dev", "deploy-preview-1--portfolio.netlify.app"]) {
    process.env.NEXT_PUBLIC_SITE_URL = `https://${host}`;
    assert.throws(getSiteUrl, undefined, host);
  }
  process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.netlify.app";
  assert.equal(getSiteUrl(), "https://portfolio.netlify.app");
});

test("Local development needs no production origin and is never indexable", () => {
  process.env.NODE_ENV = "development";
  delete process.env.NEXT_PUBLIC_SITE_URL;
  assert.equal(getSiteUrl(), "http://localhost:3000");
  assert.equal(isIndexableDeployment(), false);
});

test("Indexing requires an explicit public production environment", () => {
  assert.equal(isIndexableDeployment(), true);
  for (const value of ["", "preview", "development"]) {
    process.env.SITE_ENV = value;
    assert.equal(isIndexableDeployment(), false);
  }
});

test("Netlify previews stay blocked even when SITE_ENV is misconfigured", () => {
  process.env.NETLIFY = "true";
  for (const context of ["", "deploy-preview", "branch-deploy", "dev"]) {
    process.env.CONTEXT = context;
    assert.equal(isIndexableDeployment(), false);
  }
  process.env.CONTEXT = "production";
  assert.equal(isIndexableDeployment(), true);
});

test("Robots and sitemap agree on preview and production indexing", () => {
  assert.equal(robots().sitemap, "https://portfolio.example/sitemap.xml");
  const entries = sitemap();
  assert.equal(entries.length, 20);
  assert.equal(new Set(entries.map(entry => entry.url)).size, 20);
  for (const entry of entries) {
    assert.match(entry.url, /^https:\/\/portfolio\.example\/(fr|en)(\/|$)/);
    assert.doesNotMatch(entry.url, /mentions-legales|politique-confidentialite/);
    assert.deepEqual(Object.keys(entry.alternates.languages).sort(), ["en", "fr", "x-default"]);
  }
  process.env.SITE_ENV = "preview";
  assert.equal(robots().rules.disallow, "/");
  assert.deepEqual(sitemap(), []);
});

test("Localized metadata preserves canonicals, social cards and noindex pages", () => {
  for (const locale of ["fr", "en"]) {
    const metadata = pageMetadata(locale, { title: "Test", description: "Description", path: "/contact" });
    assert.equal(metadata.alternates.canonical, `/${locale}/contact`);
    assert.equal(metadata.openGraph.images[0].url, `/${locale}/opengraph-image`);
    assert.equal(metadata.twitter.card, "summary_large_image");
    assert.equal(metadata.robots.index, true);
    assert.equal(pageMetadata(locale, { title: "Legal", description: "Legal", path: "/mentions-legales", noIndex: true }).robots.index, false);
  }
});
