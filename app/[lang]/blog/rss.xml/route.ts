import { getPostMetas, isTranslated, type Locale } from "@/lib/blog";
import { siteConfig } from "@/lib/siteConfig";
import { getUi } from "@/lib/blogUi";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const ui = getUi(lang);
  // Only published posts: untranslated locales fall back to English in the page, so keep them out of the feed.
  const posts = getPostMetas(lang).filter((p) => isTranslated(lang, p.slug));

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${siteConfig.url}/${lang}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${siteConfig.url}/${lang}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} - ${esc(ui.blog)}</title>
    <link>${siteConfig.url}/${lang}/blog/</link>
    <description>${esc(ui.subtitle)}</description>
    <language>${lang}</language>
    <atom:link href="${siteConfig.url}/${lang}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
