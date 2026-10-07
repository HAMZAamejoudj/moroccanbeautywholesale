// Tiny helpers shared by the check scripts (no dependencies).
import fs from "fs";
import path from "path";

export const OUT = path.resolve(import.meta.dirname, "..", "..", "out");

export function walk(dir, ext, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, acc);
    else if (!ext || e.name.endsWith(ext)) acc.push(p);
  }
  return acc;
}

export const htmlFiles = () => walk(OUT, ".html").filter((f) => !f.includes(`${path.sep}_next${path.sep}`));
export const rel = (f) => path.relative(OUT, f).split(path.sep).join("/");

export const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Visible text + alt/meta/JSON-LD text, without the scripts that only carry the Next.js payload. */
export function scannableText(html) {
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const meta = [...html.matchAll(/<meta [^>]*content="([^"]*)"/g)].map((m) => m[1]);
  const alts = [...html.matchAll(/\balt="([^"]*)"/g)].map((m) => m[1]);
  const aria = [...html.matchAll(/\baria-label="([^"]*)"/g)].map((m) => m[1]);
  const title = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => m[1]);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return decode([body, ...jsonLd, ...meta, ...alts, ...aria, ...title].join(" \n "));
}
