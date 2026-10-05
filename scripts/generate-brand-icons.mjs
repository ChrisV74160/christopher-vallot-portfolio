import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const checkOnly = process.argv.includes("--check");
const file = (name) => new URL(`../${name}`, import.meta.url);

// Preserve the approved browser-icon master, including its transparent exterior.
// Navigation and illustration SVGs are maintained by build-owl-vector.mjs.
const source = await readFile(file("assets/owl-brand-palette.png"));
const render = (size) => sharp(source)
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

const outputs = [
  ["app/icon.png", icon],
  ["app/apple-icon.png", appleIcon],
  ["app/favicon.ico", Buffer.concat([directory, ...frames])],
];

if (checkOnly) {
  for (const [path, expected] of outputs) {
    const current = await readFile(file(path)).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!current?.equals(expected)) {
      console.error(`${current ? "Outdated" : "Missing"} generated asset: ${path}. Run npm run icons:generate.`);
      process.exitCode = 1;
    }
  }
  if (!process.exitCode) console.log("Browser icons match their approved PNG source.");
} else {
  await Promise.all(outputs.map(([path, bytes]) => writeFile(file(path), bytes)));
  console.log("Browser icons generated: PNG 512px, Apple 180px, ICO 16/32/48/96px.");
}
