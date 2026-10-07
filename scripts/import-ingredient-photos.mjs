import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS =
  "C:\\Users\\AI HUB\\.cursor\\projects\\c-Users-AI-HUB-Desktop-mdf-moroccanbeautywholesale\\assets";

/** suffix in filename -> output under public/images/ingredients/ */
const MAP = [
  { suffix: "05_53_31-9", out: "argan-oil.webp" },
  { suffix: "05_53_23-2", out: "prickly-pear-oil.webp" },
  { suffix: "05_53_24-3", out: "fig-seed-oil.webp" },
  { suffix: "05_53_25-4", out: "saffron-oil.webp" },
  { suffix: "05_53_26-5", out: "verbena-essential-oil.webp" },
  { suffix: "05_53_27-6", out: "nigella-oil.webp" },
  { suffix: "05_53_28-7", out: "rose-water.webp" },
  { suffix: "05_53_30-8", out: "orange-blossom-water.webp" },
  { suffix: "05_53_22-1", out: "chamomile-water.webp" },
  { suffix: "06_01_46-1", out: "rhassoul-clay.webp" },
  { suffix: "06_01_47-2", out: "nila-powder.webp" },
  { suffix: "06_01_49-3", out: "henna-powder.webp" },
  { suffix: "06_01_51-4", out: "khol-powder.webp" },
  { suffix: "06_01_52-5", out: "aker-fassi.webp" },
  { suffix: "06_01_53-6", out: "beldi-black-soap.webp" },
  { suffix: "06_01_55-7", out: "ghassoul-soap.webp" },
  { suffix: "06_01_56-8", out: "barley-scrub.webp" },
  { suffix: "06_01_57-9", out: "olive-oil-soap.webp" },
];

const OUT_DIR = path.join(ROOT, "public", "images", "ingredients");

async function main() {
  const files = await fs.readdir(ASSETS);
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const { suffix, out } of MAP) {
    const srcName = files.find(
      (f) => f.includes("Image_ChatGPT") && f.includes(suffix),
    );
    if (!srcName) {
      console.error(`Missing source for ${out} (${suffix})`);
      process.exit(1);
    }
    const src = path.join(ASSETS, srcName);
    const dest = path.join(OUT_DIR, out);
    const input = await fs.readFile(src);
    await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    const stat = await fs.stat(dest);
    console.log(`${out} ← ${srcName.slice(0, 40)}… (${Math.round(stat.size / 1024)} KB)`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
