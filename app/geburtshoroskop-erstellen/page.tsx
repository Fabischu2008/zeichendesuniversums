import type { Metadata } from "next";
import Link from "next/link";
import { GeburtshoroskopLandingFunnel } from "@/components/GeburtshoroskopLandingFunnel";
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

      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-violet-500/10 via-white to-white p-6 sm:p-8 dark:from-violet-400/15 dark:via-black dark:to-black">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-55px] h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-violet-200/15 dark:border-violet-300/10 animate-[spin_90s_linear_infinite]"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Persönliches Geburtshoroskop
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Warum dein Leben{" "}
          <em className="italic text-violet-700 dark:text-violet-300">
            genau so
          </em>{" "}
          verläuft, wie es verläuft
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
          <p className="mt-1 text-xs text-black/55 dark:text-white/55">
            In ca. 2 Minuten gestartet - persönlicher Link nach dem Kauf.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="#daten-eingeben"
              className="inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Jetzt kostenlos Big 3 berechnen
            </Link>
          </div>
        </div>
      </section>

      <GeburtshoroskopLandingFunnel />

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
        <Link
          href="#daten-eingeben"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Jetzt kostenlos Big 3 berechnen
        </Link>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Was du bekommst</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Klar erklärt, direkt auf dich zugeschnitten — damit du Erkenntnisse nicht nur
          liest, sondern sofort verstehst.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">✦</p>
            <p className="mt-2 font-semibold">Sonne, Mond &amp; Aszendent</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Der Kern deiner Persönlichkeit — basierend auf deinem exakten Geburtsmoment.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">◎</p>
            <p className="mt-2 font-semibold">Lebensmuster &amp; Potenziale</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Was sich wiederholt — und wie du es bewusst für dich nutzt.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">☉</p>
            <p className="mt-2 font-semibold">Konkrete Erkenntnisse</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Verständlich geschrieben — damit du sofort einen Bezug zu deinem Leben hast.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-2xl">→</p>
            <p className="mt-2 font-semibold">Dein persönlicher Zugangslink</p>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Nach dem Kauf jederzeit wieder öffnen und speichern — dauerhaft.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

