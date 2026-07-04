import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/lib/portfolio-content";
import { Reveal } from "./reveal";

export function ServiceRow({
  service,
  open,
  onToggle,
}: {
  service: Omit<ServiceItem, "desc"> & { desc: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal className={cn("pf-svc-row rounded-2xl border-t border-white/[0.09]", open && "pf-open")}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 bg-transparent px-[22px] py-[26px] text-left font-sans"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-space text-[13px] text-[#6b6976]">{service.n}</span>
          <span className="pf-svc-title font-space text-[clamp(24px,3.4vw,38px)] font-semibold tracking-[-0.02em] text-[#d6d4de]">
            {service.title}
          </span>
        </span>
        <span className="pf-plus relative h-[26px] w-[26px] flex-none text-[#9a98a6]">
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div className="pf-svc-detail">
        <div>
          <div className="flex flex-wrap items-center gap-6 px-[22px] pb-7">
            <p className="m-0 max-w-[440px] text-[15.5px] leading-[1.6] text-[#b9b7c4]">{service.desc}</p>
            <div
              className="flex min-w-[200px] flex-1 items-center justify-center rounded-2xl border border-white/10 font-space text-[13px] tracking-[0.04em] text-white/50"
              style={{
                height: 120,
                background: "linear-gradient(120deg,rgba(150,90,255,.22),rgba(79,214,198,.14))",
              }}
            >
              {service.tag}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
