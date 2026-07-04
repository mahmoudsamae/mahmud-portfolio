import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
  style,
  iconSize = 14,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  iconSize?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={style}
      className={cn(
        "pf-arrowbtn inline-flex items-center gap-2 rounded-full font-semibold no-underline",
        className,
      )}
    >
      {children}
      <span className="pf-ar inline-flex">
        <ArrowUpRight size={iconSize} strokeWidth={2.4} />
      </span>
    </a>
  );
}
