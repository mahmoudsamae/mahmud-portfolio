import { cn } from "@/lib/utils";

export function AvailabilityBadge({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-[9px] whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-[9px] text-[13.5px] text-[#c9c7d2]",
        className,
      )}
    >
      <span className="pf-pulse-dot h-2 w-2 rounded-full bg-[#4fd6c6]" />
      {label}
    </div>
  );
}
