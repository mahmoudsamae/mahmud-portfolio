import { cn } from "@/lib/utils";
import type { SocialItem } from "@/lib/portfolio-content";

export function SocialPill({ social, className }: { social: SocialItem; className?: string }) {
  return (
    <a
      href={social.href}
      className={cn(
        "pf-socpill inline-flex items-center gap-[9px] whitespace-nowrap rounded-full border border-white/12 bg-white/[0.03] px-[17px] py-[10px] text-sm text-[#c9c7d2] no-underline",
        className,
      )}
    >
      <span
        className="inline-flex h-[19px] w-[19px] flex-none items-center justify-center rounded-[6px] font-space text-[11px] font-bold text-[#0c0c11]"
        style={{ background: "linear-gradient(120deg,#b57cff,#4fd6c6)" }}
      >
        {social.letter}
      </span>
      {social.name}
    </a>
  );
}
