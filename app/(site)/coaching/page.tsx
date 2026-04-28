import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching Erstgespräch",
  description:
    "Unverbindliches Erstgespräch: direkt Termin buchen oder Anfrage per Mail senden.",
};

const COACHING_CALENDLY_URL =
  "https://calendly.com/zeichendesuniversums-info/60min-astroreading-tarot";
const COACHING_MAILTO_URL = `mailto:zeichendesuniversums.info@gmail.com?subject=${encodeURIComponent("Anfrage Coaching Erstgespräch")}&body=${encodeURIComponent(
  [
    "Hi,",
    "",
    "ich möchte ein Coaching-Erstgespräch anfragen.",
    "",
    "Name:",
    "Wunschtermin/Zeitraum:",
    "Thema in 1-2 Sätzen:",
    "",
    "Danke!",
  ].join("\n"),
)}`;

const offers = [
  {
    title: "Einfluss",
    price: "Erstgespräch",
    bullets: [
      "Unverbindliches Beratungsgespräch zum Kennenlernen.",
      "Wir klären dein Anliegen, Ziele und ob Coaching sinnvoll passt.",
      "Du bekommst eine klare Empfehlung für den nächsten Schritt.",
      "Aktuell keine Online-Zahlung auf dieser Seite.",
    ],
  },
];

export default function CoachingPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Persönliches Coaching
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Einfluss ist dein intensiver Coaching-Raum: tiefe Begleitung,
          klare Reflexion und echte Veränderung durch regelmäßige Umsetzung.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
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
                href={COACHING_CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Erstgespräch in Calendly buchen
              </Link>
              <a
                href={COACHING_MAILTO_URL}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                Anfrage per Mail senden
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

