import sharp from 'sharp';

async function generateCleanAssets() {
  const wholesaleSrc = 'public/images/hero-wholesale-products.jpg';
  const premiumSrc = 'public/images/card-premium-oils.webp';

  // 1. Argan Oil - with full dropper bottle and background
  await sharp(wholesaleSrc)
    .extract({ left: 680, top: 0, width: 300, height: 380 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/argan-oil.webp');

  // 2. Prickly Pear Seed Oil - with full dropper bottle
  await sharp(wholesaleSrc)
    .extract({ left: 880, top: 0, width: 300, height: 380 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/prickly-pear-oil.webp');

  // 3. Rose Water - pure rose petals & cork glass bottle from rose water morocoo.png
  await sharp('public/images/blog-rose-water.webp')
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rose-water.webp');

  // 4. Rhassoul Clay - amber jar with gold lid Ghassoul Powder from card-premium-oils
  await sharp(premiumSrc)
    .extract({ left: 510, top: 310, width: 320, height: 360 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rhassoul-clay.webp');

  // 5. Amber Perfume Stones - artisanal solid perfume stone wrapped from wholesale
  await sharp(wholesaleSrc)
    .extract({ left: 1140, top: 460, width: 340, height: 279 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/amber-perfume-stones.webp');

  console.log('Clean assets successfully generated!');
}

generateCleanAssets().catch(console.error);
