import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar", "de"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("preferred-locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  const languageHeader = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (languageHeader.includes("ar")) return "ar";
  if (languageHeader.includes("de")) return "de";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api).*)"],
};
