import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getPortfolioContent } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { isSiteLocale, siteLocales } from "@/lib/locales";

// This is the root layout: it sits under [locale] so <html lang> always matches the URL.
export const dynamicParams = false;

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isSiteLocale(locale)) return {};
  const t = (await getPortfolioContent()).str[locale];
  return {
    title: `Mahmud Al Hussen | ${t.role}`,
    description: t.heroDesc,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();

  return (
    <html lang={locale} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
