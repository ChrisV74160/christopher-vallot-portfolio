/* eslint-disable @typescript-eslint/no-require-imports -- Node-compatible test runner. */
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createTypeScriptLoader } = require("./load-typescript.cjs");
const load = createTypeScriptLoader();
const { getContent } = load("i18n/content.ts");
const { primaryTechnologies } = load("data/identity.ts");
const { formatExperiencePeriod } = load("i18n/format-period.ts");
test("Commercial structure exposes four services and three representative cases", () => {
  for (const locale of ["fr", "en"]) {
    const content = getContent(locale);
    assert.equal(content.services.length, 4);
    assert.equal(content.featuredProjects.length, 3);
    assert.equal(content.projects.length, 6);
    assert.equal(content.workPrinciples.length, 3);
    for (const service of content.services) {
      assert.ok(service.technologies.length >= 3 && service.technologies.length <= 5);
      assert.ok(service.problem && service.intervention && service.outcome);
    }
  }
  assert.deepEqual(primaryTechnologies, ["Power BI", "SQL", "Python"]);
});

test("CV dates and employers remain factual and shared across both languages", () => {
  for (const locale of ["fr", "en"]) {
    const { experiences } = getContent(locale);
    assert.equal(experiences.length, 6);
    assert.deepEqual(experiences.map(e => [e.startDate, e.endDate]), [
      ["2025-07", null], ["2025-04", "2025-06"], ["2024-02", "2025-03"],
      ["2022-03", "2023-07"], ["2019-11", "2021-06"], ["2018-11", "2019-03"],
    ]);
    assert.deepEqual(experiences.map(e => e.employer), ["Apside", "Apside", "Apside", "Apside", "Apside", "Dstny"]);
  }
  assert.equal(formatExperiencePeriod("2025-04", "2025-06", "fr"), "avril 2025 — juin 2025");
  assert.equal(formatExperiencePeriod("2025-07", null, "en"), "Since July 2025");
});

test("Case technology lists come from their documented source experience", () => {
  for (const locale of ["fr", "en"]) {
    const { projects, experiences } = getContent(locale);
    for (const project of projects) {
      const experience = experiences.find(e => e.id === project.experienceId);
      assert.ok(experience, project.slug);
      assert.equal(experience.caseStudySlug, project.slug);
      assert.deepEqual(project.technologies, experience.technologies);
      assert.equal(project.status, locale === "fr" ? "Expérience professionnelle" : "Professional experience");
    }
  }
});

test("The Dstny Python case covers the documented work without inventing a framework or measured gains", () => {
  for (const locale of ["fr", "en"]) {
    const project = getContent(locale).projects.find(p => p.experienceId === "dstny-developpeur-python");
    assert.ok(project);
    assert.equal(project.featured, false);
    assert.equal(project.visualVariant, "python-api");
    assert.deepEqual(project.technologies, ["Python", "API", "SQL", "JSON"]);
    const copy = JSON.stringify(project);
    assert.match(copy, /PDF/);
    assert.match(copy, /multithreading/);
    assert.match(copy, /alert/);
    assert.doesNotMatch(copy, /FastAPI|Flask|Django|\d+\s*%/);
  }
});

test("CNAV copy does not attribute unsupported anomaly detection work", () => {
  for (const locale of ["fr", "en"]) {
    const content = getContent(locale);
    const experience = content.experiences.find(e => e.company === "CNAV");
    const project = content.projects.find(p => p.experienceId === experience.id);
    assert.doesNotMatch(JSON.stringify([experience, project]), /anomal|Data Quality checks|contrôles de qualité/i);
    assert.match(JSON.stringify(experience), /Cloudera/);
    assert.match(JSON.stringify(experience), /Teradata/);
  }
});

test("English proficiency matches the CV without an inflated spoken level", () => {
  assert.equal(getContent("fr").languages[0].description, "Très bonne compréhension écrite, expression orale intermédiaire.");
  assert.equal(getContent("en").languages[0].description, "Very good reading comprehension, intermediate spoken English.");
});

test("Experience descriptions have short introductions, two to three contributions and separate badges", () => {
  const french = getContent("fr").experiences;
  for (const locale of ["fr", "en"]) {
    for (const [index, experience] of getContent(locale).experiences.entries()) {
      const sentences = experience.summary.match(/[^.!?]+[.!?]/g) ?? [];
      assert.ok(sentences.length >= 1 && sentences.length <= 2, experience.id);
      assert.ok(experience.summary.trim().split(/\s+/).length <= 45, experience.id);
      assert.doesNotMatch(experience.summary, /\n|•/);
      assert.ok(experience.interventions.length >= 2 && experience.interventions.length <= 3);
      for (const intervention of experience.interventions) {
        assert.ok(intervention.trim().split(/\s+/).length <= 25, experience.id);
        assert.notEqual(intervention, experience.summary);
      }
      assert.deepEqual(experience.technologies, french[index].technologies);
      assert.ok(experience.technologies.length > 0);
    }
  }
});
