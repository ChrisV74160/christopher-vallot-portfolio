import { readFile } from "node:fs/promises";
import { projectFile } from "./generated-assets.mjs";
import { optimizeVector } from "./vector.mjs";

/** The supplied owl geometry is the single source for artwork and framed icons. */
export async function getOwlVectors() {
  const source = await readFile(projectFile("assets/illustration-owl.source.svg"), "utf8");
  const geometry = source.match(/<svg\b[^>]*>([\s\S]*)<\/svg>/)?.[1]
    ?.replace(/<title\b[^>]*>[\s\S]*?<\/title>/, "");
  if (!geometry || !/<path\b/.test(geometry)) throw new Error("The owl source must contain complete native geometry.");
  const illustration = optimizeVector(source);
  const framed = optimizeVector(`<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="0 0 650 650" role="img" aria-labelledby="framed-owl-title">
    <title id="framed-owl-title">Hibou — logo encadré</title>
    <rect x="16" y="16" width="618" height="618" rx="117" fill="#FFFFFF" stroke="#003F5C" stroke-width="32"/>
    <svg x="85" y="60" width="480" height="526" viewBox="105 84 440 482">${geometry}</svg>
  </svg>`);
  return { source, geometry, illustration, framed };
}
