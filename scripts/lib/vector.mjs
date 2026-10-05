import { readFileSync } from "node:fs";
import { optimize } from "svgo";

// Freeze the site's palette into standalone SVGs; no inherited CSS is required.
const palette = new Map([...readFileSync(new URL("../../styles/theme.css", import.meta.url), "utf8")
  .matchAll(/--([\w-]+):\s*(#[\da-f]{6});/gi)].map(([, name, colour]) => [name, colour]));

export function optimizeVector(svg, { prefix = "" } = {}) {
  const resolved = svg.replace(/var\(--([\w-]+)\)/g, (_, name) => {
    if (!palette.has(name)) throw new Error(`Unknown vector palette colour: ${name}`);
    return palette.get(name);
  });
  return optimize(resolved, {
    multipass: true,
    floatPrecision: 3,
    plugins: [
      { name: "preset-default", params: { overrides: {
        cleanupIds: false, collapseGroups: false, convertColors: false,
      } } },
      ...(prefix ? [{ name: "prefixIds", params: { prefix } }] : []),
    ],
  }).data;
}
