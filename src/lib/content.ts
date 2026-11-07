import "server-only";
import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import keystaticConfig, { LABEL_KEYS, type LabelKey } from "../../keystatic.config";
import type {
  DemoStatus,
  Localized,
  PortfolioContentConfig,
  PortfolioLang,
  PortfolioStrings,
  ProjectCategory,
  WorkItem,
} from "./portfolio-content";

const reader = createReader(process.cwd(), keystaticConfig);

const MAX_FEATURED = 3;

async function required<T>(name: string, read: () => Promise<T | null>): Promise<T> {
  const value = await read();
  if (!value) throw new Error(`Keystatic content "${name}" is missing (content/${name}.yaml).`);
  return value;
}

export const getProjects = cache(async () => {
  const entries = await reader.collections.projects.all();
  return entries
    .map(({ slug, entry }) => ({
      ...entry,
      slug,
      category: entry.category as ProjectCategory,
      demoStatus: entry.demoStatus as DemoStatus,
      order: entry.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
});

export type Project = Awaited<ReturnType<typeof getProjects>>[number];

export const getProject = cache(async (slug: string) => (await getProjects()).find((p) => p.slug === slug) ?? null);

export const getLabels = cache(async () => required("labels", () => reader.singletons.labels.read()));

export const getPortfolioContent = cache(async (): Promise<PortfolioContentConfig> => {
  const [site, services, resume, labels, projects] = await Promise.all([
    required("site", () => reader.singletons.site.read()),
    required("services", () => reader.singletons.services.read()),
    required("resume", () => reader.singletons.resume.read()),
    getLabels(),
    getProjects(),
  ]);

  const featuredCount = projects.filter((p) => p.featured).length;
  if (featuredCount > MAX_FEATURED) {
    console.warn(
      `[content] ${featuredCount} projects are marked featured; the homepage shows the first ${MAX_FEATURED} by order.`,
    );
  }

  const strings = (lang: PortfolioLang): PortfolioStrings => ({
    ...(Object.fromEntries(LABEL_KEYS.map(([key]) => [key, labels[key][lang]])) as Record<LabelKey, string>),
    avail: site.availability[lang],
    role: site.role[lang],
    heroDesc: site.heroDesc[lang],
  });

  const statValue = (stat: (typeof site.heroStats)[number]) => {
    if (stat.kind === "projectsInUse") return String(projects.filter((p) => p.category === "im-einsatz").length);
    if (stat.kind === "services") return String(services.items.length);
    return stat.value;
  };

  const works: WorkItem[] = projects.map((p) => ({
    slug: p.slug,
    category: p.category,
    featured: p.featured,
    order: p.order,
    badge: p.badge,
    studio: p.studio,
    title: p.title,
    tag: p.tag,
    desc: p.summary,
    imageUrl: p.coverImage,
  }));

  return {
    heroPhotoUrl: site.heroPhoto ?? "",
    contactEmail: site.contactEmail,
    contactPhone: site.contactPhone,
    contactLocation: site.contactLocation as Localized,
    str: { de: strings("de"), en: strings("en") },
    works,
    services: services.items.map((s) => ({ ...s, title: s.title as Localized, desc: s.desc as Localized })),
    experiences: resume.experiences.map((e) => ({ ...e, role: e.role as Localized, date: e.date as Localized })),
    education: resume.education.map((e) => ({ ...e, role: e.role as Localized, date: e.date as Localized })),
    languages: resume.languages as Localized[],
    socials: [...site.socials],
    heroSkills: [...site.heroSkills],
    heroStats: site.heroStats.map((s) => ({ value: statValue(s), label: s.label as Localized })),
  };
});
