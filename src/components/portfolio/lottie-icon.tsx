"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const LottiePlayer = dynamic(() => import("./lottie-player"), { ssr: false });

// Files in public/lottie/, built from lottie/icons.json (see public/lottie/CREDITS.txt).
// still: frame (0–1) shown instead of the animation when reduced motion is requested.
// zoom: some files have wide empty margins; the canvas is drawn larger instead of scaled up.
// loop: false for draw-in animations whose first frames are empty (measured: web, experience
// and contact are blank for their first ~20 frames); they play once and hold the last frame.
const ICONS = {
  projects: { still: 0.5, zoom: 1.7, loop: true },
  whatido: { still: 0.5, zoom: 1, loop: true },
  web: { still: 1, zoom: 1, loop: false },
  automation: { still: 0, zoom: 1.2, loop: true },
  tools: { still: 1, zoom: 1, loop: true },
  server: { still: 1, zoom: 1.1, loop: true },
  ai: { still: 0.5, zoom: 1.1, loop: true },
  experience: { still: 1, zoom: 1, loop: false },
  contact: { still: 1, zoom: 1.2, loop: false },
} as const;

export type LottieIconName = keyof typeof ICONS;

// Decorative animated icon. The player and its WebAssembly renderer are only downloaded
// once an icon comes near the viewport; the animation plays while visible and pauses off-screen.
export function LottieIcon({ name, className }: { name: LottieIconName; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const near = useInView(ref, { once: true, margin: "200px 0px" });
  const visible = useInView(ref);
  const reduceMotion = useReducedMotion();
  const { still, zoom, loop } = ICONS[name];
  const inset = `${((1 - zoom) / 2) * 100}%`;

  return (
    <span ref={ref} aria-hidden className={cn("relative inline-block flex-none", className)}>
      {near && (
        <span className="absolute" style={{ inset }}>
          <LottiePlayer src={`/lottie/${name}.lottie`} loop={loop} playing={visible} stillAt={reduceMotion ? still : null} />
        </span>
      )}
    </span>
  );
}
