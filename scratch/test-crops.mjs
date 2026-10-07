import sharp from 'sharp';
import path from 'path';

async function cropHeroShowcase() {
  const src = 'public/images/hero-products-showcase.webp';
  const outDir = 'public/images/ingredients';

  // hero-products-showcase.jpg is 1280x960
  // Let's crop:
  // 1. Argan Oil (around x: 710, y: 280, w: 160, h: 440) -> expand to aspect 4:3
  // 2. Prickly Pear Seed Oil (around x: 810, y: 360, w: 140, h: 360)
  // 3. Ghassoul Clay / Powder (around x: 460, y: 440, w: 200, h: 260)

  // Argan oil crop:
  await sharp(src)
    .extract({ left: 630, top: 250, width: 260, height: 480 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'test-argan.jpg'));

  // Prickly pear crop:
  await sharp(src)
    .extract({ left: 780, top: 320, width: 220, height: 420 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'test-prickly.jpg'));

  // Ghassoul powder / clay crop:
  await sharp(src)
    .extract({ left: 450, top: 430, width: 220, height: 280 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'test-ghassoul.jpg'));

  console.log('Crops created');
}

cropHeroShowcase().catch(console.error);
