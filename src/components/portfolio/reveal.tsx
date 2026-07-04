"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.19, 1, 0.22, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  scale?: number;
};

export function Reveal({ delay = 0, y = 40, scale, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale ?? 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -6% 0px" }}
      transition={{ duration: scale ? 1.15 : 1, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
