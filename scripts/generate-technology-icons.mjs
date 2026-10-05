import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Braces, Code2, Database, Plug, ShieldCheck, Terminal } from "lucide-react";
import { SiCloudera, SiJson, SiMeta, SiOnnx, SiTeradata } from "react-icons/si";
import { projectFile, writeGeneratedAssets } from "./lib/generated-assets.mjs";
import { optimizeVector } from "./lib/vector.mjs";

const glyphs = {
  lucide: { Braces, Code2, Database, Plug, ShieldCheck, Terminal },
  "simple-icons": { SiCloudera, SiJson, SiMeta, SiOnnx, SiTeradata },
};

export async function generateTechnologyIcons() {
  const catalogue = JSON.parse(await readFile(projectFile("data/technology-icons.json"), "utf8"));
  const definitions = [...Object.values(catalogue.icons), catalogue.fallback];
  const seen = new Set();
  return Promise.all(definitions.map(async (definition) => {
    const { slug, color, source, family, glyph } = definition;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || seen.has(slug)) {
      throw new Error(`Technology icon slug must be safe and unique: ${slug}`);
    }
    seen.add(slug);
    let svg;
    if (source) {
      if (source !== `${slug}.svg`) throw new Error(`Unexpected technology source: ${source}`);
      svg = await readFile(projectFile(`assets/technologies/${source}`), "utf8");
    } else {
      const component = Object.hasOwn(glyphs, family) && Object.hasOwn(glyphs[family], glyph)
        ? glyphs[family][glyph]
        : null;
      if (!component) throw new Error(`Unknown native technology glyph: ${family}/${glyph}`);
      svg = renderToStaticMarkup(createElement(component, { color, size: 24, focusable: "false" }));
      // Images cannot inherit the surrounding badge's CSS colour.
      svg = svg.replace(/\bcurrentColor\b/g, color);
      // React Icons emits relative em dimensions; standalone SVGs need a native size.
      svg = svg.replace(/\b(width|height)="1em"/g, '$1="24"');
      if (!/\bxmlns=/.test(svg)) svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    return {
      path: `public/technologies/${slug}.svg`,
      bytes: Buffer.from(optimizeVector(svg, { prefix: `technology-${slug}` })),
    };
  }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writeGeneratedAssets(await generateTechnologyIcons(), {
    checkOnly: process.argv.includes("--check"),
    command: "technologies:generate",
  });
}
