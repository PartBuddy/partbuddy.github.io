// Cuts the app screenshots in src/assets/shots to the regions in src/data/crops.ts and writes them
// to src/assets/crops (generated, not committed). Runs before every build.
import { readdir, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { crops } from '../src/data/crops.ts';

const src = new URL('../src/assets/shots/', import.meta.url);
const out = new URL('../src/assets/crops/', import.meta.url);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

let count = 0;
for (const file of await readdir(src)) {
  const name = file.replace(/\.png$/, '');
  const crop = crops[name] ?? crops[name.replace(/-dark$/, '')];
  if (!file.endsWith('.png') || !crop) continue;
  const image = sharp(fileURLToPath(new URL(file, src)));
  const { width, height } = await image.metadata();
  const s = width / 1440;
  const [left, top, w, h] = crop.map((v) => Math.round(v * s));
  if (left + w > width || top + h > height) throw new Error(`${file}: crop ${crop} lies outside ${width}×${height}`);
  await image.extract({ left, top, width: w, height: h }).png().toFile(fileURLToPath(new URL(file, out)));
  count++;
}
console.log(`[crop-shots] ${count} screenshots cropped`);
