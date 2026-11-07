// Locales the public site is served in. The language is always part of the URL,
// so <html lang>, metadata and content can all be derived from it on the server.
export const siteLocales = ["de", "en"] as const;
export type SiteLocale = (typeof siteLocales)[number];
export const defaultSiteLocale: SiteLocale = "en";

export function isSiteLocale(value: string): value is SiteLocale {
  return (siteLocales as readonly string[]).includes(value);
}
