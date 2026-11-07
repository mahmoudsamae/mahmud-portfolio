"use client";

import { ArrowLink } from "./arrow-link";
import { DraftBadge } from "./draft-badge";
import { GhostText } from "./ghost-text";
import { Reveal } from "./reveal";
import { usePortfolioLang } from "./lang-context";

export function WorkingStyle() {
  const { t, workingStyle } = usePortfolioLang();
  if (!workingStyle) return null;

  return (
    <section
      id="how-i-work"
      data-screen-label="How I work"
      className="relative overflow-hidden border-t border-white/5 px-6 py-[88px] sm:px-[44px]"
    >
      <GhostText className="left-1/2 top-6 text-[clamp(90px,17vw,270px)]">PROCESS</GhostText>

      <div className="relative z-[1] mx-auto max-w-[1000px]">
        {workingStyle.draft && <DraftBadge label={t.draftBadge} />}
        <Reveal className="mb-6">
          <h2 className="m-0 font-space text-[clamp(34px,5vw,64px)] font-bold tracking-[-0.03em]">
            <span className="text-[#b57cff]">/</span>
            {workingStyle.title}
          </h2>
        </Reveal>
        {workingStyle.intro && (
          <Reveal>
            <p className="m-0 mb-10 max-w-[640px] text-[16px] leading-[1.6] text-[#9a98a6]">{workingStyle.intro}</p>
          </Reveal>
        )}

        <Reveal>
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {workingStyle.items.map((item, i) => (
              <li key={i} className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6">
                <span className="font-space text-[13px] text-[#8a8894]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 mb-3 mt-1 font-space text-[22px] font-semibold tracking-[-0.01em]">{item.title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#b9b7c4]">{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {workingStyle.exampleUrl && (
          <Reveal className="mt-8">
            <ArrowLink
              href={workingStyle.exampleUrl}
              className="bg-[#f2f0f7] px-[22px] py-[13px] text-[15px] text-[#0c0c11]"
            >
              {workingStyle.exampleLabel}
            </ArrowLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
