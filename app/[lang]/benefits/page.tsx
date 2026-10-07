import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { MarqueeBand } from "@/components/MarqueeBand";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";

import { getDictionary } from "../../dictionaries";

type BenefitItem = { title: string; desc: string };

type Ingredient = {
  id: string;
  title: string;
  chipLabel: string;
  description: string;
  usage: string;
  image: string;
  benefits: BenefitItem[];
  keyBenefitsLabel: string;
  usageTipsLabel: string;
};

function whatsappUrl(message: string) {
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.benefits.seo.title,
    description: dict.benefits.seo.description,
  };
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export default async function BenefitsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const ingredients = dict.benefits.ingredients as Ingredient[];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-argan/20">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative flex items-center justify-center pt-28 pb-14 sm:pb-16 lg:pb-20 min-h-[min(520px,58vh)] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 scale-105">
              <Image
                src="/images/hero-ingredients-background.webp"
                alt="Moroccan cosmetic ingredients: argan oil, argan nuts, rhassoul clay and aker fassi"
                width={1600}
                height={1600}
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-center blur-[3px]"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/60 to-white/70" />
          </div>
          <div className="container relative z-10 px-4 lg:px-8 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto text-center rounded-[2rem] border border-white/70 bg-white/85 backdrop-blur-md shadow-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold leading-tight text-deep-brown text-balance">
                {dict.benefits.hero.title}{" "}
                <span className="text-olive">{dict.benefits.hero.titleHighlight}</span>
              </h1>
              <p className="mt-4 mx-auto max-w-[60ch] text-base sm:text-lg text-deep-brown leading-relaxed">
                {dict.benefits.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href={`/${lang}/contact/`}
                  className="inline-flex items-center justify-center gap-2.5 h-12 sm:h-14 px-6 sm:px-10 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-[15px] sm:text-base font-medium transition-all shadow-sm hover:shadow text-center group w-full sm:w-auto shrink-0"
                >
                  <span>{dict.benefits.hero.ctaPrice}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-9 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown text-[15px] sm:text-base font-medium transition-colors gap-2.5 bg-white/90 hover:bg-white w-full sm:w-auto shrink-0"
                >
                  <WhatsAppIcon className="w-5 h-5 text-deep-brown" />
                  <span>{dict.benefits.hero.ctaWhatsApp}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <MarqueeBand dict={dict.marquee} />

        {/* Ingredients Grid */}
        <section className="container px-4 lg:px-8 mb-16 lg:mb-24 mt-16">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {ingredients.map((ingredient) => (
              <article
                key={ingredient.id}
                id={ingredient.id}
                className="bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-elevated transition-shadow flex flex-col group h-full scroll-mt-32"
              >
                <div className="relative w-full overflow-hidden shrink-0 leading-none">
                  <Image
                    src={ingredient.image}
                    alt={ingredient.title}
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <h2 className="text-xl lg:text-2xl font-serif font-bold text-foreground mb-3">
                    {ingredient.title}
                  </h2>
                  <p className="text-warm-secondary text-sm leading-relaxed mb-4">
                    {ingredient.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-bold text-[13px] text-foreground uppercase tracking-wider">
                      {ingredient.keyBenefitsLabel}
                    </h3>
                    <ul className="space-y-2">
                      {ingredient.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                          <span className="text-warm-secondary leading-relaxed">
                            <strong className="text-foreground">{benefit.title}:</strong>{" "}
                            {benefit.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/50">
                    <p className="text-sm leading-relaxed">
                      <span className="font-bold text-foreground">
                        {ingredient.usageTipsLabel}
                      </span>{" "}
                      <span className="text-warm-secondary">{ingredient.usage}</span>
                    </p>
                  </div>

                  <a
                    href={whatsappUrl(
                      dict.benefits.whatsappPriceMessage.replace(
                        "{name}",
                        ingredient.chipLabel,
                      ),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-forest transition-colors"
                  >
                    <span>{dict.benefits.askPriceCta}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Additional Info Sections */}
        <section className="container px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {dict.benefits.whyEssential.title}
              </h2>
              <p className="text-lg text-warm-secondary leading-relaxed">
                {dict.benefits.whyEssential.desc}
              </p>
              <ul className="space-y-4">
                {dict.benefits.whyEssential.items.map(
                  (item: { title: string; desc: string }, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-cream-dark/30 border border-border"
                    >
                      <CheckCircle2 className="w-6 h-6 text-terracotta shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-foreground mb-1">{item.title}</strong>
                        <span className="text-warm-secondary text-[15px] sm:text-base leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {dict.benefits.applications.title}
              </h2>
              <p className="text-lg text-warm-secondary leading-relaxed">
                {dict.benefits.applications.desc}
              </p>
              <ul className="space-y-4">
                {dict.benefits.applications.items.map(
                  (item: { title: string; desc: string }, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-cream-dark/30 border border-border"
                    >
                      <CheckCircle2 className="w-6 h-6 text-terracotta shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-foreground mb-1">{item.title}</strong>
                        <span className="text-warm-secondary text-[15px] sm:text-base leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Bulk */}
        <section className="bg-argan/10 py-16 lg:py-24">
          <div className="container px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-serif font-bold text-foreground">
                  {dict.benefits.bulk.title}
                </h2>
                <p className="text-lg text-warm-secondary leading-relaxed">
                  {dict.benefits.bulk.desc}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {dict.benefits.bulk.highlights.map((highlight: string) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/95 border border-olive/20 text-xs sm:text-[13px] font-medium text-deep-brown shadow-soft"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <Link
                    href={`/${lang}/contact/`}
                    className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-[15px] sm:text-[16px] font-medium transition-all shadow-sm hover:shadow text-center group w-full sm:w-auto"
                  >
                    <span>{dict.benefits.bulk.ctaPrice}</span>
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                  <Link
                    href={`/${lang}/private-label/`}
                    className="inline-flex items-center justify-center h-13 px-7 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown text-[15px] sm:text-[16px] font-medium transition-colors gap-2.5 bg-white/70 hover:bg-white w-full sm:w-auto"
                  >
                    {dict.benefits.bulk.ctaPrivateLabel}
                  </Link>
                </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
