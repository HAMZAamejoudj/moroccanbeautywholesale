import sharp from 'sharp';

async function finalizeImages() {
  // 1. Argan Oil - Argan oil bottle with dropper and clear label from hero-wholesale-products (1600x739)
  // Bottle at left: 740, top: 0, width: 220, height: 350
  // Pad with top/bottom so full bottle and dropper are visible in 4:3
  await sharp('public/images/hero-wholesale-products.jpg')
    .extract({ left: 690, top: 0, width: 320, height: 360 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/argan-oil.webp');

  // 2. Prickly Pear Seed Oil - Prickly pear bottle with label from hero-wholesale-products
  // Bottle at left: 950, top: 0, width: 220, height: 350
  await sharp('public/images/hero-wholesale-products.jpg')
    .extract({ left: 910, top: 0, width: 320, height: 360 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/prickly-pear-oil.webp');

  // 3. Rhassoul Clay - Open jar of authentic Moroccan Rhassoul clay paste from img3.jpg
  await sharp('public/images/benefits-blue-nila.webp')
    .extract({ left: 490, top: 400, width: 340, height: 320 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rhassoul-clay.webp');

  // 4. Amber Perfume Stones - Artisanal hammam solid perfume bar / stones on marble
  await sharp('public/images/hero-wholesale-products.jpg')
    .extract({ left: 1040, top: 420, width: 440, height: 310 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/amber-perfume-stones.webp');

  console.log('Images finalized successfully!');
}

finalizeImages().catch(console.error);
