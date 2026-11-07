"use client";

import { createContext, useContext, useMemo } from "react";
import {
  PortfolioContentConfig,
  PortfolioLang,
  PortfolioStrings,
  ServiceItem,
  SocialItem,
  TimelineItem,
  WorkItem,
} from "@/lib/portfolio-content";

type LangContextValue = {
  lang: PortfolioLang;
  /** URL of the current page in each language; the language switch is a plain link. */
  langHrefs: Record<PortfolioLang, string>;
  t: PortfolioStrings;
  heroPhotoUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  works: (Omit<WorkItem, "desc"> & { desc: string })[];
  services: (Omit<ServiceItem, "desc"> & { desc: string })[];
  experiences: (Omit<TimelineItem, "role" | "date"> & { role: string; date: string })[];
  education: (Omit<TimelineItem, "role" | "date"> & { role: string; date: string })[];
  languages: string[];
  socials: SocialItem[];
  heroSkills: string[];
  heroStats: { value: string; label: string }[];
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
    return {
      lang,
      langHrefs,
      t: content.str[lang],
      heroPhotoUrl: content.heroPhotoUrl,
      contactEmail: content.contactEmail,
      contactPhone: content.contactPhone,
      contactLocation: content.contactLocation[lang],
      works: content.works.map((w) => ({ ...w, desc: w.desc[lang] })),
      services: content.services.map((s) => ({ ...s, desc: s.desc[lang] })),
      experiences: content.experiences.map((e) => ({ ...e, role: e.role[lang], date: e.date[lang] })),
      education: content.education.map((e) => ({ ...e, role: e.role[lang], date: e.date[lang] })),
      languages: content.languages.map((l) => l[lang]),
      socials: content.socials,
      heroSkills: content.heroSkills,
      heroStats: content.heroStats.map((s) => ({ value: s.value, label: s.label[lang] })),
    };
  }, [lang, langHrefs, content]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function usePortfolioLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("usePortfolioLang must be used within LangProvider");
  return ctx;
}
