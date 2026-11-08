import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LocalizedService } from "./lang-context";
import { LottieIcon } from "./lottie-icon";
import { Reveal } from "./reveal";
import { ToolChip } from "./tool-chip";

export function ServiceRow({
  service,
  index,
  open,
  onToggle,
  linkPrefix,
}: {
  service: LocalizedService;
  index: number;
  open: boolean;
  onToggle: () => void;
  /** "Zum Projekt" / "See the project" */
  linkPrefix: string;
}) {
  const panelId = `pf-svc-${service.n}`;
  const LinkTag = service.link?.external ? "a" : Link;

  return (
    <Reveal
      from={index % 2 === 0 ? "left" : "right"}
      delay={0.05}
      className={cn("pf-svc-row rounded-2xl border-t border-white/[0.09]", open && "pf-open")}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 bg-transparent px-4 py-5 text-left font-sans sm:px-[22px] sm:py-6"
      >
        <span className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="hidden font-space text-[13px] text-[#8a8894] sm:inline">{service.n}</span>
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] sm:h-12 sm:w-12">
            <LottieIcon name={service.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
          </span>
          <span className="pf-svc-title font-space text-[clamp(20px,3vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#d6d4de]">
            {service.title}
          </span>
        </span>
        <span className="pf-plus relative h-[22px] w-[22px] flex-none text-[#9a98a6] sm:h-[26px] sm:w-[26px]">
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div id={panelId} className="pf-svc-detail" inert={!open}>
        <div>
          <div className="grid gap-6 px-4 pb-7 sm:px-[22px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10 md:pl-[88px]">
            <div className="flex flex-col items-start gap-5">
              <p className="m-0 text-[15.5px] leading-[1.65] text-[#b9b7c4]">{service.desc}</p>
              {service.link && (
                <LinkTag
                  href={service.link.href}
                  {...(service.link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group/link inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-4 py-[9px] text-[14px] font-semibold text-[#f2f0f7] no-underline transition-colors duration-300 hover:border-[#b57cff]/60 hover:bg-white/[0.07]"
                >
                  <span className="text-[#9a98a6]">{linkPrefix}:</span>
                  {service.link.label}
                  {service.link.external ? (
                    <ArrowUpRight size={15} strokeWidth={2.4} className="text-[#b57cff]" />
                  ) : (
                    <ArrowRight
                      size={15}
                      strokeWidth={2.4}
                      className="text-[#b57cff] transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  )}
                </LinkTag>
              )}
            </div>
            <div className="flex flex-wrap content-start gap-2 rounded-2xl border border-white/[0.08] bg-[linear-gradient(120deg,rgba(150,90,255,.12),rgba(79,214,198,.07))] p-4">
              {service.tools.map((tool) => (
                <ToolChip key={tool} name={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
