import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { optimize } from "svgo";

const checkOnly = process.argv.includes("--check");
const file = (name) => new URL(`../${name}`, import.meta.url);
const source = await readFile(file("assets/illustration-owl.source.svg"), "utf8");

// The frame coordinates are part of the approved 440×482 illustration geometry.
// Browser icons keep their own PNG master; this script only builds native SVGs.
const owlGeometry = source
  .match(/<svg\b[^>]*>([\s\S]*)<\/svg>/)?.[1]
  ?.replace(/<title\b[^>]*>[\s\S]*?<\/title>/, "");
if (!owlGeometry) {
  throw new Error("The owl source must contain a complete native SVG.");
}

function optimizeSvg(svg) {
  return optimize(svg, {
    multipass: true,
    floatPrecision: 3,
    plugins: [{
      name: "preset-default",
      params: {
        overrides: { cleanupIds: false, collapseGroups: false, convertColors: false },
      },
    }],
  }).data;
}

const web = optimizeSvg(source);
const framed = optimizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="0 0 650 650" role="img" aria-labelledby="framed-owl-title">
  <title id="framed-owl-title">Hibou — logo encadré</title>
  <rect x="16" y="16" width="618" height="618" rx="117" fill="#FFFFFF" stroke="#003F5C" stroke-width="32"/>
  <svg x="85" y="60" width="480" height="526" viewBox="105 84 440 482">${owlGeometry}</svg>
</svg>`);

const outputs = [
  ["public/brand/illustration-owl.svg", Buffer.from(web), 440, 482],
  ["public/brand/owl-framed.svg", Buffer.from(framed), 650, 650],
];

// Validate both finished vectors before replacing either tracked artifact.
await Promise.all(outputs.map(async ([path, bytes, width, height]) => {
  const metadata = await sharp(bytes).metadata();
  if (metadata.width !== width || metadata.height !== height) {
    throw new Error(`${path} must retain its approved ${width}×${height} dimensions.`);
  }
  await sharp(bytes).png().toBuffer();
}));

if (checkOnly) {
  for (const [path, expected] of outputs) {
    const current = await readFile(file(path)).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!current?.equals(expected)) {
      console.error(`${current ? "Outdated" : "Missing"} generated asset: ${path}. Run npm run illustrations:generate.`);
      process.exitCode = 1;
    }
  }
  if (!process.exitCode) console.log("Vector assets match their native SVG source.");
} else {
  await Promise.all(outputs.map(([path, bytes]) => writeFile(file(path), bytes)));

  // Preview exports are disposable and remain outside the repository.
  const previewDirectory = join(tmpdir(), "portfolio-owl-vector");
  await mkdir(previewDirectory, { recursive: true });
  await Promise.all([
    writeFile(join(previewDirectory, "owl.source.svg"), source),
    writeFile(join(previewDirectory, "owl.web.svg"), web),
    writeFile(join(previewDirectory, "owl.svg"), web),
  ]);
  for (const [scale, name] of [[1, "owl-preview.png"], [2, "owl@2x.png"], [4, "owl@4x.png"]]) {
    await sharp(Buffer.from(web), { density: 72 * scale }).png().toFile(join(previewDirectory, name));
  }
  await sharp(Buffer.from(framed)).png().toFile(join(previewDirectory, "owl-framed-preview.png"));
  console.log(JSON.stringify({
    sourceBytes: Buffer.byteLength(source),
    webBytes: Buffer.byteLength(web),
    rasterInputs: 0,
    siteAsset: "public/brand/illustration-owl.svg",
    framedAsset: "public/brand/owl-framed.svg",
    previewDirectory,
    exports: ["440x482", "880x964", "1760x1928"],
  }));
}
