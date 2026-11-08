import { AnimatedNumber } from "./animated-number";

// Three equal columns on phones (no overflow at 360px), one row with dividers on desktop.
export function HeroStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3 text-center min-[821px]:flex min-[821px]:items-center min-[821px]:gap-5 min-[821px]:text-left">
      {stats.map((stat, i) => (
        <div key={`${stat.label}-${i}`} className="flex min-w-0 items-center justify-center gap-5">
          {i > 0 && <span className="hidden h-8 w-px bg-white/10 min-[821px]:block" aria-hidden />}
          <div className="min-w-0">
            <div
              className="bg-clip-text font-space text-2xl font-bold tracking-[-0.02em] text-transparent"
              style={{ backgroundImage: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
            >
              <AnimatedNumber value={stat.value} />
            </div>
            <div className="mt-[2px] break-words text-[10px] uppercase tracking-[0.06em] text-[#8a8894] min-[821px]:text-[10.5px] min-[821px]:tracking-[0.08em]">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
