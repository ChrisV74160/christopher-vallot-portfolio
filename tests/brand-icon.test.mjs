import test from "node:test";
import assert from "node:assert/strict";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createTypeScriptLoader } from "./load-typescript.cjs";
import { getOwlVectors } from "../scripts/lib/owl-vector.mjs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url));

test("Brand maintenance scripts and source files remain available", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts["icons:generate"], "node scripts/generate-brand-icons.mjs");
  for (const file of [
    "scripts/generate-brand-icons.mjs",
    "scripts/generate-owl-vector.mjs",
    "assets/illustration-owl.source.svg",
    "public/brand/owl-framed.svg",
    "public/technologies/LICENSE.txt",
  ]) assert.ok(read(file).length > 0, file);
});

const testDirectory = fileURLToPath(new URL("./", import.meta.url));
const generators = [
  {
    script: "scripts/generate-brand-icons.mjs",
    source: "assets/illustration-owl.source.svg",
    outputs: ["app/icon.png", "app/apple-icon.png", "app/favicon.ico"],
  },
  {
    script: "scripts/generate-owl-vector.mjs",
    source: "assets/illustration-owl.source.svg",
    outputs: ["public/brand/owl-framed.svg"],
  },
];

function generatorFixture(t, generator) {
  // Keep fixtures below tests so copied scripts resolve the real installed tools.
  const directory = mkdtempSync(join(testDirectory, ".asset-check-"));
  t.after(() => {
    assert.equal(dirname(directory), testDirectory.replace(/[\\/]$/, ""));
    assert.ok(basename(directory).startsWith(".asset-check-"));
    rmSync(directory, { recursive: true, force: true });
  });
  mkdirSync(join(directory, "public/brand"), { recursive: true });
  const helpers = readdirSync(new URL("../scripts/lib/", import.meta.url)).map(name => `scripts/lib/${name}`);
  for (const file of [generator.script, generator.source, "styles/theme.css", ...helpers, ...generator.outputs]) {
    mkdirSync(dirname(join(directory, file)), { recursive: true });
    copyFileSync(new URL("../" + file, import.meta.url), join(directory, file));
  }
  return directory;
}

const runGenerator = (directory, generator, args = []) => spawnSync(
  process.execPath,
  [join(directory, generator.script), ...args],
  { cwd: directory, encoding: "utf8" },
);

const artifactSnapshot = (directory, files) => files.map((file) => ({
  file,
  digest: createHash("sha256").update(readFileSync(join(directory, file))).digest("hex"),
  modifiedAt: statSync(join(directory, file), { bigint: true }).mtimeNs,
}));

for (const generator of generators) {
  test(`${generator.script} checks generated artifacts without modifying them`, (t) => {
    const directory = generatorFixture(t, generator);
    const before = artifactSnapshot(directory, generator.outputs);
    const publicFiles = readdirSync(join(directory, "public/brand"));
    const result = runGenerator(directory, generator, ["--check"]);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(artifactSnapshot(directory, generator.outputs), before);
    assert.deepEqual(readdirSync(join(directory, "public/brand")), publicFiles);
  });

  test(`${generator.script} reports stale or missing artifacts without repairing them`, (t) => {
    const directory = generatorFixture(t, generator);
    const staleFile = generator.outputs[0];
    const missingFile = generator.outputs.at(-1);
    writeFileSync(join(directory, staleFile), "deliberately stale artifact");
    const before = artifactSnapshot(directory, generator.outputs);
    const stale = runGenerator(directory, generator, ["--check"]);
    assert.equal(stale.status, 1);
    assert.ok(`${stale.stdout}${stale.stderr}`.includes(staleFile));
    assert.deepEqual(artifactSnapshot(directory, generator.outputs), before);

    unlinkSync(join(directory, missingFile));
    const missing = runGenerator(directory, generator, ["--check"]);
    assert.equal(missing.status, 1);
    assert.ok(`${missing.stdout}${missing.stderr}`.includes(missingFile));
    assert.ok(!readdirSync(dirname(join(directory, missingFile))).includes(basename(missingFile)));
  });
}

test("Vector generation validates the source before replacing the framed site SVG", (t) => {
  const generator = generators[1];
  const directory = generatorFixture(t, generator);
  const before = artifactSnapshot(directory, generator.outputs);
  writeFileSync(join(directory, generator.source), '<svg xmlns="http://www.w3.org/2000/svg" width="440" height="482" viewBox="105 84 440 482"/>');
  const result = runGenerator(directory, generator);
  assert.notEqual(result.status, 0);
  assert.deepEqual(artifactSnapshot(directory, generator.outputs), before);
});

