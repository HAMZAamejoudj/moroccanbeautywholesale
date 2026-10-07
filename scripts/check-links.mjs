// npm run check:links
// Reads every HTML file in out/ and fails on any internal link or asset that points to a missing file.
import fs from "fs";
import path from "path";
import { OUT, htmlFiles, rel, decode } from "./lib/html.mjs";

const HOSTS = new Set(["moroccanbeautywholesale.com"]);
const exists = (p) => fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));

function resolveTarget(href, fromFile) {
  let h = decode(href.trim());
  if (!h || h.startsWith("#") || /^(mailto:|tel:|javascript:|data:|sms:|whatsapp:)/i.test(h)) return null;
  if (/^https?:\/\//i.test(h)) {
    const u = new URL(h);
    if (!HOSTS.has(u.hostname)) return null; // external
    h = u.pathname + u.search;
  } else if (h.startsWith("//")) return null;
  h = h.split("#")[0].split("?")[0];
  if (!h) return null;
  const base = h.startsWith("/") ? OUT : path.dirname(fromFile);
  return path.join(base, decodeURIComponent(h));
}

let broken = 0;
let checked = 0;
const seen = new Set();
const files = htmlFiles();
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const refs = [
    ...[...html.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/g)].map((m) => ["a", m[1]]),
    ...[...html.matchAll(/<img\b[^>]*?\bsrc="([^"]*)"/g)].map((m) => ["img", m[1]]),
    ...[...html.matchAll(/<link\b[^>]*?\bhref="([^"]*)"/g)].map((m) => ["link", m[1]]),
    ...[...html.matchAll(/<script\b[^>]*?\bsrc="([^"]*)"/g)].map((m) => ["script", m[1]]),
  ];
  for (const [kind, href] of refs) {
    const target = resolveTarget(href, f);
    if (!target) continue;
    checked++;
    if (!exists(target)) {
      const key = `${rel(f)}|${href}`;
      if (seen.has(key)) continue;
      seen.add(key);
      broken++;
      console.log(`✗ ${rel(f)}  <${kind}> ${href}`);
    }
  }
}
console.log(`\nChecked ${checked} internal references in ${files.length} HTML files.`);
console.log(broken ? `FAILED: ${broken} broken internal link(s).` : "OK: 0 broken internal links.");
process.exit(broken ? 1 : 0);
