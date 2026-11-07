"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";

// Renders the final value on the server. Only a counter that is still off-screen after
// hydration is reset to 0 and counted up when it scrolls into view.
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
    const controls = animate(0, numeric, {
      duration: 1.3,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, numeric, suffix]);

  return <span ref={ref}>{value}</span>;
}
