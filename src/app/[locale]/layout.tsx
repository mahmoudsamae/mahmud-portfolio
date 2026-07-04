import { notFound } from "next/navigation";
import { ConditionalSiteHeader } from "@/components/conditional-site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { dictionaries, locales, type Locale } from "@/lib/dictionary";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const t = dictionaries[locale as Locale];

  return (
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
  );
}
