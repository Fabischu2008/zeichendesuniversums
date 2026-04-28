import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  checkoutHrefForProduct,
  PRICE_ASTRO_VOLLPROFIL,
  PRODUCT_ID_ASTRO_VOLLPROFIL,
} from "@/lib/cms";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/geburtshoroskop-erstellen";
const checkoutHref = checkoutHrefForProduct(PRODUCT_ID_ASTRO_VOLLPROFIL);
const priceLabel = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(PRICE_ASTRO_VOLLPROFIL);

export const metadata: Metadata = {
  title: "Persönliches Geburtshoroskop erstellen - nur 11,11 €",
  description:
    "Finde heraus, warum sich bestimmte Muster in deinem Leben wiederholen. Dein persönliches Geburtshoroskop, klar erklärt und sofort verfügbar.",
  alternates: { canonical: path },
  openGraph: {
    title: `Geburtshoroskop erstellen - nur 11,11 € · ${SITE_NAME}`,
    description:
      "Persönliche astrologische Analyse statt Standard-Horoskop: klar, verständlich und direkt nutzbar.",
    url: absoluteUrl(path),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was bekomme ich beim persönlichen Geburtshoroskop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Du erhältst eine persönliche Auswertung auf Basis deiner Geburtsdaten mit Big 3, Mustern, Potenzialen und klaren Impulsen für deinen Alltag.",
      },
    },
    {
      "@type": "Question",
      name: "Wie schnell erhalte ich mein Geburtshoroskop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direkt nach dem Kauf wird dein persönlicher Zugang bereitgestellt.",
      },
    },
    {
      "@type": "Question",
      name: "Ist das ein Abo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Es ist eine einmalige Zahlung von 11,11 €.",
      },
    },
  ],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Geburtshoroskop Vollreport",
  description:
    "Persönliche astrologische Analyse auf Basis von Geburtsdatum, Geburtszeit und Geburtsort.",
  brand: SITE_NAME,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: PRICE_ASTRO_VOLLPROFIL.toFixed(2),
    availability: "https://schema.org/InStock",
    url: absoluteUrl(checkoutHref),
  },
};

export default function GeburtshoroskopLandingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd id="jsonld-geburtshoroskop-faq" data={faqJsonLd} />
      <JsonLd id="jsonld-geburtshoroskop-product" data={productJsonLd} />

      <section className="rounded-3xl border border-black/10 bg-gradient-to-b from-violet-500/10 via-white to-white p-6 sm:p-8 dark:from-violet-400/15 dark:via-black dark:to-black">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Persönliches Geburtshoroskop
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Warum dein Leben genau so verläuft, wie es verläuft
        </h1>
        <p className="mt-4 text-base leading-relaxed text-black/75 dark:text-white/75">
          Finde heraus, was wirklich in dir steckt. Dein persönliches
          Geburtshoroskop zeigt dir auf Basis deines exakten Geburtsmoments,
          warum sich bestimmte Muster in deinem Leben wiederholen - und was du
          konkret daraus machen kannst.
        </p>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-medium">Einmalige Investition</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">
            {priceLabel} €
          </p>
          <p className="mt-1 text-sm text-black/65 dark:text-white/65">
            Kein Abo. Sofort verfügbar.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={checkoutHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Jetzt Geburtshoroskop erstellen
            </Link>
            <Link
              href="/tools/birth-chart"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            >
              Erst kostenlos Big 3 berechnen
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Kommt dir das bekannt vor?
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Du verstehst dich selbst nicht immer ganz.</li>
          <li>• Du gerätst wiederholt in ähnliche Situationen oder Beziehungen.</li>
          <li>• Du suchst Klarheit über deinen Weg im Leben.</li>
          <li>• Du spürst, dass mehr in dir steckt, kannst es aber nicht greifen.</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-black/75 dark:text-white/75">
          Genau hier setzt dein Geburtshoroskop an: Es macht deine inneren
          Muster sichtbar und übersetzt sie in verständliche Erkenntnisse.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold tracking-tight">Was du erfährst</h2>
          <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
            <li>• Warum du so bist, wie du bist</li>
            <li>• Was dich wirklich antreibt</li>
            <li>• Wo deine größten Potenziale liegen</li>
            <li>• Welche Muster dich unbewusst steuern</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold tracking-tight">Was du bekommst</h2>
          <ul className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
            <li>• Persönliche astrologische Analyse</li>
            <li>• Verständlich und auf dich zugeschnitten</li>
            <li>• Sofortiger Zugang nach dem Kauf</li>
            <li>• Einmalzahlung statt Abo</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <h2 className="text-xl font-semibold tracking-tight">So funktioniert es</h2>
        <ol className="mt-4 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>1. Du gibst Geburtsdatum, Uhrzeit und Ort ein.</li>
          <li>2. Dein persönliches Horoskop wird berechnet.</li>
          <li>3. Du erhältst eine klare, verständliche Auswertung.</li>
        </ol>
        <p className="mt-4 text-sm text-black/70 dark:text-white/70">
          Keine komplizierte Fachsprache - nur echte Erkenntnisse über dich.
        </p>
      </section>

      <section className="rounded-3xl border border-violet-500/25 bg-violet-500/10 p-6 text-center dark:border-violet-400/25 dark:bg-violet-500/15">
        <h2 className="text-2xl font-semibold tracking-tight">
          Starte jetzt mit deinem persönlichen Geburtshoroskop
        </h2>
        <p className="mt-3 text-sm text-black/75 dark:text-white/75">
          Weniger als ein Abendessen - aber Erkenntnisse, die dein Leben
          langfristig verändern können.
        </p>
        <Link
          href={checkoutHref}
          className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-8 text-sm font-semibold text-white transition hover:bg-violet-600"
        >
          Jetzt für {priceLabel} € starten
        </Link>
      </section>
    </div>
  );
}
