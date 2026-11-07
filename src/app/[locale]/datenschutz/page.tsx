import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/portfolio/legal-page";
import { SiteShell } from "@/components/portfolio/portfolio-site";
import { getLegalPage, getPortfolioContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// German only: /en/datenschutz is a 404, and English pages link here directly.
export async function generateMetadata(): Promise<Metadata> {
  const { title } = await getLegalPage("datenschutz");
  return pageMetadata({
    lang: "de",
    paths: { de: "/de/datenschutz" },
    title: `${title} | Mahmud Al Hussen`,
    description: `${title} der Website von Mahmud Al Hussen.`,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "de") notFound();
  const [content, page] = await Promise.all([getPortfolioContent(), getLegalPage("datenschutz")]);

  return (
    <SiteShell lang="de" langHrefs={{ de: "/de/datenschutz", en: "/en" }} content={content}>
      <LegalPage title={page.title} body={page.body} />
    </SiteShell>
  );
}
