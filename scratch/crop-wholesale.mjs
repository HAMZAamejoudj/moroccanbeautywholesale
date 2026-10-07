import sharp from 'sharp';

async function cropWholesale() {
  const src = 'public/images/hero-wholesale-products.jpg';

  // Argan oil bottle is around left: 740, top: 0, width: 170, height: 350
  // Prickly pear bottle is around left: 960, top: 0, width: 170, height: 350

  await sharp(src)
    .extract({ left: 720, top: 0, width: 220, height: 350 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/test-argan-bottle.jpg');

  await sharp(src)
    .extract({ left: 940, top: 0, width: 220, height: 350 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/test-prickly-bottle.jpg');

  // Also convert rose water morocoo.png to rose-water.jpg
  await sharp('public/images/blog-rose-water.webp')
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rose-water.webp');

  // Also convert Ghassoul clay from hero-wholesale-products (left: 1040, top: 430, width: 220, height: 280)
  await sharp(src)
    .extract({ left: 1040, top: 430, width: 220, height: 280 })
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/rhassoul-clay.webp');

  console.log('Done creating crops');
}

cropWholesale().catch(console.error);
