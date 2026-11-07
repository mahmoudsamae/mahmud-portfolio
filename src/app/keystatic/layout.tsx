import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { keystaticEnabled } from "@/lib/keystatic-enabled";

export const metadata: Metadata = {
  title: "Portfolio CMS",
  robots: { index: false, follow: false },
};

// Separate root layout: the admin has its own UI and no locale.
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  if (!keystaticEnabled) notFound();

  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
