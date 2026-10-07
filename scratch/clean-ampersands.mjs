import fs from 'fs';
import path from 'path';

function cleanDict(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  for (const [target, replacement] of replacements) {
    if (content.includes(target)) {
      content = content.replaceAll(target, replacement);
      console.log(`[${path.basename(filePath)}] Replaced "${target}" -> "${replacement}"`);
      count++;
    } else {
      console.warn(`[${path.basename(filePath)}] NOT FOUND: "${target}"`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[${path.basename(filePath)}] Done. ${count} replacements made.\n`);
}

const enReplacements = [
  ["Direct Manufacturer & Wholesale Supplier · Morocco", "Direct Manufacturer and Wholesale Supplier · Morocco"],
  ["Request Pricing & Samples", "Request Pricing and Samples"],
  ["COA & SDS PROVIDED", "COA AND SDS PROVIDED"],
  ["COA & SDS Provided", "COA and SDS Provided"],
  ["COA & SDS provided", "COA and SDS provided"],
  ["& Reliability", "and Reliability"],
  ["Unmatched Authenticity & Quality", "Unmatched Authenticity and Quality"],
  ["Certified Organic & Safe", "Certified Organic and Safe"],
  ["Ethical & Sustainable", "Ethical and Sustainable"],
  ["Benefits of Moroccan Organic Cosmetic Ingredients – Argan Oil, Prickly Pear, Rhassoul & More", "Benefits of Moroccan Organic Cosmetic Ingredients – Argan Oil, Prickly Pear, Rhassoul and More"],
  ["Exfoliating & Soothing", "Exfoliating and Soothing"],
  ["Acne & Skin Tone", "Acne and Skin Tone"],
  ["Heritage & Storytelling", "Heritage and Storytelling"],
  ["Serums & Oils", "Serums and Oils"],
  ["Face & Body Masks", "Face and Body Masks"],
  ["hair & skin care", "hair and skin care"],
  ["Clays & powders", "Clays and powders"],
  ["Soaps & scrubs", "Soaps and scrubs"],
  ["Spas & Salons", "Spas and Salons"],
  ["Retailers & Boutiques", "Retailers and Boutiques"],
  ["Moroccan Organic Oils & Ingredients Blog – Hair, Skin & Beauty Insights", "Moroccan Organic Oils and Ingredients Blog – Hair, Skin and Beauty Insights"],
  ["Beauty Insights & Guides", "Beauty Insights and Guides"],
  ["Aker Fassi: Origins, Benefits & Uses", "Aker Fassi: Origins, Benefits and Uses"],
  ["Phone & WhatsApp", "Phone and WhatsApp"],
  ["Private label & bulk order support", "Private label and bulk order support"]
];

const frReplacements = [
  ["Bienfaits des Ingrédients Cosmétiques Biologiques Marocains – Huile d'Argan, Figue de Barbarie & Plus", "Bienfaits des Ingrédients Cosmétiques Biologiques Marocains – Huile d'Argan, Figue de Barbarie et plus"],
  ["Exfoliant & Apaisant", "Exfoliant et apaisant"],
  ["Teint & Acné", "Teint et acné"],
  ["Sérums & Huiles", "Sérums et huiles"],
  ["Blog des Huiles & Ingrédients Bio Marocains – Soins de la Peau & Beauté", "Blog des Huiles et Ingrédients Bio Marocains – Soins de la Peau et Beauté"],
  ["Conseils & Guides de Beauté", "Conseils et guides de beauté"],
  ["Téléphone & WhatsApp", "Téléphone et WhatsApp"],
  ["Voir fournitures spa & hammam", "Voir fournitures spa et hammam"],
  ["Expédition & Logistique", "Expédition et logistique"]
];

cleanDict('dictionaries/en.json', enReplacements);
cleanDict('dictionaries/fr.json', frReplacements);
