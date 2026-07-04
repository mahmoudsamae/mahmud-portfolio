"use client";

import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Locale } from "@/lib/dictionary";
import { useSiteConfig } from "@/hooks/use-site-config";
import { SiteConfig } from "@/lib/site-config";

const labels: Record<
  Locale,
  { about: string; projects: string; thinking: string; experience: string; caseStudies: string; contact: string; search: string }
> = {
  en: { about: "About", projects: "Projects", thinking: "Thinking", experience: "Experience", caseStudies: "Case Studies", contact: "Contact", search: "Search projects" },
  ar: { about: "عني", projects: "المشاريع", thinking: "طريقة التفكير", experience: "الخبرات", caseStudies: "دراسات حالة", contact: "تواصل", search: "ابحث بالمشاريع" },
  de: { about: "Über mich", projects: "Projekte", thinking: "Denkweise", experience: "Erfahrung", caseStudies: "Case Studies", contact: "Kontakt", search: "Projekte suchen" },
};

export function PortfolioPage({
  locale,
  overrideConfig,
  previewMode = false,
  onConfigChange,
}: {
  locale: Locale;
  overrideConfig?: SiteConfig;
  previewMode?: boolean;
  onConfigChange?: (next: SiteConfig) => void;
}) {
  const isRtl = locale === "ar";
  const t = labels[locale];
  const { config: storedConfig } = useSiteConfig();
  const config = overrideConfig ?? storedConfig;
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const dragRef = useRef<{
    target: "hero" | "image" | null;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>({ target: null, startX: 0, startY: 0, baseX: 0, baseY: 0 });

  const applyConfig = (next: SiteConfig) => {
    onConfigChange?.(next);
  };

  const updateProfile = (field: keyof SiteConfig["profile"], value: string) => {
    if (!previewMode || !onConfigChange) return;
    applyConfig({
      ...config,
      profile: {
        ...config.profile,
        [field]: value,
      },
    });
  };

  const onDragStart = (
    event: ReactPointerEvent,
    target: "hero" | "image",
    baseX: number,
    baseY: number,
  ) => {
    if (!previewMode || !onConfigChange) return;
    dragRef.current = {
      target,
      startX: event.clientX,
      startY: event.clientY,
      baseX,
      baseY,
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onDragMove = (event: ReactPointerEvent) => {
    const state = dragRef.current;
    if (!state.target || !previewMode || !onConfigChange) return;
    const dx = Math.round(event.clientX - state.startX);
    const dy = Math.round(event.clientY - state.startY);
    if (state.target === "hero") {
      applyConfig({
        ...config,
        appearance: {
          ...config.appearance,
          heroOffsetX: state.baseX + dx,
          heroOffsetY: state.baseY + dy,
        },
      });
    } else {
      applyConfig({
        ...config,
        appearance: {
          ...config.appearance,
          imageOffsetX: state.baseX + dx,
          imageOffsetY: state.baseY + dy,
        },
      });
    }
  };

  const onDragEnd = () => {
    dragRef.current.target = null;
  };

  const projects = useMemo(() => [...config.projects].sort((a, b) => Number(b.featured) - Number(a.featured)), [config.projects]);

  const tags = useMemo(() => {
    const all = projects.flatMap((p) => p.technologies.split(",").map((x) => x.trim()).filter(Boolean));
    return ["All", ...new Set(all)];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((p) => `${p.title} ${p.summary} ${p.problem}`.toLowerCase().includes(query.toLowerCase()))
        .filter((p) => tag === "All" || p.technologies.includes(tag)),
    [projects, query, tag],
  );

  const templateClass = `${config.appearance.template} ${config.appearance.mode === "light" ? "template-light" : "template-dark"}`;
  const heroImageFirst = config.appearance.heroImagePosition === "left";
  const palette = config.appearance.mode === "dark" ? config.appearance.darkPalette : config.appearance.lightPalette;
  const isTemplateB = config.appearance.template === "template-b";
  const isTemplateC = config.appearance.template === "template-c";
  const imageClassMap = {
    soft: "rounded-2xl",
    sharp: "rounded-none",
    rounded: "rounded-[2.5rem]",
    circle: "rounded-full",
    blob: "rounded-[58%_42%_37%_63%/43%_54%_46%_57%]",
    frame: "rounded-xl border-2 border-white/60 p-1",
  } as const;
  const buttonClassMap = {
    minimal: "rounded-lg border border-white/30",
    pill: "rounded-full border border-white/30",
    glass: "rounded-xl border border-white/20 bg-white/10 backdrop-blur",
    gradient: "rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-black",
    neon: "rounded-xl border border-[var(--primary)] shadow-[0_0_20px_var(--primary)]",
  } as const;
  const cardClassMap = {
    classic: "border border-white/10 bg-white/5",
    elevated: "border border-white/10 bg-white/10 shadow-2xl",
    outline: "border-2 border-[var(--primary)] bg-transparent",
    magazine: "border-0 bg-black/40 backdrop-blur-xl",
  } as const;

  const footerLinks = config.footer.links
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [label, url] = item.split("|");
      return { label: label?.trim() ?? "", url: url?.trim() ?? "#" };
    });

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`template-root ${templateClass}`}
      style={{
        background: palette.backgroundColor,
        color: palette.textColor,
        fontFamily: config.appearance.fontFamily,
        ["--primary" as string]: palette.primaryColor,
        ["--secondary" as string]: palette.secondaryColor,
        ["--body-color" as string]: palette.bodyColor,
        ["--section-title-color" as string]: palette.sectionTitleColor,
        ["--section-title-size" as string]: `${config.appearance.sectionTitleSize}px`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--primary),_transparent_40%),radial-gradient(circle_at_80%_20%,_var(--secondary),_transparent_35%)] opacity-35" />
      {config.appearance.showGridPattern && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
      )}
      {config.appearance.showNoiseOverlay && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-soft-light [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
      )}

      <section
        className={`mx-auto grid max-w-6xl gap-8 px-4 pb-6 pt-16 sm:px-6 lg:px-8 ${
          isTemplateB
            ? "items-center text-center lg:grid-cols-1"
            : heroImageFirst
              ? "lg:grid-cols-[0.8fr_1.2fr]"
              : "lg:grid-cols-[1.2fr_0.8fr]"
        }`}
      >
        {heroImageFirst && (
          <div
            className={`glass-card p-4 ${previewMode ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{ transform: `translate(${config.appearance.imageOffsetX}px, ${config.appearance.imageOffsetY}px)` }}
            onPointerDown={(e) =>
              onDragStart(
                e,
                "image",
                config.appearance.imageOffsetX,
                config.appearance.imageOffsetY,
              )
            }
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
          >
            <Image
              src={config.profile.photoUrl}
              alt={config.profile.name}
              width={800}
              height={500}
              unoptimized
              className={`h-72 w-full object-cover ${imageClassMap[config.appearance.imageStyle]} ${config.appearance.enableCardHover ? "transition duration-300 hover:scale-[1.02]" : ""}`}
            />
          </div>
        )}

        <div
          style={{ transform: `translate(${config.appearance.heroOffsetX}px, ${config.appearance.heroOffsetY}px)` }}
          className={`${isTemplateC ? "border-l-4 border-[var(--primary)] pl-4" : ""} ${previewMode ? "cursor-grab active:cursor-grabbing" : ""}`}
          onPointerDown={(e) =>
            onDragStart(
              e,
              "hero",
              config.appearance.heroOffsetX,
              config.appearance.heroOffsetY,
            )
          }
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm tracking-[0.2em] text-[var(--primary)]"
            contentEditable={previewMode}
            suppressContentEditableWarning
            onBlur={(e) => updateProfile("role", e.currentTarget.textContent ?? "")}
          >
            {config.profile.role}
          </motion.p>
          <h1
            className="mt-3 font-bold leading-tight"
            style={{ fontSize: `${config.appearance.nameSize}px` }}
            contentEditable={previewMode}
            suppressContentEditableWarning
            onBlur={(e) => updateProfile("name", e.currentTarget.textContent ?? "")}
          >
            {config.profile.name}
          </h1>
          <p
            className="mt-4 max-w-2xl opacity-85"
            style={{ fontSize: `${config.appearance.taglineSize}px` }}
            contentEditable={previewMode}
            suppressContentEditableWarning
            onBlur={(e) => updateProfile("tagline", e.currentTarget.textContent ?? "")}
          >
            {config.profile.tagline}
          </p>
          <div className={`mt-7 flex flex-wrap gap-3 ${isTemplateB ? "justify-center" : ""}`}>
            <a
              href={config.profile.heroPrimaryButtonLink}
              className={`px-6 py-3 font-semibold ${buttonClassMap[config.appearance.buttonStyle]}`}
              contentEditable={previewMode}
              suppressContentEditableWarning
              onBlur={(e) =>
                updateProfile(
                  "heroPrimaryButtonLabel",
                  e.currentTarget.textContent ?? "",
                )
              }
            >
              {config.profile.heroPrimaryButtonLabel || t.projects}
            </a>
            <a
              href={config.profile.heroSecondaryButtonLink}
              className={`px-6 py-3 font-semibold ${buttonClassMap[config.appearance.buttonStyle]}`}
              contentEditable={previewMode}
              suppressContentEditableWarning
              onBlur={(e) =>
                updateProfile(
                  "heroSecondaryButtonLabel",
                  e.currentTarget.textContent ?? "",
                )
              }
            >
              {config.profile.heroSecondaryButtonLabel || t.contact}
            </a>
          </div>
        </div>

        {!heroImageFirst && (
          <div
            className={`glass-card p-4 ${previewMode ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{ transform: `translate(${config.appearance.imageOffsetX}px, ${config.appearance.imageOffsetY}px)` }}
            onPointerDown={(e) =>
              onDragStart(
                e,
                "image",
                config.appearance.imageOffsetX,
                config.appearance.imageOffsetY,
              )
            }
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
          >
            <Image
              src={config.profile.photoUrl}
              alt={config.profile.name}
              width={800}
              height={500}
              unoptimized
              className={`h-72 w-full object-cover ${imageClassMap[config.appearance.imageStyle]} ${config.appearance.enableCardHover ? "transition duration-300 hover:scale-[1.02]" : ""}`}
            />
          </div>
        )}
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <h2 className="section-title">{t.about}</h2>
        <div className="glass-card mt-4 p-6 opacity-90 text-[color:var(--body-color)]" dangerouslySetInnerHTML={{ __html: config.profile.about }} />
      </section>

      <section id="projects" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title">{t.projects}</h2>
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
            <Search size={16} className="opacity-70" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} className="bg-transparent text-sm outline-none placeholder:opacity-40" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((item) => (
            <button key={item} onClick={() => setTag(item)} className={`rounded-full px-4 py-1 text-xs ${tag === item ? "bg-white text-zinc-900" : "bg-white/10"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className={`mt-7 grid gap-5 ${isTemplateB ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`glass-card overflow-hidden ${cardClassMap[config.appearance.projectCardStyle]} ${config.appearance.enableCardHover ? "transition duration-300 hover:-translate-y-1 hover:shadow-2xl" : ""}`}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={1200}
                height={500}
                unoptimized
                className={`h-48 w-full object-cover ${imageClassMap[config.appearance.imageStyle]}`}
              />
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: project.rating }).map((_, i) => (
                      <Star key={`${project.id}-${i}`} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[color:var(--body-color)] opacity-90">{project.summary}</p>
                <p className="mt-3 text-sm"><strong>Problem:</strong> {project.problem}</p>
                <p className="mt-1 text-sm"><strong>Solution:</strong> {project.solution}</p>
                <p className="mt-1 text-sm"><strong>Architecture:</strong> {project.architecture}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {config.sections.showThinking && (
        <section id="thinking" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.thinking}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {config.thinkingPoints.map((point, idx) => (
              <div key={`${point}-${idx}`} className="glass-card p-5">
                <div className="text-xs text-[var(--primary)]">0{idx + 1}</div>
                <p className="mt-2 text-[color:var(--body-color)] opacity-95">{point}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {config.sections.showExperience && (
        <section id="experience" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.experience}</h2>
          <div className="mt-5 grid gap-4">
            {config.experienceItems.map((item, idx) => <div key={`${item}-${idx}`} className="glass-card p-5 text-[color:var(--body-color)]">{item}</div>)}
          </div>
        </section>
      )}

      {config.sections.showCaseStudies && (
        <section id="case-studies" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.caseStudies}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {config.caseStudies.map((item, idx) => <div key={`${item}-${idx}`} className="glass-card p-5 text-[color:var(--body-color)]">{item}</div>)}
          </div>
        </section>
      )}

      {config.customSections
        .filter((section) => section.enabled)
        .map((section) => (
          <section key={section.id} className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="section-title">{section.title}</h2>
            <div className="glass-card mt-4 p-6 text-[color:var(--body-color)]" dangerouslySetInnerHTML={{ __html: section.content }} />
          </section>
        ))}

      <section id="contact" className="mx-auto mt-14 max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="glass-card p-7">
          <h2 className="section-title">{t.contact}</h2>
          <div className="mt-4 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
            <p><strong>Email:</strong> {config.contact.email}</p>
            <p><strong>Phone:</strong> {config.contact.phone}</p>
            <p><strong>Location:</strong> {config.contact.location}</p>
            <p><strong>GitHub:</strong> <a className="underline" href={config.contact.github}>{config.contact.github}</a></p>
            <p className="sm:col-span-2"><strong>LinkedIn:</strong> <a className="underline" href={config.contact.linkedin}>{config.contact.linkedin}</a></p>
          </div>
        </div>
      </section>

      <footer className={`mx-auto mt-6 max-w-6xl px-4 ${previewMode ? "pb-4" : "pb-16"} sm:px-6 lg:px-8`}>
        <div className="glass-card flex flex-wrap items-center justify-between gap-3 p-5 text-sm opacity-90">
          <p>{config.footer.text}</p>
          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <a key={`${link.label}-${link.url}`} href={link.url} className="underline">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
