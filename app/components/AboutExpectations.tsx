import { Check } from "lucide-react";

interface ExpectationItem {
  num: string;
  title: string;
  text: string;
}

interface AboutExpectationsProps {
  dict: {
    title: string;
    items: ExpectationItem[];
  };
}

export function AboutExpectations({ dict }: AboutExpectationsProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-deep-brown leading-[1.15] mb-12 lg:mb-16">
          {dict.title}
        </h2>

        {/* 2x2 Grid without numbered boxes, open whitespace, serif title + text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {dict.items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-4 shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>

              <p className="font-serif text-[22px] sm:text-[24px] font-bold text-deep-brown leading-snug mb-3">
                {item.title}
              </p>

              <p className="text-[16px] sm:text-[17px] text-warm-secondary leading-[1.7]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
