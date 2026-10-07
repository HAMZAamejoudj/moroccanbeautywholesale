import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CardItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  image?: string;
}

interface WhoItIsForProps {
  dict: {
    title: string;
    intro: string;
    cards: CardItem[];
  };
  lang: string;
}

export function WhoItIsFor({ dict, lang }: WhoItIsForProps) {
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#2A211C] leading-[1.15] mb-4">
            {dict.title}
          </h2>
          <p className="text-[17px] text-[#5E534B] leading-relaxed">
            {dict.intro}
          </p>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {dict.cards.map((card) => (
            <article
              key={card.id}
              className="group flex flex-col rounded-xl border border-[#E3DACD] bg-[#F1EBE1]/40 overflow-hidden transition-all duration-200 hover:border-[#3A2A22]/30"
            >
              {/* Card Visual: Photo or Editorial Sand block */}
              {card.image ? (
                <div className="relative aspect-[4/3] w-full bg-[#F1EBE1] overflow-hidden border-b border-[#E3DACD]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-[#F1EBE1] border-b border-[#E3DACD] p-8 flex flex-col justify-end">
                  <span className="font-serif text-[28px] sm:text-[32px] font-bold text-[#3A2A22]/80 leading-tight">
                    {card.title}
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-[22px] font-bold text-[#2A211C] mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-[#5E534B] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={`/${lang}${card.href}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#284B35] hover:text-[#1E3827] transition-colors group/link"
                  >
                    <span className="underline underline-offset-4">{card.linkText}</span>
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
