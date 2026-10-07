import Image from "next/image";

interface SourcingSectionProps {
  dict: {
    title: string;
    description: string;
    factoryLabel: string;
    factoryCity: string;
    addressLabel: string;
    address: string;
    image: string;
  };
}

export function SourcingSection({ dict }: SourcingSectionProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols): Text + Fact List */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#2A211C] leading-[1.15] mb-6">
              {dict.title}
            </h2>
            <p className="text-[17px] text-[#5E534B] leading-[1.65]">
              {dict.description}
            </p>
          </div>

          {/* Right Column (6 cols): Photo of production/cooperative */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F1EBE1] border border-[#E3DACD]">
              <Image
                src={dict.image || "/images/private-label-sourcing.webp"}
                alt="Moroccan beauty products being labeled and packed at our Agadir workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
