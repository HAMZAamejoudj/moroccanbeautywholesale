import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

interface AboutFactoryProps {
  dict: {
    title: string;
    p1: string;
    p2: string;
  };
}

export function AboutFactory({ dict }: AboutFactoryProps) {
  const { agadirActivities } = siteConfig.businessFacts;

  const largePhoto = {
    src: "/images/private-label-showcase.webp",
    alt: "Batch preparation and filling of Moroccan beauty products in Agadir workshop",
    width: 1600,
    height: 1200,
  };

  const smallPhotos = [
    {
      src: "/images/about-factory-2.webp",
      alt: "Pure cold-pressed Moroccan argan oil containers",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/about-factory-line.webp",
      alt: "Bottled and labelled Moroccan cosmetic products",
      width: 1600,
      height: 739,
    },
    {
      src: "/images/about-factory-1.webp",
      alt: "Packed cartons ready for export and international shipping",
      width: 1200,
      height: 1600,
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text (5 cols on lg) */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-deep-brown leading-[1.15] mb-6">
              {dict.title}
            </h2>

            <div className="space-y-5 text-[17px] sm:text-[18px] text-warm-secondary leading-[1.75]">
              <p>
                {dict.p1}
                {/* Sentence about what is done in Agadir renders ONLY if agadirActivities is set */}
                {agadirActivities && (
                  <span> Our factory there is where products are {agadirActivities}.</span>
                )}
              </p>

              <p>{dict.p2}</p>
            </div>
          </div>

          {/* Right Column: Bento Photo Grid (7 cols on lg: 1 large + 3 smaller photos, ~12px gaps) */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-3.5">
            {/* 1 Large Photo */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-sand-light shadow-sm">
              <Image
                src={largePhoto.src}
                alt={largePhoto.alt}
                width={largePhoto.width}
                height={largePhoto.height}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* 3 Smaller Photos */}
            <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
              {smallPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-sand-light shadow-sm"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 768px) 33vw, 20vw"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
