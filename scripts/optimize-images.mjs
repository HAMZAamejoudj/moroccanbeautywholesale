// npm run optimize:images
// Recompresses WebP images in public/images that exceed the size budget (hero < 200 KB, others < 120 KB).
// Originals are copied once to scratch/image-originals/ before the first change.
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public/images");
const backupDir = path.join(root, "scratch/image-originals");

const HERO = new Set(["hero-products-showcase.webp", "private-label-hero-jars.webp", "about-hero.webp", "hero-ingredients-background.webp"]);
const MAX_KB = (file) => (HERO.has(path.basename(file)) ? 195 : 115);
// Images shown very small: also downscale
const THUMBS = { "hero-batch-workshop.webp": 480 };

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".webp")) acc.push(p);
  }
  return acc;
}

let changed = 0;
for (const file of walk(imagesDir)) {
  const base = path.basename(file);
  const size = fs.statSync(file).size;
  const limit = MAX_KB(file) * 1024;
  if (size <= limit && !THUMBS[base]) continue;

  const rel = path.relative(imagesDir, file);
  const backup = path.join(backupDir, rel);
  if (!fs.existsSync(backup)) {
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.copyFileSync(file, backup);
  }

  const source = fs.readFileSync(backup); // always start from the original
  const meta = await sharp(source).metadata();
  let width = Math.min(meta.width, THUMBS[base] ?? (HERO.has(base) ? 1600 : 1280));
  let quality = 80;
  let out;
  for (;;) {
    out = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer();
    if (out.length <= limit) break;
    quality -= 6;
    if (quality < 50) {
      quality = 78;
      width = Math.round(width * 0.88);
    }
  }
  fs.writeFileSync(file, out);
  changed++;
  console.log(`${rel}: ${(size / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB (${width}px, q${quality})`);
}
console.log(`${changed} image(s) recompressed.`);
