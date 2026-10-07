import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getDictionary } from "../../dictionaries";
import { buildPageMetadata, type SeoLocale } from "@/lib/seo";

import { AboutBreadcrumb } from "@/components/AboutBreadcrumb";
import { AboutHero } from "@/components/AboutHero";
import { AboutWhyStarted } from "@/components/AboutWhyStarted";
import { AboutFactory } from "@/components/AboutFactory";
import { AboutWhatWeDo } from "@/components/AboutWhatWeDo";
import { AboutExpectations } from "@/components/AboutExpectations";
import { AboutFAQ } from "@/components/AboutFAQ";
import { AboutCTA } from "@/components/AboutCTA";
import { AboutStructuredData } from "@/components/AboutStructuredData";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return buildPageMetadata({
    lang: lang as SeoLocale,
    segments: ["about"],
    title: dict.about.seo.title,
    description: dict.about.seo.description,
    ogImage: {
      path: "/images/about-hero.webp",
      alt: dict.about.seo.title,
    },
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white text-deep-brown flex flex-col justify-between">
      <Header />

      <main className="flex-grow">
        {/* 1. Breadcrumb: Home / About, small, muted */}
        <AboutBreadcrumb dict={dict.about.breadcrumb} lang={lang} />

        {/* 2. Hero: split 7/5 */}
        <AboutHero dict={dict.about.hero} lang={lang} />

        {/* 3. Why We Started This Service: editorial text block with serif pull-quote */}
        <AboutWhyStarted dict={dict.about.whyStarted} />

        {/* 4. Our Factory in Agadir: 2 cols, text left, photo grid right */}
        <AboutFactory dict={dict.about.factory} />

        {/* 5. What We Do for You: two-column list with hairline separators */}
        <AboutWhatWeDo dict={dict.about.whatWeDo} />

        {/* 6. What You Can Expect From Us: 4 blocks in 2x2 grid with 01-04 numbers and H3 */}
        <AboutExpectations dict={dict.about.expectations} />

        {/* 7. FAQ: two-column layout matching homepage with H3 questions */}
        <AboutFAQ dict={dict.about.faq} />

        {/* 8. Final CTA: wide sand card frame matching homepage */}
        <AboutCTA dict={dict.about.cta} lang={lang} />
      </main>

      <Footer />

      {/* JSON-LD Schemas: AboutPage + Organization + BreadcrumbList + FAQPage */}
      <AboutStructuredData lang={lang} dict={dict.about} />
    </div>
  );
}
