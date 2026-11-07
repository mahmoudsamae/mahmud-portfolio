"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

// All framer-motion components on the site are `m.*` inside this provider. `strict` throws
// if a full `motion.*` component is used, which would pull every feature into the bundle.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
