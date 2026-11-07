import { Contact } from "@/components/portfolio/contact";
import { Experience } from "@/components/portfolio/experience";
import { Hero } from "@/components/portfolio/hero";
import { SiteShell } from "@/components/portfolio/portfolio-site";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { Services } from "@/components/portfolio/services";
import { getPortfolioContent } from "@/lib/content";
import { isSiteLocale } from "@/lib/locales";
import { notFound } from "next/navigation";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();

  return (
    <SiteShell lang={locale} content={await getPortfolioContent()}>
      <Hero />
      <SelectedWork />
      <Services />
      <Experience />
      <Contact />
    </SiteShell>
  );
}
