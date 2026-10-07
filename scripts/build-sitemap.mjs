// Regenerates the blog entries in public/sitemap.xml from /content/blog.
// Run automatically before `next build` (see package.json "prebuild").
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = path.resolve(import.meta.dirname, "..");
const base = "https://www.moroccanbeautywholesale.com";
const sitemapPath = path.join(root, "public/sitemap.xml");

const read = (lang, file) => matter(fs.readFileSync(path.join(root, "content/blog", lang, file), "utf8")).data;
const files = fs.readdirSync(path.join(root, "content/blog/en")).filter((f) => f.endsWith(".md"));
const posts = files.map((f) => ({ file: f, slug: f.replace(/\.md$/, ""), ...read("en", f) }));
const dateOf = (d) => String(d).slice(0, 10);
const translated = (lang, f) => {
  const p = path.join(root, "content/blog", lang, f);
  return fs.existsSync(p) && matter(fs.readFileSync(p, "utf8")).data.draft !== true;
};

const latest = posts.map((p) => dateOf(p.updated ?? p.date)).sort().pop();
const alt = (hreflang, href) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;

let xml = fs.readFileSync(sitemapPath, "utf8");
// strip previous blog entries and our marker comment
xml = xml.replace(/\s*<!-- Blog -->/g, "").replace(/\s*<url>\s*<loc>[^<]*\/blog\/[^<]*<\/loc>[\s\S]*?<\/url>/g, "");

const out = ["\n  <!-- Blog -->"];
for (const l of ["en", "fr", "ar"]) {
  out.push(`  <url>
    <loc>${base}/${l}/blog/</loc>
${alt("en", `${base}/en/blog/`)}
${alt("fr", `${base}/fr/blog/`)}
${alt("ar", `${base}/ar/blog/`)}
${l === "en" ? alt("x-default", `${base}/en/blog/`) + "\n" : ""}    <lastmod>${latest}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
}
for (const p of posts) {
  const langs = ["en", ...["fr", "ar"].filter((l) => translated(l, p.file))];
  for (const l of langs) {
    out.push(`  <url>
    <loc>${base}/${l}/blog/${p.slug}/</loc>
${langs.map((x) => alt(x, `${base}/${x}/blog/${p.slug}/`)).join("\n")}
${alt("x-default", `${base}/en/blog/${p.slug}/`)}
    <lastmod>${dateOf(p.updated ?? p.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  }
}
xml = xml.replace("</urlset>", out.join("\n") + "\n\n</urlset>");
fs.writeFileSync(sitemapPath, xml);
console.log(`sitemap: ${posts.length} posts, blog index + posts written`);
