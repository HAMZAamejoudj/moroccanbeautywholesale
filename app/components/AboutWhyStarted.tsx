import { siteConfig } from "@/lib/siteConfig";

interface AboutWhyStartedProps {
  dict: {
    title: string;
    p1: string;
    p2: string;
    pullQuote: string;
    sinceYearPrefix: string;
  };
}

export function AboutWhyStarted({ dict }: AboutWhyStartedProps) {
  const { foundingYear } = siteConfig.businessFacts;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: H2 + Highlight Card */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-deep-brown leading-[1.15]">
              {dict.title}
            </h2>

            {/* Pull-quote Highlight Card */}
            <div className="mt-8 rounded-2xl border border-hairline bg-sand-light p-7 sm:p-8 border-s-[3px] border-s-brand-green shadow-sm">
              <blockquote className="font-serif text-[19px] sm:text-[21px] lg:text-[22px] text-deep-brown font-semibold leading-snug italic">
                &ldquo;{dict.pullQuote}&rdquo;
              </blockquote>
              {foundingYear && (
                <p className="text-[14px] text-brand-green font-semibold mt-4">
                  {dict.sinceYearPrefix}{foundingYear}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Paragraphs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 max-w-[65ch] lg:pt-3">
            <p className="text-[17px] sm:text-[18px] text-deep-brown leading-[1.8]">
              {dict.p1}
            </p>

            <p className="text-[17px] sm:text-[18px] text-warm-secondary leading-[1.8]">
              {dict.p2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
