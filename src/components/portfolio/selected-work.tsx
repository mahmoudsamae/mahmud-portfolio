"use client";

import { useState } from "react";
import { ArrowLink } from "./arrow-link";
import { GhostText } from "./ghost-text";
import { Reveal } from "./reveal";
import { WorkCard } from "./work-card";
import { cn } from "@/lib/utils";
import { projectsIndexHref, type ProjectCategory } from "@/lib/portfolio-content";
import { usePortfolioLang } from "./lang-context";

type FilterKey = "all" | ProjectCategory;

const HOMEPAGE_LIMIT = 3;

// "featured": homepage block with up to 3 featured projects.
// "all": the project list page with category filters.
export function SelectedWork({ mode = "featured" }: { mode?: "featured" | "all" }) {
  const { t, lang, works, socials } = usePortfolioLang();
  const githubHref = socials.find((s) => s.name.toLowerCase() === "github")?.href;
  const [filter, setFilter] = useState<FilterKey>("all");

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.filterAll },
    { key: "automation", label: t.catAutomation },
    { key: "im-einsatz", label: t.catInUse },
    { key: "web", label: t.catWeb },
  ];

  const shown = mode === "featured" ? works.filter((w) => w.featured).slice(0, HOMEPAGE_LIMIT) : works;
  const Heading = mode === "featured" ? "h2" : "h1";

  return (
    <section
      id="work"
      data-screen-label="Selected Work"
      className="relative overflow-hidden border-t border-white/5 px-6 py-[88px] sm:px-[44px]"
    >
      <GhostText className="left-1/2 top-6 text-[clamp(90px,17vw,270px)]">PROJECTS</GhostText>

      <div className="relative z-[1]">
        <Reveal className="mb-[34px] text-center">
          <Heading className="m-0 font-space text-[clamp(34px,5vw,64px)] font-bold tracking-[-0.03em]">
            <span className="text-[#4fd6c6]">/</span>
            {mode === "featured" ? t.workTitle : t.projectsPageTitle}
          </Heading>
        </Reveal>

        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          {mode === "all" ? (
            <Reveal className="flex flex-wrap gap-[10px]">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "rounded-full border px-[18px] py-[9px] font-sans text-sm transition-colors",
                    filter === f.key
                      ? "border-[#f2f0f7] bg-[#f2f0f7] text-[#0c0c11]"
                      : "border-white/[0.12] bg-transparent text-[#c9c7d2]",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </Reveal>
          ) : (
            <Reveal>
              <ArrowLink
                href={projectsIndexHref(lang)}
                className="bg-[#f2f0f7] px-[18px] py-[10px] text-sm text-[#0c0c11]"
                iconSize={13}
              >
                {t.allProjects}
              </ArrowLink>
            </Reveal>
          )}
          {githubHref && githubHref !== "#" && (
            <Reveal>
              <ArrowLink
                href={githubHref}
                className="border border-white/[0.12] bg-white/[0.06] px-[18px] py-[10px] text-sm text-[#f2f0f7]"
                iconSize={13}
              >
                {t.viewAll}
              </ArrowLink>
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((work, i) => (
            <WorkCard
              key={work.slug}
              work={work}
              index={i}
              visible={filter === "all" || work.category === filter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
