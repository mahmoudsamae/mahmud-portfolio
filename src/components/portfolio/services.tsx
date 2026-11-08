"use client";

import { useState } from "react";
import { GhostText } from "./ghost-text";
import { LottieIcon } from "./lottie-icon";
import { Reveal } from "./reveal";
import { ServiceRow } from "./service-row";
import { ToolChip } from "./tool-chip";
import { usePortfolioLang } from "./lang-context";

export function Services() {
  const { t, services, otherTools } = usePortfolioLang();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="service"
      data-screen-label="Service"
      className="relative overflow-hidden border-t border-white/5 px-6 py-[88px] sm:px-[44px]"
    >
      <GhostText className="left-1/2 top-8 text-[clamp(90px,18vw,290px)]">SKILLS</GhostText>

      <div className="relative z-[1] mx-auto max-w-[1000px]">
        <Reveal from="left" className="mb-10">
          <h2 className="m-0 font-space text-[clamp(34px,5vw,64px)] font-bold tracking-[-0.03em]">
            <LottieIcon name="whatido" className="mr-[0.22em] h-[0.95em] w-[0.95em] align-[-0.12em]" />
            {t.serviceTitle}
          </h2>
        </Reveal>

        <div>
          {services.map((service, i) => (
            <ServiceRow
              key={`${service.n}-${i}`}
              service={service}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
              linkPrefix={t.serviceProject}
            />
          ))}
        </div>

        {otherTools.length > 0 && (
          <Reveal className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/[0.09] px-1 pt-6 sm:px-[22px]">
            <span className="mr-2 font-space text-xs uppercase tracking-[0.14em] text-[#b57cff]">{t.otherTools}</span>
            {otherTools.map((tool) => (
              <ToolChip key={tool} name={tool} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
