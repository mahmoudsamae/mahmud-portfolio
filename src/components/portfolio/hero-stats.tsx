import { AnimatedNumber } from "./animated-number";

export function HeroStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-5 min-[821px]:justify-start">
      {stats.map((stat, i) => (
        <div key={`${stat.label}-${i}`} className="flex items-center gap-5">
          {i > 0 && <span className="h-8 w-px bg-white/10" aria-hidden />}
          <div>
            <div
              className="bg-clip-text font-space text-2xl font-bold tracking-[-0.02em] text-transparent"
              style={{ backgroundImage: "linear-gradient(100deg,#b57cff,#4fd6c6)" }}
            >
              <AnimatedNumber value={stat.value} />
            </div>
            <div className="mt-[2px] text-[10.5px] uppercase tracking-[0.08em] text-[#8a8894]">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
