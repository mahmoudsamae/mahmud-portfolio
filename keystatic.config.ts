import { collection, config, fields, singleton } from "@keystatic/core";

// Every visible text exists in German and English: one object with both fields, side by side.
function i18n(label: string, opts: { multiline?: boolean; description?: string } = {}) {
  return fields.object(
    {
      de: fields.text({ label: "Deutsch", multiline: opts.multiline }),
      en: fields.text({ label: "English", multiline: opts.multiline }),
    },
    { label, description: opts.description, layout: [6, 6] },
  );
}

// Interface texts (buttons, headings, form). Key, admin label, multiline.
export const LABEL_KEYS = [
  ["navWork", "Navigation: Projekte"],
  ["navService", "Navigation: Leistungen"],
  ["navExperience", "Navigation: Erfahrung"],
  ["navContact", "Navigation: Kontakt"],
  ["letsTalk", "Button oben rechts"],
  ["letsCollab", "Hero-Button"],
  ["workTitle", "Überschrift Projekte"],
  ["allProjects", "Button „Alle Projekte“"],
  ["projectsPageTitle", "Überschrift der Projektliste"],
  ["filterAll", "Filter: Alle"],
  ["catAutomation", "Kategorie: Automation"],
  ["catInUse", "Kategorie: Im Einsatz"],
  ["catWeb", "Kategorie: Web"],
  ["viewAll", "Button GitHub"],
  ["serviceTitle", "Überschrift Leistungen"],
  ["expTitle", "Überschrift Erfahrung"],
  ["expYears", "Ort unter Erfahrung"],
  ["eduTitle", "Überschrift Ausbildung"],
  ["langTitle", "Überschrift Sprachen"],
  ["contactTitle", "Überschrift Kontakt"],
  ["contactNote", "Kontakt-Text nach der Verfügbarkeit", true],
  ["formTitle", "Formular: Titel"],
  ["fName", "Formular: Name"],
  ["fEmail", "Formular: E-Mail"],
  ["fSubject", "Formular: Betreff"],
  ["fMsg", "Formular: Nachricht"],
  ["fSend", "Formular: Senden"],
  ["fSent", "Formular: Titel nach dem Absenden"],
  ["fSentSub", "Formular: Text nach dem Absenden", true],
  ["fAgain", "Formular: Zurück"],
  ["fErr", "Formular: Fehlermeldung"],
  ["projectProblem", "Projektseite: Problem"],
  ["projectSolution", "Projektseite: Lösung"],
  ["projectArchitecture", "Projektseite: Architektur"],
  ["projectResults", "Projektseite: Ergebnisse"],
  ["projectEvidence", "Projektseite: Link zum Beleg"],
  ["projectStack", "Projektseite: Tech-Stack"],
  ["projectScreenshots", "Projektseite: Screenshots"],
  ["projectVideo", "Projektseite: Video"],
  ["projectLive", "Button „Live testen“"],
  ["projectGithub", "Button GitHub"],
  ["projectDocs", "Button Dokumentation"],
  ["projectOffline", "Demo offline"],
  ["projectComingSoon", "Demo folgt"],
  ["projectBack", "Link zurück"],
  ["videoConsent", "Video: Hinweis vor dem Laden", true],
  ["videoLoad", "Video: Button laden"],
] as const;

export type LabelKey = (typeof LABEL_KEYS)[number][0];

export const CATEGORIES = [
  { label: "Automation", value: "automation" },
  { label: "Im Einsatz", value: "im-einsatz" },
  { label: "Web", value: "web" },
] as const;

const timelineItem = (label: string) =>
  fields.array(
    fields.object({
      co: fields.text({ label: "Firma / Schule" }),
      role: i18n("Rolle"),
      date: i18n("Zeitraum"),
    }),
    { label, itemLabel: (props) => props.fields.co.value || "Eintrag" },
  );

