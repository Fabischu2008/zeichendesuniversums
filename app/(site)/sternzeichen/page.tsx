import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/sternzeichen";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Sternzeichen Guide - kostenlos",
  description:
    `${SITE_NAME}: kostenloser Sternzeichen-PDF-Guide für Persönlichkeit, Muster und alltagstaugliche Impulse.`,
  alternates: { canonical: path },
  openGraph: {
    title: `Sternzeichen Guide - kostenlos · ${SITE_NAME}`,
    description:
      "Hol dir den kompakten Sternzeichen-Guide als PDF und starte ohne Umwege.",
    url: absoluteUrl(path),
    images: [
      {
        url: ogImage,
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
};

const steps = [
  {
    step: "1",
    title: "Kurz eintragen",
    body: "Vorname, Nachname und E-Mail - Telefon nur optional.",
  },
  {
    step: "2",
    title: "Absenden",
    body: "Wir speichern deine Daten sicher für Rückfragen und Updates.",
  },
  {
    step: "3",
    title: "PDF laden",
    body: "Du landest auf der Download-Seite und speicherst den Guide sofort.",
  },
] as const;

const sternzeichenFaqs = [
  {
    question: "Ist der Sternzeichen-Guide kostenlos?",
    answer:
      "Ja. Du trägst dich kurz ein und kannst den Guide danach direkt als PDF herunterladen.",
  },
  {
    question: "Wie schnell erhalte ich den Download?",
    answer:
      "Direkt nach dem Formular landest du auf der Download-Seite und kannst die Datei sofort speichern.",
  },
  {
    question: "Für wen ist der Guide gedacht?",
    answer:
      "Für alle, die Persönlichkeit, Stärken und Beziehungsmuster besser verstehen und alltagstauglich umsetzen möchten.",
  },
  {
    question: "Was kann ich danach als nächsten Schritt machen?",
    answer:
      "Nach dem Guide kannst du direkt in die Astrologie-Tools gehen oder mit Readings und Coaching tiefer einsteigen.",
  },
] as const;

const sternzeichenFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sternzeichenFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function SternzeichenLandingPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      <JsonLd id="jsonld-sternzeichen-faq" data={sternzeichenFaqJsonLd} />
      <Hero
        headline="Dein Sternzeichen-Guide - klar, kurz, sofort da"
        subline="Kein Warten auf Mails: Trag dich ein und lade den Guide direkt als PDF. Für alle, die sich selbst und ihre Beziehungen besser verstehen wollen."
        primaryCta={{ label: "Jetzt Guide holen", href: "/freebie" }}
        secondaryCta={{ label: "So funktioniert's", href: "#so-funktionierts" }}
        note="Lesezeit unter 3 Minuten - PDF direkt nach dem Formular - kein Spam"
        imageSrc="/images/freebie_hintergrund.PNG"
        imageSrcMobile="/images/freebie_handy.png"
        imageAlt="Kosmischer Hintergrund für den Sternzeichen-Guide"
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Im Guide steckt
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Konkrete Aha-Momente statt Vibes
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Drei Schwerpunkte, die du im Alltag spüren kannst - kompakt erklärt.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 md:col-span-2">
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Warum du oft anders reagierst</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Stressmuster erkennen - ohne dich kleinzureden.
              </p>
            </li>
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Beziehungsmuster verstehen</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Nähe, Distanz, Tempo: was dich immer wieder triggert.
              </p>
            </li>
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Stärken gezielt nutzen</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Drei Schritte, die du heute ausprobieren kannst.
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <Link
            href="/freebie"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Zum kostenlosen Guide
          </Link>
        </div>
      </section>

      <section
        id="so-funktionierts"
        className="scroll-mt-28 rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            So funktioniert's
          </h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Drei einfache Schritte bis zur Datei auf deinem Gerät.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.step}
              className="relative rounded-2xl border border-black/5 bg-white p-5 text-left dark:border-white/10 dark:bg-white/5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
                {s.step}
              </span>
              <p className="mt-3 font-medium text-black dark:text-white">{s.title}</p>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <CTA
        title="Bereit für den Sternzeichen-Guide?"
        description="Ein kurzes Formular, dann liegt das PDF bei dir - praktisch und sofort lesbar."
        cta={{ label: "Kostenlosen Guide holen", href: "/freebie" }}
      />

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
          {sternzeichenFaqs.map((faq) => (
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
