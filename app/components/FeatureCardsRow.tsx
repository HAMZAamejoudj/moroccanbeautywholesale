import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featureCards, site } from "@/lib/site";

export function FeatureCardsRow() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-cream-dark/40 to-background">
      <div className="container px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {featureCards.map((card) => (
            <article
              key={card.id}
              id={card.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-elevated"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-muted">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-brown/35 via-rich-brown/5 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex px-3 py-1 rounded-full bg-background/95 backdrop-blur-sm border border-border/60 text-[10px] font-bold uppercase tracking-wider text-terracotta shadow-soft">
                    {card.badge}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <h3 className="text-xl lg:text-2xl font-serif font-bold text-foreground leading-snug mb-3">
                  {card.title}{" "}
                  <span className="text-terracotta">{card.titleHighlight}</span>
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed flex-1">
                  {card.paragraph}
                </p>
                <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-border/60">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-background border border-border text-xs font-medium text-foreground/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={site.catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-forest transition-colors"
                >
                  View in catalog
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
