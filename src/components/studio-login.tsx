"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StudioLogin({ locale }: { locale: string }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: username }),
      });

      if (!res.ok) {
        setError("Wrong username");
        return;
      }

      router.push(`/${locale}/studio`);
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur">
        <h1 className="text-2xl font-bold">Portfolio Control Login</h1>
        <p className="mt-2 text-sm text-white/70">Enter username only: mahmud</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="studio-input mt-5"
        />
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
        <button disabled={submitting} className="mt-4 w-full rounded-xl bg-white px-4 py-2 font-semibold text-zinc-900 disabled:opacity-60">
          {submitting ? "Checking…" : "Open Dashboard"}
        </button>
      </form>
    </main>
  );
}
