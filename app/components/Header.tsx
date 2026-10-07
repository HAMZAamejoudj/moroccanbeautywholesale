"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navTranslations: Record<
  string,
  {
    about: string;
    benefits: string;
    privateLabel: string;
    blog: string;
    contact: string;
    priceListCta: string;
    whatsAppAria: string;
  }
> = {
  en: {
    about: "About",
    benefits: "Benefits",
    privateLabel: "Private Label",
    blog: "Blog",
    contact: "Contact",
    priceListCta: "Request the Price List",
    whatsAppAria: "Chat on WhatsApp",
  },
  fr: {
    about: "À propos",
    benefits: "Avantages",
    privateLabel: "Marque Blanche",
    blog: "Blog",
    contact: "Contact",
    priceListCta: "Demander la liste des prix",
    whatsAppAria: "Échanger sur WhatsApp",
  },
  ar: {
    about: "من نحن",
    benefits: "المزايا",
    privateLabel: "علامة خاصة",
    blog: "المدونة",
    contact: "اتصل بنا",
    priceListCta: "طلب لائحة الأسعار",
    whatsAppAria: "تواصل عبر واتساب",
  },
};

export function Header() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = navTranslations[lang] || navTranslations.en;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="flex items-center justify-between min-h-24 py-2">
          {/* Logo */}
          <Link
            href={`/${lang}/`}
            className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#284B35] rounded-lg"
            aria-label={`${siteConfig.name} - Homepage`}
          >
            <Image
              src="/images/logo-full.webp"
              alt={siteConfig.name}
              width={340}
              height={76}
              className="h-14 sm:h-16 lg:h-[4.25rem] w-auto max-w-[min(100%,340px)] object-contain object-left"
              priority
            />
          </Link>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#5E534B]">
            <Link
              href={`/${lang}/about/`}
              className="hover:text-[#2A211C] transition-colors py-2"
            >
              {t.about}
            </Link>
            <Link
              href={`/${lang}/benefits/`}
              className="hover:text-[#2A211C] transition-colors py-2"
            >
              {t.benefits}
            </Link>
            <Link
              href={`/${lang}/private-label/`}
              className="hover:text-[#2A211C] transition-colors py-2"
            >
              {t.privateLabel}
            </Link>
            <Link
              href={`/${lang}/blog/`}
              className="hover:text-[#2A211C] transition-colors py-2"
            >
              {t.blog}
            </Link>
            <Link
              href={`/${lang}/contact/`}
              className="hover:text-[#2A211C] transition-colors py-2"
            >
              {t.contact}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <LanguageSwitcher />

            {/* Primary CTA Button */}
            <Link
              href={`/${lang}/contact/`}
              className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[#284B35] hover:bg-[#1E3827] text-white text-sm font-medium transition-colors shadow-sm"
            >
              {t.priceListCta}
            </Link>
          </div>

          {/* Mobile Actions & Burger */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2.5 rounded-lg text-[#2A211C] border border-[#E3DACD] hover:bg-[#F1EBE1] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2A211C]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white border-l border-[#E3DACD] p-6 shadow-xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E3DACD]">
                <Image
                  src="/images/logo-full.webp"
                  alt={siteConfig.name}
                  width={240}
                  height={54}
                  className="h-11 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[#2A211C] hover:bg-[#F1EBE1]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 py-6 text-lg font-medium text-[#2A211C]">
                <Link
                  href={`/${lang}/`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 hover:text-[#284B35]"
                >
                  {lang === "ar" ? "الرئيسية" : lang === "fr" ? "Accueil" : "Home"}
                </Link>
                <Link
                  href={`/${lang}/about/`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 hover:text-[#284B35]"
                >
                  {t.about}
                </Link>
                <Link
                  href={`/${lang}/benefits/`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 hover:text-[#284B35]"
                >
                  {t.benefits}
                </Link>
                <Link
                  href={`/${lang}/private-label/`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 hover:text-[#284B35]"
                >
                  {t.privateLabel}
                </Link>
                <Link
                  href={`/${lang}/blog/`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 hover:text-[#284B35]"
                >
                  {t.blog}
                </Link>
                <Link
                  href={`/${lang}/contact/`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 hover:text-[#284B35]"
                >
                  {t.contact}
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[#E3DACD]">
              <Link
                href={`/${lang}/contact/`}
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center h-12 rounded-lg bg-[#284B35] text-white font-medium hover:bg-[#1E3827]"
              >
                {t.priceListCta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
