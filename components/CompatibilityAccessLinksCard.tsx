"use client";

import { useState, type FormEvent } from "react";

export function CompatibilityAccessLinksCard({
  pairLink,
  profileLinkA,
  profileLinkB,
}: {
  pairLink: string;
  profileLinkA: string;
  profileLinkB: string;
}) {
  const [copied, setCopied] = useState<null | "pair" | "a" | "b">(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function copy(value: string, key: "pair" | "a" | "b") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setMsg("Kopieren nicht möglich – markiere den Link manuell.");
    }
  }

  async function sendByEmail(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSending(true);
    try {
      const res = await fetch("/api/email/compatibility-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          compatibilityUrl: pairLink,
          profileUrlA: profileLinkA,
          profileUrlB: profileLinkB,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (data.ok) {
        setMsg("E-Mail mit allen drei Links wurde verschickt.");
        setEmail("");
      } else {
        setMsg(data.message || "Versand fehlgeschlagen.");
      }
    } catch {
      setMsg("Netzwerkfehler beim E-Mail-Versand.");
    } finally {
      setSending(false);
    }
  }

  const entries: Array<{ key: "pair" | "a" | "b"; title: string; url: string }> = [
    { key: "pair", title: "Paaranalyse-Link", url: pairLink },
    { key: "a", title: "Profil-Link Person A", url: profileLinkA },
    { key: "b", title: "Profil-Link Person B", url: profileLinkB },
  ];

  return (
    <section className="rounded-3xl border border-violet-500/25 bg-violet-500/[0.06] p-6 sm:p-8 dark:border-violet-400/20 dark:bg-violet-500/10">
      <h2 className="text-lg font-semibold tracking-tight text-black dark:text-white">
        Deine Zugangslinks
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
        Speichere diese drei Links. Mit dem Paaranalyse-Link kommst du direkt zur
        kompletten Analyse hin; die zwei Profil-Links öffnen die Einzelprofile.
      </p>
      <div className="mt-6 rounded-2xl border border-black/10 bg-white/80 p-4 text-sm dark:border-white/10 dark:bg-black/20">
        <p className="font-semibold">Was jeder Link bedeutet:</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-black/75 dark:text-white/75">
          <li>
            <strong>Paaranalyse-Link:</strong> Hauptlink für später. Öffnet direkt
            die komplette Paaranalyse mit beiden Profilen – ohne erneute Zahlung.
          </li>
          <li>
            <strong>Profil-Link Person A:</strong> öffnet nur das Einzelprofil von
            Person A (z. B. wenn ihr das separat prüfen wollt).
          </li>
          <li>
            <strong>Profil-Link Person B:</strong> öffnet nur das Einzelprofil von
            Person B.
          </li>
        </ol>
        <p className="mt-3 text-black/75 dark:text-white/75">
          Du kannst die Links direkt kopieren oder dir alle drei Links per
          E-Mail senden.
        </p>
      </div>
      <div className="mt-5 space-y-4">
        {entries.map((e) => (
          <div
            key={e.key}
            className="rounded-2xl border border-black/10 bg-white/85 p-3 dark:border-white/15 dark:bg-black/20"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-black/45 dark:text-white/45">
              {e.title}
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div
                className="min-w-0 flex-1 overflow-hidden rounded-xl border border-black/10 bg-white px-3 py-2 text-xs leading-relaxed break-all line-clamp-3 dark:border-white/15 dark:bg-black/20"
                title={e.url}
              >
                {e.url}
              </div>
              <button
                type="button"
                onClick={() => void copy(e.url, e.key)}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
              >
                {copied === e.key ? "Kopiert" : "Link kopieren"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendByEmail} className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
          Optional: Paaranalyse-Link per E-Mail senden
        </p>
        <p className="mt-1 text-xs text-black/55 dark:text-white/55">
          Du kannst den Versand beliebig oft wiederholen, z. B. separat an Person A
          und Person B.
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="deine@email.de"
            required
            className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          />
          <button
            type="submit"
            disabled={sending || !email.trim()}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {sending ? "Senden…" : "Link per E-Mail senden"}
          </button>
        </div>
        {msg ? (
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">{msg}</p>
        ) : null}
      </form>
    </section>
  );
}
