import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Freebie erfolgreich",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function SuccessFreebiePage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-3xl font-semibold tracking-tight">
          Check deine Inbox ✉️
        </h1>
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">
          Der kostenlose Guide ist auf dem Weg zu dir. Schau in den nächsten
          Minuten in dein Postfach (und ggf. im Spam/„Werbung“ Tab).
        </p>
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">
          In den nächsten Tagen bekommst du ein paar kurze, klare Mails mit
          weiteren Insights – du kannst dich jederzeit mit einem Klick abmelden.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 p-6 sm:p-8 dark:border-white/10">
        <p className="text-sm font-medium text-black/70 dark:text-white/70">
          Nächster Schritt (optional)
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Deine vollständige Kompatibilitäts‑Analyse
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Tiefer als ein Teaser: Dynamik, Reibungspunkte, Kommunikationsmuster
          und klare Lösungen – so, dass es sich persönlich anfühlt.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop/compatibility-vollanalyse"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Jetzt freischalten (9€)
          </Link>
          <Link
            href="/tools/compatibility"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Erst den Teaser testen
          </Link>
        </div>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Einmalzahlung · Sofort‑Zugriff · kein Abo
        </p>
      </section>
    </div>
  );
}

