// Two slow, soft color orbs behind the page card. The radial gradients are already soft, so
// no blur filter is needed (a CSS blur on a fixed, viewport-sized layer is costly to paint).
// Desktop only: on phones the fixed background gradient alone carries the colors.
export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[821px]:block">
      <div
        className="pf-float-a absolute will-change-transform -top-[8%] left-[6%] h-[38vw] w-[38vw] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(150,90,255,.26),transparent 65%)" }}
      />
      <div
        className="pf-float-b absolute will-change-transform -bottom-[6%] right-[8%] h-[34vw] w-[34vw] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(79,214,198,.2),transparent 65%)" }}
      />
    </div>
  );
}
