import sharp from 'sharp';

async function testArgan() {
  // Option A: img16 (960x1280) -> 4:3 extraction
  await sharp('public/images/img16.jpg')
    .extract({ left: 50, top: 220, width: 850, height: 638 })
    .resize(800, 600)
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/test-argan-a.jpg');

  // Option B: card-premium-oils (1280x1162) -> 4:3 extraction around the argan bottle and rose water
  await sharp('public/images/card-premium-oils.webp')
    .extract({ left: 50, top: 320, width: 700, height: 525 })
    .resize(800, 600)
    .jpeg({ quality: 90 })
    .toFile('public/images/ingredients/test-argan-b.jpg');

  console.log('Argan test options created');
}

testArgan().catch(console.error);
