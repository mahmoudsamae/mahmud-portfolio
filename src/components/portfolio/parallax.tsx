"use client";

import { lazy, Suspense } from "react";
import { useFinePointer } from "./use-fine-pointer";

const ParallaxMotion = lazy(() => import("./parallax-motion"));

// Moves its content a few pixels against the mouse position (desktop only, see TiltCard).
export function Parallax({
  children,
  className,
  strength = 12,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum shift in px at the edge of the window. */
  strength?: number;
}) {
  const enabled = useFinePointer();
  const plain = <div className={className}>{children}</div>;

  if (!enabled) return plain;
  return (
    <Suspense fallback={plain}>
      <ParallaxMotion className={className} strength={strength}>
        {children}
      </ParallaxMotion>
    </Suspense>
  );
}
