import sharp from 'sharp';

async function updateKeyImages() {
  // 1. Argan Oil from img16.jpg (frosted bottle of pure golden argan oil with gold dropper)
  await sharp('public/images/img16.jpg')
    .extract({ left: 160, top: 260, width: 380, height: 600 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/argan-oil.webp');

  // 2. Prickly Pear Seed Oil from hero-wholesale-products.jpg
  await sharp('public/images/hero-wholesale-products.jpg')
    .extract({ left: 870, top: 0, width: 320, height: 380 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/prickly-pear-oil.webp');

  // 3. Rhassoul Clay from spas-hammams.jpg (Ghassoul Powder jar)
  await sharp('public/images/spas-hammams.jpg')
    .extract({ left: 350, top: 320, width: 360, height: 400 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rhassoul-clay.webp');

  // 4. Amber Perfume Stones / Fragrance from 18.42.47.jpeg (amber oils / essences)
  await sharp('public/images/pord/WhatsApp Image 2026-09-28 at 18.42.47.jpeg')
    .rotate(90) // It was sideways (vertical camera rotated 90 deg)
    .extract({ left: 200, top: 100, width: 600, height: 500 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/amber-perfume-stones.webp');

  console.log('Key images updated');
}

updateKeyImages().catch(console.error);
