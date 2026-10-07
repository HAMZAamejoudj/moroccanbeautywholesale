const fs = require('fs');
const path = require('path');

const locales = ['en', 'fr', 'ar'];

for (const lang of locales) {
  const filePath = path.join(__dirname, `../out/${lang}/index.html`);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${filePath}`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  console.log(`\n================== LOCALE: ${lang.toUpperCase()} ==================`);
  
  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log(`Title: ${titleMatch ? titleMatch[1] : 'NONE'}`);

  // Meta description
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  console.log(`Description: ${descMatch ? descMatch[1] : 'NONE'}`);

  // Canonicals
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(m => m[1]);
  console.log(`Canonicals count (${canonicals.length}):`, canonicals);

  // Hreflangs
  const hreflangs = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/g)].map(m => `${m[1]} -> ${m[2]}`);
  console.log(`Hreflangs count (${hreflangs.length}):`, hreflangs);

  // Meta keywords
  const keywords = [...html.matchAll(/<meta name="keywords"[^>]*>/g)];
  console.log(`Meta keywords count: ${keywords.length}`);

  // Organica links
  const organica = [...html.matchAll(/moroccanorganica\.com/g)];
  console.log(`moroccanorganica.com mentions: ${organica.length}`);

  // Audited claims
  const ecocert = [...html.matchAll(/ECOCERT/gi)];
  const usda = [...html.matchAll(/USDA ORGANIC/gi)];
  const partners1000 = [...html.matchAll(/1000\+/gi)];
  console.log(`Claims check: ECOCERT=${ecocert.length}, USDA ORGANIC=${usda.length}, 1000+=${partners1000.length}`);

  // Headings outline
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi)].map(m => {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    return `${m[1].toUpperCase()}: ${text}`;
  });
  console.log(`Headings outline (${headings.length}):`);
  headings.forEach(h => console.log(`  ${h}`));

  // Word count (approximate text in <body>)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    const cleanText = bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '')
                                  .replace(/<style[\s\S]*?<\/style>/gi, '')
                                  .replace(/<[^>]+>/g, ' ')
                                  .replace(/\s+/g, ' ')
                                  .trim();
    const words = cleanText.split(' ').filter(Boolean);
    console.log(`Visible text word count: ${words.length}`);
  }
}
