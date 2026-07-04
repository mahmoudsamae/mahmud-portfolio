"use client";

import { HiddenAdminTrigger } from "@/components/hidden-admin-trigger";
import { usePortfolioLang } from "./lang-context";

export function SiteFooter({ locale }: { locale: string }) {
  const { t } = usePortfolioLang();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 px-6 py-[26px] text-[13px] text-[#6b6976] sm:px-[44px]">
      <HiddenAdminTrigger locale={locale}>
        <span className="font-space text-sm font-semibold text-[#9a98a6]">MAHMUD AL HUSSEN</span>
      </HiddenAdminTrigger>
      <span>© 2026 — {t.role}</span>
    </footer>
  );
}
