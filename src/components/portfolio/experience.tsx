"use client";

import { BriefcaseBusiness, Code2, GraduationCap, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineIcon } from "@/lib/portfolio-content";
import { GhostText } from "./ghost-text";
import { LottieIcon } from "./lottie-icon";
import { Reveal } from "./reveal";
import { usePortfolioLang, type LocalizedTimeline } from "./lang-context";

const ICONS: Record<TimelineIcon, typeof Code2> = {
  code: Code2,
  work: BriefcaseBusiness,
  study: GraduationCap,
  language: Languages,
};

function TimelineEntry({
  entry,
  index,
  from,
  highlight,
}: {
  entry: LocalizedTimeline;
  index: number;
  from: "left" | "right";
  highlight?: boolean;
}) {
  const Icon = ICONS[entry.icon] ?? BriefcaseBusiness;
  return (
    <Reveal from={from} delay={Math.min(index * 0.07, 0.3)} className="relative pb-7 pl-[58px] last:pb-0">
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 z-[1] flex h-10 w-10 items-center justify-center rounded-xl border",
          highlight
            ? "border-transparent text-[#0c0c11] shadow-[0_8px_24px_-6px_rgba(181,124,255,.6)]"
            : "border-white/[0.12] bg-[#131318] text-[#c9c7d2]",
        )}
        style={highlight ? { background: "linear-gradient(135deg,#b57cff,#4fd6c6)" } : undefined}
      >
        <Icon size={18} strokeWidth={2} />
      </span>
      <div
        className={cn(
          "rounded-2xl border px-4 py-[14px] transition-colors duration-300",
          highlight
            ? "border-[#b57cff]/30 bg-[linear-gradient(120deg,rgba(150,90,255,.14),rgba(79,214,198,.06))]"
            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]",
        )}
      >
        {entry.date && (
          <div className="mb-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-[10px] py-[3px] text-[12px] text-[#c9c7d2]">
            {entry.date}
          </div>
        )}
        <div className="font-space text-[17px] font-semibold tracking-[-0.01em] text-[#f2f0f7]">{entry.co}</div>
        <div className={cn("mt-1 text-[14px] leading-[1.45]", highlight ? "text-[#e5e3ec]" : "text-[#b9b7c4]")}>
          {entry.role}
        </div>
        {entry.note && <div className="mt-2 text-[13.5px] leading-[1.5] text-[#8a8894]">{entry.note}</div>}
      </div>
    </Reveal>
  );
}

// A vertical line behind the icons ties the entries of one column together.
function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute bottom-5 left-[19px] top-5 w-px bg-gradient-to-b from-[#b57cff]/60 via-white/10 to-[#4fd6c6]/40"
      />
      {children}
    </div>
  );
}

function ColumnTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3 className="m-0 mb-5 font-space text-xs font-normal uppercase tracking-[0.14em]" style={{ color }}>
      {children}
    </h3>
  );
}

export function Experience() {
  const { t, experiences, otherExperience, education, languages } = usePortfolioLang();

  return (
    <section id="experience" data-screen-label="Experience" className="px-4 py-11 sm:px-[44px]">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] px-5 py-12 sm:px-12 sm:py-14"
        style={{ background: "linear-gradient(160deg,#0d0d12,#0a0a0e)" }}
      >
        <GhostText className="left-[26px] top-5 text-[clamp(80px,15vw,220px)]">EXPERIENCE</GhostText>

        <div className="relative z-[1]">
          <Reveal from="left" className="mb-10 flex flex-wrap items-baseline justify-between gap-5">
            <h2 className="m-0 font-space text-[clamp(32px,4.6vw,58px)] font-bold tracking-[-0.03em]">
              <LottieIcon name="experience" className="mr-[0.22em] h-[0.95em] w-[0.95em] align-[-0.12em]" />
              {t.expTitle}
            </h2>
            <span className="text-[15px] text-[#9a98a6]">{t.expYears}</span>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            <div>
              <Timeline>
                {experiences.map((entry, i) => (
                  <TimelineEntry key={`it-${entry.co}-${i}`} entry={entry} index={i} from="left" highlight />
                ))}
              </Timeline>
              {otherExperience.length > 0 && (
                <div className="mt-8">
                  <ColumnTitle color="#b57cff">{t.otherExpTitle}</ColumnTitle>
                  <Timeline>
                    {otherExperience.map((entry, i) => (
                      <TimelineEntry key={`job-${entry.co}-${i}`} entry={entry} index={i} from="left" />
                    ))}
                  </Timeline>
                </div>
              )}
            </div>
            <div>
              <ColumnTitle color="#4fd6c6">{t.eduTitle}</ColumnTitle>
              <Timeline>
                {education.map((entry, i) => (
                  <TimelineEntry key={`edu-${entry.co}-${i}`} entry={entry} index={i} from="right" />
                ))}
              </Timeline>
            </div>
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-[22px]">
            <span className="flex items-center gap-2 font-space text-xs uppercase tracking-[0.14em] text-[#b57cff]">
              <Languages size={15} aria-hidden />
              {t.langTitle}
            </span>
            {languages.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="rounded-full border border-white/[0.12] bg-white/[0.03] px-[15px] py-2 text-[13.5px] text-[#c9c7d2]"
              >
                {label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
