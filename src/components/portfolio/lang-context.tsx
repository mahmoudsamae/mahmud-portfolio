"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import {
  PortfolioContentConfig,
  PortfolioLang,
  PortfolioStrings,
  ServiceItem,
  SocialItem,
  TimelineItem,
  WorkItem,
} from "@/lib/portfolio-content";

const LANG_STORAGE_KEY = "port_lang";
const langListeners = new Set<() => void>();

let cachedLang: PortfolioLang | null = null;

function emitLangChange() {
  langListeners.forEach((listener) => listener());
}

function subscribeLang(listener: () => void) {
  langListeners.add(listener);
  return () => langListeners.delete(listener);
}

function getLangSnapshot(): PortfolioLang | null {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    cachedLang = stored === "en" || stored === "de" ? stored : null;
  } catch {
    cachedLang = null;
  }
  return cachedLang;
}

function getLangServerSnapshot(): PortfolioLang | null {
  return null;
}

function persistLang(lang: PortfolioLang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // localStorage unavailable
  }
  emitLangChange();
}

type LangContextValue = {
  lang: PortfolioLang;
  setLang: (lang: PortfolioLang) => void;
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
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  initialLang,
  content,
  children,
}: {
  initialLang: PortfolioLang;
  content: PortfolioContentConfig;
  children: React.ReactNode;
}) {
  const storedLang = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot);
  const lang = storedLang ?? initialLang;
  const setLang = useCallback((next: PortfolioLang) => persistLang(next), []);

  const value = useMemo<LangContextValue>(() => {
    return {
      lang,
      setLang,
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
    };
  }, [lang, setLang, content]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function usePortfolioLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("usePortfolioLang must be used within LangProvider");
  return ctx;
}
