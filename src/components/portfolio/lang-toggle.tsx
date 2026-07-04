"use client";

import { cn } from "@/lib/utils";
import { usePortfolioLang } from "./lang-context";

export function LangToggle() {
  const { lang, setLang } = usePortfolioLang();

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-white/12 text-[12.5px] font-semibold">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "px-[13px] py-[7px] font-sans",
          lang === "en"
            ? "font-bold text-[#0c0c11]"
            : "font-semibold text-[#9a98a6]",
        )}
        style={lang === "en" ? { background: "linear-gradient(100deg,#b57cff,#4fd6c6)" } : undefined}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("de")}
        className={cn(
          "px-[13px] py-[7px] font-sans",
          lang === "de"
            ? "font-bold text-[#0c0c11]"
            : "font-semibold text-[#9a98a6]",
        )}
        style={lang === "de" ? { background: "linear-gradient(100deg,#b57cff,#4fd6c6)" } : undefined}
      >
        DE
      </button>
    </div>
  );
}
