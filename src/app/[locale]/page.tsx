import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { Experience } from "@/components/portfolio/experience";
import { Hero } from "@/components/portfolio/hero";
import { SiteShell } from "@/components/portfolio/portfolio-site";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { Services } from "@/components/portfolio/services";
import { WorkingStyle } from "@/components/portfolio/working-style";
import { getPortfolioContent } from "@/lib/content";
import { isSiteLocale } from "@/lib/locales";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isSiteLocale(locale)) return {};
  const t = (await getPortfolioContent()).str[locale];
  return pageMetadata({
    lang: locale,
    paths: { de: "/de", en: "/en" },
    title: `Mahmud Al Hussen | ${t.role}`,
    description: t.heroDesc,
  });
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();

  return (
    <SiteShell lang={locale} content={await getPortfolioContent()}>
      <Hero />
      <About />
      <SelectedWork />
      <Services />
      <WorkingStyle />
      <Experience />
      <Contact />
    </SiteShell>
  );
}
