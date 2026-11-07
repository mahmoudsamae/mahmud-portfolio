"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";

const TiltCardMotion = lazy(() => import("./tilt-card-motion"));

// Tilt only makes sense with a mouse, and not for visitors who asked for less motion.
const TILT_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(TILT_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

// Server and phones render a plain div; on desktop the spring version is loaded after
// hydration, so its code is not part of the initial JavaScript.
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const canTilt = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(TILT_QUERY).matches,
    () => false,
  );
  const plain = <div className={className}>{children}</div>;

  if (!canTilt) return plain;
  return (
    <Suspense fallback={plain}>
      <TiltCardMotion className={className}>{children}</TiltCardMotion>
    </Suspense>
  );
}
