// npm run audit:seo  -> per-page SEO facts read from out/ (title, description, canonical, hreflang, JSON-LD, headings, images)
import fs from "fs";
import { htmlFiles, rel, decode } from "./lib/html.mjs";

const only = process.argv[2]; // optional path filter, e.g. "en/index.html"
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
};

let problems = 0;
const flag = (msg) => {
  problems++;
  return `  ! ${msg}`;
};

for (const f of htmlFiles()) {
  const name = rel(f);
  if (only && !name.includes(only)) continue;
  const html = fs.readFileSync(f, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const lines = [];

  const title = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const desc = (head.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const canon = [...head.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
  const alts = [...head.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/gi)].map((m) => [m[1], m[2]]);
  const ldTypes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1])["@type"];
    } catch {
      return "INVALID_JSON";
    }
  });
  const h1 = (html.match(/<h1\b/g) || []).length;
  const h3 = (html.match(/<h3\b/g) || []).length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => attr(t, "alt") === null);
  const emptyAlt = imgs.filter((t) => attr(t, "alt") === "" && attr(t, "aria-hidden") !== "true");
  const noDims = imgs.filter((t) => !attr(t, "width") || !attr(t, "height"));

  lines.push(`${name}`);
  lines.push(`  title(${(title || "").length}): ${decode(title || "(none)")}`);
  lines.push(`  description(${(desc || "").length}): ${decode(desc || "(none)")}`);
  lines.push(`  canonical: ${canon.join(" | ") || "(none)"}`);
  lines.push(`  hreflang: ${alts.map(([l, h]) => `${l}=${h}`).join("  ") || "(none)"}`);
  lines.push(`  json-ld: ${ldTypes.join(", ") || "(none)"}   h1=${h1} h3=${h3} imgs=${imgs.length}`);

  const isReal = /^(en|fr|ar)\//.test(name);
  if (isReal) {
    if (canon.length !== 1) lines.push(flag(`canonical count ${canon.length}`));
    if (canon[0] && /\/\/www\./.test(canon[0])) lines.push(flag("www canonical"));
    if (canon[0] && !canon[0].endsWith("/")) lines.push(flag("canonical without trailing slash"));
    const langs = alts.map(([l]) => l);
    if (new Set(langs).size !== langs.length) lines.push(flag("duplicate hreflang"));
    if (alts.length && !langs.includes("x-default")) lines.push(flag("hreflang without x-default"));
    if (h1 !== 1) lines.push(flag(`h1 count ${h1}`));
    if (!title) lines.push(flag("missing title"));
    if (!desc) lines.push(flag("missing description"));
    if (noAlt.length) lines.push(flag(`${noAlt.length} <img> without alt attribute`));
    if (emptyAlt.length) lines.push(flag(`${emptyAlt.length} <img> with empty alt and no aria-hidden: ${emptyAlt.map((t) => attr(t, "src")).join(", ")}`));
    if (noDims.length) lines.push(flag(`${noDims.length} <img> without width/height`));
    const orgCount = ldTypes.filter((t) => t === "Organization").length;
    if (orgCount !== 1) lines.push(flag(`Organization JSON-LD count ${orgCount}`));
    if (/\/\/www\.moroccanbeautywholesale/.test(html)) lines.push(flag("www.moroccanbeautywholesale.com found"));
  }
  console.log(lines.join("\n") + "\n");
}
console.log(problems ? `${problems} problem(s) flagged (lines starting with "!").` : "No problems flagged.");
