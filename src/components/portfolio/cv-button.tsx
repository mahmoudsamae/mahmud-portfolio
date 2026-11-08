import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function CvButton({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      download
      rel="nofollow"
      className={cn(
        "pf-arrowbtn inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-[22px] py-[13px] text-[15px] font-semibold text-[#f2f0f7] no-underline",
        className,
      )}
    >
      <Download size={16} strokeWidth={2.4} />
      {label}
    </a>
  );
}
