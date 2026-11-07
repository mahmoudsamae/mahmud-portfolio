import type { LabelKey } from "../../keystatic.config";

// Shapes the portfolio components work with. The content itself lives in the
// Keystatic files under content/ and is read on the server by src/lib/content.ts.

export type PortfolioLang = "en" | "de";
export type Localized = Record<PortfolioLang, string>;

export type PortfolioStrings = Record<LabelKey, string> & {
  avail: string;
  role: string;
  heroDesc: string;
};

export type ProjectCategory = "automation" | "im-einsatz" | "web";
export type DemoStatus = "live" | "offline" | "comingSoon" | "none";

export type WorkItem = {
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  badge: string;
  studio: string;
  title: Localized;
  tag: string;
  desc: Localized;
  imageUrl: string | null;
};

export type ServiceItem = {
  n: string;
  title: Localized;
  tag: string;
  desc: Localized;
};

export type TimelineItem = {
  co: string;
  role: Localized;
  date: Localized;
  note: Localized;
};

export type AboutContent = {
  /** false: approved in the CMS; true: unapproved draft, only rendered in local builds */
  draft: boolean;
  title: Localized;
  text: Localized;
  degreeLine: Localized;
  cvUrl: string | null;
  cvLabel: Localized;
};

export type WorkingStyleContent = {
  draft: boolean;
  title: Localized;
  intro: Localized;
  items: { title: Localized; text: Localized }[];
  exampleLabel: Localized;
  exampleUrl: string | null;
};

export type SocialItem = { name: string; letter: string; href: string };

export type HeroStat = { value: string; label: Localized };

export type PortfolioContentConfig = {
  heroPhotoUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: Localized;
  str: Record<PortfolioLang, PortfolioStrings>;
  works: WorkItem[];
  services: ServiceItem[];
  experiences: TimelineItem[];
  otherExperience: TimelineItem[];
  education: TimelineItem[];
  languages: Localized[];
  socials: SocialItem[];
  heroSkills: string[];
  heroStats: HeroStat[];
  /** null when not approved and drafts are hidden (production) */
  about: AboutContent | null;
  workingStyle: WorkingStyleContent | null;
};

export const projectsIndexHref = (lang: PortfolioLang) => (lang === "de" ? "/de/projekte" : "/en/projects");
export const projectHref = (lang: PortfolioLang, slug: string) => `${projectsIndexHref(lang)}/${slug}`;

// Fields still marked "TODO" in the CMS are treated as empty and never rendered.
export const isFilled = (value: string | null | undefined): value is string =>
  Boolean(value && value.trim() && !value.trim().startsWith("TODO"));