test("Small-screen contact controls preserve the existing layout", () => {
  const css = read("styles/data-artwork.css").toString();
  const mobile = css.slice(css.lastIndexOf("@media (max-width: 30rem)"));
  assert.match(mobile, /\.contact-control > svg \{ display: none; \}/);
  assert.match(mobile, /\.contact-control :is\(input, select, textarea\) \{ padding-left: 0\.75rem; \}/);
});

test("The small hero tagline uses the approved contrasting teal", () => {
  assert.match(read("styles/brand.css").toString(), /\.hero-tagline span \{ color: var\(--brand-secondary\); \}/);
});

test("Header and footer share the framed native vector owl", async () => {
  const { IdentityMark } = createTypeScriptLoader()("components/ui/identity-mark.tsx");
  const component = renderToStaticMarkup(createElement(IdentityMark));
  assert.match(component, /src="\/brand\/owl-framed\.svg"/);
  assert.match(component, /width="48"/);
  assert.match(component, /height="48"/);
  assert.match(component, /aria-hidden="true"/);
  for (const file of ["components/site-header.tsx", "components/site-footer.tsx"]) {
    assert.match(read(file).toString(), /<IdentityMark\b/);
  }
  const metadata = await sharp(read("public/brand/owl-framed.svg")).metadata();
  assert.equal(metadata.format, "svg");
  assert.equal(metadata.width, 650);
  assert.equal(metadata.height, 650);
});

test("The framed vector keeps the navy rounded border and the shared owl colours", async () => {
  const bytes = read("public/brand/owl-framed.svg");
  const source = bytes.toString();
  assert.doesNotMatch(source, /<image\b|data:image|<foreignObject\b|<script\b|\son\w+\s*=/i);
  assert.doesNotMatch(source.replace("http://www.w3.org/2000/svg", ""), /https?:\/\/|(?:href|src)\s*=/i);
  const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixel = (x, y) => [...data.subarray((y * info.width + x) * 4, (y * info.width + x) * 4 + 4)];
  assert.equal(pixel(0, 0)[3], 0);
  assert.equal(pixel(649, 649)[3], 0);
  for (const [x, y] of [[325, 16], [16, 325], [634, 325], [325, 634]]) {
    assert.deepEqual(pixel(x, y), [0, 63, 92, 255]);
  }
  for (const [x, y] of [[325, 45], [45, 325], [605, 325], [325, 605]]) {
    assert.deepEqual(pixel(x, y), [255, 255, 255, 255]);
  }
  assert.deepEqual(pixel(325, 296), [255, 166, 0, 255]);
  assert.deepEqual(pixel(265, 394), [0, 101, 114, 255]);
  assert.deepEqual(pixel(276, 454), [0, 139, 86, 255]);
  assert.deepEqual(pixel(325, 503), [120, 165, 10, 255]);
});

test("The native framed owl has the original belly colour order and a transparent exterior", async () => {
  const { data, info } = await sharp(read("public/brand/owl-framed.svg")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixel = (x, y) => {
    const offset = (Math.floor(y * info.height) * info.width + Math.floor(x * info.width)) * 4;
    return [...data.subarray(offset, offset + 4)];
  };
  assert.deepEqual(pixel(265 / 650, 394 / 650), [0, 101, 114, 255]);
  assert.deepEqual(pixel(276 / 650, 454 / 650), [0, 139, 86, 255]);
  assert.deepEqual(pixel(325 / 650, 503 / 650), [120, 165, 10, 255]);
  assert.deepEqual(pixel(.50, .08), [255, 255, 255, 255]);
  assert.equal(pixel(.01, .01)[3], 0);
  const colours = new Set();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3]) colours.add([...data.subarray(i, i + 3)].join(","));
  }
  for (const colour of ["0,63,92", "0,101,114", "0,139,86", "120,165,10", "255,166,0", "255,255,255"]) assert.ok(colours.has(colour));
  // The first and last visible pixel on each row must be the blue frame, never white.
  for (let y = 0; y < info.height; y++) {
    let first = -1, last = -1;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 20) {
        if (first === -1) first = x;
        last = x;
      }
    }
    for (const x of [first, last]) {
      if (x === -1) continue;
      const offset = (y * info.width + x) * 4;
      const [r, g, b] = data.subarray(offset, offset + 3);
      assert.ok(r < 20 && g >= 50 && g < 90 && b >= 75 && b < 120, `Non-navy fringe on row ${y}`);
    }
  }
});

