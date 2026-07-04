export const locales = ["en", "ar", "de"] as const;
export type Locale = (typeof locales)[number];

type Project = {
  title: string;
  problem: string;
  solution: string;
  thinking: string;
  architecture: string;
  technologies: string[];
  featured?: boolean;
};

type Dictionary = {
  nav: { about: string; projects: string; thinking: string; contact: string; studio: string };
  hero: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  about: { title: string; story: string[] };
  thinking: { title: string; points: string[] };
  skills: { title: string; items: { label: string; level: number }[] };
  experience: { title: string; timeline: { role: string; detail: string }[] };
  projects: { title: string; items: Project[] };
  caseStudies: { title: string; items: string[] };
  contact: { title: string; description: string; button: string };
  studio: { title: string; passHint: string; login: string; logout: string };
};

const sharedProjects: Project[] = [
  {
    title: "Breakfast Ordering + Admin Platform",
    problem: "Manual breakfast handling created delays and communication errors.",
    solution: "Built an ordering portal with admin dashboard, status updates, and analytics.",
    thinking: "Started from peak-hour constraints and role-specific flows.",
    architecture: "Next.js frontend + Node.js API + MongoDB + role-based admin panel.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    featured: true,
  },
  {
    title: "Feedback Intelligence System",
    problem: "Feedback data was fragmented and hard to act on.",
    solution: "Centralized submissions, tags, and sentiment-oriented review.",
    thinking: "Designed taxonomy first to enable useful filtering and prioritization.",
    architecture: "React dashboard + Express services + structured feedback schema.",
    technologies: ["React", "Express", "MongoDB"],
  },
  {
    title: "Appointment Booking Workflow",
    problem: "No-shows and double booking affected service quality.",
    solution: "Implemented schedule engine with constraints and reminders.",
    thinking: "Focused on conflict prevention and clear state transitions.",
    architecture: "Next.js app + backend availability service + notification hooks.",
    technologies: ["Next.js", "TypeScript", "Node.js"],
  },
];

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: { about: "About", projects: "Projects", thinking: "Thinking", contact: "Contact", studio: "Studio" },
    hero: {
      eyebrow: "Senior Frontend Engineer + Product Builder",
      title: "I build production systems that improve real operations.",
      subtitle:
        "I combine React/Next.js execution with product thinking to transform messy workflows into reliable software.",
      primaryCta: "View Case Studies",
      secondaryCta: "Hire Me",
    },
    about: {
      title: "My Story",
      story: [
        "I currently work in reception, where I see operational bottlenecks every day.",
        "Instead of accepting inefficient processes, I design and build software systems that remove friction.",
        "My edge is not just writing code, it is connecting business pain to technical architecture.",
      ],
    },
    thinking: {
      title: "How I Think",
      points: [
        "Map the workflow before writing a single line of code.",
        "Model data and permissions first to avoid future rework.",
        "Ship in iterations with measurable impact and feedback loops.",
      ],
    },
    skills: {
      title: "Capability Map",
      items: [
        { label: "Next.js / React Systems", level: 92 },
        { label: "Node.js APIs", level: 82 },
        { label: "Product Thinking", level: 90 },
        { label: "UI/UX Craft", level: 88 },
      ],
    },
    experience: {
      title: "Experience",
      timeline: [
        { role: "Frontend Developer", detail: "Built multilingual interfaces and scalable component systems." },
        { role: "Backend Contributor", detail: "Designed APIs with Node.js/Express and MongoDB data models." },
        { role: "Reception Operations", detail: "Translate real-world process pain into software opportunities." },
      ],
    },
    projects: { title: "Projects with System Thinking", items: sharedProjects },
    caseStudies: {
      title: "Case Studies",
      items: [
        "How I reduced operational overhead by redesigning request intake.",
        "How I transformed ambiguous requirements into a resilient booking flow.",
      ],
    },
    contact: {
      title: "Let us build something meaningful",
      description: "Open to frontend, full-stack, and product-focused engineering roles.",
      button: "Send Message",
    },
    studio: { title: "Hidden Studio", passHint: "Enter admin passcode", login: "Unlock", logout: "Logout" },
  },
  ar: {
    nav: { about: "عني", projects: "المشاريع", thinking: "طريقة تفكيري", contact: "تواصل", studio: "الاستوديو" },
    hero: {
      eyebrow: "مهندس واجهات أمامية + Product Builder",
      title: "أبني أنظمة إنتاجية تحل مشاكل تشغيل حقيقية.",
      subtitle: "أدمج بين Next.js و التفكير المنتجّي لتحويل العمليات المعقدة إلى Software واضح وفعال.",
      primaryCta: "استعراض دراسات الحالة",
      secondaryCta: "توظيفي",
    },
    about: {
      title: "قصتي",
      story: [
        "أعمل حالياً في الاستقبال، وهذا يعطيني رؤية مباشرة لمشاكل العمليات اليومية.",
        "بدل قبول الفوضى، أبني حلول برمجية تقلل الاحتكاك وتسرع التنفيذ.",
        "قيمتي الحقيقية هي الربط بين ألم العمل وقرار هندسي صحيح.",
      ],
    },
    thinking: {
      title: "كيف أفكر",
      points: [
        "أحلل الـ workflow قبل كتابة أي كود.",
        "أصمم البيانات والصلاحيات مبكراً لتفادي إعادة البناء.",
        "أطلق على مراحل وأقيس الأثر بشكل عملي.",
      ],
    },
    skills: {
      title: "خريطة القدرات",
      items: [
        { label: "أنظمة React / Next.js", level: 92 },
        { label: "Backend APIs مع Node.js", level: 82 },
        { label: "التفكير المنتجّي", level: 90 },
        { label: "UI/UX احترافي", level: 88 },
      ],
    },
    experience: {
      title: "الخبرات",
      timeline: [
        { role: "Frontend Developer", detail: "بناء واجهات متعددة اللغات مع مكونات قابلة للتوسع." },
        { role: "Backend Contributor", detail: "تصميم APIs باستخدام Node.js/Express وMongoDB." },
        { role: "Reception Operations", detail: "تحويل مشاكل التشغيل اليومية إلى فرص بناء منتجات." },
      ],
    },
    projects: { title: "مشاريع مبنية بمنطق الأنظمة", items: sharedProjects },
    caseStudies: {
      title: "دراسات حالة",
      items: [
        "كيف قللت الهدر التشغيلي عبر إعادة تصميم إدخال الطلبات.",
        "كيف حولت متطلبات ضبابية إلى نظام حجز متماسك وقابل للتوسع.",
      ],
    },
    contact: {
      title: "دعنا نبني شيئاً مؤثراً",
      description: "متاح لفرص Frontend وFull-Stack ذات أثر منتجي واضح.",
      button: "إرسال رسالة",
    },
    studio: { title: "الاستوديو المخفي", passHint: "ادخل كلمة المرور", login: "دخول", logout: "تسجيل خروج" },
  },
  de: {
    nav: { about: "Über mich", projects: "Projekte", thinking: "Denkweise", contact: "Kontakt", studio: "Studio" },
    hero: {
      eyebrow: "Senior Frontend Engineer + Product Builder",
      title: "Ich baue produktionsreife Systeme für echte Betriebsprobleme.",
      subtitle:
        "Ich kombiniere Next.js Umsetzung mit Produktdenken, um komplexe Abläufe in zuverlässige Software zu verwandeln.",
      primaryCta: "Case Studies ansehen",
      secondaryCta: "Hire Me",
    },
    about: {
      title: "Meine Story",
      story: [
        "Ich arbeite aktuell im Empfang und sehe operative Engpässe aus erster Hand.",
        "Statt ineffiziente Prozesse zu akzeptieren, baue ich Software zur Entlastung von Teams.",
        "Mein Unterschied: Ich verbinde Business-Probleme mit technischer Architektur.",
      ],
    },
    thinking: {
      title: "Wie ich denke",
      points: [
        "Zuerst Workflow analysieren, dann entwickeln.",
        "Datenmodell und Berechtigungen früh definieren.",
        "In Iterationen liefern und messbaren Impact erzeugen.",
      ],
    },
    skills: {
      title: "Fähigkeitsprofil",
      items: [
        { label: "Next.js / React Systeme", level: 92 },
        { label: "Node.js APIs", level: 82 },
        { label: "Produktdenken", level: 90 },
        { label: "UI/UX Qualität", level: 88 },
      ],
    },
    experience: {
      title: "Erfahrung",
      timeline: [
        { role: "Frontend Developer", detail: "Mehrsprachige Interfaces und skalierbare Komponenten entwickelt." },
        { role: "Backend Contributor", detail: "APIs mit Node.js/Express und MongoDB modelliert." },
        { role: "Reception Operations", detail: "Operative Probleme in Software-Chancen übersetzt." },
      ],
    },
    projects: { title: "Projekte mit Systemfokus", items: sharedProjects },
    caseStudies: {
      title: "Case Studies",
      items: [
        "Wie ich operative Last durch besseres Intake-Design reduziert habe.",
        "Wie aus unklaren Anforderungen ein robustes Buchungssystem wurde.",
      ],
    },
    contact: {
      title: "Lass uns etwas Wirkungvolles bauen",
      description: "Offen für Frontend-, Full-Stack- und produktnahe Rollen.",
      button: "Nachricht senden",
    },
    studio: { title: "Verstecktes Studio", passHint: "Admin-Passcode eingeben", login: "Entsperren", logout: "Abmelden" },
  },
};
