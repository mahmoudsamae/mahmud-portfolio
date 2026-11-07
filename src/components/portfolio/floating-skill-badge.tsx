import { cn } from "@/lib/utils";

export function FloatingSkillBadge({
  label,
  className,
  floatClass,
  delay,
}: {
  label: string;
  className?: string;
  floatClass: string;
  delay: number;
}) {
  return (
    <div
      className={cn("pf-pop-in pf-hide-sm absolute z-[3] hidden min-[1100px]:block", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={cn(
          "whitespace-nowrap rounded-full border border-white/[0.14] bg-[rgba(19,19,24,.75)] px-[14px] py-[8px] font-space text-[12.5px] font-medium text-[#e5e3ec] shadow-[0_10px_30px_rgba(0,0,0,.35)] backdrop-blur-[6px]",
          floatClass,
        )}
      >
        {label}
      </div>
    </div>
  );
}
