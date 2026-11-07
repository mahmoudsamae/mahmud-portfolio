import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { ConditionalSiteHeader } from "@/components/conditional-site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { dictionaries } from "@/lib/dictionary";
import { fontVariables } from "@/lib/fonts";
import { isSiteLocale, siteLocales } from "@/lib/locales";
import { readPortfolioContent } from "@/lib/portfolio-content-file";

// This is the root layout: it sits under [locale] so <html lang> always matches the URL.
export const dynamicParams = false;

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isSiteLocale(locale)) return {};
  const t = readPortfolioContent().str[locale];
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

  const t = dictionaries[locale];

  return (
    <html lang={locale} suppressHydrationWarning className={fontVariables}>
      <body>
        <ThemeProvider>
          <div className="min-h-screen">
            <ConditionalSiteHeader
              locale={locale}
              labels={{
                about: t.nav.about,
                projects: t.nav.projects,
                thinking: t.nav.thinking,
                contact: t.nav.contact,
              }}
            />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
