"use client";

import { AvailabilityBadge } from "./availability-badge";
import { ArrowLink } from "./arrow-link";
import { LangToggle } from "./lang-toggle";
import { usePortfolioLang } from "./lang-context";

export function Nav() {
  const { t } = usePortfolioLang();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-5 py-5 sm:px-[34px]">
      <AvailabilityBadge label={t.avail} />

      <div className="pf-hide-sm hidden items-center gap-[30px] text-[14.5px] font-medium text-[#a5a3b0] min-[821px]:flex">
        <a href="#work" className="pf-navlink text-inherit no-underline">
          {t.nav.work} <span className="text-[11px] text-[#6b6976]">[05]</span>
        </a>
        <a href="#service" className="pf-navlink text-inherit no-underline">
          {t.nav.service} <span className="text-[11px] text-[#6b6976]">[04]</span>
        </a>
        <a href="#experience" className="pf-navlink text-inherit no-underline">
          {t.nav.experience}
        </a>
        <a href="#contact" className="pf-navlink text-inherit no-underline">
          {t.nav.contact}
        </a>
      </div>

      <div className="flex items-center gap-[14px]">
        <LangToggle />
        <ArrowLink
          href="#contact"
          className="whitespace-nowrap bg-[#f2f0f7] px-[18px] py-[11px] text-sm text-[#0c0c11]"
        >
          {t.letsTalk}
        </ArrowLink>
      </div>
    </nav>
  );
}
