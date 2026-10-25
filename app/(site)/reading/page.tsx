import type { Metadata } from "next";
import Link from "next/link";
import {
  checkoutHrefForProduct,
  PRICE_READING_PROFILE_30,
  PRODUCT_ID_READING_PROFILE_30,
} from "@/lib/cms";
import { btnPrimary, btnSecondary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Persönliches Reading",
  description:
    "30 Minuten Reading zu deinem Geburtshoroskop und den Energieflüssen: wo Kraft frei fließt, wo sie sich staut, und was der nächste Schritt ist.",
};

const price = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(PRICE_READING_PROFILE_30);

const checkoutHref = checkoutHrefForProduct(PRODUCT_ID_READING_PROFILE_30);

export default function ReadingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
          Ein Reading
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Geburtshoroskop und Energieflüsse
        </h1>
        <p className="text-black/70 dark:text-white/70">
          30 Minuten, persönlich. Wir lesen dein Geburtshoroskop und die
          Energieflüsse darin. Danach weißt du, wo Kraft frei fließt, wo sie
          sich staut, und was du als Nächstes tun kannst.
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Persönliches Reading
            </h2>
            <p className="mt-1 text-sm text-black/55 dark:text-white/55">
              30 Minuten · einmalig
            </p>
          </div>
          <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-800 dark:text-violet-200">
            {price}
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-sm leading-6 text-black/75 dark:text-white/75">
          <li>
            <span className="font-medium text-black dark:text-white">
              Geburtshoroskop.
            </span>{" "}
            Sonne, Mond, Aszendent und die Planeten, die in deinem Bild gerade
            den Ton angeben.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Energieflüsse.
            </span>{" "}
            Wo es leicht läuft, wo sich etwas staut, und welche Bewegung den
            Stau löst – nicht als Theorie, sondern an deinem aktuellen Stand.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">
              Nächster Schritt.
            </span>{" "}
            Eine klare Handlung für die nächsten Tage, keine offene Deutung
            ohne Ende.
          </li>
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={checkoutHref} className={`${btnPrimary} w-full sm:w-auto`}>
            Reading buchen
          </Link>
          <Link
            href="/tools/birth-chart"
            className={`${btnSecondary} w-full sm:w-auto`}
          >
            Zuerst Horoskop berechnen
          </Link>
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Zahlung über Stripe. Danach bekommst du den Terminlink per E-Mail.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          So läuft das Reading
        </h2>
        <ol className="mt-4 space-y-3 text-sm leading-6 text-black/75 dark:text-white/75">
          <li>
            <span className="font-medium text-black dark:text-white">1.</span>{" "}
            Du buchst und erhältst den Terminlink.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">2.</span>{" "}
            Du schickst Geburtsdatum, Uhrzeit und Ort – oder rechnest sie vorher
            im Geburtshoroskop-Tool nach.
          </li>
          <li>
            <span className="font-medium text-black dark:text-white">3.</span>{" "}
            30 Minuten Gespräch: Horoskop, Energieflüsse, ein nächster Schritt.
          </li>
        </ol>
      </section>
    </div>
  );
}
