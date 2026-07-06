"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.19, 1, 0.22, 1] as const;

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={cn("pf-hide-sm absolute z-[3] hidden min-[1100px]:block", className)}
    >
      <div
        className={cn(
          "whitespace-nowrap rounded-full border border-white/[0.14] bg-[rgba(19,19,24,.75)] px-[14px] py-[8px] font-space text-[12.5px] font-medium text-[#e5e3ec] shadow-[0_10px_30px_rgba(0,0,0,.35)] backdrop-blur-[6px]",
          floatClass,
        )}
      >
        {label}
      </div>
    </motion.div>
  );
}
