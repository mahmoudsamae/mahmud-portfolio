"use client";

import { useMemo, useState } from "react";
import { defaultPortfolioContent, PortfolioContentConfig } from "@/lib/portfolio-content";

async function postContent(content: PortfolioContentConfig): Promise<PortfolioContentConfig> {
  const res = await fetch("/api/portfolio-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Save failed (${res.status})`);
  }

  const data = await res.json();
  return data.content as PortfolioContentConfig;
}

export function usePortfolioContentAdmin(initialContent: PortfolioContentConfig) {
  const [content, setContent] = useState<PortfolioContentConfig>(initialContent);

  const api = useMemo(
    () => ({
      content,
      save: async (next: PortfolioContentConfig) => {
        const saved = await postContent(next);
        setContent(saved);
      },
      reset: async () => {
        const saved = await postContent(defaultPortfolioContent);
        setContent(saved);
      },
    }),
    [content],
  );

  return api;
}
