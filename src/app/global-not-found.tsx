import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 | Mahmud Al Hussen",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#08080c] font-instrument text-[#f2f0f7]">
        <h1 className="m-0 font-space text-5xl font-bold">404</h1>
        <p className="m-0 text-[#9a98a6]">Seite nicht gefunden · Page not found</p>
        <Link href="/" className="text-[#b57cff] underline">
          Mahmud Al Hussen
        </Link>
      </body>
    </html>
  );
}
