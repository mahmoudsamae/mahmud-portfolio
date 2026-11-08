"use client";

import Image from "next/image";
import { ArrowLink } from "./arrow-link";
import { CvButton } from "./cv-button";
import { FloatingSkillBadge } from "./floating-skill-badge";
import { HeroStats } from "./hero-stats";
import { Parallax } from "./parallax";
import { SocialPill } from "./social-pill";
import { usePortfolioLang } from "./lang-context";

// Chips sit on the photo's own edges (never outside it) and mostly on its right side, so they
// cannot reach the text column. They are only shown from 1280px (see FloatingSkillBadge).
const BADGE_SLOTS = [
  { className: "left-[8%] top-[4%]", floatClass: "pf-badge-float-a", delay: 0.6 },
  { className: "right-[0%] top-[20%]", floatClass: "pf-badge-float-b", delay: 0.9 },
  { className: "right-[4%] top-[44%]", floatClass: "pf-badge-float-a", delay: 1.2 },
  { className: "right-[0%] top-[66%]", floatClass: "pf-badge-float-b", delay: 1.5 },
];

// The photo fades into the background at the bottom and the sides instead of ending on a hard edge.
const PHOTO_MASK = "radial-gradient(ellipse 72% 88% at 50% 34%, #000 52%, transparent 79%)";

function HeroNameLine({
  text,
  delay,
  className,
  style,
}: {
  text: string;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className="pf-nl">
      <span className={`pf-line-in ${className ?? ""}`} style={{ ...style, animationDelay: `${delay}s` }}>
        {text}
      </span>
    </span>
  );
}

export function Hero() {
  const { t, heroPhotoUrl, socials, heroSkills, heroStats, cvUrl, cvLabel } = usePortfolioLang();
  return (
    <section
      data-screen-label="Hero"
      className="relative flex flex-col overflow-hidden px-6 pb-14 pt-[34px] min-[821px]:h-[min(78vh,700px)] min-[821px]:min-h-[600px] min-[821px]:px-[44px] min-[821px]:pb-0"
    >
      <h1 className="pf-hero-name relative z-[1] m-0 mt-2 flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.06em] text-center font-space text-[clamp(44px,9.6vw,128px)] font-bold tracking-[-0.04em]">
        <HeroNameLine
          text="MAHMUD"
          delay={0.05}
          className="block text-transparent [-webkit-text-stroke:2px_rgba(242,240,247,.82)]"
        />
        <HeroNameLine
          text={"AL HUSSEN"}
          delay={0.16}
          className="block bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
        />
      </h1>

      <div
        style={{ animationDelay: "0.25s" }}
        className="pf-photo-in relative z-[2] mx-auto mt-6 h-[320px] w-[78%] max-w-[360px] min-[821px]:absolute min-[821px]:bottom-0 min-[821px]:left-1/2 min-[821px]:mt-0 min-[821px]:h-[76%] min-[821px]:w-[38%] min-[1180px]:w-[min(46%,540px)] min-[821px]:max-w-none min-[821px]:-translate-x-1/2"
      >
        <Parallax className="h-full w-full" strength={10}>
          <div
            className="relative h-full w-full"
            style={{ maskImage: PHOTO_MASK, WebkitMaskImage: PHOTO_MASK }}
          >
            <Image
              src={heroPhotoUrl}
              alt="Mahmud Al Hussen"
              fill
              priority
              sizes="(max-width: 820px) 78vw, 540px"
              className="object-cover object-[50%_8%]"
            />
          </div>
        </Parallax>

        {heroSkills.slice(0, 4).map((skill, i) => (
          <FloatingSkillBadge
            key={skill}
            label={skill}
            className={BADGE_SLOTS[i].className}
            floatClass={BADGE_SLOTS[i].floatClass}
            delay={BADGE_SLOTS[i].delay}
          />
        ))}
      </div>

      <div
        style={{ animationDelay: "0.35s" }}
        className="pf-rise-in relative z-[3] mx-auto mt-6 max-w-[340px] text-center min-[821px]:absolute min-[821px]:bottom-10 min-[821px]:left-[44px] min-[821px]:mx-0 min-[821px]:mt-0 min-[821px]:max-w-[300px] min-[1000px]:max-w-[330px] min-[821px]:text-left"
      >
        <h2 className="m-0 mb-3 font-space text-[26px] font-semibold tracking-[-0.02em]">{t.role}</h2>
        <p className="m-0 mb-[22px] text-[15px] leading-[1.55] text-[#9a98a6]">{t.heroDesc}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 min-[821px]:justify-start">
          <ArrowLink
            href="#contact"
            className="px-[22px] py-[13px] text-[15px] text-white shadow-[0_14px_34px_-12px_rgba(124,92,255,.75)]"
            style={{ background: "linear-gradient(100deg,#b57cff,#7c5cff)" }}
          >
            {t.letsCollab}
          </ArrowLink>
          {cvUrl && <CvButton href={cvUrl} label={cvLabel} className="shadow-[0_14px_34px_-14px_rgba(0,0,0,.8)]" />}
        </div>
        <HeroStats stats={heroStats} />
      </div>

      <div
        style={{ animationDelay: "0.45s" }}
        className="pf-rise-in hidden min-[821px]:absolute min-[821px]:bottom-10 min-[821px]:right-[44px] min-[821px]:z-[3] min-[821px]:flex min-[821px]:flex-col min-[821px]:gap-[10px]"
      >
        {socials.map((social) => (
          <SocialPill
            key={social.name}
            social={social}
            className="min-w-[150px] bg-[rgba(19,19,24,.85)] shadow-[0_12px_30px_-10px_rgba(0,0,0,.75)]"
          />
        ))}
      </div>
    </section>
  );
}