export default config({
  // Local mode only for now. Production (GitHub mode) is set up after approval;
  // until then the admin is disabled in production builds (see src/app/keystatic).
  storage: { kind: "local" },
  ui: {
    brand: { name: "Portfolio CMS" },
    navigation: {
      Startseite: ["site", "services", "resume"],
      Projekte: ["projects"],
      Texte: ["labels"],
    },
  },
  singletons: {
    site: singleton({
      label: "Hero, Verfügbarkeit & Kontakt",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        role: i18n("Titel / Rolle", { description: "Erscheint im Hero, im Footer und im Seitentitel." }),
        heroDesc: i18n("Hero-Text", { multiline: true, description: "Auch die Meta-Beschreibung für Google." }),
        heroPhoto: fields.image({
          label: "Hero-Foto",
          directory: "public/images/site",
          publicPath: "/images/site/",
        }),
        heroSkills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills am Foto (max. 4)",
          itemLabel: (props) => props.value,
        }),
        heroStats: fields.array(
          fields.object({
            kind: fields.select({
              label: "Wert",
              description: "„Zählen“ rechnet den Wert aus den Projekten/Leistungen aus.",
              options: [
                { label: "Fester Text", value: "text" },
                { label: "Zählen: Projekte „Im Einsatz“", value: "projectsInUse" },
                { label: "Zählen: Leistungen", value: "services" },
              ],
              defaultValue: "text",
            }),
            value: fields.text({ label: "Fester Wert (nur bei „Fester Text“)" }),
            label: i18n("Beschriftung"),
          }),
          { label: "Kennzahlen im Hero (max. 3)", itemLabel: (props) => props.fields.label.fields.de.value || "Kennzahl" },
        ),
        availability: i18n("Verfügbarkeit", {
          description: "Erscheint im Badge oben, im Badge bei Kontakt und am Anfang des Kontakt-Texts.",
        }),
        contactEmail: fields.text({ label: "E-Mail" }),
        contactPhone: fields.text({ label: "Telefon" }),
        contactLocation: i18n("Ort"),
        socials: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            letter: fields.text({ label: "Kürzel im Icon (1–2 Zeichen)" }),
            href: fields.text({ label: "Link (https://… oder mailto:…)" }),
          }),
          { label: "Profile & Links", itemLabel: (props) => props.fields.name.value || "Link" },
        ),
      },
    }),
    services: singleton({
      label: "Leistungen („Was ich mache“)",
      path: "content/services",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            n: fields.text({ label: "Nummer" }),
            title: i18n("Titel"),
            desc: i18n("Beschreibung", { multiline: true }),
            tag: fields.text({ label: "Stichworte" }),
          }),
          { label: "Leistungen", itemLabel: (props) => props.fields.title.fields.de.value || "Leistung" },
        ),
      },
    }),
    resume: singleton({
      label: "Erfahrung, Ausbildung & Sprachen",
      path: "content/resume",
      format: { data: "yaml" },
      schema: {
        experiences: timelineItem("Berufserfahrung"),
        education: timelineItem("Ausbildung"),
        languages: fields.array(i18n("Sprache"), {
          label: "Sprachen",
          itemLabel: (props) => props.fields.de.value || "Sprache",
        }),
      },
    }),
    labels: singleton({
      label: "Oberflächen-Texte",
      path: "content/labels",
      format: { data: "yaml" },
      schema: Object.fromEntries(
        LABEL_KEYS.map(([key, label, multiline]) => [key, i18n(label, { multiline: Boolean(multiline) })]),
      ) as Record<LabelKey, ReturnType<typeof i18n>>,
    }),
  },
  collections: {
    projects: collection({
      label: "Projekte",
      path: "content/projects/*",
      slugField: "slug",
      format: { data: "yaml" },
      columns: ["category", "featured", "order"],
      schema: {
        slug: fields.slug({
          name: { label: "Interner Name", description: "Bestimmt die URL: /de/projekte/<name>" },
        }),
        title: i18n("Titel"),
        category: fields.select({
          label: "Kategorie",
          options: CATEGORIES.map((c) => ({ ...c })),
          defaultValue: "web",
        }),
        featured: fields.checkbox({
          label: "Auf der Startseite zeigen",
          description: "Maximal 3. Sind mehr markiert, zeigt die Startseite die ersten 3 nach Reihenfolge.",
        }),
        order: fields.integer({ label: "Reihenfolge", description: "Kleinere Zahl = weiter vorne.", defaultValue: 10 }),
        badge: fields.text({ label: "Status-Badge auf der Karte", description: "z. B. „● LIVE · IN USE“" }),
        studio: fields.text({ label: "Kunde / Art (Karte)" }),
        tag: fields.text({ label: "Tech kurz (Karte)" }),
        summary: i18n("Kurzbeschreibung (Karte)", { multiline: true }),
        coverImage: fields.image({
          label: "Vorschaubild (Karte)",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        problem: i18n("Problem", { multiline: true }),
        solution: i18n("Lösung", { multiline: true }),
        note: i18n("Hinweis (optional)", {
          multiline: true,
          description: "Ehrliche Einschränkungen, z. B. „läuft nur in der Sandbox“.",
        }),
        architectureImage: fields.image({
          label: "Architektur-Bild oder Diagramm",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        architectureAlt: i18n("Architektur: Bildbeschreibung (Alt-Text)"),
        results: fields.array(
          fields.object({
            value: fields.text({ label: "Zahl", description: "Nur echte, belegbare Zahlen." }),
            label: i18n("Beschriftung"),
            source: fields.url({ label: "Beleg (Link, optional)" }),
          }),
          { label: "Ergebnisse (nur echte Zahlen)", itemLabel: (props) => props.fields.value.value || "Ergebnis" },
        ),
        techStack: fields.array(fields.text({ label: "Technologie" }), {
          label: "Tech-Stack",
          itemLabel: (props) => props.value,
        }),
        liveUrl: fields.url({ label: "Live-Demo URL" }),
        demoStatus: fields.select({
          label: "Demo-Status",
          options: [
            { label: "Online (Button „Live testen“)", value: "live" },
            { label: "Vorübergehend offline", value: "offline" },
            { label: "Demnächst (coming soon)", value: "comingSoon" },
            { label: "Keine Demo", value: "none" },
          ],
          defaultValue: "none",
        }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        docsUrl: fields.url({ label: "Dokumentation URL" }),
        screenshots: fields.array(
          fields.object({
            image: fields.image({
              label: "Bild",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            }),
            caption: i18n("Bildunterschrift"),
          }),
          { label: "Screenshots", itemLabel: (props) => props.fields.caption.fields.de.value || "Screenshot" },
        ),
        youtubeUrl: fields.url({
          label: "YouTube-Video (optional)",
          description: "Nur YouTube-Links. Das Video lädt erst nach einem Klick (Datenschutz).",
        }),
      },
    }),
  },
});
