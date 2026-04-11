"use client";

import { useState, type FormEvent } from "react";

export function ProfileAccessLinkCard({
  profileUrl,
  defaultEmail,
  queryEmailNotice,
}: {
  profileUrl: string;
  /** z. B. E-Mail aus Stripe Checkout */
  defaultEmail?: string | null;
  /** Server hat Link an ?email=… gesendet */
  queryEmailNotice?: "sent" | "failed" | null;
}) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState(defaultEmail?.trim() ?? "");
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
        Trage <strong className="font-medium">deine E-Mail-Adresse</strong> ein und klicke auf
        Senden – du bekommst denselben Zugangslink per Mail. Oder kopiere den Link direkt.
        Öffne den Link danach <strong className="font-medium">einmal im Browser</strong>, um das
        Vollprofil freizuschalten.
      </p>
      <p className="mt-2 text-xs text-black/55 dark:text-white/55">
        Tipp: Den Link nicht öffentlich teilen – er ist nur für dich bestimmt.
      </p>

      {queryEmailNotice === "sent" ? (
        <p className="mt-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-950 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-100">
          Wir haben dir den Link ebenfalls per E-Mail geschickt – prüfe ggf. den Spam-Ordner.
        </p>
      ) : null}
      {queryEmailNotice === "failed" ? (
        <p className="mt-4 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-100">
          Automatischer E-Mail-Versand war nicht möglich (z. B. fehlende Resend-Konfiguration).
          Nutze das Formular unten oder kopiere den Link.
        </p>
      ) : null}

      <form onSubmit={sendEmail} className="mt-6 space-y-3">
        <div>
          <label className="block text-sm font-medium text-black dark:text-white">
            Link an deine E-Mail senden
          </label>
          <p className="mt-1 text-xs text-black/55 dark:text-white/55">
            Beliebige gültige E-Mail-Adresse – du erhältst dieselbe URL wie unten.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            required
            autoComplete="email"
            inputMode="email"
            className="h-11 flex-1 rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          />
          <button
            type="submit"
            disabled={sending || !email.trim()}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {sending ? "Senden…" : "Link per E-Mail senden"}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
        oder
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
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
      {sendMsg ? (
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">{sendMsg}</p>
      ) : null}
    </section>
  );
}
