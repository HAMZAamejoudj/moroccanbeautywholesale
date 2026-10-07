import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface AboutHeroProps {
  dict: {
    h1: string;
    intro: string;
    ctaPrice: string;
    ctaWhatsApp: string;
    fallbackSandLine: string;
  };
  lang: string;
}

export function AboutHero({ dict, lang }: AboutHeroProps) {
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-white pt-6 pb-16 lg:pt-10 lg:pb-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column (7 cols): H1, intro paragraph, two buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.1] font-bold text-deep-brown tracking-tight mb-6">
              {dict.h1}
            </h1>

            <p className="text-[17px] sm:text-[19px] text-warm-secondary leading-[1.68] max-w-2xl mb-9">
              {dict.intro}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact/`}
                className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-[15px] sm:text-[16px] font-medium transition-all shadow-sm hover:shadow text-center group"
              >
                <span>{dict.ctaPrice}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-13 px-7 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown text-[15px] sm:text-[16px] font-medium transition-colors gap-2.5 bg-white/70 hover:bg-white"
              >
                <WhatsAppIcon className="w-5 h-5 text-deep-brown" />
                <span>{dict.ctaWhatsApp}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): One real photo, rounded-2xl, aspect 4:5, eager loading */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-sand-light shadow-sm">
              <Image
                src="/images/about-hero.webp"
                alt="Moroccan Beauty Wholesale production and workshop"
                width={899}
                height={1599}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
