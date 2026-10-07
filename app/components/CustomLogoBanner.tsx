import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CustomLogoBannerProps {
  dict: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    image: string;
  };
  lang: string;
}

export function CustomLogoBanner({ dict, lang }: CustomLogoBannerProps) {
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-[#24362A] text-[#FAF7F2] py-20 lg:py-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols): Text + Button */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#FAF7F2] leading-[1.15] mb-6">
              {dict.title}
            </h2>
            <p className="text-[17px] sm:text-[18px] text-[#D8E0D9] leading-[1.65] max-w-xl mb-8">
              {dict.description}
            </p>
            <div>
              <Link
                href={`/${lang}${dict.href}`}
                className="inline-flex items-center gap-2.5 h-12 px-7 rounded-lg bg-[#3D6B49] hover:bg-[#345B3E] text-white text-[15px] font-medium transition-colors shadow-sm"
              >
                <span>{dict.buttonText}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Photo of labelled product */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#1A281E] border border-[#3A5040]">
              <Image
                src={dict.image || "/images/private-label-showcase.webp"}
                alt="Finished cosmetics with custom brand labels and elegant packaging"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
