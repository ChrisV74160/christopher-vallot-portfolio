import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createTypeScriptLoader } from "./load-typescript.cjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const tests = join(root, "tests");
const managed = ["public/brand", "public/artwork", "public/technologies", "public/social"];
const images = ["app/icon.png", "app/apple-icon.png", "app/favicon.ico", "public/portrait.webp",
  ...managed.flatMap(directory => readdirSync(join(root, directory))
    .filter(name => /\.(svg|png)$/.test(name)).map(name => `${directory}/${name}`))];

function fixture(t) {
  const directory = mkdtempSync(join(tests, ".vector-pipeline-"));
  t.after(() => {
    assert.equal(dirname(directory), tests);
    assert.ok(basename(directory).startsWith(".vector-pipeline-"));
    rmSync(directory, { recursive: true, force: true });
  });
  for (const path of ["scripts", "assets", "styles/theme.css", "data/technology-icons.json", "data/social-image.json", ...images]) {
    mkdirSync(dirname(join(directory, path)), { recursive: true });
    cpSync(join(root, path), join(directory, path), { recursive: true });
  }
  return directory;
}
const run = (directory, args = ["--check"]) => spawnSync(process.execPath,
  [join(directory, "scripts/generate-assets.mjs"), ...args], { cwd: directory, encoding: "utf8" });
const snapshot = directory => images.map(path => ({ path,
  digest: createHash("sha256").update(readFileSync(join(directory, path))).digest("hex"),
  modified: statSync(join(directory, path), { bigint: true }).mtimeNs,
}));

test("The complete image pipeline checks every generated image without writing", t => {
  const directory = fixture(t);
  const before = snapshot(directory);
  const result = run(directory);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(snapshot(directory), before);
});

test("Changing the owl source invalidates illustrations, icons and sharing images together", t => {
  const directory = fixture(t);
  const path = join(directory, "assets/illustration-owl.source.svg");
  const source = readFileSync(path, "utf8");
  writeFileSync(path, source.replace(/<\/svg>\s*$/, '<path d="M300 300h10v10h-10Z" fill="#FFA600"/></svg>'));
  const before = snapshot(directory);
  const result = run(directory);
  assert.equal(result.status, 1);
  for (const image of ["public/brand/owl-framed.svg", "public/artwork/hero.svg", "app/icon.png", "public/social/fr.png", "public/social/en.png"]) {
    assert.ok(result.stderr.includes(image), `Source change did not invalidate ${image}: ${result.stderr}`);
  }
  assert.deepEqual(snapshot(directory), before);
});

test("Invalid source geometry leaves the whole generated image set untouched", t => {
  const directory = fixture(t);
  writeFileSync(join(directory, "assets/illustration-owl.source.svg"), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const before = snapshot(directory);
  const result = run(directory, []);
  assert.notEqual(result.status, 0);
  assert.deepEqual(snapshot(directory), before);
});

test("Unregistered exports are reported without deleting user files", t => {
  const directory = fixture(t);
  const path = join(directory, "public/artwork/unused.svg");
  writeFileSync(path, '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const before = snapshot(directory);
  const result = run(directory);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unregistered generated images: public\/artwork\/unused.svg/);
  assert.equal(readFileSync(path, "utf8"), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  assert.deepEqual(snapshot(directory), before);
});

test("Every technology and the fallback resolve to a safe native local vector", async () => {
  const catalogue = JSON.parse(readFileSync(join(root, "data/technology-icons.json")));
  const { TechnologyIcon } = createTypeScriptLoader()("components/ui/technology-icon.tsx");
  for (const [name, definition] of [...Object.entries(catalogue.icons), ["unknown", catalogue.fallback], ["__proto__", catalogue.fallback]]) {
    const path = `public/technologies/${definition.slug}.svg`;
    const bytes = readFileSync(join(root, path));
    const svg = bytes.toString();
    const markup = renderToStaticMarkup(createElement(TechnologyIcon, { name, size: 20 }));
    assert.ok(markup.includes(`src="/${path.slice(7)}"`), name);
    assert.doesNotMatch(svg, /<image\b|<script\b|<foreignObject\b|<animate\b|var\(|currentColor|data:image/);
    assert.equal((await sharp(bytes).metadata()).format, "svg");
  }
});

test("The portrait remains an optimized photograph with an unchanged square composition", async () => {
  const source = await sharp(join(root, "assets/portrait.source.webp")).metadata();
  const exported = await sharp(join(root, "public/portrait.webp")).metadata();
  assert.equal(source.width / source.height, exported.width / exported.height);
  assert.equal(exported.width, 672);
  assert.equal(exported.height, 672);
  assert.equal(exported.format, "webp");
  assert.ok(statSync(join(root, "public/portrait.webp")).size < statSync(join(root, "assets/portrait.source.webp")).size);
});
