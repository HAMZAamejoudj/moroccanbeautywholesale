import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Plus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface AboutFAQProps {
  dict: {
    title: string;
    subtitle: string;
    whatsAppLink: string;
    items: FAQItem[];
  };
}

export function AboutFAQ({ dict }: AboutFAQProps) {
  const { madeInHouse, sourcedProducts } = siteConfig.businessFacts;

  // Build FAQ items: if madeInHouse is confirmed, insert "Do you make all the products yourselves?"
  const visibleFaqItems = [...dict.items];
  if (madeInHouse && sourcedProducts) {
    visibleFaqItems.splice(1, 0, {
      q: "Do you make all the products yourselves?",
      a: `Products made in Agadir: ${madeInHouse.join(", ")}. Products from partner cooperatives: ${sourcedProducts.join(", ")}.`,
    });
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): H2 + subtitle + WhatsApp link */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-deep-brown leading-[1.15] mb-4">
              {dict.title}
            </h2>
            <p className="text-[17px] text-warm-secondary leading-relaxed mb-6">
              {dict.subtitle}
            </p>
            <div>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown text-[15px] font-medium transition-colors bg-white/70 hover:bg-white"
              >
                <WhatsAppIcon className="w-5 h-5 text-deep-brown" />
                <span>{dict.whatsAppLink}</span>
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): Accordion using <details>/<summary> */}
          <div className="lg:col-span-7 divide-y divide-hairline">
            {visibleFaqItems.map((item, idx) => (
              <details
                key={idx}
                className="group py-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-start list-none select-none">
                  <h3 className="text-[18px] font-semibold text-deep-brown leading-snug">
                    {item.q}
                  </h3>
                  <span className="ms-4 flex-shrink-0 text-warm-secondary/80 group-open:rotate-45 transition-transform duration-200">
                    <Plus className="w-5 h-5" />
                  </span>
                </summary>
                <div className="pt-3 pb-1 text-[17px] text-warm-secondary leading-relaxed">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
