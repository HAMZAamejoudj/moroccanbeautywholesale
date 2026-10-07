import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { MarqueeBand } from "@/components/MarqueeBand";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { siteConfig } from "@/lib/siteConfig";

import { getDictionary } from "../../dictionaries";
import { buildPageMetadata, type SeoLocale } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "fr" | "ar" }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return buildPageMetadata({
    lang: lang as SeoLocale,
    segments: ["contact"],
    title: dict.contactPage.seo.title,
    description: dict.contactPage.seo.description,
  });
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export default async function ContactPage({ params }: { params: Promise<{ lang: "en" | "fr" | "ar" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-argan/20">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-16 overflow-hidden mb-12 lg:mb-20">
          <div className="absolute inset-0 z-0 bg-olive">
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
          </div>
          <div className="container relative z-10 px-4 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-argan/20 border border-argan/30 mb-6 backdrop-blur-md">
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {dict.contactPage.hero.badge}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground mb-6">
              {dict.contactPage.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.contactPage.hero.description}
            </p>
          </div>
        </section>

        <MarqueeBand dict={dict.marquee} />

        {/* Contact Info & Form */}
        <section className="container px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Info */}
            <div className="lg:col-span-2 space-y-10">
              
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-foreground">{dict.contactPage.info.title}</h2>
                <p className="text-muted-foreground">
                  {dict.contactPage.info.desc}
                </p>
                
                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream-dark/50 rounded-full flex items-center justify-center shrink-0 border border-border">
                      <Mail className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <strong className="block text-foreground text-lg mb-1">{dict.contactPage.info.emailLabel}</strong>
                      <a href={`mailto:${site.email}`} className="text-muted-foreground hover:text-olive transition-colors">
                        {site.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream-dark/50 rounded-full flex items-center justify-center shrink-0 border border-border">
                      <Phone className="w-5 h-5 text-olive" />
                    </div>
                    <div>
                      <strong className="block text-foreground text-lg mb-1">{dict.contactPage.info.phoneLabel}</strong>
                      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-olive transition-colors mb-1">
                        {dict.contactPage.info.phoneValue}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream-dark/50 rounded-full flex items-center justify-center shrink-0 border border-border">
                      <Clock className="w-5 h-5 text-argan" />
                    </div>
                    <div>
                      <strong className="block text-foreground text-lg mb-1">{dict.contactPage.info.hoursLabel}</strong>
                      <ul className="text-muted-foreground space-y-1">
                        {dict.contactPage.info.hoursItems.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream-dark/50 rounded-full flex items-center justify-center shrink-0 border border-border">
                      <MapPin className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <strong className="block text-foreground text-lg mb-1">{dict.contactPage.info.addressLabel}</strong>
                      <p className="text-muted-foreground">
                        {siteConfig.fullAddress}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        {dict.contactPage.info.addressNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-3">
              <div className="bg-background rounded-3xl p-8 lg:p-12 border border-border shadow-elevated">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-2">{dict.contactPage.form.title}</h2>
                <p className="text-muted-foreground mb-8">
                  {dict.contactPage.form.desc}
                </p>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground">{dict.contactPage.form.nameLabel}</label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder={dict.contactPage.form.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-olive/50 transition-shadow"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground">{dict.contactPage.form.emailLabel}</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder={dict.contactPage.form.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-olive/50 transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-foreground">{dict.contactPage.form.phoneLabel}</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder={dict.contactPage.form.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-olive/50 transition-shadow"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">{dict.contactPage.form.messageLabel}</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      placeholder={dict.contactPage.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-olive/50 transition-shadow resize-none"
                    ></textarea>
                  </div>

                  <div className="bg-olive/10 border border-olive/20 rounded-xl p-4 flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                    <p className="text-sm text-olive-dark">
                      <strong className="font-semibold">{dict.contactPage.form.tipTitle}</strong> {dict.contactPage.form.tipDesc}
                    </p>
                  </div>

                  <Button type="submit" size="xl" variant="hero" className="w-full sm:w-auto">
                    {dict.contactPage.form.submitButton}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
