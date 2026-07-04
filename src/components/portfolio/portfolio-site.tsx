import { BackgroundOrbs } from "./background-orbs";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { LangProvider } from "./lang-context";
import { Nav } from "./nav";
import { SelectedWork } from "./selected-work";
import { Services } from "./services";
import { SiteFooter } from "./site-footer";
import type { PortfolioContentConfig, PortfolioLang } from "@/lib/portfolio-content";

export function PortfolioSite({
  locale,
  content,
}: {
  locale: string;
  content: PortfolioContentConfig;
}) {
  const initialLang: PortfolioLang = locale === "de" ? "de" : "en";

  return (
    <LangProvider initialLang={initialLang} content={content}>
      <div
        className="relative min-h-screen font-instrument text-[#f2f0f7] antialiased"
        style={{
          background: "#08080c",
          backgroundImage: [
            "radial-gradient(60% 55% at 18% 12%, rgba(150,90,255,0.16), transparent 60%)",
            "radial-gradient(55% 50% at 85% 88%, rgba(60,214,198,0.13), transparent 62%)",
            "radial-gradient(40% 40% at 90% 8%, rgba(150,90,255,0.08), transparent 60%)",
            "linear-gradient(180deg,#0a0a0f,#070709)",
          ].join(", "),
          backgroundAttachment: "fixed",
        }}
      >
        <BackgroundOrbs />

        <main className="pf-card-in relative z-[1] mx-auto my-[26px] max-w-[1440px] overflow-hidden rounded-[30px] border border-white/[0.06] bg-[rgba(19,19,24,.92)] shadow-[0_50px_140px_rgba(0,0,0,.6)] backdrop-blur-[2px]">
          <Nav />
          <Hero />
          <SelectedWork />
          <Services />
          <Experience />
          <Contact />
          <SiteFooter locale={locale} />
        </main>
      </div>
    </LangProvider>
  );
}
