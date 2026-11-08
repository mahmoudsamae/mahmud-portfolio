"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

// Loaded lazily by Parallax, only on devices with a mouse.
export default function ParallaxMotion({
  children,
  className,
  strength,
}: {
  children: React.ReactNode;
  className?: string;
  strength: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.8 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set((event.clientX / window.innerWidth - 0.5) * -2 * strength);
      y.set((event.clientY / window.innerHeight - 0.5) * -2 * strength);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, x, y]);

  return (
    <m.div style={{ x: springX, y: springY }} className={className}>
      {children}
    </m.div>
  );
}
