import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
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
    `${SITE_NAME}: kostenloser Sternzeichen-PDF-Guide fuer Persoenlichkeit, Muster und alltagstaugliche Impulse.`,
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
    body: "Wir speichern deine Daten sicher fuer Rueckfragen und Updates.",
  },
  {
    step: "3",
    title: "PDF laden",
    body: "Du landest auf der Download-Seite und speicherst den Guide sofort.",
  },
] as const;

export default function SternzeichenLandingPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      <Hero
        headline="Dein Sternzeichen-Guide - klar, kurz, sofort da"
        subline="Kein Warten auf Mails: Trag dich ein und lade den Guide direkt als PDF. Fuer alle, die sich selbst und ihre Beziehungen besser verstehen wollen."
        primaryCta={{ label: "Jetzt Guide holen", href: "/freebie" }}
        secondaryCta={{ label: "So funktioniert's", href: "#so-funktionierts" }}
        note="Lesezeit unter 3 Minuten - PDF direkt nach dem Formular - kein Spam"
        imageSrc="/images/freebie_hintergrund.PNG"
        imageSrcMobile="/images/freebie_handy.png"
        imageAlt="Kosmischer Hintergrund fuer den Sternzeichen-Guide"
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
              Drei Schwerpunkte, die du im Alltag spueren kannst - kompakt erklaert.
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
                Naehe, Distanz, Tempo: was dich immer wieder triggert.
              </p>
            </li>
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Staerken gezielt nutzen</p>
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
            Drei einfache Schritte bis zur Datei auf deinem Geraet.
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
        title="Bereit fuer den Sternzeichen-Guide?"
        description="Ein kurzes Formular, dann liegt das PDF bei dir - praktisch und sofort lesbar."
        cta={{ label: "Kostenlosen Guide holen", href: "/freebie" }}
      />
    </div>
  );
}
