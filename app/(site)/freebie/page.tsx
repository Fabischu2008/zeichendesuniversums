import type { Metadata } from "next";
import Link from "next/link";
import { EmailForm } from "@/components/EmailForm";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/freebie";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);
export const metadata: Metadata = {
  title: "Kostenloser Sternzeichen-Guide als PDF",
  description:
    "Hol dir den kostenlosen Sternzeichen-Guide als PDF: Persönlichkeit, Stärken und Beziehungsmuster kompakt erklärt.",
  alternates: { canonical: path },
  openGraph: {
    title: `Kostenloser Sternzeichen-Guide · ${SITE_NAME}`,
    description:
      "Starte kostenlos mit dem Sternzeichen-Guide und vertiefe danach mit passenden Astrologie-Tools.",
    url: absoluteUrl(path),
    images: [
      {
        url: ogImage,
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
    locale: "de_DE",
  },
};

const freebieFaqs = [
  {
    question: "Ist der Sternzeichen-Guide wirklich kostenlos?",
    answer:
      "Ja. Du trägst dich kurz mit Namen und E-Mail ein und kannst den Guide danach direkt herunterladen.",
  },
  {
    question: "Wie schnell bekomme ich den Download?",
    answer:
      "Direkt nach dem Absenden des Formulars landest du auf der Download-Seite und kannst das PDF sofort speichern.",
  },
  {
    question: "Für wen ist der Guide geeignet?",
    answer:
      "Für alle, die ihre Persönlichkeit, Stärken und Beziehungsmuster besser verstehen und praktisch im Alltag nutzen möchten.",
  },
  {
    question: "Was kann ich danach als nächsten Schritt machen?",
    answer:
      "Nach dem Guide kannst du direkt in die Astrologie-Tools wechseln oder tiefer mit Readings und Coaching arbeiten.",
  },
] as const;

const freebieFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: freebieFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FreebiePage() {
  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <JsonLd id="jsonld-freebie-faq" data={freebieFaqJsonLd} />

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
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
            Trage dich kurz ein und lade den Guide danach direkt herunter.
          </p>
          <div className="mt-6">
            <EmailForm
              source="freebie_homepage"
              redirectTo="/freebie/download"
              submitLabel="Kostenlosen Guide laden"
            />
          </div>
          <p className="mt-4 text-xs text-black/50 dark:text-white/50">
            Vorname, Nachname, E-Mail und optional Telefonnummer.
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Häufige Fragen zum Sternzeichen-Freebie
          </h2>
        </div>
        <div className="mt-6 space-y-3">
          {freebieFaqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
            >
              <summary className="cursor-pointer list-none font-medium text-black dark:text-white">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-gradient-to-br from-violet-500/[0.08] via-white to-sky-500/[0.08] p-5 sm:p-6 dark:border-white/10 dark:from-violet-500/10 dark:via-white/[0.03] dark:to-sky-500/10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-black/70 dark:text-white/70">
            Mehr Astrologie &amp; Tools? Starte direkt mit dem nächsten Schritt.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex h-11 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-500"
            >
              Zu den Tools
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Zur Hauptseite
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
