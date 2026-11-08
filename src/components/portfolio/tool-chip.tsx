import {
  siClaude,
  siClerk,
  siCursor,
  siDocker,
  siExpress,
  siFramer,
  siGithub,
  siGsap,
  siLinux,
  siMake,
  siMongodb,
  siMui,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siPostgresql,
  siReact,
  siStripe,
  siSupabase,
  siTailscale,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVercel,
  siZapier,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Logos (simple-icons, CC0 path data) for the tool names used in the CMS, matched
// case-insensitively. Names without an entry are shown with a neutral dot.
const LOGOS: Record<string, SimpleIcon> = {
  "next.js": siNextdotjs,
  react: siReact,
  "node.js": siNodedotjs,
  typescript: siTypescript,
  "tailwind css": siTailwindcss,
  supabase: siSupabase,
  mongodb: siMongodb,
  express: siExpress,
  n8n: siN8n,
  make: siMake,
  zapier: siZapier,
  stripe: siStripe,
  clerk: siClerk,
  postgresql: siPostgresql,
  docker: siDocker,
  linux: siLinux,
  tailscale: siTailscale,
  claude: siClaude,
  cursor: siCursor,
  gsap: siGsap,
  "react three fiber": siThreedotjs,
  "material ui": siMui,
  "framer motion": siFramer,
  github: siGithub,
  vercel: siVercel,
  notion: siNotion,
};

export function ToolChip({ name, className }: { name: string; className?: string }) {
  const logo = LOGOS[name.trim().toLowerCase()];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-[6px] text-[12.5px] text-[#c9c7d2]",
        className,
      )}
    >
      {logo ? (
        <svg aria-hidden viewBox="0 0 24 24" className="h-[14px] w-[14px] flex-none fill-current">
          <path d={logo.path} />
        </svg>
      ) : (
        <span aria-hidden className="h-[6px] w-[6px] flex-none rounded-full bg-[#b57cff]" />
      )}
      {name}
    </span>
  );
}
