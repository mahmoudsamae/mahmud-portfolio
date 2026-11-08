"use client";

import { lazy, Suspense } from "react";
import { useFinePointer } from "./use-fine-pointer";

const TiltCardMotion = lazy(() => import("./tilt-card-motion"));

// Server and phones render a plain div; on desktop the spring version is loaded after
// hydration, so its code is not part of the initial JavaScript.
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const canTilt = useFinePointer();
  const plain = <div className={className}>{children}</div>;

  if (!canTilt) return plain;
  return (
    <Suspense fallback={plain}>
      <TiltCardMotion className={className}>{children}</TiltCardMotion>
    </Suspense>
  );
}
