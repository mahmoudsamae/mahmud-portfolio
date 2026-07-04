"use client";

import { useMemo, useState } from "react";
import { defaultSiteConfig, SITE_CONFIG_KEY, SiteConfig } from "@/lib/site-config";

function mergeSiteConfig(raw: unknown): SiteConfig {
  const parsed = (raw ?? {}) as Partial<SiteConfig>;
  return {
    ...defaultSiteConfig,
    ...parsed,
    profile: { ...defaultSiteConfig.profile, ...(parsed.profile ?? {}) },
    contact: { ...defaultSiteConfig.contact, ...(parsed.contact ?? {}) },
    appearance: { ...defaultSiteConfig.appearance, ...(parsed.appearance ?? {}) },
    sections: { ...defaultSiteConfig.sections, ...(parsed.sections ?? {}) },
    projects: parsed.projects ?? defaultSiteConfig.projects,
    caseStudies: parsed.caseStudies ?? defaultSiteConfig.caseStudies,
    thinkingPoints: parsed.thinkingPoints ?? defaultSiteConfig.thinkingPoints,
    experienceItems: parsed.experienceItems ?? defaultSiteConfig.experienceItems,
    customSections: parsed.customSections ?? defaultSiteConfig.customSections,
    footer: { ...defaultSiteConfig.footer, ...(parsed.footer ?? {}) },
  };
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window === "undefined") return defaultSiteConfig;
    const raw = localStorage.getItem(SITE_CONFIG_KEY);
    if (!raw) return defaultSiteConfig;

    try {
      return mergeSiteConfig(JSON.parse(raw));
    } catch {
      return defaultSiteConfig;
    }
  });

  const api = useMemo(
    () => ({
      config,
      save: (next: SiteConfig) => {
        setConfig(next);
        localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(next));
      },
      reset: () => {
        setConfig(defaultSiteConfig);
        localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(defaultSiteConfig));
      },
    }),
    [config],
  );

  return api;
}
