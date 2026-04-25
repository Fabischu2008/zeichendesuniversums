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
  redirectTo = "/freebie/download",
  source = "freebie",
  submitLabel = "Kostenloser Guide",
  buttonVariant = "default",
}: {
  redirectTo?: string | null;
  source?: string;
  /** z. B. „PDF kostenlos laden“ auf thematischen Landingpages */
  submitLabel?: string;
  buttonVariant?: "default" | "violet";
}) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
        body: JSON.stringify({
          first_name: firstName.trim().slice(0, 80),
          last_name: lastName.trim().slice(0, 80),
          email,
          source,
          ...(phone.trim() ? { phone: phone.trim().slice(0, 32) } : {}),
        }),
      });

      const raw = await res.text();
      const parsed = safeJsonParse(raw);
      const data = (parsed && typeof parsed === "object" ? parsed : {}) as {
        ok?: boolean;
        saved?: boolean;
        message?: string;
      };

      if (!res.ok) {
        throw new Error(data.message || `Bitte versuch es erneut (HTTP ${res.status}).`);
      }

      if (data.ok === false) {
        throw new Error(
          data.message || "Bitte versuch es erneut.",
        );
      }

      if (data.saved === false) {
        throw new Error(
          data.message ||
            "Eintragung gespeichert, aber E-Mail-Versand fehlgeschlagen. Bitte in Resend API-Key/Absender prüfen.",
        );
      }

      setStatus("success");
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-sm font-medium">Vorname</span>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="given-name"
            autoComplete="given-name"
            required
            placeholder="Max"
            className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-black/40 focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:placeholder:text-white/40 dark:focus:border-white/30"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="text-sm font-medium">Nachname</span>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="family-name"
            autoComplete="family-name"
            required
            placeholder="Mustermann"
            className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-black/40 focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:placeholder:text-white/40 dark:focus:border-white/30"
          />
        </label>
      </div>

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

      <label className="block">
        <span className="text-sm font-medium">
          Telefonnummer <span className="font-normal text-black/50 dark:text-white/50">(optional)</span>
        </span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="z.B. +49 …"
          className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-black/40 focus:border-black/30 dark:border-white/15 dark:bg-black/20 dark:placeholder:text-white/40 dark:focus:border-white/30"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={[
          "inline-flex h-12 w-full items-center justify-center rounded-2xl px-5 text-sm font-medium transition disabled:opacity-70",
          status === "success"
            ? "bg-emerald-600 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-500"
            : buttonVariant === "violet"
              ? "bg-violet-700 text-white hover:bg-violet-600 dark:bg-violet-600 dark:text-violet-100 dark:hover:bg-violet-500"
              : "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        ].join(" ")}
      >
        {status === "loading"
          ? "Sende…"
          : status === "success"
            ? "Gespeichert ✓"
            : submitLabel}
      </button>

      {status === "error" ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {status === "success" ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          {redirectTo ? "Danke! Weiterleitung…" : "Danke! Du bist erfolgreich eingetragen."}
        </p>
      ) : null}
    </form>
  );
}

