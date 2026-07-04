"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/lib/dictionary";

export function StudioGuard({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("studio-auth");
    if (auth !== "ok") {
      router.replace(`/${locale}/studio/login`);
    }
  }, [router, locale]);

  return <>{children}</>;
}
