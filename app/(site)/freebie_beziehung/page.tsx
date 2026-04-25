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

const path = "/freebie_beziehung";
const url = absoluteUrl(path);
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Kostenloses Partnerschafts-PDF",
  description:
    "Kostenloser PDF-Guide zu Beziehung & Partnerschaft – Muster erkennen, Nähe stärken, klare Schritte. Von Zeichen des Universums; ideal vor der Paaranalyse.",
  keywords: [
    "Partnerschaft PDF",
    "Beziehung kostenlos",
    "Paar Guide",
    "Kommunikation Beziehung",
    "Astrologie Partnerschaft",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Kostenloses Partnerschafts-PDF · ${SITE_NAME}`,
    description:
      "PDF zu Beziehung & Partnerschaft – kompakt, ohne Buzzwords. Direkt kostenlos downloaden.",
    url,
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

const freebieBeziehungFaqs = [
  {
    question: "Ist das Beziehungs-Freebie kostenlos?",
    answer:
      "Ja. Du trägst dich kurz ein und kannst das PDF danach direkt herunterladen.",
  },
  {
    question: "Für wen ist das Beziehungs-PDF gedacht?",
    answer:
      "Für Singles, Dating-Phasen und Partnerschaften, wenn du eure Dynamik klarer verstehen möchtest.",
  },
  {
    question: "Wie schnell bekomme ich den Download?",
    answer:
      "Direkt nach dem Formular landest du auf der Download-Seite und kannst die Datei sofort speichern.",
  },
  {
    question: "Was ist ein sinnvoller nächster Schritt danach?",
    answer:
      "Nach dem Freebie kannst du direkt in die Astrologie-Tools wechseln oder mit Readings und Coaching tiefer einsteigen.",
  },
] as const;

const freebieBeziehungFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: freebieBeziehungFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FreebieBeziehungPage() {
  return (
    <div className="space-y-6">
      <JsonLd id="jsonld-freebie-beziehung-faq" data={freebieBeziehungFaqJsonLd} />
      <Link
        href="/beziehung"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Beziehungs‑Landingpage
      </Link>
      <div className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Kostenloses PDF: Partnerschaft &amp; Beziehung
          </h1>
          <p className="text-black/70 dark:text-white/70">
            Für alle, die ihre Verbindung bewusster gestalten wollen – ob du
            gerade datetest, in einer Partnerschaft steckst oder Freundschaften
            vertiefen willst. Kompakt, ohne esoterisches Geschwurbel.
          </p>
          <div className="rounded-3xl border border-black/5 bg-white/60 p-5 text-sm sm:p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold tracking-tight">Was du bekommst</p>
            <p className="mt-1 text-xs text-black/60 dark:text-white/60">
              PDF zum Speichern &amp; Mitnehmen.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/80 dark:text-white/80">
              <li>• Wie Nähe und Distanz in Beziehungen wirken – und was du daraus ableiten kannst</li>
              <li>• Typische Kommunikationsmuster zwischen Menschen (ohne Schuldzuweisung)</li>
              <li>• Mini-Reflexion: Was brauchst du wirklich in der Verbindung?</li>
              <li>• Konkrete Impulse für den nächsten ehrlichen Schritt</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-5 text-sm sm:p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold tracking-tight">Quick Preview</p>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Beispiel‑Ausschnitt:
            </p>
            <div className="mt-4 space-y-3 rounded-2xl bg-black/5 p-4 text-sm text-black/80 dark:bg-white/10 dark:text-white/80">
              <p className="font-medium">Wenn Gespräche im Kreis laufen …</p>
              <p className="text-black/70 dark:text-white/70">
                Oft stecken unterschiedliche Bedürfnisse dahinter – z. B. Sicherheit
                vs. Freiraum. Klarheit schafft Spielraum für beide Seiten.
              </p>
              <p className="text-black/70 dark:text-white/70">
                <span className="font-medium">Impuls:</span> Eine Sache benennen,
                die du schätzt – bevor du den nächsten Wunsch formulierst.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight">
            Jetzt kostenlos laden
          </h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Trage dich kurz ein und lade das Partnerschafts-PDF danach direkt herunter.
          </p>
          <div className="mt-6">
            <EmailForm
              source="freebie_beziehung_homepage"
              redirectTo="/freebie_beziehung/download"
              submitLabel="Kostenloses PDF laden"
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
            Häufige Fragen zum Beziehungs-Freebie
          </h2>
        </div>
        <div className="mt-6 space-y-3">
          {freebieBeziehungFaqs.map((faq) => (
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