test("Browser icons are generated directly from the shared native framed owl", async () => {
  for (const [file, size] of [["app/icon.png", 512], ["app/apple-icon.png", 180]]) {
    const expected = await sharp(read("public/brand/owl-framed.svg"), { density: 72 * size / 650 })
      .resize(size, size, { fit: "contain", background: "#00000000" }).png().toBuffer();
    assert.ok(read(file).equals(expected), `${file}: does not match the native vector rendering`);
    const { data } = await sharp(read(file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(data[3], 0, `${file}: transparent corner`);
  }
});

test("Technology logos remain local, safe and in their original brand colours", () => {
  const component = read("components/ui/technology-icon.tsx").toString();
  for (const [, path] of component.matchAll(/src: "\/([^\"]+)"/g)) {
    const source = read(`public/${path}`).toString();
    if (!path.endsWith(".svg")) continue;
    assert.match(source, /<svg\b/);
    assert.doesNotMatch(source, /<script\b|<foreignObject\b|\bon\w+=|(?:href|src)=["']https?:/i);
  }
  assert.match(read("public/technologies/python.svg").toString(), /#306998/i);
  assert.match(read("public/technologies/gitlab.svg").toString(), /#e24329/i);
  assert.doesNotMatch(component, /technology-icon-mask/);
});
const pngSize = (buffer) => {
  assert.equal(buffer.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
};

test("The flat visual identity uses only the brand palette", () => {
  const palette = new Set(["#003f5c", "#006572", "#008b56", "#78a50a", "#ffa600", "#ffffff"]);
  // Product marks keep their authentic colours; the surrounding UI stays on-brand.
  const folders = ["styles", "public/brand"];
  const files = folders.flatMap(folder => readdirSync(new URL("../" + folder, import.meta.url))
    .filter(name => /\.(css|svg)$/.test(name)).map(name => `${folder}/${name}`));
  files.push("components/visuals/data-artwork.tsx", "components/visuals/case-artwork.tsx", "components/visuals/mission-artwork.tsx");
  for (const file of files) {
    const source = read(file).toString();
    for (const colour of source.match(/#[0-9a-f]{3,8}\b/gi) ?? []) {
      assert.ok(palette.has(colour.toLowerCase()), `${file}: unexpected colour ${colour}`);
    }
    assert.doesNotMatch(source, /(?:linear|radial|conic)-gradient\(|<(?:linearGradient|radialGradient|filter)\b/, file);
  }
});

test("Data illustrations consume their generated self-contained vectors", () => {
  const source = read("components/visuals/data-artwork.tsx").toString();
  assert.doesNotMatch(source, /["']use client["']|<animate\b|setInterval|requestAnimationFrame/);
  const { DashboardArtwork, ConversationArtwork } = createTypeScriptLoader()("components/visuals/data-artwork.tsx");
  for (const [component, props, asset] of [
    [DashboardArtwork, {}, "hero"],
    [DashboardArtwork, { variant: "contact" }, "contact"],
    [ConversationArtwork, {}, "conversation"],
    [ConversationArtwork, { variant: "similar" }, "conversation-similar"],
  ]) {
    const markup = renderToStaticMarkup(createElement(component, props));
    assert.ok(markup.includes(`href="/artwork/${asset}.svg"`));
    const vector = read(`public/artwork/${asset}.svg`).toString();
    assert.doesNotMatch(vector, /<image\b|<animate\b|data:image/);
    assert.match(vector, /<clipPath\b/);
    assert.doesNotMatch(markup, /hibou-original\.webp|\/brand\/owl\.webp/);
    assert.match(markup, /aria-hidden="true"/);
  }
});

test("The illustration vector preserves the supplied source rendering", async () => {
  const original = await sharp(read("assets/illustration-owl.source.svg")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const illustration = await sharp(Buffer.from((await getOwlVectors()).illustration)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(illustration.info.width, 440);
  assert.equal(illustration.info.height, 482);
  assert.deepEqual(illustration.info, original.info);
  const difference = illustration.data.reduce((sum, value, i) => sum + Math.abs(value - original.data[i]), 0) / illustration.data.length;
  assert.ok(difference < 0.1, `Source/vector render mismatch: ${difference}`);
});

test("The illustration owl is a self-contained vector with a transparent exterior", async () => {
  const bytes = Buffer.from((await getOwlVectors()).illustration);
  const source = bytes.toString();
  assert.doesNotMatch(source, /<image\b|data:image|<foreignObject\b|<script\b|\son\w+\s*=/i);
  assert.doesNotMatch(source.replace("http://www.w3.org/2000/svg", ""), /https?:\/\/|(?:href|src)\s*=/i);
  const { data, info } = await sharp(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let x = 0; x < info.width; x++) {
    assert.equal(data[x * 4 + 3], 0);
    assert.equal(data[((info.height - 1) * info.width + x) * 4 + 3], 0);
  }
  for (let y = 0; y < info.height; y++) {
    assert.equal(data[(y * info.width) * 4 + 3], 0);
    assert.equal(data[(y * info.width + info.width - 1) * 4 + 3], 0);
  }
});

test("Case drawings fill the frame and the contact CTA has its own conversation artwork", () => {
  const art = read("components/visuals/case-artwork.tsx").toString();
  const css = read("styles/data-artwork.css").toString();
  const cta = read("components/contact-cta.tsx").toString();
  assert.match(art, /data-case-background="shared"/);
  assert.match(css, /aspect-ratio: 25 \/ 17/);
  assert.match(css, /\.case-scene-background \{[^}]*inset: 0/);
  assert.match(cta, /<ConversationArtwork/);
  assert.doesNotMatch(cta, /ArrowUpRight|DashboardArtwork/);
});

test("Case thumbnails preserve their flat background and share text-free mission artwork", () => {
  const art = read("components/visuals/case-artwork.tsx").toString();
  assert.doesNotMatch(art, /IllustrationOwl|hibou/);
  const background = art.match(/<div className="case-scene-background" data-case-background="shared">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(background);
  assert.doesNotMatch(background, /variant|technologies|locale/);
  assert.equal((background.match(/<span\b/g) ?? []).length, 5);
  const css = read("styles/data-artwork.css").toString();
  for (const colour of ["primary", "secondary", "quality", "tertiary", "action"]) {
    assert.match(css, new RegExp(`case-scene-background[^}]*background: var\\(--brand-${colour}\\)`));
  }
  assert.doesNotMatch(background, /gradient|opacity|filter|CaseFoliage/i);
  assert.match(art, /<MissionArtwork variant=\{variant\}/);
  assert.doesNotMatch(art, /TechnologySvgIcon|<text\b|<image\b/);
  assert.doesNotMatch(art, /CaseFoliage/);
  assert.doesNotMatch(art, /["']use client["']|<animate\b|setInterval|requestAnimationFrame/);
});

test("Every project renders the identical text-free schematic in cards and detail pages", () => {
  const load = createTypeScriptLoader();
  const { ProjectVisual } = load("components/project-visual.tsx");
  const { MissionArtwork } = load("components/visuals/mission-artwork.tsx");
  const { projects } = load("data/projects.ts");
  const distinct = new Set();
  for (const project of projects) {
    const variant = project.visualVariant;
    const schematic = renderToStaticMarkup(createElement(MissionArtwork, { variant }));
    distinct.add(schematic.replace(/data-mission="[^"]+"/, ""));
    assert.doesNotMatch(schematic, /<text\b|<foreignObject\b|hibou|owl|technologies\/|<title\b/i);
    const vector = read(`public/artwork/mission-${variant}.svg`).toString();
    assert.doesNotMatch(vector, /<text\b|<image\b|<foreignObject\b|hibou|owl/i);
    for (const locale of ["fr", "en"]) {
      for (const detail of [false, true]) {
        const rendered = renderToStaticMarkup(createElement(ProjectVisual, { variant, detail }));
        assert.ok(rendered.includes(schematic), `${locale}/${project.slug}: changed schematic`);
        assert.doesNotMatch(rendered, /project-visual-label|<text\b/);
        assert.equal(rendered.replace(/<[^>]+>/g, "").trim(), "");
      }
    }
  }
  assert.equal(distinct.size, 6);
});

test("All case views share the homepage background and the CTA has no extra turquoise shape", () => {
  const source = read("components/project-visual.tsx").toString();
  const css = read("styles/data-artwork.css").toString();
  const artwork = read("assets/vectors/mission-artwork.tsx").toString();
  assert.equal((source.match(/<CaseArtwork variant=\{variant\}/g) ?? []).length, 1);
  assert.doesNotMatch(source, /ConceptFlow|diagram\.label|diagram\.stages|diagram\.note/);
  assert.doesNotMatch(artwork, /<text\b|<foreignObject\b|<image\b|TechnologySvgIcon|["']use client["']/);
  assert.doesNotMatch(css, /case-scene-background\[data-variant=/);
  assert.doesNotMatch(css, /contact-cta--similar::before/);
  const shared = read("components/visuals/case-artwork.tsx").toString();
  for (const shape of ["top", "orange", "bottom", "green", "lime"]) {
    assert.ok(shared.includes(`case-scene-background__${shape}`));
    assert.ok(css.includes(`.case-scene-background__${shape}`));
  }
  assert.match(css, /\.project-visual--case::before \{ content: none; \}/);
});

test("Background circles retain the homepage scale on panoramic banners", () => {
  const css = read("styles/data-artwork.css").toString();
  assert.match(css, /\.case-scene-background \{[^}]*container-type: size/);
  for (const shape of ["top", "orange", "bottom", "green", "lime"]) {
    const rule = css.match(new RegExp(`\\.case-scene-background__${shape} \\{([^}]+)\\}`))?.[1];
    assert.ok(rule);
    assert.match(rule, /width: [\d.]+cqh/);
    assert.doesNotMatch(rule, /width: [\d.]+%/);
  }
});

test("Case banners match the closing block width with a compact panoramic format", () => {
  const css = read("styles/data-artwork.css").toString();
  assert.match(css, /\.case-visual-wrap \{ width: 100%; margin-inline: 0; \}/);
  assert.match(css, /\.project-card \.project-visual:has\(\.case-illustration\) \{ min-height: 0; aspect-ratio: 25 \/ 17; \}/);
  assert.match(css, /\.case-visual-wrap \.project-visual--case \{ min-height: 0; aspect-ratio: 5 \/ 2; \}/);
  assert.match(css, /@media \(max-width: 48rem\) \{\s*\.case-visual-wrap \.project-visual--case \{ aspect-ratio: 16 \/ 10; \}/);
  assert.doesNotMatch(read("components/visuals/mission-artwork.tsx").toString(), /preserveAspectRatio="none"/);
});

test("Contact foliage keeps a teal lower leaf and a separate green background", () => {
  const art = read("assets/vectors/data-artwork.tsx").toString();
  assert.match(art, /data-contact-leaf="lower"[^>]*fill=\{teal\}/);
  assert.match(art, /data-contact-background="green"[^>]*fill=\{green\}/);
  assert.match(art, /<ellipse data-contact-background="green"[^>]*transform="rotate\(-18 280 245\)"/);
  assert.match(art, /data-contact-leaf="left"[^>]*fill=\{teal\}/);
  assert.doesNotMatch(art, /data-contact-plane|strokeDasharray="5 7"/);
  assert.doesNotMatch(art, /\[73, 88, 103\]/);
});

test("Neighbouring chart bars never use the same palette colour", () => {
  const source = read("assets/vectors/data-artwork.tsx").toString();
  const palettes = [...source.matchAll(/fill=\{\[([a-z, ]+)\]\[i\]\}/g)];
  assert.ok(palettes.length >= 5);
  for (const [, values] of palettes) {
    const colours = values.split(",").map(value => value.trim());
    colours.slice(1).forEach((colour, i) => assert.notEqual(colour, colours[i], values));
  }
  assert.doesNotMatch(source, /fill=\{i > 2 \? navy : green\}/);
});

test("Social previews serve the script-generated vector-derived images", () => {
  const route = read("app/[locale]/opengraph-image/route.tsx").toString();
  assert.match(route, /public.*social/);
  assert.doesNotMatch(route, /next\/og|ImageResponse|data:image/);
  for (const locale of ["fr", "en"]) assert.deepEqual(pngSize(read(`public/social/${locale}.png`)), [1200, 630]);
});

test("Browser and installation metadata use content-versioned icon URLs", () => {
  const layout = read("app/[locale]/layout.tsx").toString();
  assert.match(layout, /url: icon\.src/);
  assert.match(layout, /shortcut: icon\.src/);
  assert.match(layout, /url: appleIcon\.src/);
  for (const file of ["app/manifest.ts", "app/[locale]/manifest.webmanifest/route.ts"]) {
    assert.match(read(file).toString(), /src: icon\.src/);
  }
});

test("The main PNG is square and high resolution", () => {
  assert.deepEqual(pngSize(read("app/icon.png")), [512, 512]);
});

test("The Apple icon uses the 180px format", () => {
  assert.deepEqual(pngSize(read("app/apple-icon.png")), [180, 180]);
});

test("The ICO contains the same owl in independent 16, 32, 48 and 96px PNG frames", async () => {
  const ico = read("app/favicon.ico");
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 4);
  for (const [index, size] of [16, 32, 48, 96].entries()) {
    const entry = 6 + index * 16;
    const bytes = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    assert.ok(offset >= 70 && offset + bytes <= ico.length);
    assert.deepEqual(pngSize(ico.subarray(offset, offset + bytes)), [size, size]);
    const expected = await sharp(read("public/brand/owl-framed.svg"), { density: 72 * size / 650 })
      .resize(size, size, { fit: "contain", background: "#00000000" }).png().toBuffer();
    assert.ok(ico.subarray(offset, offset + bytes).equals(expected), `${size}px ICO frame differs from the vector`);
  }
});
