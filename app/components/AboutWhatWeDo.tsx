import {
  PackageCheck,
  Layers,
  Tag,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface WhatWeDoItem {
  lead: string;
  text: string;
}

interface AboutWhatWeDoProps {
  dict: {
    title: string;
    items: WhatWeDoItem[];
  };
}

export function AboutWhatWeDo({ dict }: AboutWhatWeDoProps) {
  const icons: LucideIcon[] = [
    PackageCheck,
    Layers,
    Tag,
    FileText,
    ShieldCheck,
  ];

  const firstThree = dict.items.slice(0, 3);
  const lastTwo = dict.items.slice(3, 5);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Heading */}
        <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-deep-brown leading-[1.15] mb-12 lg:mb-16">
          {dict.title}
        </h2>

        {/* Balanced 3 + 2 Cards Grid */}
        <div className="space-y-6 lg:space-y-8">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {firstThree.map((item, idx) => {
              const Icon = icons[idx] || PackageCheck;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-hairline bg-sand-light p-7 sm:p-8 flex flex-col items-start justify-start h-full transition-all duration-300 hover:border-brand-green/40 hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-[20px] sm:text-[21px] font-bold text-deep-brown mb-2.5 leading-snug">
                    {item.lead}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-warm-secondary leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-4xl md:mx-auto gap-6 lg:gap-8">
            {lastTwo.map((item, idx) => {
              const Icon = icons[idx + 3] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-hairline bg-sand-light p-7 sm:p-8 flex flex-col items-start justify-start h-full transition-all duration-300 hover:border-brand-green/40 hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-[20px] sm:text-[21px] font-bold text-deep-brown mb-2.5 leading-snug">
                    {item.lead}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-warm-secondary leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
