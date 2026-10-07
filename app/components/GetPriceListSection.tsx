import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface GetPriceListSectionProps {
  dict: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  lang: string;
}

export function GetPriceListSection({ dict, lang }: GetPriceListSectionProps) {
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const badges = [
    {
      icon: ShieldCheck,
      text:
        lang === "ar"
          ? "أقل كمية 50 قطعة"
          : lang === "fr"
          ? "MOQ dès 50 pièces"
          : "MOQ from 50 pieces",
    },
    {
      icon: Clock,
      text:
        lang === "ar"
          ? "رد خلال 24 ساعة"
          : lang === "fr"
          ? "Réponse sous 24h"
          : "Reply within 24h",
    },
    {
      icon: CheckCircle2,
      text:
        lang === "ar"
          ? "خيارات الشحن والجمارك مشمولة"
          : lang === "fr"
          ? "Options de transport incluses"
          : "Shipping and freight options included",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-[#E3DACD]">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Wide Rectangular Card Frame (Cadre Mostatil) */}
        <div className="max-w-5xl xl:max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border border-[#E3DACD] bg-[#FAF7F2] px-6 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-14 text-center shadow-md shadow-[#2A211C]/5 relative overflow-hidden">
          {/* Subtle Decorative Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-28 bg-[#284B35]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Title */}
          <h2 className="relative font-serif text-[32px] sm:text-[38px] lg:text-[44px] font-bold text-[#2A211C] leading-[1.15] mb-3.5 max-w-3xl mx-auto">
            {dict.title}
          </h2>

          {/* Description */}
          <p className="relative text-[16px] sm:text-[18px] text-[#5E534B] leading-[1.65] max-w-3xl mx-auto mb-7">
            {dict.description}
          </p>

          {/* Micro Trust Badges Row */}
          <div className="relative flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 mb-7 pb-6 border-b border-[#E3DACD]/70">
            {badges.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#73655A] bg-white/95 border border-[#E3DACD] px-3.5 py-1.5 rounded-full shadow-2xs"
                >
                  <Icon className="w-4 h-4 text-[#284B35]" />
                  <span>{b.text}</span>
                </div>
              );
            })}
          </div>

          {/* Centered CTA Action Buttons */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <Link
              href={`/${lang}/contact/`}
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-xl bg-[#284B35] hover:bg-[#1E3827] text-white text-[15px] sm:text-[16px] font-medium transition-all shadow-md hover:shadow-lg gap-2 text-center"
            >
              <span>{dict.primaryCta}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 rounded-xl border border-[#3A2A22]/20 hover:border-[#3A2A22] bg-white text-[#2A211C] text-[15px] sm:text-[16px] font-medium transition-all gap-2.5 shadow-2xs hover:shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#284B35]" />
              <span>{dict.secondaryCta}</span>
            </a>
          </div>

          {/* Footnote under buttons */}
          <p className="relative mt-4 text-xs text-[#73655A]">
            {lang === "ar"
              ? "بدون أي التزام مسبق · استشارة وتأكيد الأسعار مباشرة عبر واتساب"
              : lang === "fr"
              ? "Sans engagement · Devis gratuit et consultation directe sur WhatsApp"
              : "No commitment required · Free quote and direct consultation on WhatsApp"}
          </p>
        </div>
      </div>
    </section>
  );
}
