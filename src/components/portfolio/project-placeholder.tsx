const GRADIENTS = [
  "linear-gradient(135deg,rgba(181,124,255,.35),rgba(79,214,198,.18))",
  "linear-gradient(135deg,rgba(79,214,198,.32),rgba(181,124,255,.16))",
  "linear-gradient(135deg,rgba(124,92,255,.32),rgba(181,124,255,.14))",
  "linear-gradient(135deg,rgba(79,214,198,.28),rgba(124,92,255,.18))",
  "linear-gradient(135deg,rgba(181,124,255,.3),rgba(79,214,198,.22))",
];

export function ProjectPlaceholder({ title, index }: { title: string; index: number }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: gradient }}>
      <span className="font-space text-5xl font-bold tracking-[-0.03em] text-white/25">{initials}</span>
    </div>
  );
}
