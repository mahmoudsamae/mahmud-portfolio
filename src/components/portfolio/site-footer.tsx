"use client";

import Link from "next/link";
import { usePortfolioLang } from "./lang-context";

// The legal pages exist in German only; English pages link to them with hrefLang="de".
export function SiteFooter() {
  const { t } = usePortfolioLang();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 py-[26px] pl-6 pr-20 text-[13px] text-[#8a8894] sm:pl-[44px] sm:pr-[104px]">
      <span className="font-space text-sm font-semibold text-[#9a98a6]">MAHMUD AL HUSSEN</span>
      <nav className="flex flex-wrap items-center gap-5" aria-label={`${t.footerImprint} / ${t.footerPrivacy}`}>
        <Link href="/de/impressum" hrefLang="de" className="text-[#9a98a6] no-underline hover:text-[#f2f0f7]">
          {t.footerImprint}
        </Link>
        <Link href="/de/datenschutz" hrefLang="de" className="text-[#9a98a6] no-underline hover:text-[#f2f0f7]">
          {t.footerPrivacy}
        </Link>
        <span>© 2026 — {t.role}</span>
      </nav>
    </footer>
  );
}
