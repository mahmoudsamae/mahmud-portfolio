"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLink } from "./arrow-link";
import { FloatingSkillBadge } from "./floating-skill-badge";
import { HeroStats } from "./hero-stats";
import { SocialPill } from "./social-pill";
import { usePortfolioLang } from "./lang-context";

const EASE = [0.19, 1, 0.22, 1] as const;

const BADGE_SLOTS = [
  { className: "-left-[8%] top-[6%]", floatClass: "pf-badge-float-a", delay: 0.6 },
  { className: "-right-[6%] top-[24%]", floatClass: "pf-badge-float-b", delay: 0.9 },
  { className: "-left-[10%] top-[56%]", floatClass: "pf-badge-float-b", delay: 1.2 },
  { className: "-right-[8%] top-[74%]", floatClass: "pf-badge-float-a", delay: 1.5 },
];

function HeroNameLine({
  text,
  delay,
  active,
  className,
  style,
}: {
  text: string;
  delay: number;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className="pf-nl">
      <motion.span
        initial={{ y: "118%" }}
        animate={{ y: active ? "0%" : "118%" }}
        transition={{ duration: 1.15, delay, ease: EASE }}
        className={className}
        style={style}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { t, heroPhotoUrl, socials, heroSkills, heroStats } = usePortfolioLang();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      data-screen-label="Hero"
      className="relative flex flex-col overflow-hidden px-6 pb-12 pt-[34px] min-[821px]:h-[min(76vh,680px)] min-[821px]:min-h-[560px] min-[821px]:px-[44px] min-[821px]:pb-0"
    >
      <h1 className="pf-hero-name relative z-[1] m-0 mt-2 flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.06em] text-center font-space text-[clamp(44px,9.6vw,128px)] font-bold tracking-[-0.04em]">
        <HeroNameLine
          text="MAHMUD"
          delay={0.05}
          active={active}
          className="block text-transparent [-webkit-text-stroke:2px_rgba(242,240,247,.82)]"
        />
        <HeroNameLine
          text={"AL HUSSEN"}
          delay={0.16}
          active={active}
          className="block bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
        />
      </h1>

      <motion.div
        initial={{ y: 70, scale: 0.93, opacity: 0 }}
        animate={active ? { y: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.25, ease: EASE }}
        className="relative z-[2] mx-auto mt-8 h-[300px] w-[70%] min-[821px]:absolute min-[821px]:bottom-0 min-[821px]:left-1/2 min-[821px]:mt-0 min-[821px]:h-[74%] min-[821px]:w-[min(46%,540px)] min-[821px]:-translate-x-1/2"
      >
        <div className="relative block h-full w-full [-webkit-mask-image:radial-gradient(120%_92%_at_50%_30%,#000_58%,transparent_82%)] [mask-image:radial-gradient(120%_92%_at_50%_30%,#000_58%,transparent_82%)]">
          <Image
            src={heroPhotoUrl}
            alt="Mahmud Al Hussen"
            fill
            priority
            unoptimized={heroPhotoUrl.startsWith("data:") || heroPhotoUrl.startsWith("http")}
            sizes="(max-width: 820px) 60vw, 540px"
            className="object-cover object-[50%_8%]"
          />
        </div>

        {heroSkills.slice(0, 4).map((skill, i) => (
          <FloatingSkillBadge
            key={skill}
            label={skill}
            className={BADGE_SLOTS[i].className}
            floatClass={BADGE_SLOTS[i].floatClass}
            delay={BADGE_SLOTS[i].delay}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.35, ease: EASE }}
        className="relative z-[3] mx-auto mt-8 max-w-[290px] text-center min-[821px]:absolute min-[821px]:bottom-0 min-[821px]:left-[44px] min-[821px]:mx-0 min-[821px]:mt-0 min-[821px]:max-w-[290px] min-[821px]:text-left"
      >
        <h2 className="m-0 mb-3 font-space text-[26px] font-semibold tracking-[-0.02em]">{t.role}</h2>
        <p className="m-0 mb-[22px] text-[15px] leading-[1.55] text-[#9a98a6]">{t.heroDesc}</p>
        <ArrowLink
          href="#contact"
          className="px-[22px] py-[13px] text-[15px] text-white"
          style={{ background: "linear-gradient(100deg,#b57cff,#7c5cff)" }}
        >
          {t.letsCollab}
        </ArrowLink>
        <HeroStats stats={heroStats} />
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.45, ease: EASE }}
        className="pf-hide-sm hidden min-[821px]:absolute min-[821px]:bottom-0 min-[821px]:right-[44px] min-[821px]:z-[3] min-[821px]:flex min-[821px]:flex-col min-[821px]:gap-[10px]"
      >
        {socials.map((social) => (
          <SocialPill key={social.name} social={social} className="min-w-[150px]" />
        ))}
      </motion.div>
    </section>
  );
}
