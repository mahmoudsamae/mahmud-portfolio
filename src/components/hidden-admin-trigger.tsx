"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export function HiddenAdminTrigger({ locale, children }: { locale: string; children: React.ReactNode }) {
  const router = useRouter();
  const clicksRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const onClick = () => {
    clicksRef.current += 1;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      clicksRef.current = 0;
    }, 1800);

    if (clicksRef.current >= 5) {
      clicksRef.current = 0;
      router.push(`/${locale}/studio/login`);
    }
  };

  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      {children}
    </button>
  );
}
