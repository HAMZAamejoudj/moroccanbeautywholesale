import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface HeroProps {
  dict: {
    h1: string;
    subtitle: string;
    ctaPrice: string;
    ctaWhatsApp: string;
    trustFacts: string[];
  };
  lang: string;
}

export function Hero({ dict, lang }: HeroProps) {
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const moqBadge =
    lang === "ar"
      ? "الحد الأدنى: 50 قطعة"
      : lang === "fr"
      ? "MOQ dès 50 pièces"
      : "MOQ: From 50 pcs";

  const cardTitle =
    lang === "ar"
      ? "جاهزة للعرض وإعادة البيع"
      : lang === "fr"
      ? "Prêt pour vos rayons et spas"
      : "Ready for Retail and Spas";

  const cardSubtitle =
    lang === "ar"
      ? "تعبئة وتغليف في ورش أكادير"
      : lang === "fr"
      ? "Production et conditionnement à Agadir"
      : "Bottled and packed in Agadir";

  return (
    <section className="bg-white pt-12 pb-16 lg:pt-20 lg:pb-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column (7 cols on lg, 6 on xl): Headlines, CTAs, Trust Grid */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            <h1 className="font-serif text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[62px] leading-[1.08] font-bold text-[#2A211C] tracking-tight mb-6 max-w-2xl">
              {dict.h1}
            </h1>

            <p className="text-[17px] sm:text-[19px] text-[#5E534B] leading-[1.65] max-w-2xl mb-9">
              {dict.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href={`/${lang}/contact/`}
                className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-lg bg-[#284B35] hover:bg-[#1E3827] text-white text-[15px] sm:text-[16px] font-medium transition-all shadow-sm hover:shadow text-center group"
              >
                <span>{dict.ctaPrice}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-13 px-7 rounded-lg border border-[#3A2A22]/25 hover:border-[#3A2A22] text-[#2A211C] text-[15px] sm:text-[16px] font-medium transition-colors gap-2.5 bg-white/70 hover:bg-white"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#2A211C]" />
                <span>{dict.ctaWhatsApp}</span>
              </a>
            </div>

            {/* Structured 4-item Trust Grid (Spreads out across wide screens) */}
            <div>
              <div className="grid grid-cols-2 gap-3 max-w-2xl">
                {dict.trustFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-white/80 border border-[#E3DACD] text-xs sm:text-[13px] text-[#2A211C] font-medium leading-snug shadow-xs hover:border-[#284B35]/40 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#284B35] shrink-0 mt-1.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols on lg, 6 on xl): Real Workshop Showcase + Overlapping Production Card */}
          <div className="lg:col-span-5 xl:col-span-6 relative mt-6 lg:mt-0">
            {/* Main Visual Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#F1EBE1] border border-[#E3DACD] shadow-lg group">
              <Image
                src="/images/hero-products-showcase.webp"
                alt="Moroccan beauty wholesale products: argan oil bottles, prickly pear oil, black soap jars, ghassoul clay, and cosmetic serums ready to sell"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Top Corner Floating MOQ Badge */}
              <div
                className={`absolute top-4 ${
                  isRtl ? "left-4" : "right-4"
                } z-10 bg-white/95 backdrop-blur-md border border-[#E3DACD] rounded-full px-4 py-1.5 shadow-sm flex items-center gap-2`}
              >
                <span className="w-2 h-2 rounded-full bg-[#284B35]" />
                <span className="text-xs font-bold text-[#2A211C] tracking-wide">
                  {moqBadge}
                </span>
              </div>
            </div>

            {/* Overlapping Bottom Card: Proves authentic batch packaging in Morocco */}
            <div
              className={`mt-4 sm:mt-0 sm:absolute sm:-bottom-6 ${
                isRtl ? "sm:-right-6" : "sm:-left-6"
              } z-20 bg-white/95 backdrop-blur-md rounded-xl border border-[#E3DACD] p-3.5 shadow-xl flex items-center gap-3.5 max-w-[310px]`}
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#E3DACD] bg-[#F1EBE1]">
                <Image
                  src="/images/hero-batch-workshop.webp"
                  alt="Production batch of Moroccan cosmetic jars in workshop"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#2A211C] leading-snug truncate">
                  {cardTitle}
                </p>
                <p className="text-[11px] text-[#5E534B] leading-tight mt-0.5 truncate">
                  {cardSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
