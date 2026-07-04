import { StudioDashboard } from "@/components/studio-dashboard";
import { Locale, locales } from "@/lib/dictionary";
import { readPortfolioContent } from "@/lib/portfolio-content-file";
import { isStudioAuthenticated } from "@/lib/studio-auth";
import { notFound, redirect } from "next/navigation";

export default async function StudioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  if (!(await isStudioAuthenticated())) {
    redirect(`/${locale}/studio/login`);
  }

  const initialContent = readPortfolioContent();

  return <StudioDashboard initialContent={initialContent} />;
}
