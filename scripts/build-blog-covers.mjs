// Builds blog cover images from our own photos (no third-party brands).
// Output: public/images/blog/{slug}.webp (1280x720) and {slug}-og.jpg (1200x630)
import sharp from "sharp";
import path from "path";
import fs from "fs";

const root = path.resolve(import.meta.dirname, "..");
const img = (p) => path.join(root, "public/images", p);
const out = path.join(root, "public/images/blog");
fs.mkdirSync(out, { recursive: true });

// left/top/width/height are crop boxes in source pixels (16:9)
const covers = {
  "wholesale-argan-oil-guide": { src: "products/argan-oil-cosmetic.webp", crop: { left: 0, top: 130, width: 800, height: 450 } },
  "moroccan-black-soap-wholesale": { src: "products/moroccan-black-soap.webp", crop: { left: 0, top: 360, width: 953, height: 536 } },
  "private-label-moroccan-cosmetics": { src: "private-label-hero-jars.webp", crop: { left: 0, top: 300, width: 1600, height: 900 } },
  "hammam-kit-hotels-spas": { src: "products/moroccan-hammam-kit.webp", crop: { left: 0, top: 290, width: 900, height: 506 } },
  "importing-moroccan-cosmetics": { src: "about-factory-line.webp", crop: { left: 250, top: 120, width: 1000, height: 563 } },
  // No clean own photo yet: neutral placeholder (see shoot list)
  "rhassoul-clay-guide": { placeholder: true },
};

const placeholderSvg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1280 720">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1EBE1"/><stop offset="1" stop-color="#E3DACD"/></linearGradient></defs>
<rect width="1280" height="720" fill="url(#g)"/>
<g fill="none" stroke="#284B35" stroke-opacity=".35" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="translate(640 360)">
<path d="M-90 40 Q-90 -40 0 -60 Q90 -40 90 40 Q90 80 0 80 Q-90 80 -90 40Z"/><path d="M-60 -10 Q0 20 60 -10"/></g></svg>`;

for (const [slug, c] of Object.entries(covers)) {
  let base;
  if (c.placeholder) {
    base = sharp(Buffer.from(placeholderSvg(1280, 720)));
  } else {
    base = sharp(img(c.src)).extract(c.crop);
  }
  const buf = await base.resize(1280, 720, { fit: "cover" }).toBuffer();
  await sharp(buf).webp({ quality: 78 }).toFile(path.join(out, `${slug}.webp`));
  await sharp(buf).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, `${slug}-og.jpg`));
  console.log(slug, (fs.statSync(path.join(out, `${slug}.webp`)).size / 1024).toFixed(0) + "KB");
}
