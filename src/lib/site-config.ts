export type PortfolioProject = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string;
  imageUrl: string;
  rating: number;
  featured: boolean;
};

export type SiteConfig = {
  profile: {
    name: string;
    role: string;
    tagline: string;
    about: string;
    photoUrl: string;
    heroPrimaryButtonLabel: string;
    heroPrimaryButtonLink: string;
    heroSecondaryButtonLabel: string;
    heroSecondaryButtonLink: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  appearance: {
    template:
      | "template-a"
      | "template-b"
      | "template-c"
      | "template-d"
      | "template-e"
      | "template-f"
      | "template-g"
      | "template-h";
    mode: "dark" | "light";
    heroImagePosition: "left" | "right";
    darkPalette: {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
      bodyColor: string;
      sectionTitleColor: string;
    };
    lightPalette: {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
      bodyColor: string;
      sectionTitleColor: string;
    };
    fontFamily: string;
    nameSize: number;
    taglineSize: number;
    sectionTitleSize: number;
    heroOffsetX: number;
    heroOffsetY: number;
    imageOffsetX: number;
    imageOffsetY: number;
    imageStyle: "soft" | "sharp" | "rounded" | "circle" | "blob" | "frame";
    buttonStyle: "minimal" | "pill" | "glass" | "gradient" | "neon";
    projectCardStyle: "classic" | "elevated" | "outline" | "magazine";
    enableCardHover: boolean;
    showGridPattern: boolean;
    showNoiseOverlay: boolean;
    showLanguageSwitcher: boolean;
    showThemeToggle: boolean;
  };
  sections: {
    showThinking: boolean;
    showCaseStudies: boolean;
    showExperience: boolean;
  };
  projects: PortfolioProject[];
  caseStudies: string[];
  thinkingPoints: string[];
  experienceItems: string[];
  customSections: Array<{ id: string; title: string; content: string; enabled: boolean }>;
  footer: {
    text: string;
    links: string;
  };
};

export const SITE_CONFIG_KEY = "portfolio-site-config-v1";

export const defaultSiteConfig: SiteConfig = {
  profile: {
    name: "Mahmud Al Hussen",
    role: "Senior Frontend Developer | Product Thinker",
    tagline: "I build real systems that improve operations, not just pages.",
    about:
      "I work in reception and directly observe business bottlenecks. I translate real-world friction into software systems using Next.js, React, Node.js, and product-driven architecture.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    heroPrimaryButtonLabel: "Projects",
    heroPrimaryButtonLink: "#projects",
    heroSecondaryButtonLabel: "Contact",
    heroSecondaryButtonLink: "#contact",
  },
  contact: {
    email: "mahmud@example.com",
    phone: "+49 000 000000",
    location: "Germany",
    linkedin: "https://linkedin.com/in/mahmud",
    github: "https://github.com/mahmud",
  },
  appearance: {
    template: "template-a",
    mode: "dark",
    heroImagePosition: "right",
    darkPalette: {
      primaryColor: "#22d3ee",
      secondaryColor: "#a78bfa",
      backgroundColor: "#050816",
      textColor: "#eef2ff",
      bodyColor: "#dbe5ff",
      sectionTitleColor: "#eef2ff",
    },
    lightPalette: {
      primaryColor: "#0ea5e9",
      secondaryColor: "#8b5cf6",
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      bodyColor: "#334155",
      sectionTitleColor: "#0f172a",
    },
    fontFamily: "Inter, system-ui, sans-serif",
    nameSize: 58,
    taglineSize: 20,
    sectionTitleSize: 34,
    heroOffsetX: 0,
    heroOffsetY: 0,
    imageOffsetX: 0,
    imageOffsetY: 0,
    imageStyle: "soft",
    buttonStyle: "gradient",
    projectCardStyle: "elevated",
    enableCardHover: true,
    showGridPattern: false,
    showNoiseOverlay: false,
    showLanguageSwitcher: true,
    showThemeToggle: true,
  },
  sections: {
    showThinking: true,
    showCaseStudies: true,
    showExperience: true,
  },
  projects: [
    {
      id: "breakfast-system",
      title: "Breakfast Ordering + Admin",
      summary: "End-to-end ordering and operations dashboard.",
      problem: "Manual breakfast orders caused delays and communication gaps.",
      solution: "Created a full workflow with order states, priorities, and admin visibility.",
      architecture: "Next.js + Node.js + MongoDB + role-based dashboard",
      technologies: "Next.js, Node.js, MongoDB, Tailwind",
      imageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
      rating: 5,
      featured: true,
    },
    {
      id: "feedback-system",
      title: "Feedback Intelligence System",
      summary: "Structured feedback collection and prioritization.",
      problem: "Feedback was scattered and impossible to act on quickly.",
      solution: "Built categorization, filtering, and insight views for better decisions.",
      architecture: "React + Express + MongoDB",
      technologies: "React, Express, MongoDB",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      rating: 4,
      featured: true,
    },
    {
      id: "booking-system",
      title: "Appointment Booking System",
      summary: "Reliable booking flow with constraints and reminders.",
      problem: "Double-bookings and no-shows reduced service quality.",
      solution: "Implemented conflict prevention and schedule validation logic.",
      architecture: "Next.js + Node API + notification hooks",
      technologies: "Next.js, TypeScript, Node.js",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
      rating: 5,
      featured: false,
    },
  ],
  caseStudies: [
    "Redesigned service intake to reduce operational overhead.",
    "Converted unclear requirements into a resilient booking system.",
  ],
  thinkingPoints: [
    "Start with workflow mapping before implementation.",
    "Design data models and permissions early.",
    "Ship in measurable iterations.",
  ],
  experienceItems: [
    "Frontend Engineer building multilingual, scalable UIs.",
    "Backend contributor with Node.js / Express / MongoDB.",
    "Reception operations role informing product decisions.",
  ],
  customSections: [
    {
      id: "operations-impact",
      title: "Operational Impact",
      content:
        "I use software to reduce manual overhead in real-world operations. My work focuses on measurable outcomes, not visual polish alone.",
      enabled: true,
    },
  ],
  footer: {
    text: "© Mahmud Al Hussen — Built with product thinking.",
    links: "GitHub|https://github.com/mahmud,LinkedIn|https://linkedin.com/in/mahmud",
  },
};
