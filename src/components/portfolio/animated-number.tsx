"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";

const DURATION_MS = 1300;
// easeOutExpo, close to the cubic-bezier(0.19, 1, 0.22, 1) used by the other animations.
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Renders the final value on the server. Only a counter that is still off-screen after
// hydration is reset to 0 and counted up when it scrolls into view. A plain
// requestAnimationFrame loop: counting a number needs no animation engine.
export function AnimatedNumber({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const armed = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (numeric === null || reduceMotion || !el || el.getBoundingClientRect().top < window.innerHeight) return;
    armed.current = true;
    el.textContent = `0${suffix}`;
  }, [numeric, reduceMotion, suffix]);

  useEffect(() => {
    if (!inView || numeric === null || !armed.current) return;
    armed.current = false;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = easeOutExpo((now - start) / DURATION_MS);
      if (ref.current) ref.current.textContent = `${Math.round(progress * numeric)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, numeric, suffix]);

  return <span ref={ref}>{value}</span>;
}
