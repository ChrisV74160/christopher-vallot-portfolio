import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getOwlVectors } from "./lib/owl-vector.mjs";
import { optimizeVector } from "./lib/vector.mjs";
import { loadVectorSource } from "./lib/render-vector-source.mjs";
import { writeGeneratedAssets } from "./lib/generated-assets.mjs";

/** Render every approved illustration as a self-contained native SVG. */
export async function generateArtwork() {
  const { geometry } = await getOwlVectors();
  const {
    DashboardArtworkSource,
    ConversationArtworkSource,
    PipelineArtworkSource,
    AlignmentArtworkSource,
  } = loadVectorSource(new URL("../assets/vectors/data-artwork.tsx", import.meta.url));
  const { MissionArtworkSource } = loadVectorSource(new URL("../assets/vectors/mission-artwork.tsx", import.meta.url));

  const entries = [
    ["hero", DashboardArtworkSource, { geometry }, 600, 560],
    ["contact", DashboardArtworkSource, { geometry, variant: "contact" }, 560, 380],
    ["conversation", ConversationArtworkSource, { geometry }, 500, 320],
    ["conversation-similar", ConversationArtworkSource, { geometry, variant: "similar" }, 500, 320],
    ["alignment", AlignmentArtworkSource, {}, 480, 96],
  ];

  for (let stage = 0; stage < 6; stage++) {
    entries.push([`pipeline-${stage}`, PipelineArtworkSource, { stage }, 112, 72]);
  }
  for (const variant of ["data-pipeline", "document-automation", "data-quality", "bi-reporting", "ml-model", "python-api"]) {
    entries.push([`mission-${variant}`, MissionArtworkSource, { variant }, 720, 400]);
  }

  return entries.map(([name, Component, props, width, height]) => {
    const markup = renderToStaticMarkup(createElement(Component, props))
      .replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" `);
    const vector = optimizeVector(markup, { prefix: name });
    return { path: `public/artwork/${name}.svg`, bytes: Buffer.from(vector) };
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writeGeneratedAssets(await generateArtwork(), {
    checkOnly: process.argv.includes("--check"),
    command: "illustrations:generate",
  });
}
