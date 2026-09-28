import sharp from "sharp";
import { fileURLToPath } from "node:url";

// Keep the existing illustration pixel-identical; the SVG clips its outer frame.
await sharp(fileURLToPath(new URL("../assets/owl.png", import.meta.url)))
  .webp({ lossless: true })
  .toFile(fileURLToPath(new URL("../public/brand/hibou-original.webp", import.meta.url)));
