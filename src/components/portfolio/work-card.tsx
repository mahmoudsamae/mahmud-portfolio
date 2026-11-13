"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectHref } from "@/lib/portfolio-content";
import { usePortfolioLang, type LocalizedWork } from "./lang-context";
import { ProjectPlaceholder } from "./project-placeholder";
import { Reveal, type RevealFrom } from "./reveal";
import { TiltCard } from "./tilt-card";

function StatusDot({ symbol }: { symbol: string }) {
  if (symbol === "●") {
    return <span className="pf-pulse-dot inline-block h-[7px] w-[7px] flex-none rounded-full bg-[#4fd6c6]" />;
  }
  if (symbol === "◐") {
    return <span className="inline-block h-[7px] w-[7px] flex-none rounded-full bg-[#b57cff]" />;
  }
  return <span className="inline-block h-[7px] w-[7px] flex-none rounded-full border border-white/40" />;
}

// Cards come in from the left, from below and from the right, column by column.
const FROM: RevealFrom[] = ["left", "up", "right"];

// Every card has the same structure and height: fixed image ratio, title, two-line
// description, at most three tags and a status badge. The title link is stretched over
// the whole card, so the card stays clickable while a live demo button can sit on top
// (links cannot be nested).
export function WorkCard({
  work,
  index,
  visible,
}: {
  work: LocalizedWork;
  index: number;
  visible: boolean;
}) {
  const { lang, t } = usePortfolioLang();
  const [symbol, ...rest] = work.badge.split(" ");
  const badgeLabel = rest.join(" ") || work.badge;

  return (
    <Reveal
      data-cat={work.category}
      from={FROM[index % 3]}
      delay={Math.min((index % 3) * 0.09, 0.3)}
      className={cn("group h-full", !visible && "hidden")}
    >
      <TiltCard className="pf-work-card h-full rounded-[24px]">
        <div className="pf-flow-border relative flex h-full flex-col rounded-[24px] p-[1.5px] has-[[data-card-link]:focus-visible]:ring-2 has-[[data-card-link]:focus-visible]:ring-[#b57cff] has-[[data-card-link]:focus-visible]:ring-offset-4 has-[[data-card-link]:focus-visible]:ring-offset-[#131318]">
          <span className="flex h-full flex-col rounded-[23px] bg-[#131318] p-[14px]">
            <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[16px]">
              <span className="absolute left-3 top-3 z-[2] inline-flex items-center gap-[7px] rounded-full border border-white/[0.14] bg-[rgba(10,10,14,.82)] px-3 py-[6px] text-[11px] tracking-[0.06em] text-[#c9c7d2]">
                <StatusDot symbol={symbol} />
                {badgeLabel}
              </span>
              {work.draft && (
                <span className="absolute right-3 top-3 z-[2] rounded-full border border-[#ffb86b]/50 bg-[rgba(30,20,10,.85)] px-3 py-[6px] text-[11px] font-semibold tracking-[0.06em] text-[#ffcf99]">
                  DRAFT
                </span>
              )}
              <span className="relative block h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                {work.imageUrl ? (
                  <Image
                    src={work.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                    className="object-cover"
                  />
                ) : (
                  <ProjectPlaceholder title={work.title} index={index} />
                )}
              </span>
            </span>

            <span className="flex flex-1 flex-col px-2 pb-1 pt-4">
              <h3 className="m-0 mb-2 font-space text-xl font-semibold tracking-[-0.01em] text-[#f2f0f7]">
                <Link
                  href={projectHref(lang, work.slug)}
                  data-card-link
                  className="text-inherit no-underline outline-none after:absolute after:inset-0 after:z-[1] after:rounded-[24px]"
                >
                  {work.title}
                </Link>
              </h3>
              <span className="mb-4 line-clamp-2 min-h-[2lh] text-[13.5px] leading-[1.5] text-[#9a98a6]">{work.desc}</span>
              <span className="mb-4 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="max-w-[160px] truncate rounded-full border border-white/10 px-3 py-[5px] text-[12px] text-[#9a98a6]"
                  >
                    {tag}
                  </span>
                ))}
              </span>
              <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.07] pt-3">
                {work.liveUrl && (
                  <a
                    href={work.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-arrowbtn relative z-[2] inline-flex items-center gap-[6px] rounded-full px-[14px] py-[7px] text-[13px] font-semibold text-white no-underline"
                    style={{ background: "linear-gradient(100deg,#b57cff,#7c5cff)" }}
                  >
                    {t.projectLive}
                    <span className="pf-ar inline-flex">
                      <ArrowUpRight size={13} strokeWidth={2.4} />
                    </span>
                  </a>
                )}
                {/* Same height as the live button, so footers line up across a row. */}
                <span className="inline-flex min-h-[34px] items-center gap-2 text-[13.5px] font-semibold text-[#d6d4de] transition-colors duration-300 group-hover:text-white">
                  {t.viewDetails}
                  <ArrowRight
                    size={15}
                    strokeWidth={2.4}
                    className="text-[#b57cff] transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </span>
              </span>
            </span>
          </span>
        </div>
      </TiltCard>
    </Reveal>
  );
}
