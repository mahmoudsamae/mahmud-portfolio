"use client";

import { createContext, useContext, useMemo } from "react";
import { projectHref } from "@/lib/portfolio-content";
import type {
  PortfolioContentConfig,
  PortfolioLang,
  PortfolioStrings,
  ServiceIcon,
  SocialItem,
  TimelineIcon,
  TimelineItem,
  WorkItem,
} from "@/lib/portfolio-content";

type Localize<T, K extends keyof T> = Omit<T, K> & Record<K, string>;

export type LocalizedWork = Localize<WorkItem, "title" | "desc">;
export type LocalizedTimeline = { co: string; icon: TimelineIcon; role: string; date: string; note: string };
export type LocalizedService = {
  n: string;
  title: string;
  desc: string;
  icon: ServiceIcon;
  tools: string[];
  link: { href: string; label: string; external: boolean } | null;
};

type LangContextValue = {
  lang: PortfolioLang;
  /** URL of the current page in each language; the language switch is a plain link. */
  langHrefs: Record<PortfolioLang, string>;
  t: PortfolioStrings;
  heroPhotoUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  works: LocalizedWork[];
  services: LocalizedService[];
  otherTools: string[];
  experiences: LocalizedTimeline[];
  otherExperience: LocalizedTimeline[];
  education: LocalizedTimeline[];
  languages: string[];
  socials: SocialItem[];
  heroSkills: string[];
  heroStats: { value: string; label: string }[];
  cvUrl: string | null;
  cvLabel: string;
};

const LangContext = createContext<LangContextValue | null>(null);

const HOME_HREFS: Record<PortfolioLang, string> = { de: "/de", en: "/en" };

export function LangProvider({
  lang,
  langHrefs = HOME_HREFS,
  content,
  children,
}: {
  lang: PortfolioLang;
  langHrefs?: Record<PortfolioLang, string>;
  content: PortfolioContentConfig;
  children: React.ReactNode;
}) {
  const value = useMemo<LangContextValue>(() => {
    const localizeTimeline = (e: TimelineItem) => ({
      co: e.co[lang],
      icon: e.icon,
      role: e.role[lang],
      date: e.date[lang],
      note: e.note[lang],
    });
    return {
      lang,
      langHrefs,
      t: content.str[lang],
      heroPhotoUrl: content.heroPhotoUrl,
      contactEmail: content.contactEmail,
      contactPhone: content.contactPhone,
      contactLocation: content.contactLocation[lang],
      works: content.works.map((w) => ({ ...w, title: w.title[lang], desc: w.desc[lang] })),
      services: content.services.map((s) => ({
        ...s,
        title: s.title[lang],
        desc: s.desc[lang],
        link:
          s.link?.kind === "project"
            ? { href: projectHref(lang, s.link.slug), label: s.link.title[lang], external: false }
            : s.link
              ? { href: s.link.href, label: s.link.title, external: true }
              : null,
      })),
      otherTools: content.otherTools,
      experiences: content.experiences.map(localizeTimeline),
      otherExperience: content.otherExperience.map(localizeTimeline),
      education: content.education.map(localizeTimeline),
      languages: content.languages.map((l) => l[lang]),
      socials: content.socials,
      heroSkills: content.heroSkills,
      heroStats: content.heroStats.map((s) => ({ value: s.value, label: s.label[lang] })),
      cvUrl: content.cvUrl,
      cvLabel: content.cvLabel[lang],
    };
  }, [lang, langHrefs, content]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function usePortfolioLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("usePortfolioLang must be used within LangProvider");
  return ctx;
}
