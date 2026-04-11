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

  const sendSuccess =
    sendMsg?.includes("unterwegs") || sendMsg?.includes("Spam");

  return (
    <section className="rounded-3xl border border-violet-500/25 bg-violet-500/[0.06] p-6 sm:p-8 dark:border-violet-400/20 dark:bg-violet-500/10">
      <h2 className="text-lg font-semibold tracking-tight text-black dark:text-white">
        Dein persönlicher Zugang zum Vollprofil
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
        <strong className="font-medium text-black dark:text-white">
          Kopiere den Link unten
        </strong>{" "}
        und öffne ihn <strong className="font-medium">einmal im Browser</strong>, um
        das Vollprofil freizuschalten. Auf dem Handy kannst du den Link auch in
        deine Notizen legen.
      </p>
      <p className="mt-2 text-xs text-black/55 dark:text-white/55">
        Tipp: Den Link nicht öffentlich teilen – er ist nur für dich bestimmt.
      </p>

      {queryEmailNotice === "sent" ? (
        <p className="mt-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-950 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-100">
          Wir haben dir den Link ebenfalls per E-Mail geschickt – prüfe ggf. den
          Spam-Ordner.
        </p>
      ) : null}
      {queryEmailNotice === "failed" ? (
        <p className="mt-4 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-100">
          Automatischer E-Mail-Versand war nicht möglich (z. B. fehlende
          Resend-Konfiguration). Nutze die Alternative unten oder kopiere den
          Link.
        </p>
      ) : null}

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-800 dark:text-violet-200">
          Dein persönlicher Link
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div
            className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-xs leading-snug break-all text-black/80 line-clamp-3 sm:text-sm dark:border-white/15 dark:bg-black/30 dark:text-white/85"
            title={profileUrl}
          >
            {profileUrl}
          </div>
          <button
            type="button"
            onClick={() => void copy()}
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-2xl border border-black/12 bg-white px-5 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            {copied ? "Kopiert" : "Link kopieren"}
          </button>
        </div>
      </div>

      <div
        className="mt-10 border-t border-black/10 pt-8 dark:border-white/10"
        aria-labelledby="profile-email-alt-heading"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-black/45 dark:text-white/45">
          Alternativ
        </p>
        <h3
          id="profile-email-alt-heading"
          className="mt-2 text-base font-semibold text-black dark:text-white"
        >
          Link per E-Mail senden
        </h3>
        <p className="mt-1 text-sm text-black/65 dark:text-white/65">
          Wenn du den Link lieber per Mail bekommen möchtest – dieselbe Adresse
          wie beim Link oben.
        </p>

        <form onSubmit={sendEmail} className="mt-5 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              required
              autoComplete="email"
              inputMode="email"
              className="min-h-[52px] w-full flex-1 rounded-2xl border border-black/10 bg-white px-4 text-base text-black placeholder:text-black/40 dark:border-white/15 dark:bg-black/20 dark:text-white dark:placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={sending || !email.trim()}
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-2xl bg-black px-6 text-base font-semibold text-white hover:bg-black/90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {sending ? "Senden…" : "Senden"}
            </button>
          </div>
        </form>

        {sendMsg ? (
          sendSuccess ? (
            <div
              className="mt-5 rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/[0.18] px-5 py-4 text-emerald-950 shadow-sm dark:border-emerald-500/40 dark:bg-emerald-950/35 dark:text-emerald-50"
              role="status"
            >
              <p className="text-base font-semibold tracking-tight">
                E-Mail wurde verschickt
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-emerald-900/95 dark:text-emerald-100/95">
                {sendMsg}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">{sendMsg}</p>
          )
        ) : null}
      </div>
    </section>
  );
}
