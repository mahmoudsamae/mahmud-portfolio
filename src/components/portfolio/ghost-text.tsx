"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function GhostText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, (p) => `calc(-50% + ${(p - 0.5) * -140}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      className={cn(
        "pointer-events-none absolute z-0 whitespace-nowrap font-space font-bold tracking-[-0.04em] text-white/[0.035]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
