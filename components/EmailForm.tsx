"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function safeJsonParse(raw: string): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { _nonJson: true, raw };
  }
}

export function EmailForm({
  redirectTo = "/success-freebie",
}: {
  redirectTo?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const raw = await res.text();
      const parsed = safeJsonParse(raw);
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
        ok?: boolean;
        message?: string;
      };

      if (!res.ok) {
        throw new Error(data.message || `Bitte versuch es erneut (HTTP ${res.status}).`);
      }

      setStatus("success");
      router.push(redirectTo);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium">E‑Mail</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="du@beispiel.de"
          className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-black/40 focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:placeholder:text-white/40 dark:focus:border-white/30"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
      >
        {status === "loading" ? "Sende…" : "Guide holen"}
      </button>

      {status === "error" ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {status === "success" ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          Danke! Weiterleitung…
        </p>
      ) : null}
    </form>
  );
}

