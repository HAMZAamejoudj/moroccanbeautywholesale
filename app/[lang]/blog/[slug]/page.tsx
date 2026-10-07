import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { FaqAccordion } from "@/components/blog/FaqAccordion";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { PostCard } from "@/components/blog/PostCard";
import { BlogJsonLd } from "@/components/blog/BlogJsonLd";
import { LOCALES, getAllSlugs, getPost, getPostMetas, isTranslated, ogSrc, coverSrc, type Locale } from "@/lib/blog";
import { formatDate, getUi } from "@/lib/blogUi";
import { siteConfig } from "@/lib/siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getAllSlugs().map((slug) => ({ lang, slug })));
}

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(lang, slug);
  if (!post) return {};

  // Untranslated (draft) locales point to the English page and are not offered as hreflang alternates.
  const urlFor = (l: Locale) => `${siteConfig.url}/${l}/blog/${slug}/`;
  const canonical = urlFor(post.contentLocale);
  const languages: Record<string, string> = { en: urlFor("en") };
  for (const l of ["fr", "ar"] as const) if (isTranslated(l, slug)) languages[l] = urlFor(l);
  languages["x-default"] = urlFor("en");

  const image = `${siteConfig.url}${ogSrc(slug)}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: siteConfig.name,
      title: post.metaTitle,
      description: post.metaDescription,
      locale: post.contentLocale === "ar" ? "ar_MA" : post.contentLocale === "fr" ? "fr_FR" : "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: image, width: 1200, height: 630, alt: post.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.metaDescription, images: [image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const post = await getPost(lang, slug);
  if (!post) notFound();

  const ui = getUi(lang);
  const url = `${siteConfig.url}/${lang}/blog/${slug}/`;
  const tocItems = [...post.toc, ...(post.faq.length ? [{ id: "faq", text: ui.faq }] : [])];

  // Related: frontmatter order first, topped up with the newest other posts (max 3)
  const all = getPostMetas(lang);
  const related = [
    ...post.related.map((s) => all.find((p) => p.slug === s)).filter((p) => !!p),
    ...all.filter((p) => p.slug !== slug && !post.related.includes(p.slug)),
  ]
    .slice(0, post.related.length >= 2 ? post.related.length : 2)
    .slice(0, 3) as typeof all;

  return (
    <div className="min-h-screen bg-white text-deep-brown">
      <Header />
      <ReadingProgress targetId="article-content" />

      <main>
        <BlogJsonLd post={post} lang={lang} url={url} blogLabel={ui.blog} homeLabel={ui.home} />

        <header className="mx-auto max-w-[1100px] px-4 pb-8 pt-8 sm:px-8">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: ui.home, href: `/${lang}/` },
              { label: ui.blog, href: `/${lang}/blog/` },
              { label: post.title },
            ]}
          />

          <span className="mt-8 inline-block rounded-full bg-sand px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-green">
            {post.category}
          </span>
          <h1 className="mt-4 max-w-4xl font-serif text-[32px] font-bold leading-[1.15] text-deep-brown sm:text-4xl lg:text-[44px]">
            {post.title}
          </h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 text-sm text-warm-secondary">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            {post.updated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {ui.updated} <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{ui.minRead(post.readingTime)}</span>
          </p>

          {post.contentLocale !== lang && (
            <p className="mt-4 inline-block rounded-md bg-sand-light px-3 py-1.5 text-xs text-warm-secondary" lang="en" dir="ltr">
              {ui.englishOnly}
            </p>
          )}

          <div className="mt-8 overflow-hidden rounded-2xl bg-sand">
            <Image
              src={coverSrc(slug)}
              alt={post.coverAlt}
              width={1280}
              height={720}
              priority
              sizes="(min-width: 1100px) 1036px, 100vw"
              className="aspect-video h-auto w-full object-cover"
            />
          </div>
        </header>

        <div className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-8 lg:grid lg:grid-cols-[minmax(0,70ch)_240px] lg:justify-between lg:gap-12">
          <article id="article-content" className="min-w-0" lang={post.contentLocale} dir={post.contentLocale === "ar" ? "rtl" : "ltr"}>
            <TableOfContents variant="mobile" items={tocItems} title={ui.inThisArticle} />

            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

            {post.faq.length > 0 && (
              <section className="mt-14">
                <h2 id="faq" className="mb-5 scroll-mt-32 font-serif text-[28px] font-bold leading-tight text-deep-brown">
                  {ui.faq}
                </h2>
                <FaqAccordion items={post.faq} />
              </section>
            )}

            <div className="mt-12">
              <ArticleCTA html={post.ctaHtml} title={post.title} lang={lang} />
            </div>

            <div className="mt-8 border-t border-hairline pt-6">
              <ShareButtons url={url} title={post.title} lang={lang} />
            </div>
          </article>

          <div lang={post.contentLocale} dir={post.contentLocale === "ar" ? "rtl" : "ltr"}>
            <TableOfContents variant="desktop" items={tocItems} title={ui.inThisArticle} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-hairline bg-sand-light py-14 lg:py-16">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-8">
              <h2 className="font-serif text-[28px] font-bold text-deep-brown">{ui.related}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} as="h3" lang={lang} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
