"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { usePortfolioLang } from "./lang-context";

// Appears once the visitor is near the end of the page (within ~1.5 screens of the bottom).
export function BackToTop() {
  const { t } = usePortfolioLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY, innerHeight } = window;
      const remaining = document.documentElement.scrollHeight - (scrollY + innerHeight);
      setShow(scrollY > innerHeight && remaining < innerHeight * 1.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          onClick={toTop}
          aria-label={t.backToTop}
          title={t.backToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          className="group fixed bottom-5 right-5 z-30 rounded-full p-[1.5px] shadow-[0_14px_34px_-10px_rgba(124,92,255,.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b57cff] sm:bottom-7 sm:right-7"
          style={{ background: "linear-gradient(135deg,#b57cff,#4fd6c6)" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#131318] text-[#f2f0f7] transition-colors duration-300 group-hover:bg-[#1d1b27]">
            <ArrowUp size={20} strokeWidth={2.4} className="transition-transform duration-300 group-hover:-translate-y-[2px]" />
          </span>
        </m.button>
      )}
    </AnimatePresence>
  );
}
