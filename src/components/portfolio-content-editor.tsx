"use client";

import { useState } from "react";
import { PortfolioSite } from "@/components/portfolio/portfolio-site";
import { usePortfolioContentAdmin } from "@/hooks/use-portfolio-content";
import { compressImageFile } from "@/lib/image";
import {
  defaultPortfolioContent,
  HeroStat,
  PortfolioContentConfig,
  PortfolioLang,
  PortfolioStrings,
  ServiceItem,
  SocialItem,
  TimelineItem,
  WorkItem,
} from "@/lib/portfolio-content";

type Tab = "profile" | "labels" | "works" | "services" | "experience" | "extras";

const emptyWork: WorkItem = {
  slot: "",
  cat: "live",
  badge: "● LIVE · IN USE",
  studio: "",
  title: "",
  tag: "",
  href: "#",
  desc: { en: "", de: "" },
};

const emptyService: ServiceItem = { n: "", title: "", tag: "", desc: { en: "", de: "" } };
const emptyTimelineItem: TimelineItem = { co: "", role: { en: "", de: "" }, date: { en: "", de: "" } };
const emptySocial: SocialItem = { name: "", letter: "", href: "" };

function BilingualField({
  label,
  en,
  de,
  onChangeEn,
  onChangeDe,
  multiline,
}: {
  label: string;
  en: string;
  de: string;
  onChangeEn: (v: string) => void;
  onChangeDe: (v: string) => void;
  multiline?: boolean;
}) {
  const Field = multiline ? "textarea" : "input";
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <label className="grid gap-1 text-sm">
        <span className="text-white/50">{label} — EN</span>
        <Field
          className={`studio-input ${multiline ? "min-h-20" : ""}`}
          value={en}
          onChange={(e) => onChangeEn(e.target.value)}
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-white/50">{label} — DE</span>
        <Field
          className={`studio-input ${multiline ? "min-h-20" : ""}`}
          value={de}
          onChange={(e) => onChangeDe(e.target.value)}
        />
      </label>
    </div>
  );
}

