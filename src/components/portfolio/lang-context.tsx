"use client";

import { createContext, useContext, useMemo } from "react";
import type {
  PortfolioContentConfig,
  PortfolioLang,
  PortfolioStrings,
  SocialItem,
  TimelineItem,
  WorkItem,
} from "@/lib/portfolio-content";

type Localize<T, K extends keyof T> = Omit<T, K> & Record<K, string>;

export type LocalizedWork = Localize<WorkItem, "title" | "desc">;
export type LocalizedTimeline = { co: string; role: string; date: string; note: string };

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
  services: { n: string; title: string; tag: string; desc: string }[];
  experiences: LocalizedTimeline[];
  otherExperience: LocalizedTimeline[];
  education: LocalizedTimeline[];
  languages: string[];
  socials: SocialItem[];
  heroSkills: string[];
  heroStats: { value: string; label: string }[];
  about: {
    draft: boolean;
    title: string;
    paragraphs: string[];
    degreeLine: string;
    cvUrl: string | null;
    cvLabel: string;
  } | null;
  workingStyle: {
    draft: boolean;
    title: string;
    intro: string;
    items: { title: string; text: string }[];
    exampleLabel: string;
    exampleUrl: string | null;
  } | null;
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
      co: e.co,
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
      services: content.services.map((s) => ({ ...s, title: s.title[lang], desc: s.desc[lang] })),
      experiences: content.experiences.map(localizeTimeline),
      otherExperience: content.otherExperience.map(localizeTimeline),
      education: content.education.map(localizeTimeline),
      languages: content.languages.map((l) => l[lang]),
      socials: content.socials,
      heroSkills: content.heroSkills,
      heroStats: content.heroStats.map((s) => ({ value: s.value, label: s.label[lang] })),
      about: content.about && {
        draft: content.about.draft,
        title: content.about.title[lang],
        paragraphs: content.about.text[lang]
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean),
        degreeLine: content.about.degreeLine[lang],
        cvUrl: content.about.cvUrl,
        cvLabel: content.about.cvLabel[lang],
      },
      workingStyle: content.workingStyle && {
        draft: content.workingStyle.draft,
        title: content.workingStyle.title[lang],
        intro: content.workingStyle.intro[lang],
        items: content.workingStyle.items.map((i) => ({ title: i.title[lang], text: i.text[lang] })),
        exampleLabel: content.workingStyle.exampleLabel[lang],
        exampleUrl: content.workingStyle.exampleUrl,
      },
    };
  }, [lang, langHrefs, content]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function usePortfolioLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("usePortfolioLang must be used within LangProvider");
  return ctx;
}
