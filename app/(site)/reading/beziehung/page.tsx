import Link from "next/link";
import type { Metadata } from "next";
import {
  checkoutHrefForProduct,
  PRODUCT_ID_READING_RELATIONSHIP,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "Beziehungs-Reading",
  description:
    "Beziehungs-Reading für 44,44 EUR: konkrete Impulse für Verbindung, Kommunikation und gemeinsame Entwicklung.",
};

export default function RelationshipReadingPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Beziehungs-Reading
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Dieses Reading ist auf eure Dynamik ausgerichtet: Verstehen, was euch
          verbindet, was euch triggert und wie ihr klarer in Verbindung kommt.
        </p>
      </div>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Beziehungs-Reading
            </h2>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              Inhalte
            </p>
          </div>
          <div className="rounded-full bg-black/5 px-3 py-1 text-sm font-medium dark:bg-white/10">
            44,44€
          </div>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-black/70 dark:text-white/70">
          <li>• Fokus auf Beziehung, Nähe, Grenzen und Kommunikationsmuster</li>
          <li>• Selbstreflexion statt Schuldzuweisung</li>
          <li>• Klare nächste Schritte für mehr Verbindung im Alltag</li>
        </ul>
        <div className="mt-6">
          <Link
            href={checkoutHrefForProduct(PRODUCT_ID_READING_RELATIONSHIP)}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Jetzt buchen (Stripe)
          </Link>
        </div>
      </section>
    </div>
  );
}

