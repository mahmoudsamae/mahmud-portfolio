import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WorkItem } from "@/lib/portfolio-content";
import { ProjectPlaceholder } from "./project-placeholder";
import { Reveal } from "./reveal";

export function WorkCard({
  work,
  index,
  visible,
}: {
  work: Omit<WorkItem, "desc"> & { desc: string };
  index: number;
  visible: boolean;
}) {
  return (
    <Reveal
      data-cat={work.cat}
      className={cn(
        "pf-lift rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-[14px]",
        !visible && "hidden",
      )}
    >
      <div className="relative overflow-hidden rounded-[14px]">
        <span className="absolute left-3 top-3 z-[2] rounded-full border border-white/[0.14] bg-[rgba(10,10,14,.7)] px-3 py-[6px] text-[11px] tracking-[0.06em] text-[#c9c7d2] backdrop-blur-[6px]">
          {work.badge}
        </span>
        <div className="relative block aspect-[16/11] w-full">
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
    </Reveal>
  );
}
