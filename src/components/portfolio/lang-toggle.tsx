"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PortfolioLang } from "@/lib/portfolio-content";
import { usePortfolioLang } from "./lang-context";

const LANGS: { key: PortfolioLang; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "de", label: "DE" },
];

export function LangToggle() {
  const { lang, langHrefs } = usePortfolioLang();

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-white/12 text-[12.5px] font-semibold">
      {LANGS.map(({ key, label }) => (
        <Link
          key={key}
          href={langHrefs[key]}
          hrefLang={key}
          aria-current={lang === key ? "true" : undefined}
          className={cn(
            "px-[13px] py-[7px] font-sans no-underline",
            lang === key ? "font-bold text-[#0c0c11]" : "font-semibold text-[#9a98a6]",
          )}
          style={lang === key ? { background: "linear-gradient(100deg,#b57cff,#4fd6c6)" } : undefined}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
