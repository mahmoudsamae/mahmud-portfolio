"use client";

import { motion, useAnimate, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  scale?: number;
};

// The server always renders the content visible, so crawlers, no-JS visitors and a
// missed intersection never leave an empty gap. Only elements that are still below
// the viewport after hydration are hidden (before paint) and animated in on scroll.
export function Reveal({ delay = 0, y = 40, scale, children, ...props }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.14, margin: "0px 0px -6% 0px" });
  const reduceMotion = useReducedMotion();
  const armed = useRef(false);
  const hidden = useRef({ y, scale: scale ?? 1 });

  useLayoutEffect(() => {
    const el = scope.current;
    if (reduceMotion || !el || el.getBoundingClientRect().top < window.innerHeight) return;
    armed.current = true;
    animate(el, { opacity: 0, ...hidden.current }, { duration: 0 });
  }, [animate, reduceMotion, scope]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;
    animate(scope.current, { opacity: 1, y: 0, scale: 1 }, { duration: scale ? 1.15 : 1, delay, ease: EASE });
  }, [animate, delay, inView, scale, scope]);

  return (
    <motion.div ref={scope} {...props}>
      {children}
    </motion.div>
  );
}
