import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// All framed brand exports share the corrected master and transparent exterior.
const source = await readFile(new URL("../assets/owl-brand-palette.png", import.meta.url));
const render = (size) => sharp(source).resize(size, size, { fit: "contain", background: "#00000000" }).png().toBuffer();
await Promise.all([
  sharp(source).resize(192, 192, { fit: "contain", background: "#00000000" }).webp({ lossless: true }).toBuffer()
    .then((data) => writeFile(new URL("../public/brand/owl.webp", import.meta.url), data)),
  render(512).then((data) => writeFile(new URL("../app/icon.png", import.meta.url), data)),
  render(180).then((data) => writeFile(new URL("../app/apple-icon.png", import.meta.url), data)),
]);

// ICO supports independent PNG-compressed frames at each native resolution.
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
await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([directory, ...frames]));
console.log("Brand owl generated: owl.webp for header/footer, PNG 512px, Apple 180px, ICO 16/32/48/96px.");
