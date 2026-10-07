// Generates public/sitemap.xml (runs before `next build`, see package.json "prebuild").
// - non-www, trailing slash, xhtml:link alternates (en, fr, ar, x-default) on every URL
// - lastmod = real modification date of the page source (or the post's frontmatter date), not the build date
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = path.resolve(import.meta.dirname, "..");
const BASE = "https://moroccanbeautywholesale.com";
const LANGS = ["en", "fr", "ar"];

const day = (d) => new Date(d).toISOString().slice(0, 10);
const mtime = (rel) => day(fs.statSync(path.join(root, rel)).mtime);

// [path segment, page source file, changefreq, priority]
const pages = [
  ["", "app/[lang]/page.tsx", "weekly", "1.0"],
  ["about", "app/[lang]/about/page.tsx", "monthly", "0.8"],
  ["benefits", "app/[lang]/benefits/page.tsx", "monthly", "0.8"],
  ["private-label", "app/[lang]/private-label/page.tsx", "monthly", "0.8"],
  ["contact", "app/[lang]/contact/page.tsx", "monthly", "0.8"],
];

const urlFor = (lang, segment) => `${BASE}/${lang}/${segment ? segment + "/" : ""}`;
const alt = (hreflang, href) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;

function entry({ loc, langs, segment, lastmod, changefreq, priority }) {
  const links = [...langs.map((l) => alt(l, urlFor(l, segment))), alt("x-default", urlFor("en", segment))].join("\n");
  return `  <url>
    <loc>${loc}</loc>
${links}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const out = [];

for (const [segment, src, changefreq, priority] of pages) {
  const lastmod = mtime(src);
  out.push(`  <!-- ${segment || "home"} -->`);
  for (const l of LANGS) out.push(entry({ loc: urlFor(l, segment), langs: LANGS, segment, lastmod, changefreq, priority }));
}

// Blog
const readPost = (lang, file) => {
  const p = path.join(root, "content/blog", lang, file);
  return fs.existsSync(p) ? matter(fs.readFileSync(p, "utf8")).data : null;
};
const files = fs.readdirSync(path.join(root, "content/blog/en")).filter((f) => f.endsWith(".md"));
const posts = files.map((f) => ({ file: f, slug: f.replace(/\.md$/, ""), ...readPost("en", f) }));
const latestPost = posts.map((p) => day(p.updated ?? p.date)).sort().pop();

out.push("  <!-- blog -->");
for (const l of LANGS) {
  out.push(entry({ loc: urlFor(l, "blog"), langs: LANGS, segment: "blog", lastmod: latestPost, changefreq: "weekly", priority: "0.7" }));
}
for (const p of posts) {
  // a language is listed only when a published (non-draft) translation exists
  const langs = ["en", ...["fr", "ar"].filter((l) => {
    const t = readPost(l, p.file);
    return t && t.draft !== true;
  })];
  for (const l of langs) {
    out.push(
      entry({
        loc: urlFor(l, `blog/${p.slug}`),
        langs,
        segment: `blog/${p.slug}`,
        lastmod: day(p.updated ?? p.date),
        changefreq: "monthly",
        priority: "0.6",
      }),
    );
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${out.join("\n")}

</urlset>
`;
fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(`sitemap: ${out.filter((l) => l.includes("<loc>")).length} URLs written`);
