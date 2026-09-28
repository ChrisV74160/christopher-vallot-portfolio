/* eslint-disable @typescript-eslint/no-require-imports -- Node 20-compatible CommonJS tests. */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
/* eslint-enable @typescript-eslint/no-require-imports */
const load = createTypeScriptLoader();
const { isLocale, stripLocale, localizedHref, languageAlternates } = load("i18n/config.ts");
const { getContent, getLocalizedProjectBySlug } = load("i18n/content.ts");
const { contactMessages } = load("i18n/messages/contact.ts");
const { projectMessages } = load("i18n/messages/projects.ts");
const { sectionMessages } = load("i18n/messages/sections.ts");
const { pageMessages } = load("i18n/messages/pages.ts");
const french = getContent("fr");
const english = getContent("en");
const { pageRoutes, isKnownPagePath } = load("i18n/routes.ts");

test("The page registry includes every case and keeps unknown routes distinct", () => {
  assert.equal(new Set(pageRoutes.map(({ path }) => path)).size, pageRoutes.length);
  assert.equal(pageRoutes.filter(({ indexable }) => indexable).length, french.projects.length + 4);
  for (const { path } of pageRoutes) assert.equal(isKnownPagePath(path), true, path);
  for (const { slug } of french.projects) assert.equal(isKnownPagePath(`/projets/${slug}`), true);
  for (const path of ["/missing", "/projets/missing", "/contact/extra", "/api/contact", "/icon.png"]) {
    assert.equal(isKnownPagePath(path), false, path);
  }
});

/** Compare keys, array lengths and leaf types, not translated prose. */
function structure(value) {
  if (Array.isArray(value)) return value.map(structure);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, structure(value[key])]));
  }
  return typeof value;
}

test("Only the two supported locale identifiers are accepted", () => {
  assert.equal(isLocale("fr"), true);
  assert.equal(isLocale("en"), true);
  for (const value of ["FR", "de", "english", "", null, undefined, {}, 1]) assert.equal(isLocale(value), false);
});

test("Locale stripping respects complete path segments", () => {
  for (const [input, expected] of [["/fr", "/"], ["/en/", "/"], ["/en/projets", "/projets"], ["/fr/contact?from=home#form", "/contact?from=home#form"], ["/french", "/french"], ["/enough", "/enough"], ["/projets", "/projets"]]) {
    assert.equal(stripLocale(input), expected, input);
  }
});

test("Internal links get one locale prefix and retain anchors and queries", () => {
  for (const [href, locale, expected] of [
    ["/", "en", "/en"], ["/contact", "fr", "/fr/contact"], ["/en/projets/example", "fr", "/fr/projets/example"],
    ["/fr/projets/example?source=home#resultats", "en", "/en/projets/example?source=home#resultats"],
    ["/fr/projets/unknown.case", "en", "/en/projets/unknown.case"],
    ["/en", "en", "/en"], ["/fr/", "en", "/en"], ["/#services", "en", "/en#services"],
    ["/?source=home", "fr", "/fr?source=home"], ["/en#services", "fr", "/fr#services"],
    ["/en?source=home", "fr", "/fr?source=home"], ["/en/?source=home#services", "fr", "/fr?source=home#services"],
  ]) assert.equal(localizedHref(href, locale), expected, href);
});

test("External links, fragments, API endpoints and assets remain untouched", () => {
  for (const href of ["https://www.linkedin.com/in/christopher-vallot/", "mailto:hello@example.com", "tel:+33000000000", "//example.com", "#contact", "/api/contact", "/api/contact?mode=test", "/_next/image?url=photo", "/cv-christopher-vallot.pdf", "/icon.png?v=1", "/assets/font.woff2", "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]) {
    for (const locale of ["fr", "en"]) assert.equal(localizedHref(href, locale), href, `${locale}: ${href}`);
  }
});

test("Domains and file extensions in a query do not turn a page into an asset", () => {
  assert.equal(localizedHref("/fr/projets/x?ref=linkedin.com", "en"), "/en/projets/x?ref=linkedin.com");
  assert.equal(localizedHref("/fr/contact?file=brief.pdf#form", "en"), "/en/contact?file=brief.pdf#form");
});

test("Language alternates have localized canonicals and a French x-default", () => {
  assert.deepEqual(languageAlternates("/projets/example"), { fr: "/fr/projets/example", en: "/en/projets/example", "x-default": "/fr/projets/example" });
  assert.deepEqual(languageAlternates("/"), { fr: "/fr", en: "/en", "x-default": "/fr" });
});

test("Every translated content collection preserves the French structure", () => {
  assert.deepEqual(structure(english), structure(french));
});

test("Both languages expose the same six projects, technologies and featured cases", () => {
  assert.equal(french.projects.length, 6);
  assert.deepEqual(english.projects.map((item) => item.slug), french.projects.map((item) => item.slug));
  assert.deepEqual(english.featuredProjects.map((item) => item.slug), french.featuredProjects.map((item) => item.slug));
  for (const project of french.projects) {
    const translated = getLocalizedProjectBySlug("en", project.slug);
    assert.ok(translated, project.slug);
    assert.deepEqual(translated.technologies, project.technologies);
    assert.equal(translated.visualVariant, project.visualVariant);
    assert.equal(translated.featured, project.featured);
    for (const key of ["title", "shortSummary", "seoDescription", "context", "problem", "intervention", "result"]) {
      assert.notEqual(translated[key], project[key], `${project.slug}.${key}`);
      assert.ok(translated[key].trim().length > 0);
    }
  }
  assert.equal(getLocalizedProjectBySlug("en", "missing-project"), undefined);
});

test("Translation preserves identity, links, organisations and experience identifiers", () => {
  for (const key of ["firstName", "lastName", "fullName", "location", "contact"]) assert.deepEqual(english.profile[key], french.profile[key]);
  for (const [index, experience] of french.experiences.entries()) {
    const translated = english.experiences[index];
    for (const key of ["id", "company", "location", "technologies", "caseStudySlug"]) assert.deepEqual(translated[key], experience[key]);
  }
});

test("Service identifiers stay language-independent", () => {
  for (const key of ["services"]) {
    assert.deepEqual(english[key].map((item) => item.id), french[key].map((item) => item.id));
  }
});

test("Shared form, case and visual dictionaries have matching keys and counts", () => {
  for (const dictionary of [contactMessages, projectMessages, sectionMessages, pageMessages]) assert.deepEqual(structure(dictionary.fr), structure(dictionary.en));
});