export function PortfolioContentEditor({ initialContent }: { initialContent: PortfolioContentConfig }) {
  const { content, save, reset } = usePortfolioContentAdmin(initialContent);
  const [draft, setDraft] = useState<PortfolioContentConfig>(content);
  const [tab, setTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);

  const saveAll = async () => {
    setSaving(true);
    try {
      await save(draft);
      alert("Saved to content/portfolio-content.json — the live site now reflects these changes.");
    } catch (error) {
      alert(
        `Save failed: ${error instanceof Error ? error.message : "unknown error"}. ` +
          "If an uploaded photo is very large, try a smaller one.",
      );
    } finally {
      setSaving(false);
    }
  };

  const restoreDefault = async () => {
    const confirmed = window.confirm(
      "This permanently replaces ALL live site content (hero, projects, services, experience, contact) " +
        "with the original placeholder defaults. Your current photos, project descriptions, and edits will be lost. " +
        "This cannot be undone from the dashboard. Continue?",
    );
    if (!confirmed) return;

    setSaving(true);
    try {
      await reset();
      setDraft(defaultPortfolioContent);
    } catch (error) {
      alert(`Reset failed: ${error instanceof Error ? error.message : "unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const updateStr = (lang: PortfolioLang, patch: Partial<PortfolioStrings>) => {
    setDraft((s) => ({ ...s, str: { ...s.str, [lang]: { ...s.str[lang], ...patch } } }));
  };

  const updateNav = (lang: PortfolioLang, patch: Partial<PortfolioStrings["nav"]>) => {
    setDraft((s) => ({
      ...s,
      str: { ...s.str, [lang]: { ...s.str[lang], nav: { ...s.str[lang].nav, ...patch } } },
    }));
  };

  const uploadHeroPhoto = async (file?: File) => {
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file, 1400, 0.82);
      setDraft((s) => ({ ...s, heroPhotoUrl: dataUrl }));
    } catch {
      alert("Couldn't read that image. Try a different file (JPG/PNG/WebP).");
    }
  };

  // Hero skills (floating badges) + stats
  const updateHeroSkillsText = (text: string) => {
    setDraft((s) => ({ ...s, heroSkills: text.split(",").map((v) => v.trim()).filter(Boolean) }));
  };
  const updateHeroStat = (index: number, patch: Partial<HeroStat>) => {
    setDraft((s) => ({ ...s, heroStats: s.heroStats.map((stat, i) => (i === index ? { ...stat, ...patch } : stat)) }));
  };
  const addHeroStat = () =>
    setDraft((s) => ({ ...s, heroStats: [...s.heroStats, { value: "", label: { en: "", de: "" } }] }));
  const removeHeroStat = (index: number) =>
    setDraft((s) => ({ ...s, heroStats: s.heroStats.filter((_, i) => i !== index) }));

  // Works
  const updateWork = (index: number, patch: Partial<WorkItem>) => {
    setDraft((s) => ({ ...s, works: s.works.map((w, i) => (i === index ? { ...w, ...patch } : w)) }));
  };
  const uploadWorkImage = async (index: number, file?: File) => {
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file, 1200, 0.8);
      updateWork(index, { imageUrl: dataUrl });
    } catch {
      alert("Couldn't read that image. Try a different file (JPG/PNG/WebP).");
    }
  };
  const addWork = () =>
    setDraft((s) => ({ ...s, works: [...s.works, { ...emptyWork, slot: `work-${Date.now()}` }] }));
  const removeWork = (index: number) =>
    setDraft((s) => ({ ...s, works: s.works.filter((_, i) => i !== index) }));

  // Services
  const updateService = (index: number, patch: Partial<ServiceItem>) => {
    setDraft((s) => ({ ...s, services: s.services.map((sv, i) => (i === index ? { ...sv, ...patch } : sv)) }));
  };
  const addService = () => setDraft((s) => ({ ...s, services: [...s.services, { ...emptyService }] }));
  const removeService = (index: number) =>
    setDraft((s) => ({ ...s, services: s.services.filter((_, i) => i !== index) }));

  // Experience / Education
  const updateTimeline = (key: "experiences" | "education", index: number, patch: Partial<TimelineItem>) => {
    setDraft((s) => ({ ...s, [key]: s[key].map((item, i) => (i === index ? { ...item, ...patch } : item)) }));
  };
  const addTimeline = (key: "experiences" | "education") =>
    setDraft((s) => ({ ...s, [key]: [...s[key], { ...emptyTimelineItem }] }));
  const removeTimeline = (key: "experiences" | "education", index: number) =>
    setDraft((s) => ({ ...s, [key]: s[key].filter((_, i) => i !== index) }));

  // Languages
  const updateLanguage = (index: number, lang: PortfolioLang, value: string) => {
    setDraft((s) => ({
      ...s,
      languages: s.languages.map((l, i) => (i === index ? { ...l, [lang]: value } : l)),
    }));
  };
  const addLanguage = () => setDraft((s) => ({ ...s, languages: [...s.languages, { en: "", de: "" }] }));
  const removeLanguage = (index: number) =>
    setDraft((s) => ({ ...s, languages: s.languages.filter((_, i) => i !== index) }));

  // Socials
  const updateSocial = (index: number, patch: Partial<SocialItem>) => {
    setDraft((s) => ({ ...s, socials: s.socials.map((soc, i) => (i === index ? { ...soc, ...patch } : soc)) }));
  };
  const addSocial = () => setDraft((s) => ({ ...s, socials: [...s.socials, { ...emptySocial }] }));
  const removeSocial = (index: number) =>
    setDraft((s) => ({ ...s, socials: s.socials.filter((_, i) => i !== index) }));

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Live Site Content</h1>
          <p className="mt-1 text-sm text-white/60">
            Controls everything on the public homepage (/en and /de) — hero, projects, services,
            experience, and contact info.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveAll}
            disabled={saving}
            className="rounded-xl bg-white px-5 py-2 font-semibold text-zinc-900 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save All"}
          </button>
          <button
            onClick={restoreDefault}
            disabled={saving}
            className="rounded-xl border border-white/25 px-5 py-2 disabled:opacity-60"
          >
            Reset to default
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {(
              [
                ["profile", "Hero / Profile"],
                ["labels", "Section Labels"],
                ["works", "Projects"],
                ["services", "Services"],
                ["experience", "Experience / Education"],
                ["extras", "Languages / Socials"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-lg px-3 py-1.5 text-sm ${tab === id ? "bg-white text-zinc-900" : "bg-white/10"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "profile" && (
            <div className="grid gap-4">
              <label className="text-sm">Hero photo (from device)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadHeroPhoto(e.target.files?.[0])}
                className="studio-input"
              />
              <input
                className="studio-input"
                value={draft.contactEmail}
                onChange={(e) => setDraft((s) => ({ ...s, contactEmail: e.target.value }))}
                placeholder="Contact email (used for mailto links)"
              />
              <input
                className="studio-input"
                value={draft.contactPhone}
                onChange={(e) => setDraft((s) => ({ ...s, contactPhone: e.target.value }))}
                placeholder="Contact phone"
              />
              <BilingualField
                label="Contact location"
                en={draft.contactLocation.en}
                de={draft.contactLocation.de}
                onChangeEn={(v) => setDraft((s) => ({ ...s, contactLocation: { ...s.contactLocation, en: v } }))}
                onChangeDe={(v) => setDraft((s) => ({ ...s, contactLocation: { ...s.contactLocation, de: v } }))}
              />
              <BilingualField
                label="Availability badge"
                en={draft.str.en.avail}
                de={draft.str.de.avail}
                onChangeEn={(v) => updateStr("en", { avail: v })}
                onChangeDe={(v) => updateStr("de", { avail: v })}
              />
              <BilingualField
                label="Role"
                en={draft.str.en.role}
                de={draft.str.de.role}
                onChangeEn={(v) => updateStr("en", { role: v })}
                onChangeDe={(v) => updateStr("de", { role: v })}
              />
              <BilingualField
                label="Hero description"
                en={draft.str.en.heroDesc}
                de={draft.str.de.heroDesc}
                onChangeEn={(v) => updateStr("en", { heroDesc: v })}
                onChangeDe={(v) => updateStr("de", { heroDesc: v })}
                multiline
              />
              <BilingualField
                label="Hero CTA button"
                en={draft.str.en.letsCollab}
                de={draft.str.de.letsCollab}
                onChangeEn={(v) => updateStr("en", { letsCollab: v })}
                onChangeDe={(v) => updateStr("de", { letsCollab: v })}
              />
              <BilingualField
                label="Nav CTA button"
                en={draft.str.en.letsTalk}
                de={draft.str.de.letsTalk}
                onChangeEn={(v) => updateStr("en", { letsTalk: v })}
                onChangeDe={(v) => updateStr("de", { letsTalk: v })}
              />

              <p className="mt-2 text-xs uppercase tracking-wide text-white/40">
                Floating skill badges (shown around the hero photo on wide screens, max 4)
              </p>
              <input
                className="studio-input"
                value={draft.heroSkills.join(", ")}
                onChange={(e) => updateHeroSkillsText(e.target.value)}
                placeholder="Next.js, Node.js, TypeScript, MongoDB"
              />

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-white/40">Hero stats (animated numbers)</p>
                <button onClick={addHeroStat} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900">
                  + Add
                </button>
              </div>
              {draft.heroStats.map((stat, i) => (
                <div key={i} className="grid gap-2 rounded-xl border border-white/10 p-3">
                  <input
                    className="studio-input"
                    value={stat.value}
                    onChange={(e) => updateHeroStat(i, { value: e.target.value })}
                    placeholder="Value (e.g. 5+, 100%, 4)"
                  />
                  <BilingualField
                    label="Label"
                    en={stat.label.en}
                    de={stat.label.de}
                    onChangeEn={(v) => updateHeroStat(i, { label: { ...stat.label, en: v } })}
                    onChangeDe={(v) => updateHeroStat(i, { label: { ...stat.label, de: v } })}
                  />
                  <button onClick={() => removeHeroStat(i)} className="ml-auto rounded border border-red-300/40 px-3 py-1.5 text-xs text-red-200">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "labels" && (
            <div className="grid gap-4">
              <p className="text-xs uppercase tracking-wide text-white/40">Navigation</p>
              <BilingualField label="Nav — Projects" en={draft.str.en.nav.work} de={draft.str.de.nav.work} onChangeEn={(v) => updateNav("en", { work: v })} onChangeDe={(v) => updateNav("de", { work: v })} />
              <BilingualField label="Nav — Services" en={draft.str.en.nav.service} de={draft.str.de.nav.service} onChangeEn={(v) => updateNav("en", { service: v })} onChangeDe={(v) => updateNav("de", { service: v })} />
              <BilingualField label="Nav — Experience" en={draft.str.en.nav.experience} de={draft.str.de.nav.experience} onChangeEn={(v) => updateNav("en", { experience: v })} onChangeDe={(v) => updateNav("de", { experience: v })} />
              <BilingualField label="Nav — Contact" en={draft.str.en.nav.contact} de={draft.str.de.nav.contact} onChangeEn={(v) => updateNav("en", { contact: v })} onChangeDe={(v) => updateNav("de", { contact: v })} />

              <p className="mt-2 text-xs uppercase tracking-wide text-white/40">Projects section</p>
              <BilingualField label="Section title" en={draft.str.en.workTitle} de={draft.str.de.workTitle} onChangeEn={(v) => updateStr("en", { workTitle: v })} onChangeDe={(v) => updateStr("de", { workTitle: v })} />
              <BilingualField label="Filter — All" en={draft.str.en.filterAll} de={draft.str.de.filterAll} onChangeEn={(v) => updateStr("en", { filterAll: v })} onChangeDe={(v) => updateStr("de", { filterAll: v })} />
              <BilingualField label="Filter — Live" en={draft.str.en.filterReal} de={draft.str.de.filterReal} onChangeEn={(v) => updateStr("en", { filterReal: v })} onChangeDe={(v) => updateStr("de", { filterReal: v })} />
              <BilingualField label="Filter — Portfolio" en={draft.str.en.filterExp} de={draft.str.de.filterExp} onChangeEn={(v) => updateStr("en", { filterExp: v })} onChangeDe={(v) => updateStr("de", { filterExp: v })} />
              <BilingualField label="View-all button" en={draft.str.en.viewAll} de={draft.str.de.viewAll} onChangeEn={(v) => updateStr("en", { viewAll: v })} onChangeDe={(v) => updateStr("de", { viewAll: v })} />

              <p className="mt-2 text-xs uppercase tracking-wide text-white/40">Services section</p>
              <BilingualField label="Section title" en={draft.str.en.serviceTitle} de={draft.str.de.serviceTitle} onChangeEn={(v) => updateStr("en", { serviceTitle: v })} onChangeDe={(v) => updateStr("de", { serviceTitle: v })} />

              <p className="mt-2 text-xs uppercase tracking-wide text-white/40">Experience section</p>
              <BilingualField label="Section title" en={draft.str.en.expTitle} de={draft.str.de.expTitle} onChangeEn={(v) => updateStr("en", { expTitle: v })} onChangeDe={(v) => updateStr("de", { expTitle: v })} />
              <BilingualField label="Location line" en={draft.str.en.expYears} de={draft.str.de.expYears} onChangeEn={(v) => updateStr("en", { expYears: v })} onChangeDe={(v) => updateStr("de", { expYears: v })} />
              <BilingualField label="Education label" en={draft.str.en.eduTitle} de={draft.str.de.eduTitle} onChangeEn={(v) => updateStr("en", { eduTitle: v })} onChangeDe={(v) => updateStr("de", { eduTitle: v })} />
              <BilingualField label="Languages label" en={draft.str.en.langTitle} de={draft.str.de.langTitle} onChangeEn={(v) => updateStr("en", { langTitle: v })} onChangeDe={(v) => updateStr("de", { langTitle: v })} />

              <p className="mt-2 text-xs uppercase tracking-wide text-white/40">Contact section</p>
              <BilingualField label="Title" en={draft.str.en.contactTitle} de={draft.str.de.contactTitle} onChangeEn={(v) => updateStr("en", { contactTitle: v })} onChangeDe={(v) => updateStr("de", { contactTitle: v })} />
              <BilingualField label="Description" en={draft.str.en.contactDesc} de={draft.str.de.contactDesc} onChangeEn={(v) => updateStr("en", { contactDesc: v })} onChangeDe={(v) => updateStr("de", { contactDesc: v })} multiline />
              <BilingualField label="Email button label" en={draft.str.en.contactBtn} de={draft.str.de.contactBtn} onChangeEn={(v) => updateStr("en", { contactBtn: v })} onChangeDe={(v) => updateStr("de", { contactBtn: v })} />

              <p className="mt-2 text-xs uppercase tracking-wide text-white/40">Contact form</p>
              <BilingualField label="Form title" en={draft.str.en.formTitle} de={draft.str.de.formTitle} onChangeEn={(v) => updateStr("en", { formTitle: v })} onChangeDe={(v) => updateStr("de", { formTitle: v })} />
              <BilingualField label="Name field label" en={draft.str.en.fName} de={draft.str.de.fName} onChangeEn={(v) => updateStr("en", { fName: v })} onChangeDe={(v) => updateStr("de", { fName: v })} />
              <BilingualField label="Email field label" en={draft.str.en.fEmail} de={draft.str.de.fEmail} onChangeEn={(v) => updateStr("en", { fEmail: v })} onChangeDe={(v) => updateStr("de", { fEmail: v })} />
              <BilingualField label="Subject field label" en={draft.str.en.fSubject} de={draft.str.de.fSubject} onChangeEn={(v) => updateStr("en", { fSubject: v })} onChangeDe={(v) => updateStr("de", { fSubject: v })} />
              <BilingualField label="Message field label" en={draft.str.en.fMsg} de={draft.str.de.fMsg} onChangeEn={(v) => updateStr("en", { fMsg: v })} onChangeDe={(v) => updateStr("de", { fMsg: v })} />
              <BilingualField label="Send button" en={draft.str.en.fSend} de={draft.str.de.fSend} onChangeEn={(v) => updateStr("en", { fSend: v })} onChangeDe={(v) => updateStr("de", { fSend: v })} />
              <BilingualField label="Sending state" en={draft.str.en.fSending} de={draft.str.de.fSending} onChangeEn={(v) => updateStr("en", { fSending: v })} onChangeDe={(v) => updateStr("de", { fSending: v })} />
              <BilingualField label="Error message" en={draft.str.en.fErr} de={draft.str.de.fErr} onChangeEn={(v) => updateStr("en", { fErr: v })} onChangeDe={(v) => updateStr("de", { fErr: v })} />
              <BilingualField label="Success title" en={draft.str.en.fSent} de={draft.str.de.fSent} onChangeEn={(v) => updateStr("en", { fSent: v })} onChangeDe={(v) => updateStr("de", { fSent: v })} />
              <BilingualField label="Success subtitle" en={draft.str.en.fSentSub} de={draft.str.de.fSentSub} onChangeEn={(v) => updateStr("en", { fSentSub: v })} onChangeDe={(v) => updateStr("de", { fSentSub: v })} multiline />
              <BilingualField label="Send another button" en={draft.str.en.fAgain} de={draft.str.de.fAgain} onChangeEn={(v) => updateStr("en", { fAgain: v })} onChangeDe={(v) => updateStr("de", { fAgain: v })} />
            </div>
          )}

          {tab === "works" && (
            <div className="grid gap-3">
              <button onClick={addWork} className="rounded-xl bg-white px-4 py-2 font-semibold text-zinc-900">
                + Add project
              </button>
              {draft.works.map((work, i) => (
                <div key={i} className="grid gap-2 rounded-xl border border-white/10 p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className="studio-input" value={work.title} onChange={(e) => updateWork(i, { title: e.target.value })} placeholder="Title" />
                    <input className="studio-input" value={work.studio} onChange={(e) => updateWork(i, { studio: e.target.value })} placeholder="Studio / client label" />
                    <input className="studio-input" value={work.tag} onChange={(e) => updateWork(i, { tag: e.target.value })} placeholder="Tech tag (e.g. Next.js · Node.js)" />
                    <input className="studio-input" value={work.badge} onChange={(e) => updateWork(i, { badge: e.target.value })} placeholder="Badge (e.g. ● LIVE · IN USE)" />
                    <input className="studio-input" value={work.href} onChange={(e) => updateWork(i, { href: e.target.value })} placeholder="Link URL" />
                    <select className="studio-input" value={work.cat} onChange={(e) => updateWork(i, { cat: e.target.value as WorkItem["cat"] })}>
                      <option value="live">Live</option>
                      <option value="portfolio">Portfolio</option>
                    </select>
                  </div>
                  <BilingualField label="Description" en={work.desc.en} de={work.desc.de} onChangeEn={(v) => updateWork(i, { desc: { ...work.desc, en: v } })} onChangeDe={(v) => updateWork(i, { desc: { ...work.desc, de: v } })} multiline />
                  <label className="text-sm">Project screenshot (from device)</label>
                  <input type="file" accept="image/*" onChange={(e) => uploadWorkImage(i, e.target.files?.[0])} className="studio-input" />
                  <div className="flex items-center justify-between">
                    {work.imageUrl && (
                      <button onClick={() => updateWork(i, { imageUrl: undefined })} className="rounded border border-white/25 px-2 py-1 text-xs">
                        Remove image (use placeholder art)
                      </button>
                    )}
                    <button onClick={() => removeWork(i)} className="ml-auto rounded border border-red-300/40 px-3 py-1.5 text-xs text-red-200">
                      Delete project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "services" && (
            <div className="grid gap-3">
              <button onClick={addService} className="rounded-xl bg-white px-4 py-2 font-semibold text-zinc-900">
                + Add service
              </button>
              {draft.services.map((service, i) => (
                <div key={i} className="grid gap-2 rounded-xl border border-white/10 p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className="studio-input" value={service.title} onChange={(e) => updateService(i, { title: e.target.value })} placeholder="Title" />
                    <input className="studio-input" value={service.tag} onChange={(e) => updateService(i, { tag: e.target.value })} placeholder="Tag (e.g. NEXT.JS · NODE · MONGODB)" />
                  </div>
                  <BilingualField label="Description" en={service.desc.en} de={service.desc.de} onChangeEn={(v) => updateService(i, { desc: { ...service.desc, en: v } })} onChangeDe={(v) => updateService(i, { desc: { ...service.desc, de: v } })} multiline />
                  <button onClick={() => removeService(i)} className="ml-auto rounded border border-red-300/40 px-3 py-1.5 text-xs text-red-200">
                    Delete service
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "experience" && (
            <div className="grid gap-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Experience</p>
                  <button onClick={() => addTimeline("experiences")} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900">
                    + Add
                  </button>
                </div>
                <div className="grid gap-3">
                  {draft.experiences.map((ex, i) => (
                    <div key={i} className="grid gap-2 rounded-xl border border-white/10 p-3">
                      <input className="studio-input" value={ex.co} onChange={(e) => updateTimeline("experiences", i, { co: e.target.value })} placeholder="Company" />
                      <BilingualField label="Role" en={ex.role.en} de={ex.role.de} onChangeEn={(v) => updateTimeline("experiences", i, { role: { ...ex.role, en: v } })} onChangeDe={(v) => updateTimeline("experiences", i, { role: { ...ex.role, de: v } })} />
                      <BilingualField label="Dates" en={ex.date.en} de={ex.date.de} onChangeEn={(v) => updateTimeline("experiences", i, { date: { ...ex.date, en: v } })} onChangeDe={(v) => updateTimeline("experiences", i, { date: { ...ex.date, de: v } })} />
                      <button onClick={() => removeTimeline("experiences", i)} className="ml-auto rounded border border-red-300/40 px-3 py-1.5 text-xs text-red-200">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Education</p>
                  <button onClick={() => addTimeline("education")} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900">
                    + Add
                  </button>
                </div>
                <div className="grid gap-3">
                  {draft.education.map((ed, i) => (
                    <div key={i} className="grid gap-2 rounded-xl border border-white/10 p-3">
                      <input className="studio-input" value={ed.co} onChange={(e) => updateTimeline("education", i, { co: e.target.value })} placeholder="Institution" />
                      <BilingualField label="Program" en={ed.role.en} de={ed.role.de} onChangeEn={(v) => updateTimeline("education", i, { role: { ...ed.role, en: v } })} onChangeDe={(v) => updateTimeline("education", i, { role: { ...ed.role, de: v } })} />
                      <BilingualField label="Dates" en={ed.date.en} de={ed.date.de} onChangeEn={(v) => updateTimeline("education", i, { date: { ...ed.date, en: v } })} onChangeDe={(v) => updateTimeline("education", i, { date: { ...ed.date, de: v } })} />
                      <button onClick={() => removeTimeline("education", i)} className="ml-auto rounded border border-red-300/40 px-3 py-1.5 text-xs text-red-200">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "extras" && (
            <div className="grid gap-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Languages</p>
                  <button onClick={addLanguage} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900">
                    + Add
                  </button>
                </div>
                <div className="grid gap-2">
                  {draft.languages.map((l, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input className="studio-input" value={l.en} onChange={(e) => updateLanguage(i, "en", e.target.value)} placeholder="EN label (e.g. German · B2)" />
                      <input className="studio-input" value={l.de} onChange={(e) => updateLanguage(i, "de", e.target.value)} placeholder="DE label (e.g. Deutsch · B2)" />
                      <button onClick={() => removeLanguage(i)} className="rounded border border-red-300/40 px-2 py-1 text-xs text-red-200">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Social links</p>
                  <button onClick={addSocial} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900">
                    + Add
                  </button>
                </div>
                <div className="grid gap-2">
                  {draft.socials.map((soc, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_2fr_auto] items-center gap-2">
                      <input className="studio-input" value={soc.name} onChange={(e) => updateSocial(i, { name: e.target.value })} placeholder="Name (e.g. GitHub)" />
                      <input className="studio-input" value={soc.letter} onChange={(e) => updateSocial(i, { letter: e.target.value })} placeholder="Badge letters (e.g. Gh)" />
                      <input className="studio-input" value={soc.href} onChange={(e) => updateSocial(i, { href: e.target.value })} placeholder="URL" />
                      <button onClick={() => removeSocial(i)} className="rounded border border-red-300/40 px-2 py-1 text-xs text-red-200">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-2">
          <div className="mb-2 rounded-lg bg-white/10 px-3 py-1 text-xs">Live Preview (unsaved draft)</div>
          <div className="max-h-[78vh] overflow-auto rounded-xl border border-white/10">
            <PortfolioContentPreview content={draft} />
          </div>
        </section>
      </div>
    </main>
  );
}

function PortfolioContentPreview({ content }: { content: PortfolioContentConfig }) {
  return <PortfolioSite locale="en" content={content} />;
}
