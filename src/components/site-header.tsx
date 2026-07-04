"use client";

import { HiddenAdminTrigger } from "@/components/hidden-admin-trigger";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSiteConfig } from "@/hooks/use-site-config";

export function SiteHeader({
  locale,
  labels,
}: {
  locale: string;
  labels: { about: string; projects: string; thinking: string; contact: string };
}) {
  const { config } = useSiteConfig();
  const palette =
    config.appearance.mode === "dark"
      ? config.appearance.darkPalette
      : config.appearance.lightPalette;

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur"
      style={{
        background: `${palette.backgroundColor}cc`,
        borderColor: `${palette.primaryColor}33`,
        color: palette.textColor,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <HiddenAdminTrigger locale={locale}>
          <span className="font-space text-sm font-bold tracking-[0.2em]" style={{ color: palette.primaryColor }}>
            MAHMUD.
          </span>
        </HiddenAdminTrigger>
        <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: palette.bodyColor }}>
          <a href="#about">{labels.about}</a>
          <a href="#projects">{labels.projects}</a>
          <a href="#thinking">{labels.thinking}</a>
          <a href="#contact">{labels.contact}</a>
        </nav>
        <div className="flex items-center gap-2">
          {config.appearance.showLanguageSwitcher && <LanguageSwitcher />}
          {config.appearance.showThemeToggle && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
}
