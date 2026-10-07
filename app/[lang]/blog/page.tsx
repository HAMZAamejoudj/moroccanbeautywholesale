import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarqueeBand } from "@/components/MarqueeBand";
import { GetPriceListSection } from "@/components/GetPriceListSection";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getPostMetas, type Locale } from "@/lib/blog";
import { getUi } from "@/lib/blogUi";
import { siteConfig } from "@/lib/siteConfig";
import { buildPageMetadata, type SeoLocale } from "@/lib/seo";
import { getDictionary } from "../../dictionaries";

const seo: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Wholesale Guides for Buyers | Moroccan Beauty Wholesale Blog",
    description:
      "Practical guides on buying argan oil, black soap and rhassoul in bulk, launching a private label brand and importing Moroccan cosmetics.",
  },
  fr: {
    title: "Guides pour acheteurs en gros | Blog Moroccan Beauty Wholesale",
    description:
      "Guides pratiques pour acheter en gros huile d'argan, savon noir et rhassoul, lancer une marque privée et importer des cosmétiques marocains.",
  },
  ar: {
    title: "أدلة المشترين بالجملة | مدونة Moroccan Beauty Wholesale",
    description: "أدلة عملية لشراء زيت الأركان والصابون الأسود والغاسول بالجملة وإطلاق علامة خاصة واستيراد مستحضرات التجميل المغربية.",
  },
};

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const base = buildPageMetadata({
    lang: lang as SeoLocale,
    segments: ["blog"],
    title: seo[lang].title,
    description: seo[lang].description,
    ogImage: {
      path: "/images/blog/wholesale-argan-oil-guide-og.jpg",
      alt: seo[lang].title,
    },
  });
  return {
    ...base,
    title: { absolute: seo[lang].title },
    alternates: {
      ...base.alternates,
      types: { "application/rss+xml": `${siteConfig.url}/${lang}/blog/rss.xml` },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const ui = getUi(lang);

  const posts = getPostMetas(lang).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    categorySlug: p.categorySlug,
    date: p.date,
    readingTime: p.readingTime,
    coverAlt: p.coverAlt,
  }));

  return (
    <div className="min-h-screen bg-white text-deep-brown">
      <Header />

      <main>
        <section className="px-4 pb-10 pt-12 text-center sm:px-8 lg:pb-12 lg:pt-16">
          <h1 className="font-serif text-4xl font-bold leading-tight text-deep-brown sm:text-5xl">{ui.h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-warm-secondary sm:text-lg">{ui.subtitle}</p>
        </section>

        <MarqueeBand dict={dict.marquee} />

        <BlogIndex posts={posts} lang={lang} />

        <GetPriceListSection
          lang={lang}
          dict={{
            title: ui.closing.title,
            description: ui.closing.description,
            primaryCta: ui.ctaPrice,
            secondaryCta: ui.ctaWhatsapp,
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
