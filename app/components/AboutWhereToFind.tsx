import { siteConfig } from "@/lib/siteConfig";
import { Building2, Factory, Mail, Phone, ExternalLink } from "lucide-react";

interface AboutWhereToFindProps {
  dict: {
    title: string;
    labels: {
      address?: string;
      office?: string;
      officeSubtitle?: string;
      factory: string;
      factorySubtitle?: string;
      email: string;
      phoneWhatsApp: string;
      openingHours: string;
      mapTitle?: string;
    };
    addressValue: string;
    factoryValue: string;
    visitsText: string;
    videoCallText: string;
    openMapBtn: string;
    mapArea: string;
  };
}

export function AboutWhereToFind({ dict }: AboutWhereToFindProps) {
  const { openingHours, videoCallAvailable } = siteConfig.businessFacts;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Lot 377 N 3/6, Sidi Ghanem industrial zone, Marrakesh, Morocco"
  )}`;

  const mapEmbedUrl =
    "https://www.google.com/maps?q=Lot+377+N%C2%B03/6,+Sidi+Ghanem+industrial+zone,+Marrakesh,+Morocco&output=embed";

  return (
    <section className="bg-sand-light py-16 lg:py-24">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-deep-brown leading-[1.15] mb-12 lg:mb-16">
          {dict.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (7 cols): Clean presentation of Office vs Factory and contacts */}
          <div className="lg:col-span-7 space-y-7">
            {/* 1. Office Entry (Marrakesh - with building icon) */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-serif text-[18px] sm:text-[19px] font-bold text-deep-brown">
                    {dict.labels.office || "Office"}
                  </p>
                  <span className="text-[13px] text-warm-secondary/80 font-medium">
                    · {dict.labels.officeSubtitle || dict.visitsText}
                  </span>
                </div>
                <p className="text-[16px] sm:text-[17px] text-warm-secondary leading-relaxed">
                  {dict.addressValue}
                </p>
              </div>
            </div>

            {/* 2. Factory Entry (Agadir - with factory icon) */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-serif text-[18px] sm:text-[19px] font-bold text-deep-brown">
                    {dict.labels.factory || "Factory"}
                  </p>
                  <span className="text-[13px] text-warm-secondary/80 font-medium">
                    · {dict.labels.factorySubtitle || "Agadir, Morocco"}
                  </span>
                </div>
                <p className="text-[16px] sm:text-[17px] text-warm-secondary leading-relaxed">
                  {dict.factoryValue}
                </p>
              </div>
            </div>

            {/* 3. Email Entry */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-serif text-[18px] sm:text-[19px] font-bold text-deep-brown mb-1">
                  {dict.labels.email}
                </p>
                <p className="text-[16px] sm:text-[17px] text-brand-green font-medium">
                  <a
                    href={`mailto:${siteConfig.ordersEmail}`}
                    className="hover:underline transition-colors"
                  >
                    {siteConfig.ordersEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* 4. Phone / WhatsApp Entry */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-serif text-[18px] sm:text-[19px] font-bold text-deep-brown mb-1">
                  {dict.labels.phoneWhatsApp}
                </p>
                <p className="text-[16px] sm:text-[17px] text-brand-green font-medium">
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline transition-colors"
                  >
                    {siteConfig.businessFacts.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Video Call Note */}
            {videoCallAvailable && (
              <p className="text-[15px] sm:text-[16px] text-warm-secondary/90 pt-2 ps-15">
                {dict.videoCallText}
              </p>
            )}
          </div>

          {/* Right Column (5 cols): Interactive Google Maps iframe with fixed aspect ratio */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-hairline">
              <iframe
                src={mapEmbedUrl}
                title={dict.labels.mapTitle || "Moroccan Beauty Wholesale Office Location"}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>

            <div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-hairline hover:border-deep-brown text-deep-brown font-medium text-[15px] bg-white hover:bg-sand-light transition-colors"
              >
                <span>{dict.openMapBtn}</span>
                <ExternalLink className="w-4 h-4 text-warm-secondary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
