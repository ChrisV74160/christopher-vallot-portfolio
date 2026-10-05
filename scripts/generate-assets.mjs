import { readdir } from "node:fs/promises";
import { generateOwlVectors } from "./generate-owl-vector.mjs";
import { generateArtwork } from "./generate-artwork.mjs";
import { generateBrandIcons } from "./generate-brand-icons.mjs";
import { generateTechnologyIcons } from "./generate-technology-icons.mjs";
import { generateSocialImages } from "./generate-social-images.mjs";
import { generatePortrait } from "./generate-portrait.mjs";
import { projectFile, writeGeneratedAssets } from "./lib/generated-assets.mjs";

// Complete all rendering first: an invalid source must not leave partially updated assets.
const outputs = (await Promise.all([
  generateOwlVectors(), generateArtwork(), generateBrandIcons(),
  generateTechnologyIcons(), generateSocialImages(), generatePortrait(),
])).flat();
const expected = new Set(outputs.map(({ path }) => path));
const unexpected = [];
for (const directory of ["public/brand", "public/artwork", "public/technologies", "public/social"]) {
  const files = await readdir(projectFile(directory)).catch(error => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  for (const name of files) {
    const path = `${directory}/${name}`;
    if (/\.(?:svg|png|webp|jpe?g|ico)$/i.test(name) && !expected.has(path)) unexpected.push(path);
  }
}
if (unexpected.length) throw new Error(`Unregistered generated images: ${unexpected.join(", ")}. Remove unused assets or register their source.`);

await writeGeneratedAssets(outputs, { checkOnly: process.argv.includes("--check") });
if (!process.exitCode) console.log(`${outputs.length} generated images verified against their sources.`);
