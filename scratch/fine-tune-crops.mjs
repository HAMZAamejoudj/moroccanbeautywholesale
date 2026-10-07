import sharp from 'sharp';

async function fineTuneCrops() {
  // 1. Argan Oil from img16.jpg: the frosted bottle with golden argan oil & white label
  // img16.jpg is 960 x 1280
  await sharp('public/images/img16.jpg')
    .extract({ left: 120, top: 280, width: 420, height: 750 })
    .resize(800, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/argan-oil.webp');

  // 2. Prickly Pear Seed Oil from hero-wholesale-products.jpg (1600 x 739)
  // Prickly pear bottle is centered around left: 950 to 1100, top: 0 to 350
  await sharp('public/images/hero-wholesale-products.jpg')
    .extract({ left: 910, top: 0, width: 260, height: 360 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/prickly-pear-oil.webp');

  // 3. Rhassoul Clay from img3.jpg (1600 x 1200) - open jar of authentic creamy brown Rhassoul clay paste
  await sharp('public/images/benefits-blue-nila.webp')
    .extract({ left: 520, top: 440, width: 280, height: 280 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rhassoul-clay.webp');

  // 4. Amber Perfume Stones - fragrance stones / solid musk from hero-wholesale-products
  // At bottom right: artisanal round wrapped hammam bar / fragrance stone
  await sharp('public/images/hero-wholesale-products.jpg')
    .extract({ left: 1040, top: 420, width: 440, height: 310 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/amber-perfume-stones.webp');

  console.log('Fine-tuned crops ready');
}

fineTuneCrops().catch(console.error);
