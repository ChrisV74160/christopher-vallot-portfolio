import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const projectFile = (path) => new URL(`../../${path}`, import.meta.url);

/** Validate every vector before writing any output. Check mode never repairs files. */
export async function writeGeneratedAssets(outputs, { checkOnly = false, command = "assets:generate" } = {}) {
  const paths = new Set();
  for (const { path, bytes } of outputs) {
    if (paths.has(path)) throw new Error(`Duplicate generated asset: ${path}`);
    paths.add(path);
    if (path.endsWith(".svg")) {
      const svg = bytes.toString();
      if (/<(?:image|foreignObject|script|animate\w*|set)\b|<!DOCTYPE|\son\w+\s*=|(?:href|src)\s*=\s*["'](?!#)|url\(\s*["']?(?!#)/i.test(svg)) {
        throw new Error(`${path} must be a static, self-contained native vector.`);
      }
      await sharp(bytes).png().toBuffer();
    }
  }
  for (const { path, bytes } of outputs) {
    const current = await readFile(projectFile(path)).catch(error => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (current?.equals(bytes)) continue;
    if (checkOnly) {
      console.error(`${current ? "Outdated" : "Missing"} generated asset: ${path}. Run npm run ${command}.`);
      process.exitCode = 1;
    } else {
      await mkdir(dirname(fileURLToPath(projectFile(path))), { recursive: true });
      await writeFile(projectFile(path), bytes);
    }
  }
}
