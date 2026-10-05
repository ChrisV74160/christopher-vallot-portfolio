import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getOwlVectors } from "./lib/owl-vector.mjs";
import { writeGeneratedAssets } from "./lib/generated-assets.mjs";

export async function generateOwlVectors() {
  const { framed } = await getOwlVectors();
  const outputs = [
    { path: "public/brand/owl-framed.svg", bytes: Buffer.from(framed), width: 650, height: 650 },
  ];
  for (const { path, bytes, width, height } of outputs) {
    const metadata = await sharp(bytes).metadata();
    if (metadata.width !== width || metadata.height !== height) throw new Error(`${path}: unexpected vector dimensions.`);
  }
  return outputs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeGeneratedAssets(await generateOwlVectors(), {
    checkOnly: process.argv.includes("--check"), command: "illustrations:generate",
  });
  if (!process.exitCode) console.log("Owl vectors match their shared native source.");
}
