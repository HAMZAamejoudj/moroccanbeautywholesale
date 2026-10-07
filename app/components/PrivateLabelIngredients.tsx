"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export type IngredientRow = { name: string; desc: string };

export type IngredientGroup = {
  id: string;
  title: string;
  items: IngredientRow[];
};

// Map groupIndex-itemIndex to our curated product images in public/images/ingredients/
const INGREDIENT_IMAGES: Record<string, string> = {
  // Group 0: Oils
  "0-0": "/images/ingredients/argan-oil.webp",
  "0-1": "/images/ingredients/prickly-pear-oil.webp",
  "0-2": "/images/ingredients/fig-seed-oil.webp",
  "0-3": "/images/ingredients/saffron-oil.webp",
  "0-4": "/images/ingredients/verbena-essential-oil.webp",
  "0-5": "/images/ingredients/nigella-oil.webp",

  // Group 1: Floral waters
  "1-0": "/images/ingredients/rose-water.webp",
  "1-1": "/images/ingredients/orange-blossom-water.webp",
  "1-2": "/images/ingredients/chamomile-water.webp",

  // Group 2: Clays and powders
  "2-0": "/images/ingredients/rhassoul-clay.webp",
  "2-1": "/images/ingredients/nila-powder.webp",
  "2-2": "/images/ingredients/henna-powder.webp",
  "2-3": "/images/ingredients/khol-powder.webp",
  "2-4": "/images/ingredients/aker-fassi.webp",

  // Group 3: Soaps and scrubs
  "3-0": "/images/ingredients/beldi-black-soap.webp",
  "3-1": "/images/ingredients/ghassoul-soap.webp",
  "3-2": "/images/ingredients/barley-scrub.webp",
  "3-3": "/images/ingredients/olive-oil-soap.webp",

};

// Fallback keyword matcher
function getImageForIngredient(name: string, groupIdx: number, itemIdx: number): string {
  const directKey = `${groupIdx}-${itemIdx}`;
  if (INGREDIENT_IMAGES[directKey]) {
    return INGREDIENT_IMAGES[directKey];
  }
  const lower = name.toLowerCase();
  if (lower.includes("argan")) return "/images/ingredients/argan-oil.webp";
  if (lower.includes("prickly") || lower.includes("figue de barbarie") || lower.includes("التين الشوكي")) return "/images/ingredients/prickly-pear-oil.webp";
  if (lower.includes("fig") || lower.includes("figue") || lower.includes("التين")) return "/images/ingredients/fig-seed-oil.webp";
  if (lower.includes("saffron") || lower.includes("safran") || lower.includes("الزعفران")) return "/images/ingredients/saffron-oil.webp";
  if (lower.includes("verbena") || lower.includes("verveine") || lower.includes("اللويزة")) return "/images/ingredients/verbena-essential-oil.webp";
  if (lower.includes("nigella") || lower.includes("nigelle") || lower.includes("حبة البركة")) return "/images/ingredients/nigella-oil.webp";
  if (lower.includes("rose") || lower.includes("الورد")) return "/images/ingredients/rose-water.webp";
  if (lower.includes("orange") || lower.includes("oranger") || lower.includes("البرتقال")) return "/images/ingredients/orange-blossom-water.webp";
  if (lower.includes("chamomile") || lower.includes("camomille") || lower.includes("البابونج")) return "/images/ingredients/chamomile-water.webp";
  if (lower.includes("rhassoul") || lower.includes("ghassoul") || lower.includes("الغاسول")) return "/images/ingredients/rhassoul-clay.webp";
  if (lower.includes("nila") || lower.includes("النيلة")) return "/images/ingredients/nila-powder.webp";
  if (lower.includes("henna") || lower.includes("henné") || lower.includes("الحناء")) return "/images/ingredients/henna-powder.webp";
  if (lower.includes("khol") || lower.includes("khôl") || lower.includes("الكحل")) return "/images/ingredients/khol-powder.webp";
  if (lower.includes("aker") || lower.includes("العكر")) return "/images/ingredients/aker-fassi.webp";
  if (lower.includes("black soap") || lower.includes("savon noir") || lower.includes("الأسود")) return "/images/ingredients/beldi-black-soap.webp";
  if (lower.includes("soap") || lower.includes("savon") || lower.includes("صابون")) return "/images/ingredients/ghassoul-soap.webp";
  if (lower.includes("barley") || lower.includes("orge") || lower.includes("الشعير")) return "/images/ingredients/barley-scrub.webp";
  if (lower.includes("olive") || lower.includes("الزيتون")) return "/images/ingredients/olive-oil-soap.webp";
  return "/images/ingredients/argan-oil.webp";
}

