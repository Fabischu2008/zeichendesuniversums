import Link from "next/link";
import type { Metadata } from "next";
import {
  checkoutHrefForProduct,
  PRODUCT_ID_READING_PROFILE_30,
  PRODUCT_ID_READING_TAROT_60,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "Persoenliche Readings: 30 Min Astro-Reading oder 60 Min Astro + Tarot-Reading mit Horoskopanalyse und klaren naechsten Schritten.",
};

const offers = [
  {
    productId: PRODUCT_ID_READING_PROFILE_30,
    title: "Astro-Reading",
    price: "33€",
    bullets: [
      "30 Minuten Reading mit Analyse deines Geburtsbilds/Horoskops",
      "Klarheit fuer Alltag, Entscheidungen und Beziehungen",
      "Konkrete Next Steps statt Theorie",
    ],
  },
  {
    productId: PRODUCT_ID_READING_TAROT_60,
    title: "Astro + Tarot-Reading",
    price: "66,66€",
    bullets: [
      "60 Minuten Reading mit gleicher Horoskop-Analyse",
      "Zusaetzliche Tarot-Legung zu einem speziellen Thema",
      "Intuitive Impulse mit klarem Umsetzungsfahrplan",
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
          Beide Readings enthalten die Analyse deines Geburtsbilds/Horoskops.
          Im 60-Minuten-Format bekommst du zusaetzlich eine Tarot-Legung zu
          deinem speziellen Thema.
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
                href={checkoutHrefForProduct(o.productId)}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Jetzt buchen (Stripe)
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

