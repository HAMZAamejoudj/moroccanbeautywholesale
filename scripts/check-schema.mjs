// npm run check:schema
// Local structured-data check on out/: valid JSON, required properties per type, FAQ text visible on the page,
// one Organization per page, WebSite only on the homepage, no www URLs.
// This is NOT a replacement for https://validator.schema.org/ or Google's Rich Results Test (run those on the live site).
import fs from "fs";
import { htmlFiles, rel, decode } from "./lib/html.mjs";

const REQUIRED = {
  Organization: ["name", "url", "logo", "email", "telephone", "address", "description", "availableLanguage", "sameAs"],
  WebSite: ["name", "url", "inLanguage"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity", "inLanguage"],
  Article: ["headline", "description", "image", "datePublished", "dateModified", "author", "publisher"],
  AboutPage: ["name", "url"],
};

const norm = (s) => decode(s).replace(/\s+/g, " ").trim();
let errors = 0;
const err = (file, msg) => {
  errors++;
  console.log(`✗ ${file}: ${msg}`);
};

for (const f of htmlFiles()) {
  const name = rel(f);
  if (!/^(en|fr|ar)\//.test(name)) continue;
  const html = fs.readFileSync(f, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const visible = norm(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<\/?(?:a|strong|em|b|i|span|u|mark|code)(?=[\s>])[^>]*>/g, "") // inline tags do not add spaces
      .replace(/<[^>]+>/g, " "),
  );
  const types = [];

  for (const raw of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      err(name, `invalid JSON-LD: ${e.message}`);
      continue;
    }
    const type = data["@type"];
    types.push(type);
    if (data["@context"] !== "https://schema.org") err(name, `${type}: @context must be https://schema.org`);
    for (const key of REQUIRED[type] ?? []) if (data[key] === undefined) err(name, `${type}: missing "${key}"`);
    if (/\/\/www\./.test(raw.replace(/schema\.org/g, ""))) err(name, `${type}: contains a www URL`);

    if (type === "FAQPage") {
      for (const q of data.mainEntity ?? []) {
        if (!visible.includes(norm(q.name))) err(name, `FAQ question not visible on page: "${q.name.slice(0, 60)}"`);
        const a = norm(q.acceptedAnswer?.text ?? "");
        if (!a || !visible.includes(a)) err(name, `FAQ answer not identical to visible text: "${a.slice(0, 60)}"`);
      }
    }
    if (type === "BreadcrumbList") {
      const items = data.itemListElement ?? [];
      items.forEach((it, i) => {
        if (it.position !== i + 1) err(name, "BreadcrumbList positions are not sequential");
        if (!it.name || !it.item) err(name, "BreadcrumbList item without name/item");
      });
    }
  }

  const count = (t) => types.filter((x) => x === t).length;
  if (count("Organization") !== 1) err(name, `expected 1 Organization, found ${count("Organization")}`);
  const isHome = /^(en|fr|ar)\/index\.html$/.test(name);
  if (isHome && count("WebSite") !== 1) err(name, "homepage must have exactly one WebSite");
  if (!isHome && count("WebSite") > 0) err(name, "WebSite should only be on the homepage");
  const isInner = !isHome;
  if (isInner && count("BreadcrumbList") < 1) err(name, "inner page without BreadcrumbList");
  console.log(`  ${name}: ${types.join(", ")}`);
}

console.log(errors ? `\nFAILED: ${errors} structured-data problem(s).` : "\nOK: 0 structured-data problems.");
process.exit(errors ? 1 : 0);
