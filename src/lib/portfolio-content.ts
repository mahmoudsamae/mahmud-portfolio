export type PortfolioLang = "en" | "de";

export type PortfolioStrings = {
  avail: string;
  nav: { work: string; service: string; experience: string; contact: string };
  letsTalk: string;
  role: string;
  heroDesc: string;
  letsCollab: string;
  workTitle: string;
  filterAll: string;
  filterReal: string;
  filterExp: string;
  viewAll: string;
  serviceTitle: string;
  expTitle: string;
  expYears: string;
  eduTitle: string;
  langTitle: string;
  contactTitle: string;
  contactDesc: string;
  contactBtn: string;
  formTitle: string;
  fName: string;
  fEmail: string;
  fSubject: string;
  fMsg: string;
  fSend: string;
  fSending: string;
  fSent: string;
  fSentSub: string;
  fAgain: string;
  fErr: string;
};

export const STR: Record<PortfolioLang, PortfolioStrings> = {
  en: {
    avail: "Available from October 2026",
    nav: { work: "Projects", service: "Services", experience: "Experience", contact: "Contact" },
    letsTalk: "Let's Talk",
    role: "Full-Stack Developer",
    heroDesc:
      "Self-taught developer building production systems already used by real businesses — Next.js & Node.js web apps, SaaS MVPs, and business automation.",
    letsCollab: "Get in touch",
    workTitle: "SELECTED PROJECTS",
    filterAll: "All",
    filterReal: "Live",
    filterExp: "Portfolio",
    viewAll: "View on GitHub",
    serviceTitle: "WHAT I DO",
    expTitle: "EXPERIENCE",
    expYears: "Regensburg, Germany",
    eduTitle: "Education",
    langTitle: "Languages",
    contactTitle: "LET'S BUILD SOMETHING.",
    contactDesc:
      "Open to Junior Developer / IT roles in the DACH region from October 2026. Feel free to reach out — I usually reply within a day.",
    contactBtn: "Email Me",
    formTitle: "Send a message",
    fName: "Your name",
    fEmail: "Email address",
    fSubject: "Subject",
    fMsg: "Tell me about your project…",
    fSend: "Send message",
    fSending: "Sending…",
    fSent: "Message sent!",
    fSentSub: "Thanks — your mail client is opening. I'll reply within a day.",
    fAgain: "Send another",
    fErr: "Please fill in name, email and message.",
  },
  de: {
    avail: "Verfügbar ab Oktober 2026",
    nav: { work: "Projekte", service: "Leistungen", experience: "Erfahrung", contact: "Kontakt" },
    letsTalk: "Kontakt",
    role: "Full-Stack Developer",
    heroDesc:
      "Autodidaktischer Entwickler, der produktionsreife Systeme baut, die bereits von echten Unternehmen genutzt werden — Next.js- & Node.js-Web-Apps, SaaS-MVPs und Prozessautomatisierung.",
    letsCollab: "Kontakt aufnehmen",
    workTitle: "AUSGEWÄHLTE PROJEKTE",
    filterAll: "Alle",
    filterReal: "Live",
    filterExp: "Portfolio",
    viewAll: "Auf GitHub ansehen",
    serviceTitle: "WAS ICH MACHE",
    expTitle: "ERFAHRUNG",
    expYears: "Regensburg, Deutschland",
    eduTitle: "Ausbildung",
    langTitle: "Sprachen",
    contactTitle: "LASS UNS ETWAS BAUEN.",
    contactDesc:
      "Offen für Junior-Developer-/IT-Stellen in der DACH-Region ab Oktober 2026. Melde dich gern — ich antworte meist innerhalb eines Tages.",
    contactBtn: "Schreib mir",
    formTitle: "Nachricht senden",
    fName: "Dein Name",
    fEmail: "E-Mail-Adresse",
    fSubject: "Betreff",
    fMsg: "Erzähl mir von deinem Projekt…",
    fSend: "Nachricht senden",
    fSending: "Senden…",
    fSent: "Nachricht gesendet!",
    fSentSub: "Danke — dein Mail-Programm öffnet sich. Ich antworte innerhalb eines Tages.",
    fAgain: "Weitere senden",
    fErr: "Bitte Name, E-Mail und Nachricht ausfüllen.",
  },
};

export type WorkCategory = "live" | "portfolio";

export type WorkItem = {
  slot: string;
  cat: WorkCategory;
  badge: string;
  studio: string;
  title: string;
  tag: string;
  href: string;
  desc: Record<PortfolioLang, string>;
  imageUrl?: string;
};

