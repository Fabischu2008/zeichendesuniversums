import type { Metadata } from "next";
import { EmailForm } from "@/components/EmailForm";

export const metadata: Metadata = {
  title: "Kostenloser Guide",
  description: "Hol dir den kostenlosen Sternzeichen‑Guide per E‑Mail.",
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
        <ul className="space-y-2 rounded-3xl border border-black/5 bg-white/60 p-5 text-sm text-black/80 sm:p-6 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
          <li>• Persönlichkeit verstehen</li>
          <li>• Stärken erkennen</li>
          <li>• Beziehungen verbessern</li>
        </ul>
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Jetzt kostenlos anfordern
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Trag deine E‑Mail ein. Du bekommst den Guide sofort (und eine kurze
          Serie mit echten Mehrwerten).
        </p>
        <div className="mt-6">
          <EmailForm />
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Kein Spam. Abmelden jederzeit möglich.
        </p>
      </div>
    </div>
  );
}

