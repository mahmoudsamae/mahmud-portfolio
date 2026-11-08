"use client";

import { DotLottieReact, setWasmUrl, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

// Self-hosted renderer (copied by scripts/copy-lottie-wasm.mjs): without this the player
// would download it from a public CDN.
setWasmUrl("/lottie/dotlottie-player.wasm");

export default function LottiePlayer({
  src,
  loop,
  playing,
  stillAt,
}: {
  src: string;
  /** false: play once each time the icon comes into view and hold the last frame. */
  loop: boolean;
  playing: boolean;
  /** Show this frame (0–1 of the animation) instead of playing; used for reduced motion. */
  stillAt: number | null;
}) {
  const [player, setPlayer] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (!player) return;
    const apply = () => {
      if (stillAt !== null) {
        player.pause();
        player.setFrame(Math.round((player.totalFrames - 1) * stillAt));
      } else if (playing) player.play();
      else player.pause();
    };
    if (player.isLoaded) apply();
    player.addEventListener("load", apply);
    return () => player.removeEventListener("load", apply);
  }, [player, playing, stillAt]);

  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={false}
      dotLottieRefCallback={setPlayer}
      renderConfig={{ freezeOnOffscreen: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