export const WORKS: WorkItem[] = [
  {
    slot: "work-order",
    cat: "live",
    badge: "● LIVE · IN USE",
    studio: "AZUR Camping",
    title: "Gäste-Bestellsystem",
    tag: "Next.js · Node.js",
    href: "#",
    desc: {
      en: "Digital breakfast ordering for AZUR Camping — used daily by the reception team.",
      de: "Digitale Frühstücksbestellung für AZUR Camping — täglich vom Rezeptionsteam genutzt.",
    },
  },
  {
    slot: "work-feedback",
    cat: "live",
    badge: "● LIVE · IN USE",
    studio: "Guest Platform",
    title: "Smart Feedback",
    tag: "Next.js",
    href: "#",
    desc: {
      en: "Guest info & feedback platform improving communication with reception.",
      de: "Gäste-Info- & Feedback-Plattform für bessere Kommunikation mit der Rezeption.",
    },
  },
  {
    slot: "work-buchungen",
    cat: "live",
    badge: "◐ LIVE DEMO",
    studio: "Booking System",
    title: "Buchungen",
    tag: "Next.js · Node · MongoDB",
    href: "#",
    desc: {
      en: "Online appointment booking with automatic time-slot management.",
      de: "Online-Terminbuchung mit automatischer Slot-Verwaltung.",
    },
  },
  {
    slot: "work-cleanpro",
    cat: "portfolio",
    badge: "○ PORTFOLIO",
    studio: "Admin Dashboard",
    title: "CleanPro Manager",
    tag: "React · Tailwind",
    href: "#",
    desc: {
      en: "Dark-theme admin dashboard with six modules for a cleaning business.",
      de: "Dark-Theme-Admin-Dashboard mit sechs Modulen für einen Reinigungsbetrieb.",
    },
  },
  {
    slot: "work-textflow",
    cat: "live",
    badge: "● LIVE SAAS",
    studio: "AI SaaS",
    title: "TextFlow",
    tag: "Next.js · Stripe · Clerk",
    href: "#",
    desc: {
      en: "German AI SaaS for SMBs — automated text generation with Du/Sie logic.",
      de: "Deutsches KI-SaaS für KMU — automatische Textgenerierung mit Du/Sie-Logik.",
    },
  },
];

export type ServiceItem = {
  n: string;
  title: string;
  tag: string;
  desc: Record<PortfolioLang, string>;
};

export const SERVICES: ServiceItem[] = [
  {
    n: "01",
    title: "Full-Stack Web Apps",
    tag: "NEXT.JS · NODE · MONGODB",
    desc: {
      en: "Production-ready web applications from database to UI, built with Next.js and Node.js.",
      de: "Produktionsreife Web-Apps von der Datenbank bis zur UI — mit Next.js und Node.js.",
    },
  },
  {
    n: "02",
    title: "SaaS MVPs",
    tag: "STRIPE · CLERK · AUTH",
    desc: {
      en: "End-to-end SaaS builds with authentication, payments, and subscriptions.",
      de: "End-to-End-SaaS mit Authentifizierung, Zahlungen und Abos.",
    },
  },
  {
    n: "03",
    title: "Business Automation",
    tag: "INTERNAL TOOLS",
    desc: {
      en: "Internal tools that replace manual workflows — ordering, booking, and feedback systems.",
      de: "Interne Tools, die manuelle Abläufe ersetzen — Bestell-, Buchungs- und Feedback-Systeme.",
    },
  },
  {
    n: "04",
    title: "Frontend Engineering",
    tag: "REACT · TS · TAILWIND",
    desc: {
      en: "Responsive, animated interfaces with React, TypeScript, Tailwind and Framer Motion.",
      de: "Responsive, animierte Interfaces mit React, TypeScript, Tailwind und Framer Motion.",
    },
  },
];

export type TimelineItem = {
  co: string;
  role: Record<PortfolioLang, string>;
  date: Record<PortfolioLang, string>;
};

export const EXPERIENCES: TimelineItem[] = [
  {
    co: "AZUR Camping Regensburg",
    role: { en: "Receptionist / Front Office", de: "Rezeptionist / Front Office" },
    date: { en: "03.2026 – Present", de: "03.2026 – Heute" },
  },
  {
    co: "McDonald's",
    role: { en: "Allround-Mitarbeiter (Drive-In)", de: "Allround-Mitarbeiter (Drive-In)" },
    date: { en: "08.2025 – 03.2026", de: "08.2025 – 03.2026" },
  },
  {
    co: "Golden Beach Hotel",
    role: { en: "Front Office Assistant", de: "Front Office Assistant (Teilzeit)" },
    date: { en: "01.2023 – 09.2024", de: "01.2023 – 09.2024" },
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    co: "Tishreen University",
    role: { en: "B.Sc. Computer Engineering — top of cohort", de: "B.Sc. Computertechnik — Jahrgangsbester" },
    date: { en: "2020 – 2024", de: "2020 – 2024" },
  },
  {
    co: "VHS Regensburg",
    role: { en: "German course · B2", de: "Deutschkurs · B2" },
    date: { en: "2025 – Present", de: "2025 – Heute" },
  },
  {
    co: "IFP Regensburg",
    role: { en: "German course · B1", de: "Deutschkurs · B1" },
    date: { en: "2025", de: "2025" },
  },
];

