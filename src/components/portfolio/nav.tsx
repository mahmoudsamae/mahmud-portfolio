"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AvailabilityBadge } from "./availability-badge";
import { LangToggle } from "./lang-toggle";
import { TalkButton } from "./talk-button";
import { usePortfolioLang } from "./lang-context";

const EASE = [0.19, 1, 0.22, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function Nav() {
  const { t, lang, works, services } = usePortfolioLang();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Absolute anchors so the links also work from project pages.
  const home = `/${lang}`;
  const links = [
    { href: `${home}#work`, label: t.navWork, count: works.length },
    { href: `${home}#skills`, label: t.navService, count: services.length },
    { href: `${home}#experience`, label: t.navExperience },
    { href: `${home}#contact`, label: t.navContact },
  ];

  // While the menu is open: no page scroll behind it, Escape closes it, Tab stays inside.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const panel = panelRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("ul a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>("a, button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // Growing the window to desktop width closes the menu, so the page never stays scroll-locked.
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 821px)");
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  return (
    <nav className="flex items-center justify-between gap-4 border-b border-white/5 px-5 py-4 sm:px-[34px] min-[821px]:py-5">
      <AvailabilityBadge label={t.avail} className="hidden min-[1000px]:inline-flex" />
      <a
        href={home}
        className="font-space text-[15px] font-bold tracking-[-0.01em] text-[#f2f0f7] no-underline min-[1000px]:hidden"
      >
        Mahmud Al Hussen
      </a>

      <div className="hidden items-center gap-[30px] text-[14.5px] font-medium text-[#a5a3b0] min-[821px]:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="pf-navlink text-inherit no-underline">
            {link.label}
            {link.count !== undefined && <span className="ml-1 text-[11px] text-[#8a8894]">[{pad(link.count)}]</span>}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-[10px] sm:gap-[14px]">
        <div className="hidden min-[821px]:block">
          <LangToggle />
        </div>
        <TalkButton href={`${home}#contact`} className="hidden min-[360px]:inline-flex">
          {t.letsTalk}
        </TalkButton>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="pf-mobile-menu"
          aria-label={t.menuOpen}
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-[#f2f0f7] min-[821px]:hidden"
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="backdrop"
              aria-hidden
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <m.div
              key="panel"
              ref={panelRef}
              id="pf-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-x-3 top-3 z-50 overflow-hidden rounded-[26px] border border-white/10 bg-[#131318] p-5 shadow-[0_30px_80px_rgba(0,0,0,.6)]"
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="mb-4 flex items-center justify-between">
                <LangToggle />
                <button
                  type="button"
                  aria-label={t.menuClose}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-[#f2f0f7]"
                >
                  <X size={20} strokeWidth={2.2} />
                </button>
              </div>
              <ul className="m-0 flex list-none flex-col p-0">
                {links.map((link, i) => (
                  <m.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: EASE }}
                    className="border-b border-white/[0.07] last:border-none"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-space text-[28px] font-semibold tracking-[-0.02em] text-[#f2f0f7] no-underline"
                    >
                      {link.label}
                      {link.count !== undefined && <span className="text-[13px] text-[#8a8894]">[{pad(link.count)}]</span>}
                    </a>
                  </m.li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <AvailabilityBadge label={t.avail} className="whitespace-normal text-[13px]" />
                <TalkButton href={`${home}#contact`} onClick={() => setOpen(false)}>
                  {t.letsTalk}
                </TalkButton>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
