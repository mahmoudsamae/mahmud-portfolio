"use client";

import { Download, GraduationCap } from "lucide-react";
import { DraftBadge } from "./draft-badge";
import { GhostText } from "./ghost-text";
import { Reveal } from "./reveal";
import { usePortfolioLang } from "./lang-context";

export function CvButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      rel="nofollow"
      className="pf-arrowbtn inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-[22px] py-[13px] text-[15px] font-semibold text-[#f2f0f7] no-underline"
    >
      <Download size={16} strokeWidth={2.4} />
      {label}
    </a>
  );
}

export function About() {
  const { t, about } = usePortfolioLang();
  if (!about) return null;

  return (
    <section
      id="about"
      data-screen-label="About"
      className="relative overflow-hidden border-t border-white/5 px-6 py-[88px] sm:px-[44px]"
    >
      <GhostText className="left-1/2 top-6 text-[clamp(90px,17vw,270px)]">ABOUT</GhostText>

      <div className="relative z-[1] mx-auto max-w-[1000px]">
        {about.draft && <DraftBadge label={t.draftBadge} />}
        <Reveal className="mb-10">
          <h2 className="m-0 font-space text-[clamp(34px,5vw,64px)] font-bold tracking-[-0.03em]">
            <span className="text-[#4fd6c6]">/</span>
            {about.title}
          </h2>
        </Reveal>

        <Reveal className="flex max-w-[760px] flex-col gap-5 text-[17px] leading-[1.7] text-[#b9b7c4]">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </Reveal>

        {about.degreeLine && (
          <Reveal className="mt-9">
            <p className="m-0 inline-flex max-w-[760px] items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[15px] leading-[1.55] text-[#d6d4de]">
              <GraduationCap size={20} className="mt-[2px] flex-none text-[#b57cff]" aria-hidden />
              {about.degreeLine}
            </p>
          </Reveal>
        )}

        {about.cvUrl && (
          <Reveal className="mt-7">
            <CvButton href={about.cvUrl} label={about.cvLabel} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