// Localized UI strings for filters and cards
const UI_TEXT: Record<string, {
  allCategories: string;
  productsCount: (count: number) => string;
  moq: string;
  inquire: string;
  waMessage: (name: string) => string;
}> = {
  en: {
    allCategories: "All Categories",
    productsCount: (c) => `${c} products`,
    moq: "From 50 pieces",
    inquire: "Inquire",
    waMessage: (name) => `Hello, I am interested in wholesale pricing for ${name} from Moroccan Beauty Wholesale.`
  },
  fr: {
    allCategories: "Toutes les catégories",
    productsCount: (c) => `${c} produits`,
    moq: "À partir de 50 pièces",
    inquire: "Demander un devis",
    waMessage: (name) => `Bonjour, je souhaite obtenir les tarifs de gros pour ${name} auprès de Moroccan Beauty Wholesale.`
  },
  ar: {
    allCategories: "جميع الفئات",
    productsCount: (c) => `${c} منتجات`,
    moq: "ابتداءً من 50 قطعة",
    inquire: "طلب استفسار",
    waMessage: (name) => `مرحباً، أود الاستفسار عن أسعار الجملة لـ ${name} من المغربية لمستحضرات التجميل بالجملة.`
  }
};

export function PrivateLabelIngredients({
  groups,
  lang = "en",
}: {
  groups: IngredientGroup[];
  lang?: string;
}) {
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const t = UI_TEXT[lang] || UI_TEXT.en;

  const filteredGroups =
    activeGroup === "all"
      ? groups
      : groups.filter((g) => g.id === activeGroup);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pb-2">
        <button
          type="button"
          onClick={() => setActiveGroup("all")}
          className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeGroup === "all"
              ? "bg-brand-green text-white shadow-sm"
              : "bg-sand-light text-deep-brown hover:bg-sand border border-hairline"
          }`}
        >
          {t.allCategories} ({groups.reduce((acc, g) => acc + g.items.length, 0)})
        </button>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActiveGroup(group.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeGroup === group.id
                ? "bg-brand-green text-white shadow-sm"
                : "bg-sand-light text-deep-brown hover:bg-sand border border-hairline"
            }`}
          >
            {group.title} ({group.items.length})
          </button>
        ))}
      </div>

      {/* Render Product Cards by Category */}
      <div className="space-y-16">
        {filteredGroups.map((group) => {
          const groupIdx = groups.findIndex((g) => g.id === group.id);
          return (
            <div key={group.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-deep-brown">
                  {group.title}
                </h3>
                <span className="text-xs font-semibold text-warm-secondary bg-sand-light px-3 py-1 rounded-full border border-hairline">
                  {t.productsCount(group.items.length)}
                </span>
                <div className="flex-1 h-px bg-hairline/60" />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {group.items.map((item, itemIdx) => {
                  const imageSrc = getImageForIngredient(item.name, groupIdx, itemIdx);
                  const waMessage = t.waMessage(item.name);
                  const waUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(waMessage)}`;

                  return (
                    <article
                      key={item.name}
                      className="group flex flex-col rounded-2xl border border-hairline bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all duration-300 h-full"
                    >
                      {/* Product Image Header */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-light shrink-0">
                        <Image
                          src={imageSrc}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="font-serif text-[19px] sm:text-[21px] font-bold text-deep-brown mb-2 group-hover:text-brand-green transition-colors leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-[14px] sm:text-[15px] text-warm-secondary leading-relaxed mb-5">
                            {item.desc}
                          </p>
                        </div>

                        {/* Card Footer: MOQ Tag and WhatsApp Direct Link */}
                        <div className="pt-4 border-t border-hairline/60 mt-auto flex items-center justify-between gap-3">
                          <span className="text-xs font-medium text-warm-secondary bg-sand-light px-2.5 py-1 rounded-md border border-hairline/40">
                            {t.moq}
                          </span>

                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:text-brand-green-hover transition-colors group/link"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t.inquire}</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
