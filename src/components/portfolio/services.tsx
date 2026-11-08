"use client";

import { useState } from "react";
import { GhostText } from "./ghost-text";
import { LottieIcon } from "./lottie-icon";
import { Reveal } from "./reveal";
import { ServiceRow } from "./service-row";
import { usePortfolioLang } from "./lang-context";

export function Services() {
  const { t, services } = usePortfolioLang();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="service"
      data-screen-label="Service"
      className="relative overflow-hidden border-t border-white/5 px-6 py-[88px] sm:px-[44px]"
    >
      <GhostText className="left-1/2 top-8 text-[clamp(90px,18vw,290px)]">SKILLS</GhostText>

      <div className="relative z-[1] mx-auto max-w-[1000px]">
        <Reveal className="mb-10">
          <h2 className="m-0 inline-flex items-center gap-[0.22em] font-space text-[clamp(34px,5vw,64px)] font-bold tracking-[-0.03em]">
            <LottieIcon name="whatido" className="h-[0.95em] w-[0.95em]" />
            {t.serviceTitle}
          </h2>
        </Reveal>

        <div>
          {services.map((service, i) => (
            <ServiceRow
              key={`${service.n}-${i}`}
              service={service}
              open={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
