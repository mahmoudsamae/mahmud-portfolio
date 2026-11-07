import { NextRequest, NextResponse } from "next/server";
import { defaultSiteLocale, siteLocales } from "@/lib/locales";

function getLocale(request: NextRequest) {
  const languageHeader = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (languageHeader.includes("de")) return "de";
  return defaultSiteLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const hasLocale = siteLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|keystatic).*)"],
};
