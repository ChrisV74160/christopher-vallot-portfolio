// Native SVG is the only art input. Sharp only rasterises the finished vectors.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { optimize } from 'svgo';
const file = name => new URL(name, import.meta.url);
const source = await readFile(file('../assets/illustration-owl.source.svg'), 'utf8');
const optimizeSvg = svg => optimize(svg, { multipass: true, floatPrecision: 3, plugins: [{ name: 'preset-default', params: { overrides: { cleanupIds: false, collapseGroups: false, convertColors: false } } }] }).data;
const web = optimizeSvg(source);
await writeFile(file('../public/brand/illustration-owl.svg'), web);

// The navigation mark adds a native rounded frame around the same owl geometry.
// Illustration exports keep their own viewBox and never include this frame.
const owlGeometry = source.match(/<svg\b[^>]*>([\s\S]*)<\/svg>/)?.[1]?.replace(/<title\b[^>]*>[\s\S]*?<\/title>/, '');
if (!owlGeometry) throw new Error('The owl source must contain a complete native SVG.');
const framed = optimizeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="0 0 650 650" role="img" aria-labelledby="framed-owl-title">
  <title id="framed-owl-title">Hibou — logo encadré</title>
  <rect x="16" y="16" width="618" height="618" rx="117" fill="#FFFFFF" stroke="#003F5C" stroke-width="32"/>
  <svg x="85" y="60" width="480" height="526" viewBox="105 84 440 482">${owlGeometry}</svg>
</svg>`);
await writeFile(file('../public/brand/owl-framed.svg'), framed);
// Standalone previews are disposable; only the native source and site SVG belong in the repository.
const previewDirectory = join(tmpdir(), 'portfolio-owl-vector');
await mkdir(previewDirectory, { recursive: true });
await Promise.all([
  writeFile(join(previewDirectory, 'owl.source.svg'), source),
  writeFile(join(previewDirectory, 'owl.web.svg'), web),
  writeFile(join(previewDirectory, 'owl.svg'), web),
]);
for (const [scale, name] of [[1, 'owl-preview.png'], [2, 'owl@2x.png'], [4, 'owl@4x.png']]) {
  await sharp(Buffer.from(web), { density: 72 * scale }).png().toFile(join(previewDirectory, name));
}
await sharp(Buffer.from(framed)).png().toFile(join(previewDirectory, 'owl-framed-preview.png'));
console.log(JSON.stringify({ sourceBytes: Buffer.byteLength(source), webBytes: Buffer.byteLength(web), rasterInputs: 0, siteAsset: 'public/brand/illustration-owl.svg', framedAsset: 'public/brand/owl-framed.svg', previewDirectory, exports: ['440x482', '880x964', '1760x1928'] }));
