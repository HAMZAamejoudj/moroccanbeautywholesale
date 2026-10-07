import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface AboutCTAProps {
  dict: {
    title: string;
    description: string;
    ctaPrice: string;
    ctaWhatsApp: string;
  };
  lang: string;
}

export function AboutCTA({ dict, lang }: AboutCTAProps) {
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-brand-green text-white py-16 lg:py-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title: H2 */}
          <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-white leading-[1.15] mb-4">
            {dict.title}
          </h2>

          {/* Description */}
          <p className="text-[17px] sm:text-[19px] text-white/85 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            {dict.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/contact/`}
              className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-lg bg-sand-light hover:bg-sand text-deep-brown text-[15px] sm:text-[16px] font-semibold transition-all shadow-sm hover:shadow text-center group w-full sm:w-auto"
            >
              <span>{dict.ctaPrice}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-13 px-7 rounded-lg border border-white/30 hover:border-white text-white text-[15px] sm:text-[16px] font-medium transition-colors gap-2.5 bg-white/10 hover:bg-white/20 w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>{dict.ctaWhatsApp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
