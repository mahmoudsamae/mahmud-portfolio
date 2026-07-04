import { PortfolioSite } from "@/components/portfolio/portfolio-site";
import { Locale, locales } from "@/lib/dictionary";
import { readPortfolioContent } from "@/lib/portfolio-content-file";
import { notFound } from "next/navigation";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = readPortfolioContent();

  return <PortfolioSite locale={locale} content={content} />;
}
