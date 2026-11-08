import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Gradient-ring pill used for the main contact action in the navigation.
export function TalkButton({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex rounded-full p-[1.5px] no-underline transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-8px_rgba(181,124,255,.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b57cff]",
        className,
      )}
      style={{ background: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
    >
      <span className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[#131318] py-[6px] pl-4 pr-[6px] text-sm font-semibold text-[#f2f0f7] transition-colors duration-300 group-hover:bg-[#1b1a24]">
        {children}
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#0c0c11] transition-transform duration-300 ease-out group-hover:rotate-45"
          style={{ background: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
        >
          <ArrowUpRight size={15} strokeWidth={2.6} />
        </span>
      </span>
    </a>
  );
}
