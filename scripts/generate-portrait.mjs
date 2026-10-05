import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { projectFile, writeGeneratedAssets } from "./lib/generated-assets.mjs";

/** A real photograph stays raster; export at twice the largest displayed width. */
export async function generatePortrait() {
  const source = await readFile(projectFile("assets/portrait.source.webp"));
  const bytes = await sharp(source).rotate()
    .resize(672, 672, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 }).toBuffer();
  return [{ path: "public/portrait.webp", bytes }];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeGeneratedAssets(await generatePortrait(), {
    checkOnly: process.argv.includes("--check"), command: "assets:generate",
  });
}
