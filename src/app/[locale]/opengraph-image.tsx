import { ImageResponse } from "next/og";
import { getPortfolioContent } from "@/lib/content";
import { isSiteLocale } from "@/lib/locales";

// Social preview image, generated at build time from the CMS content (one per language).
export const alt = "Mahmud Al Hussen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = (await getPortfolioContent()).str[isSiteLocale(locale) ? locale : "de"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f2f0f7",
          background:
            "radial-gradient(60% 70% at 15% 10%, rgba(150,90,255,0.35), transparent 60%), radial-gradient(55% 60% at 90% 95%, rgba(60,214,198,0.28), transparent 62%), #0a0a0f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#c9c7d2" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#4fd6c6" }} />
          {t.avail}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>MAHMUD</div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.05,
              backgroundImage: "linear-gradient(100deg,#b57cff,#4fd6c6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AL HUSSEN
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#d6d4de" }}>{t.role}</div>
        </div>
        <div style={{ fontSize: 26, color: "#8a8894" }}>mahmud-alhussen.de</div>
      </div>
    ),
    size,
  );
}
