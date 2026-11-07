"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { CvButton } from "./cv-button";
import { AvailabilityBadge } from "./availability-badge";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { SocialPill } from "./social-pill";
import { usePortfolioLang } from "./lang-context";

export function Contact() {
  const { t, socials, contactEmail, contactPhone, contactLocation, cvUrl, cvLabel } = usePortfolioLang();

  return (
    <section
      id="contact"
      data-screen-label="Contact"
      className="border-t border-white/5 px-6 py-[92px] sm:px-[44px]"
    >
      <div className="pf-contact-grid mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <Reveal className="mb-6 inline-flex">
            <AvailabilityBadge label={t.avail} />
          </Reveal>

          <Reveal>
            <h2 className="m-0 mb-[18px] font-space text-[clamp(34px,4.6vw,62px)] font-bold leading-[1.02] tracking-[-0.03em]">
              {t.contactTitle}
            </h2>
          </Reveal>

          <Reveal>
            <p className="m-0 mb-[22px] max-w-[440px] text-base leading-[1.6] text-[#9a98a6]">{`${t.avail}. ${t.contactNote}`}</p>
          </Reveal>

          <Reveal className="mb-[26px] flex flex-col gap-[11px]">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-[11px] text-[15px] text-[#d6d4de] no-underline"
            >
              <span
                className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] border"
                style={{ background: "rgba(181,124,255,.14)", borderColor: "rgba(181,124,255,.3)" }}
              >
                <Mail size={16} color="#b57cff" strokeWidth={2} />
              </span>
              {contactEmail}
            </a>
            <div className="inline-flex items-center gap-[11px] text-[15px] text-[#d6d4de]">
              <span
                className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] border"
                style={{ background: "rgba(79,214,198,.14)", borderColor: "rgba(79,214,198,.3)" }}
              >
                <Phone size={16} color="#4fd6c6" strokeWidth={2} />
              </span>
              {contactPhone}
            </div>
            <div className="inline-flex items-center gap-[11px] text-[15px] text-[#d6d4de]">
              <span
                className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] border border-white/[0.14] bg-white/[0.06]"
              >
                <MapPin size={16} color="#c9c7d2" strokeWidth={2} />
              </span>
              {contactLocation}
            </div>
          </Reveal>

          <Reveal className="flex flex-wrap gap-[10px]">
            {socials.map((social) => (
              <SocialPill key={social.name} social={social} />
            ))}
          </Reveal>

          {cvUrl && (
            <Reveal className="mt-6">
              <CvButton href={cvUrl} label={cvLabel} />
            </Reveal>
          )}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
