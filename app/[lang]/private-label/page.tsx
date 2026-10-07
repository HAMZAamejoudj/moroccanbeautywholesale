import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BadgeCheck,
  Bath,
  Building2,
  CheckCircle2,
  Factory,
  Globe,
  Hotel,
  Layers,
  LayoutGrid,
  Package,
  Palette,
  ShieldCheck,
  Smartphone,
  Sprout,
  Stamp,
  Store,
  Tag,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { MarqueeBand } from "@/components/MarqueeBand";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PrivateLabelIngredients } from "@/components/PrivateLabelIngredients";
import { siteConfig } from "@/lib/siteConfig";

import { getDictionary } from "../../dictionaries";

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  shieldCheck: ShieldCheck,
  stamp: Stamp,
  building2: Building2,
  layers: Layers,
  sprout: Sprout,
  globe: Globe,
  smartphone: Smartphone,
  bath: Bath,
  hotel: Hotel,
  store: Store,
  tag: Tag,
  package: Package,
  layoutGrid: LayoutGrid,
  badgeCheck: BadgeCheck,
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
    title: dict.privateLabel.seo.title,
    description: dict.privateLabel.seo.description,
  };
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export default async function PrivateLabelPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const pl = dict.privateLabel;
  const heroWaMessage =
    pl.hero.whatsappMessage ?? pl.cta.whatsappMessage ?? "";
  const ctaWaMessage = pl.cta.whatsappMessage ?? heroWaMessage;
  const emailSubject = pl.cta.emailSubject ?? "Private label enquiry";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-argan/20">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative flex items-center justify-center pt-28 pb-8 sm:pb-10 min-h-[min(560px,62vh)] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/private-label-hero-jars.webp"
              alt="Unlabeled cosmetic jars and bottles ready for private label branding"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-[0.92]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-deep-brown/15 to-white/50" />
            <div className="absolute inset-0 bg-deep-brown/10" aria-hidden="true" />
          </div>
          <div className="container relative z-10 px-4 lg:px-8 py-4 sm:py-6">
            <div className="max-w-4xl mx-auto text-center space-y-4 rounded-[2rem] border border-white/75 bg-white/90 backdrop-blur-md shadow-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-argan/20 border border-argan/30 backdrop-blur-md">
                <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {pl.hero.badge}
                </span>
              </div>
              <h1 className="text-3xl lg:text-[2.65rem] xl:text-[2.85rem] font-serif font-bold leading-tight text-deep-brown text-balance">
                {pl.hero.title}{" "}
                <span className="text-terracotta">{pl.hero.titleHighlight}</span>
              </h1>
              {"subtitle" in pl.hero && pl.hero.subtitle ? (
                <p className="mx-auto max-w-[60ch] text-base sm:text-lg text-deep-brown leading-relaxed">
                  {pl.hero.subtitle}
                </p>
              ) : null}
              {"ctaWhatsApp" in pl.hero && pl.hero.ctaWhatsApp ? (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <a
                    href={whatsappUrl(heroWaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 h-12 sm:h-14 px-6 sm:px-10 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-[15px] sm:text-base font-medium transition-all shadow-sm hover:shadow w-full sm:w-auto shrink-0"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>{pl.hero.ctaWhatsApp}</span>
                  </a>
                  <Link
                    href={`/${lang}/contact/`}
                    className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-9 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown text-[15px] sm:text-base font-medium transition-colors bg-white/90 hover:bg-white w-full sm:w-auto shrink-0"
                  >
                    {pl.hero.ctaPrice}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <MarqueeBand dict={dict.marquee} />

        {/* Intro Section */}
        <section className="container px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {pl.intro.title}
              </h2>
              <div className="space-y-4 text-lg text-deep-brown leading-relaxed">
                <p>{pl.intro.p1}</p>
                <p>{pl.intro.p2}</p>
                <p className="text-base sm:text-lg text-deep-brown bg-cream-dark/20 p-4 rounded-xl border border-border">
                  {pl.intro.highlightBefore}
                  <strong className="font-semibold">{pl.intro.highlightBold}</strong>
                  {pl.intro.highlightAfter}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border/50">
                <Image
                  src="/images/private-label-intro.webp"
                  alt={
                    "imageAlt" in pl.intro
                      ? pl.intro.imageAlt
                      : "Private label packaging"
                  }
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-cream-dark/20 py-16 lg:py-24 mb-16 lg:mb-24">
          <div className="container px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-center mb-10">
              {pl.howItWorks.title}
            </h2>

            {"steps" in pl.howItWorks && pl.howItWorks.steps?.length ? (
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto mb-12 lg:mb-14 list-none">
                {pl.howItWorks.steps.map(
                  (step: { title: string; desc: string }, idx: number) => (
                    <li
                      key={step.title}
                      className="relative flex flex-col rounded-xl border border-[#E3DACD] border-s-[3px] border-s-brand-green bg-[#F1EBE1]/35 ps-6 pe-5 py-7 lg:py-8 min-h-[176px] lg:min-h-[200px] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span
                        className="font-serif text-2xl lg:text-[1.65rem] font-bold text-brand-green leading-none mb-4 tabular-nums"
                        aria-hidden="true"
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-lg lg:text-xl font-bold text-foreground leading-snug mb-2.5">
                        <span className="sr-only">
                          {idx + 1}.{" "}
                        </span>
                        {step.title}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] text-deep-brown leading-relaxed mt-auto">
                        {step.desc}
                      </p>
                    </li>
                  ),
                )}
              </ol>
            ) : null}

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-12 h-12 bg-argan/20 rounded-2xl flex items-center justify-center mb-3">
                  <Palette className="w-6 h-6 text-brand-green" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {pl.howItWorks.youProvide.title}
                </h3>
                <ul className="space-y-4">
                  {pl.howItWorks.youProvide.items.map(
                    (item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-terracotta shrink-0 mt-0.5" />
                        <span className="text-deep-brown">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-12 h-12 bg-olive/20 rounded-2xl flex items-center justify-center mb-3">
                  <Factory className="w-6 h-6 text-brand-green" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {pl.howItWorks.weProvide.title}
                </h3>
                <ul className="space-y-4">
                  {pl.howItWorks.weProvide.items.map(
                    (item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-olive shrink-0 mt-0.5" />
                        <span className="text-deep-brown">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits of Private Labeling */}
        <section className="container px-4 lg:px-8 mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-center mb-12">
            {pl.benefits.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pl.benefits.items.map(
              (item: { title: string; desc: string; icon?: string }, idx: number) => {
                const Icon =
                  (item.icon && ICON_MAP[item.icon]) || CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="bg-cream-dark/20 p-6 rounded-2xl border border-border flex flex-col gap-3"
                  >
                    <Icon
                      className="w-8 h-8 text-brand-green shrink-0"
                      strokeWidth={2}
                    />
                    <h3 className="font-bold text-xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-deep-brown">{item.desc}</p>
                  </div>
                );
              },
            )}
          </div>
        </section>

        {/* Ingredients */}
        <section id="ingredients-catalog" className="container px-4 lg:px-8 mb-16 lg:mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold">
                {pl.ingredients.title}
              </h2>
              <p className="text-lg text-deep-brown max-w-3xl mx-auto">
                {pl.ingredients.desc}
              </p>
            </div>

            {"groups" in pl.ingredients ? (
              <PrivateLabelIngredients groups={pl.ingredients.groups} lang={lang} />
            ) : null}
          </div>
        </section>

        {/* Who Can Launch & Our Services */}
        <section className="bg-argan/10 py-16 lg:py-24 mb-16 lg:mb-24">
          <div className="container px-4 lg:px-8">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold">
                  {pl.audience.title}
                </h2>
                <p className="text-lg text-deep-brown">{pl.audience.desc}</p>
                <div className="grid gap-4">
                  {pl.audience.items.map(
                    (
                      item: { title: string; desc: string; icon?: string },
                      idx: number,
                    ) => {
                      const Icon =
                        (item.icon && ICON_MAP[item.icon]) || CheckCircle2;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border shadow-sm"
                        >
                          <Icon
                            className="w-6 h-6 text-brand-green shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          <div>
                            <strong className="block text-foreground mb-1">
                              {item.title}
                            </strong>
                            <span className="text-sm text-deep-brown">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold">
                  {pl.services.title}
                </h2>
                <div className="grid gap-4">
                  {pl.services.items.map(
                    (
                      item: { title: string; desc: string; icon?: string },
                      idx: number,
                    ) => {
                      const Icon =
                        (item.icon && ICON_MAP[item.icon]) || CheckCircle2;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border shadow-sm"
                        >
                          <Icon
                            className="w-6 h-6 text-brand-green shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          <div>
                            <strong className="block text-foreground mb-1">
                              {item.title}
                            </strong>
                            <span className="text-sm text-deep-brown">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container px-4 lg:px-8 mb-16 lg:mb-24">
          <div className="w-full max-w-6xl mx-auto border border-border bg-cream-dark/25 rounded-lg overflow-hidden">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-0">
              <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 text-center lg:text-start flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-foreground">
                  {pl.cta.title}
                </h2>
                <p className="text-base sm:text-lg text-deep-brown leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {pl.cta.desc}
                </p>
              </div>
              <div className="px-6 pb-10 sm:px-10 sm:pb-12 lg:px-12 lg:py-14 bg-background/80 border-t lg:border-t-0 lg:border-s border-border flex flex-col justify-center gap-6">
                <div className="text-start max-w-md mx-auto lg:mx-0 w-full">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">
                    {pl.cta.contactTitle}
                  </h3>
                  <ul className="space-y-3">
                    {pl.cta.contactItems.map((item: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-deep-brown text-[15px] sm:text-base"
                      >
                        <CheckCircle2 className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-2.5 sm:gap-3 justify-center lg:justify-start max-w-md mx-auto lg:mx-0 w-full">
                  <a
                    href={whatsappUrl(ctaWaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-sm font-medium transition-all shadow-sm hover:shadow shrink-0"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                    <span className="whitespace-nowrap">{pl.cta.whatsapp}</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(emailSubject)}`}
                    className="inline-flex items-center justify-center h-10 sm:h-11 px-4 sm:px-5 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown text-sm font-medium transition-colors bg-background shrink-0 whitespace-nowrap"
                  >
                    {pl.cta.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
