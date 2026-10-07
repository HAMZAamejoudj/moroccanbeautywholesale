/**
 * Convert used site images to WebP with clear names, update source references, delete orphans.
 */
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

/** @type {{ from: string; to: string }[]} paths relative to public/images */
const CONVERSIONS = [
  // Hero & home
  { from: "hero-background.jpg", to: "hero-ingredients-background.webp" },
  { from: "hero-products-showcase.jpg", to: "hero-products-showcase.webp" },
  { from: "hero-batch-workshop.jpg", to: "hero-batch-workshop.webp" },
  { from: "card-premium-oils.jpg", to: "card-premium-oils.webp" },
  { from: "manufacturing.webp", to: "about-manufacturing.webp" },

  // Private label
  { from: "factory-jars.jpg", to: "private-label-hero-jars.webp" },
  { from: "who-private-label.jpg", to: "private-label-intro.webp" },
  { from: "img14.jpg", to: "private-label-showcase.webp" },
  { from: "private-label.jpeg", to: "private-label-sourcing.webp" },

  // Audience / about (img24 used in multiple places)
  { from: "img24.jpg", to: "about-hero.webp" },
  { from: "who-shops.jpg", to: "audience-shops.webp" },
  { from: "who-spas.jpg", to: "audience-spas.webp" },
  { from: "who-hotels.jpg", to: "audience-hotels.webp" },

  // About factory gallery
  { from: "img1.jpg", to: "about-factory-1.webp" },
  { from: "img7.jpg", to: "about-factory-2.webp" },
  {
    from: "pord/WhatsApp Image 2026-09-28 at 18.42.38.jpeg",
    to: "about-factory-line.webp",
  },

  // Benefits page ingredient photos
  { from: "img20.jpg", to: "benefits-rhassoul-clay.webp" },
  { from: "img12.jpg", to: "benefits-prickly-pear.webp" },
  { from: "img3.jpg", to: "benefits-blue-nila.webp" },
  { from: "img11.jpg", to: "benefits-aker-fassi.webp" },

  // Blog
  { from: "about-hero.png", to: "blog-hero.webp" },
  { from: "argan oil.jpg", to: "blog-argan-oil.webp" },
  { from: "Prickly Pear Seed Oil.jpg", to: "blog-prickly-pear-oil.webp" },
  { from: "ingredients-image.jpeg", to: "blog-ingredients-collage.webp" },
  { from: "card-traditional.png", to: "blog-traditional-ingredients.webp" },
  { from: "benefits-hero.png", to: "blog-benefits-hero.webp" },
  { from: "card-export.png", to: "blog-export-card.webp" },
  { from: "rose water morocoo.png", to: "blog-rose-water.webp" },

  // Logo
  { from: "logo-full.png", to: "logo-full.webp" },

  // Payments
  { from: "credit.webp", to: "payment-credit.webp" },
  { from: "wise.png", to: "payment-wise.webp" },
  { from: "tijaribank.png", to: "payment-tijaribank.webp" },

  // Carriers
  { from: "dhl.png", to: "carrier-dhl.webp" },
  { from: "fedex.png", to: "carrier-fedex.webp" },
  { from: "chronopost.png", to: "carrier-chronopost.webp" },
  { from: "aramex.webp", to: "carrier-aramex.webp" },

  // Products catalog
  {
    from: "products/argan-oil-cosmetic.jpg",
    to: "products/argan-oil-cosmetic.webp",
  },
  {
    from: "products/moroccan-black-soap.jpg",
    to: "products/moroccan-black-soap.webp",
  },
  { from: "products/ghassoul-clay.jpg", to: "products/ghassoul-clay.webp" },
  {
    from: "products/moroccan-rose-water.jpg",
    to: "products/moroccan-rose-water.webp",
  },
  {
    from: "products/kessa-exfoliating-glove.jpg",
    to: "products/kessa-exfoliating-glove.webp",
  },
  {
    from: "products/moroccan-hammam-kit.jpg",
    to: "products/moroccan-hammam-kit.webp",
  },

  // Private-label ingredient thumbnails
  { from: "ingredients/argan-oil.jpg", to: "ingredients/argan-oil.webp" },
  {
    from: "ingredients/prickly-pear-oil.jpg",
    to: "ingredients/prickly-pear-oil.webp",
  },
  { from: "ingredients/fig-seed-oil.jpg", to: "ingredients/fig-seed-oil.webp" },
  { from: "ingredients/saffron-oil.jpg", to: "ingredients/saffron-oil.webp" },
  {
    from: "ingredients/verbena-essential-oil.jpg",
    to: "ingredients/verbena-essential-oil.webp",
  },
  { from: "ingredients/nigella-oil.jpg", to: "ingredients/nigella-oil.webp" },
  { from: "ingredients/rose-water.jpg", to: "ingredients/rose-water.webp" },
  {
    from: "ingredients/orange-blossom-water.jpg",
    to: "ingredients/orange-blossom-water.webp",
  },
  {
    from: "ingredients/chamomile-water.jpg",
    to: "ingredients/chamomile-water.webp",
  },
  { from: "ingredients/rhassoul-clay.jpg", to: "ingredients/rhassoul-clay.webp" },
  { from: "ingredients/nila-powder.jpg", to: "ingredients/nila-powder.webp" },
  { from: "ingredients/henna-powder.jpg", to: "ingredients/henna-powder.webp" },
  { from: "ingredients/khol-powder.jpg", to: "ingredients/khol-powder.webp" },
  { from: "ingredients/aker-fassi.jpg", to: "ingredients/aker-fassi.webp" },
  {
    from: "ingredients/beldi-black-soap.jpg",
    to: "ingredients/beldi-black-soap.webp",
  },
  { from: "ingredients/ghassoul-soap.jpg", to: "ingredients/ghassoul-soap.webp" },
  { from: "ingredients/barley-scrub.jpg", to: "ingredients/barley-scrub.webp" },
  {
    from: "ingredients/olive-oil-soap.jpg",
    to: "ingredients/olive-oil-soap.webp",
  },
  { from: "ingredients/beeswax.jpg", to: "ingredients/beeswax.webp" },
  {
    from: "ingredients/amber-perfume-stones.jpg",
    to: "ingredients/amber-perfume-stones.webp",
  },
  { from: "ingredients/shea-butter.jpg", to: "ingredients/shei-butter.webp" },
];

