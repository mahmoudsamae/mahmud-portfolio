"use client";

import { AvailabilityBadge } from "./availability-badge";
import { ArrowLink } from "./arrow-link";
import { LangToggle } from "./lang-toggle";
import { usePortfolioLang } from "./lang-context";

export function Nav() {
  const { t, lang, works, services } = usePortfolioLang();
  // Absolute anchors so the links also work from project pages.
  const home = `/${lang}`;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-5 py-5 sm:px-[34px]">
      <AvailabilityBadge label={t.avail} />

      <div className="pf-hide-sm hidden items-center gap-[30px] text-[14.5px] font-medium text-[#a5a3b0] min-[821px]:flex">
        <a href={`${home}#work`} className="pf-navlink text-inherit no-underline">
          {t.navWork} <span className="text-[11px] text-[#6b6976]">[{pad(works.length)}]</span>
        </a>
        <a href={`${home}#service`} className="pf-navlink text-inherit no-underline">
          {t.navService} <span className="text-[11px] text-[#6b6976]">[{pad(services.length)}]</span>
        </a>
        <a href={`${home}#experience`} className="pf-navlink text-inherit no-underline">
          {t.navExperience}
        </a>
        <a href={`${home}#contact`} className="pf-navlink text-inherit no-underline">
          {t.navContact}
        </a>
      </div>

      <div className="flex items-center gap-[14px]">
        <LangToggle />
        <ArrowLink
          href={`${home}#contact`}
          className="whitespace-nowrap bg-[#f2f0f7] px-[18px] py-[11px] text-sm text-[#0c0c11]"
        >
          {t.letsTalk}
        </ArrowLink>
      </div>
    </nav>
  );
}
