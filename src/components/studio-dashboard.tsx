"use client";

import { useState } from "react";
import { PortfolioPage } from "@/components/portfolio-page";
import { PortfolioContentEditor } from "@/components/portfolio-content-editor";
import { useSiteConfig } from "@/hooks/use-site-config";
import { PortfolioContentConfig } from "@/lib/portfolio-content";
import { defaultSiteConfig, PortfolioProject } from "@/lib/site-config";
import { templateCatalog } from "@/lib/templates";

type TabId = "profile" | "appearance" | "projects" | "sections" | "footer";

const fontOptions = [
  "Inter, system-ui, sans-serif",
  "Space Grotesk, system-ui, sans-serif",
  "Poppins, system-ui, sans-serif",
  "Roboto, system-ui, sans-serif",
  "Georgia, serif",
  "Monaco, monospace",
];

const emptyProject: PortfolioProject = {
  id: "",
  title: "",
  summary: "",
  problem: "",
  solution: "",
  architecture: "",
  technologies: "",
  imageUrl: "",
  rating: 5,
  featured: false,
};

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function StudioDashboard({ initialContent }: { initialContent: PortfolioContentConfig }) {
  const [mode, setMode] = useState<"live" | "legacy">("live");
  const { config, save, reset } = useSiteConfig();
  const [draft, setDraft] = useState(config);
  const [project, setProject] = useState<PortfolioProject>(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("profile");
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState("");

  const paletteKey = draft.appearance.mode === "dark" ? "darkPalette" : "lightPalette";
  const palette = draft.appearance[paletteKey];

  const updatePalette = (field: keyof typeof palette, value: string) => {
    setDraft((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [paletteKey]: {
          ...prev.appearance[paletteKey],
          [field]: value,
        },
      },
    }));
  };

  const saveAll = () => {
    save(draft);
    alert("Saved successfully");
  };

  const restoreDefault = () => {
    reset();
    setDraft(defaultSiteConfig);
  };

  const addOrUpdateProject = () => {
    if (!project.title.trim()) return;
    const payload = {
      ...project,
      id: project.id || project.title.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-"),
      rating: Math.max(1, Math.min(5, Number(project.rating || 1))),
    };

    if (editingProjectId) {
      setDraft((prev) => ({
        ...prev,
        projects: prev.projects.map((item) => (item.id === editingProjectId ? payload : item)),
      }));
      setEditingProjectId(null);
    } else {
      setDraft((prev) => ({ ...prev, projects: [payload, ...prev.projects] }));
    }

    setProject(emptyProject);
  };

  const editProject = (id: string) => {
    const target = draft.projects.find((item) => item.id === id);
    if (!target) return;
    setProject(target);
    setEditingProjectId(id);
    setTab("projects");
  };

  const removeProject = (id: string) => {
    setDraft((prev) => ({ ...prev, projects: prev.projects.filter((item) => item.id !== id) }));
  };

  const addCustomSection = () => {
    if (!newSectionTitle.trim()) return;
    setDraft((prev) => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        {
          id: `${newSectionTitle.toLowerCase().replaceAll(" ", "-")}-${Date.now()}`,
          title: newSectionTitle,
          content: newSectionContent,
          enabled: true,
        },
      ],
    }));
    setNewSectionTitle("");
    setNewSectionContent("");
  };

  const uploadProfileImage = async (file?: File) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setDraft((s) => ({ ...s, profile: { ...s.profile, photoUrl: dataUrl } }));
  };

  const uploadProjectImage = async (file?: File) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setProject((s) => ({ ...s, imageUrl: dataUrl }));
  };

  return (
    <div>
      <div className="mx-auto flex max-w-[1500px] items-center gap-2 px-4 pt-8">
        <button
          onClick={() => setMode("live")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "live" ? "bg-white text-zinc-900" : "bg-white/10 text-white"}`}
        >
          Live Site (/en, /de)
        </button>
        <button
          onClick={() => setMode("legacy")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "legacy" ? "bg-white text-zinc-900" : "bg-white/10 text-white"}`}
        >
          Legacy Template Builder (unused)
        </button>
      </div>

      {mode === "live" && <PortfolioContentEditor initialContent={initialContent} />}

      {mode === "legacy" && (
    <main className="mx-auto max-w-[1500px] px-4 py-8 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Portfolio Builder Studio</h1>
        <div className="flex gap-2">
          <button onClick={saveAll} className="rounded-xl bg-white px-5 py-2 font-semibold text-zinc-900">Save All</button>
          <button onClick={restoreDefault} className="rounded-xl border border-white/25 px-5 py-2">Reset</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              ["profile", "Hero/Profile"],
              ["appearance", "Design/Colors/Fonts"],
              ["projects", "Projects CRUD"],
              ["sections", "Sections Builder"],
              ["footer", "Contact/Footer"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id as TabId)} className={`rounded-lg px-3 py-1.5 text-sm ${tab === id ? "bg-white text-zinc-900" : "bg-white/10"}`}>
                {label}
              </button>
            ))}
          </div>

          {tab === "profile" && (
            <div className="grid gap-3">
              <input className="studio-input" value={draft.profile.name} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, name: e.target.value } }))} placeholder="Name" />
              <input className="studio-input" value={draft.profile.role} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, role: e.target.value } }))} placeholder="Role" />
              <input className="studio-input" value={draft.profile.tagline} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, tagline: e.target.value } }))} placeholder="Tagline" />
              <textarea className="studio-input min-h-24" value={draft.profile.about} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, about: e.target.value } }))} placeholder="About HTML/text" />
              <label className="text-sm">Profile image from device</label>
              <input type="file" accept="image/*" onChange={(e) => uploadProfileImage(e.target.files?.[0])} className="studio-input" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="studio-input" value={draft.profile.heroPrimaryButtonLabel} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, heroPrimaryButtonLabel: e.target.value } }))} placeholder="Primary button label" />
                <input className="studio-input" value={draft.profile.heroPrimaryButtonLink} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, heroPrimaryButtonLink: e.target.value } }))} placeholder="Primary button link" />
                <input className="studio-input" value={draft.profile.heroSecondaryButtonLabel} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, heroSecondaryButtonLabel: e.target.value } }))} placeholder="Secondary button label" />
                <input className="studio-input" value={draft.profile.heroSecondaryButtonLink} onChange={(e) => setDraft((s) => ({ ...s, profile: { ...s.profile, heroSecondaryButtonLink: e.target.value } }))} placeholder="Secondary button link" />
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div className="grid gap-3">
              <div className="grid gap-2 sm:grid-cols-3">
                {templateCatalog.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() =>
                      setDraft((s) => ({
                        ...s,
                        appearance: { ...s.appearance, template: tpl.id },
                      }))
                    }
                    className={`rounded-xl border p-3 text-left ${
                      draft.appearance.template === tpl.id ? "border-cyan-300 bg-cyan-200/10" : "border-white/20"
                    }`}
                  >
                    <p className="font-semibold">{tpl.name}</p>
                    <p className="text-xs opacity-75">{tpl.note}</p>
                  </button>
                ))}
              </div>

              <select className="studio-input" value={draft.appearance.mode} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, mode: e.target.value as "dark" | "light" } }))}>
                <option value="dark">Editing Dark Theme</option>
                <option value="light">Editing Light Theme</option>
              </select>

              <select className="studio-input" value={draft.appearance.fontFamily} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, fontFamily: e.target.value } }))}>
                {fontOptions.map((font) => <option key={font} value={font}>{font}</option>)}
              </select>

              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  ["primaryColor", "Primary"],
                  ["secondaryColor", "Secondary"],
                  ["backgroundColor", "Background"],
                  ["textColor", "Main text"],
                  ["bodyColor", "Body text"],
                  ["sectionTitleColor", "Section titles"],
                ] as const).map(([key, label]) => (
                  <label key={key} className="grid gap-1 text-sm">
                    {label}
                    <div className="flex items-center gap-2">
                      <input type="color" value={palette[key]} onChange={(e) => updatePalette(key, e.target.value)} className="h-10 w-14 rounded border border-white/20 bg-transparent" />
                      <input className="studio-input" value={palette[key]} onChange={(e) => updatePalette(key, e.target.value)} />
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <label className="text-sm">Name size <input type="range" min={24} max={100} value={draft.appearance.nameSize} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, nameSize: Number(e.target.value) } }))} /></label>
                <label className="text-sm">Tagline size <input type="range" min={12} max={40} value={draft.appearance.taglineSize} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, taglineSize: Number(e.target.value) } }))} /></label>
                <label className="text-sm">Section title size <input type="range" min={20} max={60} value={draft.appearance.sectionTitleSize} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, sectionTitleSize: Number(e.target.value) } }))} /></label>
                <label className="text-sm">Hero image position
                  <select className="studio-input mt-1" value={draft.appearance.heroImagePosition} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, heroImagePosition: e.target.value as "left" | "right" } }))}>
                    <option value="right">Right</option><option value="left">Left</option>
                  </select>
                </label>
                <label className="text-sm">Hero X <input type="range" min={-120} max={120} value={draft.appearance.heroOffsetX} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, heroOffsetX: Number(e.target.value) } }))} /></label>
                <label className="text-sm">Hero Y <input type="range" min={-120} max={120} value={draft.appearance.heroOffsetY} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, heroOffsetY: Number(e.target.value) } }))} /></label>
                <label className="text-sm">Image X <input type="range" min={-120} max={120} value={draft.appearance.imageOffsetX} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, imageOffsetX: Number(e.target.value) } }))} /></label>
                <label className="text-sm">Image Y <input type="range" min={-120} max={120} value={draft.appearance.imageOffsetY} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, imageOffsetY: Number(e.target.value) } }))} /></label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <select className="studio-input" value={draft.appearance.imageStyle} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, imageStyle: e.target.value as typeof s.appearance.imageStyle } }))}>
                  <option value="soft">Image Style: Soft</option>
                  <option value="sharp">Image Style: Sharp</option>
                  <option value="rounded">Image Style: Rounded</option>
                  <option value="circle">Image Style: Circle</option>
                  <option value="blob">Image Style: Blob</option>
                  <option value="frame">Image Style: Frame</option>
                </select>
                <select className="studio-input" value={draft.appearance.buttonStyle} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, buttonStyle: e.target.value as typeof s.appearance.buttonStyle } }))}>
                  <option value="minimal">Button Style: Minimal</option>
                  <option value="pill">Button Style: Pill</option>
                  <option value="glass">Button Style: Glass</option>
                  <option value="gradient">Button Style: Gradient</option>
                  <option value="neon">Button Style: Neon</option>
                </select>
                <select className="studio-input" value={draft.appearance.projectCardStyle} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, projectCardStyle: e.target.value as typeof s.appearance.projectCardStyle } }))}>
                  <option value="classic">Card Style: Classic</option>
                  <option value="elevated">Card Style: Elevated</option>
                  <option value="outline">Card Style: Outline</option>
                  <option value="magazine">Card Style: Magazine</option>
                </select>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.appearance.enableCardHover} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, enableCardHover: e.target.checked } }))} /> Enable card hover effects</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.appearance.showGridPattern} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, showGridPattern: e.target.checked } }))} /> Show background grid</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.appearance.showNoiseOverlay} onChange={(e) => setDraft((s) => ({ ...s, appearance: { ...s.appearance, showNoiseOverlay: e.target.checked } }))} /> Show noise texture</label>
              </div>
            </div>
          )}

          {tab === "projects" && (
            <div className="grid gap-3">
              <input className="studio-input" value={project.title} onChange={(e) => setProject((s) => ({ ...s, title: e.target.value }))} placeholder="Title" />
              <input className="studio-input" value={project.summary} onChange={(e) => setProject((s) => ({ ...s, summary: e.target.value }))} placeholder="Summary" />
              <textarea className="studio-input min-h-20" value={project.problem} onChange={(e) => setProject((s) => ({ ...s, problem: e.target.value }))} placeholder="Problem" />
              <textarea className="studio-input min-h-20" value={project.solution} onChange={(e) => setProject((s) => ({ ...s, solution: e.target.value }))} placeholder="Solution" />
              <input className="studio-input" value={project.architecture} onChange={(e) => setProject((s) => ({ ...s, architecture: e.target.value }))} placeholder="Architecture" />
              <input className="studio-input" value={project.technologies} onChange={(e) => setProject((s) => ({ ...s, technologies: e.target.value }))} placeholder="Technologies" />
              <label className="text-sm">Project image from device</label>
              <input type="file" accept="image/*" onChange={(e) => uploadProjectImage(e.target.files?.[0])} className="studio-input" />
              <div className="flex gap-2">
                <button onClick={addOrUpdateProject} className="rounded-xl bg-white px-4 py-2 font-semibold text-zinc-900">{editingProjectId ? "Update" : "Add"}</button>
                <button onClick={() => { setProject(emptyProject); setEditingProjectId(null); }} className="rounded-xl border border-white/25 px-4 py-2">Clear</button>
              </div>
              <div className="space-y-2">
                {draft.projects.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/10 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p>{item.title}</p>
                      <div className="flex gap-2">
                        <button onClick={() => editProject(item.id)} className="rounded border border-cyan-300/40 px-2 py-1 text-xs text-cyan-200">Edit</button>
                        <button onClick={() => removeProject(item.id)} className="rounded border border-red-300/40 px-2 py-1 text-xs text-red-200">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "sections" && (
            <div className="grid gap-3">
              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.sections.showThinking} onChange={(e) => setDraft((s) => ({ ...s, sections: { ...s.sections, showThinking: e.target.checked } }))} /> Show Thinking</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.sections.showExperience} onChange={(e) => setDraft((s) => ({ ...s, sections: { ...s.sections, showExperience: e.target.checked } }))} /> Show Experience</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.sections.showCaseStudies} onChange={(e) => setDraft((s) => ({ ...s, sections: { ...s.sections, showCaseStudies: e.target.checked } }))} /> Show Case Studies</label>
              <textarea className="studio-input min-h-20" value={draft.thinkingPoints.join("\n")} onChange={(e) => setDraft((s) => ({ ...s, thinkingPoints: e.target.value.split("\n").filter(Boolean) }))} placeholder="Thinking lines" />
              <textarea className="studio-input min-h-20" value={draft.experienceItems.join("\n")} onChange={(e) => setDraft((s) => ({ ...s, experienceItems: e.target.value.split("\n").filter(Boolean) }))} placeholder="Experience lines" />
              <textarea className="studio-input min-h-20" value={draft.caseStudies.join("\n")} onChange={(e) => setDraft((s) => ({ ...s, caseStudies: e.target.value.split("\n").filter(Boolean) }))} placeholder="Case studies lines" />
              <div className="rounded-xl border border-white/10 p-3">
                <p className="mb-2 text-sm font-semibold">Add custom section (clear builder)</p>
                <input className="studio-input" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} placeholder="Section title" />
                <textarea className="studio-input mt-2 min-h-24" value={newSectionContent} onChange={(e) => setNewSectionContent(e.target.value)} placeholder="Section content" />
                <button onClick={addCustomSection} className="mt-2 rounded-xl bg-white px-4 py-2 font-semibold text-zinc-900">Add Section</button>
              </div>
              <div className="space-y-2">
                {draft.customSections.map((section) => (
                  <div key={section.id} className="rounded-xl border border-white/10 p-3">
                    <input className="studio-input" value={section.title} onChange={(e) => setDraft((s) => ({ ...s, customSections: s.customSections.map((x) => x.id === section.id ? { ...x, title: e.target.value } : x) }))} />
                    <textarea className="studio-input mt-2 min-h-20" value={section.content} onChange={(e) => setDraft((s) => ({ ...s, customSections: s.customSections.map((x) => x.id === section.id ? { ...x, content: e.target.value } : x) }))} />
                    <div className="mt-2 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={section.enabled} onChange={(e) => setDraft((s) => ({ ...s, customSections: s.customSections.map((x) => x.id === section.id ? { ...x, enabled: e.target.checked } : x) }))} /> Enabled</label>
                      <button onClick={() => setDraft((s) => ({ ...s, customSections: s.customSections.filter((x) => x.id !== section.id) }))} className="rounded border border-red-300/40 px-2 py-1 text-xs text-red-200">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "footer" && (
            <div className="grid gap-3">
              <input className="studio-input" value={draft.contact.email} onChange={(e) => setDraft((s) => ({ ...s, contact: { ...s.contact, email: e.target.value } }))} placeholder="Email" />
              <input className="studio-input" value={draft.contact.phone} onChange={(e) => setDraft((s) => ({ ...s, contact: { ...s.contact, phone: e.target.value } }))} placeholder="Phone" />
              <input className="studio-input" value={draft.contact.location} onChange={(e) => setDraft((s) => ({ ...s, contact: { ...s.contact, location: e.target.value } }))} placeholder="Location" />
              <input className="studio-input" value={draft.contact.linkedin} onChange={(e) => setDraft((s) => ({ ...s, contact: { ...s.contact, linkedin: e.target.value } }))} placeholder="LinkedIn" />
              <input className="studio-input" value={draft.contact.github} onChange={(e) => setDraft((s) => ({ ...s, contact: { ...s.contact, github: e.target.value } }))} placeholder="GitHub" />
              <textarea className="studio-input min-h-20" value={draft.footer.text} onChange={(e) => setDraft((s) => ({ ...s, footer: { ...s.footer, text: e.target.value } }))} placeholder="Footer text" />
              <textarea className="studio-input min-h-20" value={draft.footer.links} onChange={(e) => setDraft((s) => ({ ...s, footer: { ...s.footer, links: e.target.value } }))} placeholder="Label|URL,Label|URL" />
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-2">
          <div className="mb-2 rounded-lg bg-white/10 px-3 py-1 text-xs">Live Preview</div>
          <div className="max-h-[78vh] overflow-auto rounded-xl border border-white/10">
            <PortfolioPage
              locale="en"
              overrideConfig={draft}
              previewMode
              onConfigChange={setDraft}
            />
          </div>
        </section>
      </div>
    </main>
      )}
    </div>
  );
}