// fix typo shei -> shea
const sheaFix = CONVERSIONS.find((c) => c.to.endsWith("shei-butter.webp"));
if (sheaFix) sheaFix.to = "ingredients/shea-butter.webp";

const REPLACE_MAP = new Map();
for (const { from, to } of CONVERSIONS) {
  REPLACE_MAP.set(`/images/${from.replace(/\\/g, "/")}`, `/images/${to}`);
}

const KEEP_SVG = new Set([
  "stripe.svg",
  "ups.svg",
  "log.svg",
  "log-white.svg",
]);

async function convertOne(fromRel, toRel) {
  const input = path.join(PUBLIC_IMAGES, fromRel);
  const output = path.join(PUBLIC_IMAGES, toRel);
  try {
    await fs.access(input);
  } catch {
    console.warn(`SKIP missing source: ${fromRel}`);
    return false;
  }
  await fs.mkdir(path.dirname(output), { recursive: true });
  const ext = path.extname(fromRel).toLowerCase();
  if (ext === ".webp" && fromRel === toRel) {
    await fs.copyFile(input, output);
    return true;
  }
  if (ext === ".webp" && fromRel !== toRel) {
    await fs.copyFile(input, output);
    return true;
  }
  await sharp(input).webp({ quality: 82, effort: 4 }).toFile(output);
  return true;
}

async function walkReplace(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (["node_modules", ".next", "out", ".git"].includes(ent.name)) continue;
      await walkReplace(full);
      continue;
    }
    if (!/\.(tsx?|json|mjs|jsx|md|html)$/i.test(ent.name)) continue;
    let text = await fs.readFile(full, "utf8");
    let changed = false;
    for (const [oldPath, newPath] of REPLACE_MAP) {
      if (text.includes(oldPath)) {
        text = text.split(oldPath).join(newPath);
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(full, text, "utf8");
      console.log(`Updated refs: ${path.relative(ROOT, full)}`);
    }
  }
}

async function deleteOrphans(keepRelative) {
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      const rel = path.relative(PUBLIC_IMAGES, full).replace(/\\/g, "/");
      if (ent.isDirectory()) {
        await walk(full);
        const remaining = await fs.readdir(full);
        if (remaining.length === 0) {
          await fs.rmdir(full);
          console.log(`Removed empty dir: ${rel}`);
        }
        continue;
      }
      if (keepRelative.has(rel)) continue;
      await fs.unlink(full);
      console.log(`Deleted: ${rel}`);
    }
  }
  await walk(PUBLIC_IMAGES);
}

async function main() {
  const keep = new Set([...KEEP_SVG]);
  for (const { to } of CONVERSIONS) {
    keep.add(to.replace(/\\/g, "/"));
  }

  console.log("Converting images to WebP…");
  for (const { from, to } of CONVERSIONS) {
    const ok = await convertOne(from, to);
    if (ok) console.log(`  ${from} → ${to}`);
  }

  console.log("\nUpdating source references…");
  await walkReplace(ROOT);

  console.log("\nRemoving unused files…");
  await deleteOrphans(keep);

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
