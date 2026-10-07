// npm run check:content
// Fails if any built page (EN/FR/AR) contains an unconfirmed claim: certifications, "COA provided", etc.
import fs from "fs";
import { htmlFiles, rel, scannableText } from "./lib/html.mjs";

import { RULES } from "./lib/claims.mjs";

// Allowances: regex on the page path -> terms that may appear there (e.g. blog articles that explain what a COA is).
const ALLOW = JSON.parse(fs.readFileSync(new URL("./content-allowlist.json", import.meta.url), "utf8"));
delete ALLOW._note;

let failures = 0;
const files = htmlFiles();
for (const f of files) {
  const name = rel(f);
  const text = scannableText(fs.readFileSync(f, "utf8"));
  const found = new Map();
  const allowed = Object.entries(ALLOW).flatMap(([pattern, terms]) => (new RegExp(pattern).test(name) ? terms : []));
  for (const [label, re] of RULES) {
    const m = text.match(new RegExp(re.source, re.flags.replace("g", "") + "g"));
    if (!m) continue;
    const hits = [...new Set(m.map((x) => x.trim()))].filter(
      (h) => !allowed.some((a) => h.toLowerCase().includes(a.toLowerCase())),
    );
    if (hits.length) found.set(label, hits.slice(0, 4));
  }
  if (found.size) {
    failures += found.size;
    console.log(`✗ ${name}`);
    for (const [label, hits] of found) console.log(`    ${label}: ${hits.map((h) => JSON.stringify(h)).join(", ")}`);
  }
}
console.log(`\nScanned ${files.length} HTML files with ${RULES.length} rules.`);
if (failures) {
  console.log(`FAILED: ${failures} banned claim type(s) found.`);
  process.exit(1);
}
console.log("OK: no banned claims found.");
