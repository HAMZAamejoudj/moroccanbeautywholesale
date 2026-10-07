"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { businessFacts } from "@/lib/businessFacts";
import { paymentLogos } from "@/lib/site";

const footerPaymentLogoStyles: Record<
  string,
  { imageClass: string; tileClass: string }
> = {
  "/images/payment-credit.webp": {
    imageClass: "h-9 sm:h-10 w-auto max-w-[200px] object-contain",
    tileClass: "bg-white border-[#E3DACD]",
  },
  "/images/stripe.svg": {
    imageClass: "h-8 sm:h-9 w-auto object-contain",
    tileClass: "bg-white border-[#E3DACD]",
  },
  "/images/payment-wise.webp": {
    imageClass: "h-7 sm:h-8 w-auto object-contain",
    tileClass: "bg-[#2A211C] border-[#2A211C]",
  },
  "/images/payment-tijaribank.webp": {
    imageClass: "h-8 sm:h-9 w-auto max-w-[160px] object-contain",
    tileClass: "bg-[#2A211C] border-[#2A211C]",
  },
};

const defaultPaymentLogoStyle = {
  imageClass: "h-8 w-auto object-contain",
  tileClass: "bg-white border-[#E3DACD]",
};

const footerTranslations: Record<
  string,
  {
    description: string;
    pagesTitle: string;
    contactTitle: string;
    paymentTitle: string;
    home: string;
    about: string;
    benefits: string;
    privateLabel: string;
    blog: string;
    contact: string;
    addressLabel: string;
    factoryLabel: string;
    officeLabel: string;
    guidesTitle: string;
    guideLinks: { slug: string; label: string }[];
    copyright: string;
  }
> = {
  en: {
    description:
      "Ready-to-sell Moroccan beauty products in small wholesale quantities for shops, spas, hammams, hotels and online sellers.",
    pagesTitle: "Pages",
    contactTitle: "Contact",
    paymentTitle: "Accepted Payments",
    home: "Home",
    about: "About Us",
    benefits: "Benefits",
    privateLabel: "Private Label",
    blog: "Blog and Guides",
    contact: "Contact and Quote",
    addressLabel: "Address",
    factoryLabel: "Factory",
    officeLabel: "Office",
    guidesTitle: "Guides",
    guideLinks: [
      { slug: "wholesale-argan-oil-guide", label: "Wholesale argan oil" },
      { slug: "moroccan-black-soap-wholesale", label: "Black soap wholesale" },
      { slug: "rhassoul-clay-guide", label: "Rhassoul clay" },
      { slug: "hammam-kit-hotels-spas", label: "Hammam kits" },
      { slug: "importing-moroccan-cosmetics", label: "Importing cosmetics" },
      { slug: "private-label-moroccan-cosmetics", label: "Private label" },
    ],
    copyright: "© 2026 Moroccan Beauty Wholesale. All rights reserved.",
  },
  fr: {
    description:
      "Produits de beauté marocains prêts à la revente en petites quantités de gros pour boutiques, spas, hammams, hôtels et e-commerçants.",
    pagesTitle: "Pages",
    contactTitle: "Contact",
    paymentTitle: "Moyens de paiement",
    home: "Accueil",
    about: "À propos",
    benefits: "Avantages",
    privateLabel: "Marque Blanche",
    blog: "Blog et Guides",
    contact: "Contact et Devis",
    addressLabel: "Adresse",
    factoryLabel: "Atelier",
    officeLabel: "Bureau",
    guidesTitle: "Guides",
    guideLinks: [
      { slug: "wholesale-argan-oil-guide", label: "Huile d'argan en gros" },
      { slug: "moroccan-black-soap-wholesale", label: "Savon noir en gros" },
      { slug: "rhassoul-clay-guide", label: "Rhassoul" },
      { slug: "hammam-kit-hotels-spas", label: "Kits hammam" },
      { slug: "importing-moroccan-cosmetics", label: "Import cosmétiques" },
      { slug: "private-label-moroccan-cosmetics", label: "Marque privée" },
    ],
    copyright: "© 2026 Moroccan Beauty Wholesale. Tous droits réservés.",
  },
  ar: {
    description:
      "منتجات تجميل مغربية جاهزة للبيع بكميات جملة مرنة للمتاجر، الصالونات، الحمامات، الفنادق، وبائعي الإنترنت.",
    pagesTitle: "الصفحات",
    contactTitle: "اتصل بنا",
    paymentTitle: "طرق الدفع المقبولة",
    home: "الرئيسية",
    about: "من نحن",
    benefits: "المزايا",
    privateLabel: "علامة خاصة",
    blog: "المدونة",
    contact: "الاتصال والطلب",
    addressLabel: "العنوان",
    factoryLabel: "المعمل",
    officeLabel: "المكتب",
    guidesTitle: "الأدلة",
    guideLinks: [
      { slug: "wholesale-argan-oil-guide", label: "زيت الأركان بالجملة" },
      { slug: "moroccan-black-soap-wholesale", label: "الصابون الأسود" },
      { slug: "rhassoul-clay-guide", label: "طين الراسول" },
      { slug: "hammam-kit-hotels-spas", label: "مجموعات الحمام" },
      { slug: "importing-moroccan-cosmetics", label: "استيراد المستحضرات" },
      { slug: "private-label-moroccan-cosmetics", label: "العلامة الخاصة" },
    ],
    copyright: "© 2026 Moroccan Beauty Wholesale. جميع الحقوق محفوظة.",
  },
};

