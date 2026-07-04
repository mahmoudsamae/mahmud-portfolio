"use client";

import { GhostText } from "./ghost-text";
import { Reveal } from "./reveal";
import { usePortfolioLang } from "./lang-context";

export function Experience() {
  const { t, experiences, education, languages } = usePortfolioLang();

  return (
    <section id="experience" data-screen-label="Experience" className="px-6 py-11 sm:px-[44px]">
      <Reveal
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] px-6 py-14 sm:px-12"
        style={{ background: "linear-gradient(160deg,#0d0d12,#0a0a0e)" }}
      >
        <GhostText className="left-[26px] top-5 text-[clamp(80px,15vw,220px)]">EXPERIENCE</GhostText>

        <div className="relative z-[1]">
          <div className="mb-[30px] flex flex-wrap items-baseline justify-between gap-5">
            <h2 className="m-0 font-space text-[clamp(32px,4.6vw,58px)] font-bold tracking-[-0.03em]">
              <span className="text-[#4fd6c6]">/</span>
              {t.expTitle}
            </h2>
            <span className="text-[15px] text-[#9a98a6]">{t.expYears}</span>
          </div>

          <div className="pf-exp-grid grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
            <div>
              {experiences.map((ex, i) => (
                <div
                  key={`${ex.co}-${i}`}
                  className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-1 py-5"
                >
                  <div>
                    <div className="font-space text-lg font-semibold tracking-[-0.01em]">{ex.co}</div>
                    <div className="mt-1 text-sm text-[#8a8894]">{ex.role}</div>
                  </div>
                  <div className="whitespace-nowrap text-[13px] text-[#8a8894]">{ex.date}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="border-t border-white/[0.07] px-1 pb-[6px] pt-5 font-space text-xs uppercase tracking-[0.14em] text-[#4fd6c6]">
                {t.eduTitle}
              </div>
              {education.map((ed, i) => (
                <div key={`${ed.co}-${i}`} className="flex items-center justify-between gap-4 px-1 py-3">
                  <div>
                    <div className="font-space text-[17px] font-semibold tracking-[-0.01em]">{ed.co}</div>
                    <div className="mt-[3px] text-[13.5px] text-[#8a8894]">{ed.role}</div>
                  </div>
                  <div className="whitespace-nowrap text-[13px] text-[#8a8894]">{ed.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-[22px]">
            <span className="font-space text-xs uppercase tracking-[0.14em] text-[#b57cff]">{t.langTitle}</span>
            {languages.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="rounded-full border border-white/[0.12] bg-white/[0.03] px-[15px] py-2 text-[13.5px] text-[#c9c7d2]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
