import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { projectHref, projectsIndexHref } from "@/lib/portfolio-content";
import { SITE_URL } from "@/lib/seo";

const url = (path: string) => `${SITE_URL}${path}`;

// Both language versions of a page, each listing the other as an alternate.
function pair(de: string, en: string): MetadataRoute.Sitemap {
  const languages = { de: url(de), en: url(en) };
  return [
    { url: url(de), alternates: { languages } },
    { url: url(en), alternates: { languages } },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    ...pair("/de", "/en"),
    ...pair(projectsIndexHref("de"), projectsIndexHref("en")),
    ...projects.flatMap((p) => pair(projectHref("de", p.slug), projectHref("en", p.slug))),
  ];
}
