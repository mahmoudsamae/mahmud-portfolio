"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useAnimate } from "framer-motion/mini";
import { useEffect, useLayoutEffect, useRef } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

type RevealProps = React.ComponentProps<"div"> & {
  delay?: number;
  y?: number;
  scale?: number;
};

const hiddenTransform = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;

// The server always renders the content visible, so crawlers, no-JS visitors and a
// missed intersection never leave an empty gap. Only elements that are still below
// the viewport after hydration are hidden (before paint) and animated in on scroll.
// Uses framer-motion/mini (Web Animations API) instead of the full animation engine.
export function Reveal({ delay = 0, y = 40, scale, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, animate] = useAnimate();
  const inView = useInView(ref, { once: true, amount: 0.14, margin: "0px 0px -6% 0px" });
  const reduceMotion = useReducedMotion();
  const armed = useRef(false);
  const hidden = useRef({ y, scale: scale ?? 1 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (reduceMotion || !el || el.getBoundingClientRect().top < window.innerHeight) return;
    armed.current = true;
    el.style.opacity = "0";
    el.style.transform = hiddenTransform(hidden.current.y, hidden.current.scale);
  }, [reduceMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !armed.current || !el) return;
    armed.current = false;
    const controls = animate(
      el,
      {
        opacity: [0, 1],
        transform: [hiddenTransform(hidden.current.y, hidden.current.scale), "translateY(0px) scale(1)"],
      },
      { duration: scale ? 1.15 : 1, delay, ease: EASE },
    );
    // Hand the element back to its stylesheet once the animation is done.
    controls.then(() => {
      el.style.opacity = "";
      el.style.transform = "";
    });
  }, [animate, delay, inView, scale]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
