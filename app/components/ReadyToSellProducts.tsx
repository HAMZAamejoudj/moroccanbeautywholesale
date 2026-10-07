"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, LayoutGrid, List } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

interface ProductItem {
  name: string;
  format: string;
  popularWith: string;
  image: string;
}

interface ReadyToSellProductsProps {
  dict: {
    title: string;
    columns: {
      product: string;
      formats: string;
      popularWith: string;
    };
    items: ProductItem[];
    footerNote: string;
    cta: string;
  };
  lang: string;
}

export function ReadyToSellProducts({ dict, lang }: ReadyToSellProductsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const isRtl = lang === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const getSubNote = () => {
    if (lang === "ar")
      return "تتوفر أحجام التجزئة والجملة، بالإضافة إلى وضع علامتك التجارية الخاصة.";
    if (lang === "fr")
      return "Formats de détail et formats professionnels disponibles avec votre propre logo.";
    return "Available in retail and professional formats, with custom private label branding.";
  };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-[#E3DACD]">
      <div className="max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#284B35] bg-[#284B35]/10 px-3 py-1 rounded-full mb-3.5">
              {lang === "ar"
                ? "كتالوج المنتجات الجاهزة"
                : lang === "fr"
                ? "Catalogue Prêt à l'Emploi"
                : "Ready-to-Sell Catalog"}
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#2A211C] leading-[1.14]">
              {dict.title}
            </h2>
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-[#F1EBE1] border border-[#E3DACD]">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-white text-[#284B35] shadow-sm"
                  : "text-[#73655A] hover:text-[#2A211C]"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{lang === "ar" ? "شبكة" : lang === "fr" ? "Grille" : "Grid"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "table"
                  ? "bg-white text-[#284B35] shadow-sm"
                  : "text-[#73655A] hover:text-[#2A211C]"
              }`}
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
              <span>{lang === "ar" ? "جدول" : lang === "fr" ? "Tableau" : "Table"}</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: Modern Product Cards Grid (Default) */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {dict.items.map((item, idx) => (
              <article
                key={idx}
                className="group flex flex-col rounded-2xl border border-[#E3DACD] bg-[#FAF7F2] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#284B35]/40"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[4/3] w-full bg-[#F1EBE1] overflow-hidden border-b border-[#E3DACD]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-[22px] sm:text-[23px] font-bold text-[#2A211C] group-hover:text-[#284B35] transition-colors leading-snug mb-3.5">
                      {item.name}
                    </h3>

                    <div className="space-y-2.5 mb-6 pb-4 border-b border-[#E3DACD]/70 text-[14px] text-[#5E534B] leading-relaxed">
                      <p>
                        <span className="font-semibold text-[#2A211C]">
                          {dict.columns.formats}:
                        </span>{" "}
                        {item.format}
                      </p>
                      <p>
                        <span className="font-semibold text-[#2A211C]">
                          {dict.columns.popularWith}:
                        </span>{" "}
                        {item.popularWith}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / Action Links */}
                  <div className="pt-4 border-t border-[#E3DACD]/70 flex items-center justify-between">
                    <Link
                      href={`/${lang}/contact/`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#284B35] hover:text-[#1E3827] group/link transition-colors"
                    >
                      <span className="underline underline-offset-4">{dict.cta}</span>
                      <ArrowIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5E534B] hover:text-[#284B35] transition-colors p-1.5 rounded-lg hover:bg-[#FAF7F2]"
                      title="Quick inquiry on WhatsApp"
                      aria-label="Inquire on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#284B35]" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* VIEW 2: Refined High-End Table View */
          <div className="overflow-hidden rounded-2xl border border-[#E3DACD] bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E3DACD] bg-[#F1EBE1]/80 text-xs font-semibold uppercase tracking-wider text-[#73655A]">
                  <th scope="col" className="py-4.5 px-6 sm:px-8 w-[40%]">
                    {dict.columns.product}
                  </th>
                  <th scope="col" className="py-4.5 px-6 w-[20%]">
                    {dict.columns.formats}
                  </th>
                  <th scope="col" className="py-4.5 px-6 w-[25%]">
                    {dict.columns.popularWith}
                  </th>
                  <th scope="col" className="py-4.5 px-6 sm:px-8 text-right rtl:text-left w-[15%]">
                    {lang === "ar" ? "طلب تسعيرة" : lang === "fr" ? "Action" : "Inquire"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3DACD]">
                {dict.items.map((item, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-[#FAF7F2]/60 group"
                  >
                    {/* Product: Thumbnail + Name */}
                    <td className="py-4.5 px-6 sm:px-8">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F1EBE1] border border-[#E3DACD] flex-shrink-0 shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="font-serif text-[18px] sm:text-[19px] font-bold text-[#2A211C] group-hover:text-[#284B35] transition-colors block">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Formats */}
                    <td className="py-4.5 px-6 text-[14px] text-[#5E534B]">
                      {item.format}
                    </td>

                    <td className="py-4.5 px-6 text-[14px] text-[#5E534B]">
                      {item.popularWith}
                    </td>

                    {/* Action */}
                    <td className="py-4.5 px-6 sm:px-8 text-right rtl:text-left">
                      <Link
                        href={`/${lang}/contact/`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#284B35] hover:text-[#1E3827] transition-colors group/link"
                      >
                        <span className="underline underline-offset-4">{dict.cta}</span>
                        <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Note & High-Conversion Action Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-[#E3DACD] bg-[#F1EBE1]/70 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#2A211C] mb-1.5">
              {dict.footerNote}
            </h4>
            <p className="text-[15px] text-[#5E534B]">
              {getSubNote()}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href={`/${lang}/contact/`}
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-[#284B35] hover:bg-[#1E3827] text-white text-[15px] font-medium transition-colors shadow-sm"
            >
              {dict.cta}
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-5 rounded-lg border border-[#3A2A22]/25 hover:border-[#3A2A22] text-[#2A211C] text-[15px] font-medium transition-colors gap-2.5 bg-white"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#284B35]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
