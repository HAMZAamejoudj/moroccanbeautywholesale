"use client";

import { useParams, usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const ariaLabels: Record<string, string> = {
  en: "Chat on WhatsApp",
  fr: "Échanger sur WhatsApp",
  ar: "تواصل عبر واتساب",
};

export function FloatingWhatsApp() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "en";
  const aria = ariaLabels[lang] || ariaLabels.en;

  const isHome =
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname === "/";

  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={`fixed z-40 end-4 sm:end-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#284B35] hover:bg-[#1E3827] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#284B35] focus-visible:ring-offset-2 ${
        isHome ? "bottom-[4.25rem] sm:bottom-6" : "bottom-5 sm:bottom-6"
      }`}
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}
