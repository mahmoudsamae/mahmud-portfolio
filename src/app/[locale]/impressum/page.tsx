import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/portfolio/legal-page";
import { SiteShell } from "@/components/portfolio/portfolio-site";
import { getLegalPage, getPortfolioContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// German only: /en/impressum is a 404, and English pages link here directly.
export async function generateMetadata(): Promise<Metadata> {
  const { title } = await getLegalPage("impressum");
  // Linked in the footer but kept out of search results.
  const meta = pageMetadata({
    lang: "de",
    paths: { de: "/de/impressum" },
    title: `${title} | Mahmud Al Hussen`,
    description: `${title} der Website von Mahmud Al Hussen.`,
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "de") notFound();
  const [content, page] = await Promise.all([getPortfolioContent(), getLegalPage("impressum")]);

  return (
    <SiteShell lang="de" langHrefs={{ de: "/de/impressum", en: "/en" }} content={content}>
      <LegalPage title={page.title} body={page.body} />
    </SiteShell>
  );
}