export const LANGUAGES: Record<PortfolioLang, string>[] = [
  { en: "Arabic · Native", de: "Arabisch · Muttersprache" },
  { en: "Kurdish · Native", de: "Kurdisch · Muttersprache" },
  { en: "German · B2", de: "Deutsch · B2" },
  { en: "English · B2", de: "Englisch · B2" },
];

export type SocialItem = { name: string; letter: string; href: string };

export const SOCIALS: SocialItem[] = [
  { name: "GitHub", letter: "Gh", href: "#" },
  { name: "LinkedIn", letter: "In", href: "#" },
  { name: "Email", letter: "@", href: "mailto:mahmoudsamaedbm@gmail.com" },
];

export const HERO_SKILLS: string[] = ["Next.js", "Node.js", "TypeScript", "MongoDB"];

export type HeroStat = { value: string; label: Record<PortfolioLang, string> };

export const HERO_STATS: HeroStat[] = [
  { value: "5+", label: { en: "Live Projects", de: "Live-Projekte" } },
  { value: "4", label: { en: "Core Services", de: "Kernleistungen" } },
  { value: "100%", label: { en: "Self-Taught", de: "Autodidakt" } },
];

export const DEFAULT_CONTACT_EMAIL = "mahmoudsamaedbm@gmail.com";
export const DEFAULT_CONTACT_PHONE = "0163 148 1230";
export const DEFAULT_HERO_PHOTO_URL = "/profile.jpg";

export const DEFAULT_CONTACT_LOCATION: Record<PortfolioLang, string> = {
  en: "Regensburg, Germany",
  de: "Regensburg, Deutschland",
};

export type PortfolioContentConfig = {
  heroPhotoUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: Record<PortfolioLang, string>;
  str: Record<PortfolioLang, PortfolioStrings>;
  works: WorkItem[];
  services: ServiceItem[];
  experiences: TimelineItem[];
  education: TimelineItem[];
  languages: Record<PortfolioLang, string>[];
  socials: SocialItem[];
  heroSkills: string[];
  heroStats: HeroStat[];
};

export const PORTFOLIO_CONTENT_KEY = "portfolio-content-v1";

export const defaultPortfolioContent: PortfolioContentConfig = {
  heroPhotoUrl: DEFAULT_HERO_PHOTO_URL,
  contactEmail: DEFAULT_CONTACT_EMAIL,
  contactPhone: DEFAULT_CONTACT_PHONE,
  contactLocation: DEFAULT_CONTACT_LOCATION,
  str: STR,
  works: WORKS,
  services: SERVICES,
  experiences: EXPERIENCES,
  education: EDUCATION,
  languages: LANGUAGES,
  socials: SOCIALS,
  heroSkills: HERO_SKILLS,
  heroStats: HERO_STATS,
};

export function mergePortfolioContent(raw: unknown): PortfolioContentConfig {
  const parsed = (raw ?? {}) as Partial<PortfolioContentConfig>;
  return {
    heroPhotoUrl: parsed.heroPhotoUrl ?? defaultPortfolioContent.heroPhotoUrl,
    contactEmail: parsed.contactEmail ?? defaultPortfolioContent.contactEmail,
    contactPhone: parsed.contactPhone ?? defaultPortfolioContent.contactPhone,
    contactLocation: { ...defaultPortfolioContent.contactLocation, ...(parsed.contactLocation ?? {}) },
    str: {
      en: { ...defaultPortfolioContent.str.en, ...(parsed.str?.en ?? {}) },
      de: { ...defaultPortfolioContent.str.de, ...(parsed.str?.de ?? {}) },
    },
    works: parsed.works ?? defaultPortfolioContent.works,
    services: parsed.services ?? defaultPortfolioContent.services,
    experiences: parsed.experiences ?? defaultPortfolioContent.experiences,
    education: parsed.education ?? defaultPortfolioContent.education,
    languages: parsed.languages ?? defaultPortfolioContent.languages,
    socials: parsed.socials ?? defaultPortfolioContent.socials,
    heroSkills: parsed.heroSkills ?? defaultPortfolioContent.heroSkills,
    heroStats: parsed.heroStats ?? defaultPortfolioContent.heroStats,
  };
}
