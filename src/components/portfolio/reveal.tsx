"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useAnimate } from "framer-motion/mini";
import { useEffect, useLayoutEffect, useRef } from "react";

const EASE_IN = [0.19, 1, 0.22, 1] as const;
const EASE_OUT = [0.4, 0, 1, 1] as const;

export type RevealFrom = "up" | "left" | "right";

type RevealProps = React.ComponentProps<"div"> & {
  /** Seconds before the element comes in; use index * step for a stagger. */
  delay?: number;
  from?: RevealFrom;
};

function hiddenTransform(from: RevealFrom) {
  // Shorter travel on phones, so a sideways slide never looks like a layout jump.
  const d = window.innerWidth < 640 ? 0.6 : 1;
  if (from === "left") return `translate3d(${-56 * d}px,0,0)`;
  if (from === "right") return `translate3d(${56 * d}px,0,0)`;
  return `translate3d(0,${40 * d}px,0)`;
}

const onScreen = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
};

// The server always renders the content visible, so crawlers, no-JS visitors and a missed
// intersection never leave an empty gap. After hydration, elements off screen are hidden
// (before paint), slide in when they enter the viewport and slide out again when they leave
// it. Uses framer-motion/mini (Web Animations API): runs off the main thread and adds almost
// no JavaScript. Nothing moves with prefers-reduced-motion.
export function Reveal({ delay = 0, from = "up", children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, animate] = useAnimate();
  const inView = useInView(ref, { amount: 0.12, margin: "0px 0px -6% 0px" });
  const reduceMotion = useReducedMotion();
  const state = useRef<"static" | "shown" | "hidden">("static");
  const running = useRef<ReturnType<typeof animate> | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (reduceMotion || !el || onScreen(el)) return;
    state.current = "hidden";
    el.style.opacity = "0";
    el.style.transform = hiddenTransform(from);
  }, [reduceMotion, from]);

  useEffect(() => {
    const el = ref.current;
    if (reduceMotion || !el) return;
    // The observer reports "not in view" before its first callback; ignore that while the
    // element is actually on screen.
    if (!inView && onScreen(el)) return;

    if (inView && state.current === "static") {
      state.current = "shown";
      return;
    }
    if (inView && state.current === "hidden") {
      state.current = "shown";
      running.current?.stop();
      const controls = animate(el, { opacity: 1, transform: "translate3d(0,0,0)" }, { duration: 0.9, delay, ease: EASE_IN });
      running.current = controls;
      // Hand the element back to its stylesheet (hover transforms) once it has arrived.
      controls.then(() => {
        if (state.current !== "shown") return;
        el.style.opacity = "";
        el.style.transform = "";
      });
      return;
    }
    if (!inView && state.current !== "hidden") {
      state.current = "hidden";
      running.current?.stop();
      running.current = animate(
        el,
        { opacity: 0, transform: hiddenTransform(from) },
        { duration: 0.45, ease: EASE_OUT },
      );
    }
  }, [animate, delay, from, inView, reduceMotion]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
