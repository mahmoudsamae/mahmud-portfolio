export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="pf-float-a absolute will-change-transform -top-[8%] left-[6%] h-[38vw] w-[38vw] rounded-full blur-[20px]"
        style={{ background: "radial-gradient(circle,rgba(150,90,255,.28),transparent 65%)" }}
      />
      <div
        className="pf-float-b absolute will-change-transform -bottom-[6%] right-[8%] h-[34vw] w-[34vw] rounded-full blur-[20px]"
        style={{ background: "radial-gradient(circle,rgba(79,214,198,.22),transparent 65%)" }}
      />
    </div>
  );
}
