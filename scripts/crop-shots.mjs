// Cuts the app screenshots in src/assets/shots to the regions in src/data/crops.ts and writes them
// to src/assets/crops (generated, not committed). Runs before every build.
// An entry is either [left, top, width, height] on the shot of the same name, or
// { from: '<shot>', rect: [...] } for a second view cut from another shot.
// A <shot>-dark.png next to the source gets the same crop as <name>-dark.png.
import { mkdir, rm, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { crops } from '../src/data/crops.ts';

const src = new URL('../src/assets/shots/', import.meta.url);
const out = new URL('../src/assets/crops/', import.meta.url);
const exists = (u) => access(u).then(() => true, () => false);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

let count = 0;
for (const [name, entry] of Object.entries(crops)) {
  const from = Array.isArray(entry) ? name : entry.from;
  const rect = Array.isArray(entry) ? entry : entry.rect;
  for (const suffix of ['', '-dark']) {
    const file = new URL(`${from}${suffix}.png`, src);
    if (!(await exists(file))) continue;
    const image = sharp(fileURLToPath(file));
    const { width, height } = await image.metadata();
    const s = width / 1440;
    const [left, top, w, h] = rect.map((v) => Math.round(v * s));
    if (left + w > width || top + h > height) throw new Error(`${from}${suffix}.png: crop ${rect} lies outside ${width}×${height}`);
    await image.extract({ left, top, width: w, height: h }).png().toFile(fileURLToPath(new URL(`${name}${suffix}.png`, out)));
    count++;
  }
}
console.log(`[crop-shots] ${count} screenshots cropped`);
