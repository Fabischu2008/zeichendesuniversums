"use client";

import { useState, type FormEvent } from "react";

export function ProfileAccessLinkCard({ profileUrl }: { profileUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState<string | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setSendMsg("Kopieren nicht möglich – markiere den Link manuell.");
    }
  }

  async function sendEmail(e: FormEvent) {
    e.preventDefault();
    setSendMsg(null);
    setSending(true);
    try {
      const res = await fetch("/api/email/profile-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), profileUrl }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (data.ok) {
        setSendMsg("E-Mail ist unterwegs – prüfe auch den Spam-Ordner.");
        setEmail("");
      } else {
        setSendMsg(data.message || "Versand fehlgeschlagen.");
      }
    } catch {
      setSendMsg("Netzwerkfehler. Bitte Link kopieren.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="rounded-3xl border border-violet-500/25 bg-violet-500/[0.06] p-6 sm:p-8 dark:border-violet-400/20 dark:bg-violet-500/10">
      <h2 className="text-lg font-semibold tracking-tight text-black dark:text-white">
        Dein persönlicher Zugang zum Vollprofil
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
        <strong className="font-medium text-black dark:text-white">So geht&apos;s:</strong>{" "}
        Öffne den Link unten <strong className="font-medium">einmal im Browser</strong> – damit
        wird dein Vollprofil freigeschaltet. Speichere den Link als Lesezeichen oder schick ihn
        dir per E-Mail, damit du ihn auf jedem Gerät wiederfindest.
      </p>
      <p className="mt-2 text-xs text-black/55 dark:text-white/55">
        Tipp: Den Link nicht öffentlich teilen – er ist nur für dich bestimmt.
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-xs break-all text-black/80 dark:border-white/15 dark:bg-black/30 dark:text-white/85">
          {profileUrl}
        </div>
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-2xl border border-black/12 bg-white px-4 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
        >
          {copied ? "Kopiert" : "Link kopieren"}
        </button>
      </div>

      <form onSubmit={sendEmail} className="mt-6 space-y-3">
        <div>
          <label className="block text-sm font-medium text-black dark:text-white">
            Alternativ: Link an deine E-Mail senden
          </label>
          <p className="mt-1 text-xs text-black/55 dark:text-white/55">
            Trage deine Adresse ein – du erhältst dieselbe URL zum späteren Öffnen.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            required
            className="h-11 flex-1 rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          />
          <button
            type="submit"
            disabled={sending || !email.trim()}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {sending ? "Senden…" : "Senden"}
          </button>
        </div>
      </form>
      {sendMsg ? (
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">{sendMsg}</p>
      ) : null}
    </section>
  );
}
