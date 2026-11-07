"use client";

import { Play } from "lucide-react";
import { useState } from "react";

// Click-to-load: nothing is requested from YouTube (no thumbnail either) until the
// visitor clicks, so no data reaches Google without that explicit action.
export function YouTubeEmbed({
  id,
  title,
  consentText,
  loadLabel,
}: {
  id: string;
  title: string;
  consentText: string;
  loadLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        className="aspect-video w-full rounded-2xl border border-white/10"
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div
      className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 px-6 text-center"
      style={{ background: "linear-gradient(120deg,rgba(150,90,255,.22),rgba(79,214,198,.14))" }}
    >
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="pf-arrowbtn inline-flex items-center gap-2 rounded-full bg-[#f2f0f7] px-5 py-3 font-sans text-sm font-semibold text-[#0c0c11]"
      >
        <Play size={16} strokeWidth={2.4} />
        {loadLabel}
      </button>
      <p className="m-0 max-w-[460px] text-[13px] leading-[1.5] text-[#c9c7d2]">{consentText}</p>
    </div>
  );
}
