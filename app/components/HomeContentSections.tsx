import Image from "next/image";
import { contentSections } from "@/lib/site";
import { FeatureCardsRow } from "@/components/FeatureCardsRow";

function SectionHeading({
  badge,
  title,
  titleHighlight,
  center = false,
}: {
  badge: string;
  title: string;
  titleHighlight?: string;
  center?: boolean;
}) {
  return (
    <div className={`space-y-4 mb-6 ${center ? "text-center flex flex-col items-center" : ""}`}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/30">
        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
          {badge}
        </span>
      </div>
      <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground leading-tight">
        {title}
        {titleHighlight ? (
          <>
            {" "}
            <span className="text-terracotta">{titleHighlight}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

function TagList({ tags, center = false }: { tags: readonly string[], center?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 pt-4 ${center ? "justify-center" : ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1.5 rounded-lg bg-cream-dark/50 border border-border text-sm font-medium text-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function HomeContentSections({ dict }: { dict: any }) {
  const splitIndex = contentSections.findIndex((s) => s.id === "private-label");

  return (
    <div className="bg-background">
      {dict.map((section: any, index: number) => {
        // We still need the original section for id, image, and imagePosition
        const originalSection = contentSections[index];
        if (!originalSection) return null;
        
        const hasImage = Boolean(originalSection.image);
        const imageRight = originalSection.imagePosition !== "left";
        const textBlock = (
          <div className={hasImage ? "w-full lg:w-1/2 space-y-4" : "max-w-4xl mx-auto flex flex-col items-center"}>
            <SectionHeading
              badge={section.badge}
              title={section.title}
              titleHighlight={section.titleHighlight}
              center={!hasImage}
            />
            {section.paragraphs.map((p: string) => (
              <p
                key={p.slice(0, 48)}
                className={`text-lg text-muted-foreground leading-relaxed ${!hasImage ? "text-center" : ""}`}
              >
                {p}
              </p>
            ))}
            {section.tags ? <TagList tags={section.tags} center={!hasImage} /> : null}
          </div>
        );

        const sectionBlock = (
          <section
            key={originalSection.id}
            id={originalSection.id}
            className={`py-16 lg:py-24 ${index % 2 === 1 ? "bg-cream-dark/30" : ""}`}
          >
            <div className="container px-4 lg:px-8">
              {hasImage && originalSection.image ? (
                <div
                  className={`flex flex-col gap-12 lg:gap-20 items-center ${
                    imageRight ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {textBlock}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border/50">
                      <Image
                        src={originalSection.image.src}
                        alt={originalSection.image.alt}
                        width={800}
                        height={600}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                textBlock
              )}
            </div>
          </section>
        );

        if (index === splitIndex) {
          return (
            <div key={section.id}>
              {sectionBlock}
              <FeatureCardsRow />
            </div>
          );
        }

        return sectionBlock;
      })}
    </div>
  );
}
