import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { WhoItIsFor } from "@/components/WhoItIsFor";
import { ReadyToSellProducts } from "@/components/ReadyToSellProducts";
import { MixedOrderSteps } from "@/components/MixedOrderSteps";
import { CustomLogoBanner } from "@/components/CustomLogoBanner";
import { SourcingSection } from "@/components/SourcingSection";
import { ShippingSection } from "@/components/ShippingSection";
import { HomeFAQ } from "@/components/HomeFAQ";
import { GetPriceListSection } from "@/components/GetPriceListSection";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { StructuredData } from "@/components/StructuredData";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const homeSeo = dict.newHome?.seo || dict.seo;

  return {
    title: homeSeo.title,
    description: homeSeo.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const homeDict = dict.newHome;

  return (
    <div className="min-h-screen bg-white text-[#2A211C] flex flex-col justify-between">
      <Header />
      <main className="flex-grow">
        <Hero dict={homeDict.hero} lang={lang} />
        <MarqueeBand dict={dict.marquee} />
        <WhoItIsFor dict={homeDict.whoItsFor} lang={lang} />
        <ReadyToSellProducts dict={homeDict.products} lang={lang} />
        <MixedOrderSteps dict={homeDict.mixedOrder} lang={lang} />
        <CustomLogoBanner dict={homeDict.customLogo} lang={lang} />
        <SourcingSection dict={homeDict.sourcing} />
        <ShippingSection dict={homeDict.shipping} />
        <HomeFAQ dict={homeDict.faq} />
        <GetPriceListSection dict={homeDict.getPriceList} lang={lang} />
      </main>
      <Footer />
      <MobileStickyBar />
      <StructuredData lang={lang} includeHomeSchemas={true} />
    </div>
  );
}
