"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export function ConditionalSiteHeader({
  locale,
  labels,
}: {
  locale: string;
  labels: { about: string; projects: string; thinking: string; contact: string };
}) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;

  if (isHome) return null;

  return <SiteHeader locale={locale} labels={labels} />;
}
