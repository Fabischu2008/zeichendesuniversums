import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading",
  description: "Persönliches Reading: 30 oder 60 Minuten – klar & praktisch.",
};

const offers = [
  {
    title: "30 Min Reading",
    price: "49€",
    bullets: [
      "Kernmuster & Trigger",
      "1 Fokus-Thema (Liebe / Job / Selbstwert)",
      "Konkreter Next-Step Plan",
    ],
  },
  {
    title: "60 Min Reading",
    price: "89€",
    bullets: [
      "Geburtshoroskop Analyse (Basic)",
      "Beziehungs-/Karriere Muster",
      "Q&A + persönlicher Action Plan",
    ],
  },
];

export default function ReadingPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Persönliches Reading
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Keine Verwirrung, kein Rätselraten – wir übersetzen deine Muster in
          klare Entscheidungen.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {offers.map((o) => (
          <section
            key={o.title}
            className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {o.title}
                </h2>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                  Inhalte
                </p>
              </div>
              <div className="rounded-full bg-black/5 px-3 py-1 text-sm font-medium dark:bg-white/10">
                {o.price}
              </div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-black/70 dark:text-white/70">
              {o.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/checkout"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Jetzt buchen (Stripe)
              </Link>
              <a
                href="#"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                Calendly (später)
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

