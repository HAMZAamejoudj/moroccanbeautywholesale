import Image from "next/image";

interface ShippingSectionProps {
  dict: {
    title: string;
    description: string;
  };
}

const carrierLogos = [
  { name: "DHL Express", src: "/images/carrier-dhl.webp", width: 160, height: 46 },
  { name: "UPS", src: "/images/ups.svg", width: 72, height: 46 },
  { name: "Aramex", src: "/images/carrier-aramex.webp", width: 140, height: 42 },
  { name: "Chronopost", src: "/images/carrier-chronopost.webp", width: 150, height: 44 },
];

function CarrierRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="flex items-center gap-10 sm:gap-14 shrink-0 pr-10 sm:pr-14"
      aria-hidden={duplicate || undefined}
    >
      {carrierLogos.map((carrier) => (
        <div
          key={`${carrier.name}-${duplicate ? "dup" : "main"}`}
          className="flex items-center justify-center shrink-0"
        >
          <Image
            src={carrier.src}
            alt={duplicate ? "" : carrier.name}
            width={carrier.width}
            height={carrier.height}
            className="h-11 sm:h-12 md:h-14 w-auto min-w-[72px] object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function ShippingSection({ dict }: ShippingSectionProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#2A211C] leading-[1.15] mb-4">
            {dict.title}
          </h2>
          <p className="text-[17px] text-[#5E534B] leading-[1.65]">
            {dict.description}
          </p>
        </div>

        <div className="py-4 sm:py-6 overflow-hidden">
          <div className="marquee-track marquee-track--carriers">
            <CarrierRow />
            <CarrierRow duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
