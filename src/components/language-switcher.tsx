"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/dictionary";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = (segments[0] as (typeof locales)[number]) ?? "en";
  const suffix = segments.slice(1).join("/");

  const changeLocale = (locale: (typeof locales)[number]) => {
    localStorage.setItem("preferred-locale", locale);
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${suffix ? `/${suffix}` : ""}`}
          onClick={() => changeLocale(locale)}
          className={`rounded-full px-3 py-1 text-xs uppercase transition ${
            currentLocale === locale ? "bg-white text-zinc-900" : "text-white/70 hover:text-white"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
