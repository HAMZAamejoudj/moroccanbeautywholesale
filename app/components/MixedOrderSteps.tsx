interface StepItem {
  num: string;
  title: string;
  desc: string;
}

interface MixedOrderStepsProps {
  dict: {
    title: string;
    subtitle: string;
    steps: StepItem[];
  };
  lang: string;
}

export function MixedOrderSteps({ dict }: MixedOrderStepsProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="max-w-2xl mb-12 lg:mb-14">
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#2A211C] leading-[1.15] mb-3">
            {dict.title}
          </h2>
          <p className="text-[17px] text-[#5E534B] leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-5 list-none">
          {dict.steps.map((step, idx) => (
            <li
              key={idx}
              className="relative flex flex-col rounded-xl border border-[#E3DACD] border-s-[3px] border-s-[#284B35] bg-[#F1EBE1]/25 ps-6 pe-5 py-6 min-h-[168px]"
            >
              <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#2A211C] leading-snug mb-2">
                <span className="sr-only">{step.num}. </span>
                {step.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#5E534B] leading-relaxed">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
