import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getOwlVectors } from "./lib/owl-vector.mjs";
import { writeGeneratedAssets } from "./lib/generated-assets.mjs";

export async function generateBrandIcons() {
  // Render each platform size directly from vectors, without an intermediate PNG master.
  const { framed } = await getOwlVectors();
  const source = Buffer.from(framed);
  const render = (size) => sharp(source, { density: 72 * size / 650 })
    .resize(size, size, { fit: "contain", background: "#00000000" })
    .png()
    .toBuffer();

  const [icon, appleIcon] = await Promise.all([render(512), render(180)]);

  // ICO contains independent PNG-compressed frames at each native resolution.
  const sizes = [16, 32, 48, 96];
  const frames = await Promise.all(sizes.map(render));
  const directory = Buffer.alloc(6 + 16 * frames.length);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(frames.length, 4);
  let offset = directory.length;
  frames.forEach((frame, index) => {
    const entry = 6 + index * 16;
    directory[entry] = sizes[index];
    directory[entry + 1] = sizes[index];
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(frame.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += frame.length;
  });

  return [
    { path: "app/icon.png", bytes: icon },
    { path: "app/apple-icon.png", bytes: appleIcon },
    { path: "app/favicon.ico", bytes: Buffer.concat([directory, ...frames]) },
  ];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeGeneratedAssets(await generateBrandIcons(), {
    checkOnly: process.argv.includes("--check"), command: "icons:generate",
  });
  if (!process.exitCode) console.log("Browser icons match the shared native framed owl.");
}
