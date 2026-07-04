import { StudioLogin } from "@/components/studio-login";
import { Locale, locales } from "@/lib/dictionary";
import { notFound } from "next/navigation";

export default async function StudioLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return <StudioLogin locale={locale as Locale} />;
}
