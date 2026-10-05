import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import satori from "satori";
import sharp from "sharp";

import { projectFile, writeGeneratedAssets } from "./lib/generated-assets.mjs";
import { getOwlVectors } from "./lib/owl-vector.mjs";
import { loadVectorSource } from "./lib/render-vector-source.mjs";
import { optimizeVector } from "./lib/vector.mjs";

const size = { width: 1200, height: 630 };

export async function generateSocialImages() {
  const { SocialImage } = loadVectorSource(projectFile("assets/vectors/social-image.tsx"));
  const [font, copyByLocale, { framed }] = await Promise.all([
    readFile(projectFile("assets/fonts/Geist-Regular.ttf")),
    readFile(projectFile("data/social-image.json"), "utf8").then(JSON.parse),
    getOwlVectors(),
  ]);
  const framedGeometry = framed.match(/<svg\b[^>]*>([\s\S]*)<\/svg>/)?.[1];
  if (!framedGeometry) throw new Error("The sharing logo must contain complete native SVG geometry.");

  const outputs = [];
  for (const [locale, copy] of Object.entries(copyByLocale)) {
    const layout = await satori(createElement(SocialImage, { copy }), {
      ...size,
      embedFont: true,
      fonts: [{ name: "geist", data: font, weight: 400, style: "normal" }],
    });
    // Satori lays out the empty slot; the same framed owl is inserted as vectors.
    const logo = `<svg x="80" y="72" width="72" height="72" viewBox="0 0 650 650">${framedGeometry}</svg>`;
    const vector = optimizeVector(layout.replace(/<\/svg>$/, `${logo}</svg>`), {
      prefix: `social-${locale}-`,
    });
    const bytes = await sharp(Buffer.from(vector)).resize(size.width, size.height).png().toBuffer();
    outputs.push({ path: `public/social/${locale}.png`, bytes });
  }
  return outputs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeGeneratedAssets(await generateSocialImages(), {
    checkOnly: process.argv.includes("--check"),
    command: "assets:generate",
  });
}
