import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /cv/ is deliberately not disallowed: crawlers must be able to fetch the PDF to see its
// X-Robots-Tag: noindex header (next.config.ts), otherwise the URL could still be indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
