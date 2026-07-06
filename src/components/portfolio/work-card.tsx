import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkItem } from "@/lib/portfolio-content";
import { ProjectPlaceholder } from "./project-placeholder";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";

function StatusDot({ symbol }: { symbol: string }) {
  if (symbol === "●") {
    return <span className="pf-pulse-dot inline-block h-[7px] w-[7px] flex-none rounded-full bg-[#4fd6c6]" />;
  }
  if (symbol === "◐") {
    return <span className="inline-block h-[7px] w-[7px] flex-none animate-pulse rounded-full bg-[#b57cff]" />;
  }
  return <span className="inline-block h-[7px] w-[7px] flex-none rounded-full border border-white/40" />;
}

export function WorkCard({
  work,
  index,
  visible,
}: {
  work: Omit<WorkItem, "desc"> & { desc: string };
  index: number;
  visible: boolean;
}) {
  const [symbol, ...rest] = work.badge.split(" ");
  const badgeLabel = rest.join(" ") || work.badge;

  return (
    <Reveal
      data-cat={work.cat}
      delay={Math.min(index * 0.07, 0.35)}
      className={cn("pf-flow-border group rounded-[24px] p-[1.5px]", !visible && "hidden")}
    >
      <TiltCard className="h-full rounded-[23px] bg-[#131318] transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-18px_rgba(181,124,255,.5)]">
        <div className="h-full rounded-[23px] p-[14px]">
          <div className="relative overflow-hidden rounded-[16px]">
            <span className="absolute left-3 top-3 z-[2] inline-flex items-center gap-[7px] rounded-full border border-white/[0.14] bg-[rgba(10,10,14,.7)] px-3 py-[6px] text-[11px] tracking-[0.06em] text-[#c9c7d2] backdrop-blur-[6px]">
              <StatusDot symbol={symbol} />
              {badgeLabel}
            </span>
            <a
              href={work.href}
              target={work.href.startsWith("http") ? "_blank" : undefined}
              rel={work.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={`Open ${work.title}`}
              className="absolute right-3 top-3 z-[2] inline-flex h-8 w-8 -translate-y-2 items-center justify-center rounded-full bg-[#f2f0f7] text-[#0c0c11] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
            >
              <ArrowUpRight size={15} strokeWidth={2.4} />
            </a>
            <div className="relative block aspect-[16/11] w-full overflow-hidden">
              <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                {work.imageUrl ? (
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    unoptimized={work.imageUrl.startsWith("data:") || work.imageUrl.startsWith("http")}
                    className="object-cover"
                  />
                ) : (
                  <ProjectPlaceholder title={work.title} index={index} />
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
          <div className="px-2 pb-2 pt-4">
            <h3 className="m-0 mb-2 font-space text-xl font-semibold tracking-[-0.01em]">{work.title}</h3>
            <p className="m-0 mb-[14px] text-[13.5px] leading-[1.5] text-[#9a98a6]">{work.desc}</p>
            <div className="flex flex-wrap gap-[9px]">
              <span className="rounded-full border border-white/10 px-[13px] py-[6px] text-[12.5px] text-[#9a98a6]">
                {work.tag}
              </span>
              <span className="rounded-full border border-white/10 px-[13px] py-[6px] text-[12.5px] text-[#9a98a6]">
                {work.studio}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}
