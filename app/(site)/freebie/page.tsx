import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kostenloser Guide",
  description: "Hol dir den kostenlosen Sternzeichen‑Guide als PDF.",
};

export default function FreebiePage() {
  return (
    <div className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-start">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Kostenloser Sternzeichen‑Guide
        </h1>
        <p className="text-black/70 dark:text-white/70">
          In wenigen Minuten bekommst du Klarheit über Persönlichkeit, Stärken
          und Beziehungsmuster – kompakt, umsetzbar, ohne Buzzwords.
        </p>
        <div className="rounded-3xl border border-black/5 bg-white/60 p-5 text-sm sm:p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold tracking-tight">Was du bekommst</p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">
            In weniger als 3 Minuten gelesen.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-black/80 dark:text-white/80">
            <li>• Warum du unter Stress so reagierst wie du reagierst</li>
            <li>• Welche Beziehungsmuster dich wiederholen (und warum)</li>
            <li>• Wie du deine Stärken gezielt im Alltag nutzt</li>
            <li>• 3 konkrete Next Steps, die du sofort umsetzen kannst</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 text-sm sm:p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold tracking-tight">Quick Preview</p>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Beispiel‑Ausschnitt (Mock):
          </p>
          <div className="mt-4 space-y-3 rounded-2xl bg-black/5 p-4 text-sm text-black/80 dark:bg-white/10 dark:text-white/80">
            <p className="font-medium">Wenn du dich oft „zu viel“ fühlst…</p>
            <p className="text-black/70 dark:text-white/70">
              Das ist häufig kein Charakterfehler, sondern ein Muster: Bedürfnis
              nach Sicherheit vs. Bedürfnis nach Freiheit.
            </p>
            <p className="text-black/70 dark:text-white/70">
              <span className="font-medium">Mini‑Übung:</span> Schreib 1 Trigger
              auf, dann formuliere 1 klare Bitte statt Vorwurf.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Jetzt kostenlos laden
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Lade den Guide direkt und ohne Formular herunter.
        </p>
        <div className="mt-6">
          <Link
            href="/freebie/download"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Kostenlos herunterladen
          </Link>
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Direktzugang zum PDF.
        </p>
      </div>
    </div>
  );
}