export function Footer() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = footerTranslations[lang] || footerTranslations.en;

  return (
    <footer className="bg-[#F1EBE1] text-[#2A211C] pt-16 pb-12">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-[#E3DACD]">
          {/* Col 1: Logo + description */}
          <div className="space-y-4">
            <Link href={`/${lang}/`} className="inline-block">
              <Image
                src="/images/logo-full.webp"
                alt={siteConfig.name}
                width={280}
                height={64}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#5E534B] leading-relaxed max-w-xs">
              {t.description}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <p className="font-serif font-bold text-base mb-4 text-[#2A211C]">
              {t.pagesTitle}
            </p>
            <ul className="space-y-2.5 text-sm text-[#5E534B]">
              <li>
                <Link href={`/${lang}/`} className="hover:text-[#284B35] transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about/`} className="hover:text-[#284B35] transition-colors">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/benefits/`} className="hover:text-[#284B35] transition-colors">
                  {t.benefits}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/private-label/`} className="hover:text-[#284B35] transition-colors">
                  {t.privateLabel}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog/`} className="hover:text-[#284B35] transition-colors">
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact/`} className="hover:text-[#284B35] transition-colors">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Blog guides */}
          <div>
            <p className="font-serif font-bold text-base mb-4 text-[#2A211C]">
              {t.guidesTitle}
            </p>
            <ul className="space-y-2.5 text-sm text-[#5E534B]">
              {t.guideLinks.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/${lang}/blog/${guide.slug}/`}
                    className="hover:text-[#284B35] transition-colors"
                  >
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact details */}
          <div>
            <p className="font-serif font-bold text-base mb-4 text-[#2A211C]">
              {t.contactTitle}
            </p>
            <div className="space-y-2.5 text-sm text-[#5E534B]">
              <div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-block text-[11px] sm:text-xs font-medium leading-snug tracking-tight text-[#2A211C] hover:text-[#284B35] transition-colors whitespace-nowrap"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-[#284B35] transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="pt-2 text-xs leading-relaxed text-[#5E534B]">
                <span className="font-semibold text-[#2A211C] block">{t.officeLabel}:</span>
                {siteConfig.fullAddress}
              </div>
              <div className="text-xs text-[#2A211C] font-semibold">
                {t.factoryLabel}: {businessFacts.factoryCity}, Morocco
              </div>
            </div>
          </div>

          {/* Col 5: Payment methods */}
          <div>
            <p className="font-serif font-bold text-base mb-4 text-[#2A211C]">
              {t.paymentTitle}
            </p>
            <p className="text-xs text-[#5E534B] mb-4">
              Wire transfer, credit cards, and international transfer.
            </p>
            <div className="flex flex-wrap items-stretch gap-3">
              {paymentLogos.map((logo) => {
                const styles =
                  footerPaymentLogoStyles[logo.src] ?? defaultPaymentLogoStyle;
                return (
                  <div
                    key={logo.src}
                    className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 min-h-[56px] shadow-sm ${styles.tileClass}`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={180}
                      height={44}
                      className={styles.imageClass}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright only (No keywords) */}
        <div className="pt-8 text-xs text-[#7E7268] text-center sm:text-left">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
