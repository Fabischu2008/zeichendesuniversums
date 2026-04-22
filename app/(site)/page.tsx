import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { Testimonial } from "@/components/Testimonial";
import {
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const homeOgImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Kostenloser Sternzeichen-Guide & Astrologie-Tools",
  description:
    `${SITE_NAME}: kostenloser Sternzeichen-PDF-Guide, Astrologie und Bewusstsein – nach dem Formular sofort downloaden. Plus Tools zu Horoskop, Kompatibilität & Human Design – klar und ohne Buzzwords.`,
  openGraph: {
    title: `Kostenloser Sternzeichen-Guide · ${SITE_NAME}`,
    description:
      "Zeichen des Universums: PDF-Guide, Astrologie & Bewusstsein. Nach dem Absenden direkt zum Download – plus kostenlose Tools.",
    url: absoluteUrl("/"),
    images: [
      {
        url: homeOgImage,
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [homeOgImage],
  },
};

const steps = [
  {
    step: "1",
    title: "Kurz eintragen",
    body: "Vorname, Nachname und E‑Mail – Telefon nur, wenn du magst.",
  },
  {
    step: "2",
    title: "Absenden",
    body: "Wir speichern deine Daten sicher für Rückfragen und Updates.",
  },
  {
    step: "3",
    title: "PDF laden",
    body: "Du landest auf der Download‑Seite und speicherst den Guide sofort.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      <Hero
        headline="Dein Sternzeichen‑Guide – klar, kurz, sofort da"
        subline="Kein Warten auf Mails: Trag dich ein und lade den Guide direkt als PDF. Für alle, die sich selbst und ihre Beziehungen besser verstehen wollen – ohne esoterisches Geschwurbel."
        primaryCta={{ label: "Jetzt Guide holen", href: "/freebie" }}
        secondaryCta={{
          label: "So funktioniert’s",
          href: "#so-funktionierts",
        }}
        note="Lesezeit unter 3 Minuten · PDF direkt nach dem Formular · kein Spam"
        imageSrc="/images/hero-cosmic-eye.png"
        imageAlt="Kosmischer Hintergrund mit blauem Auge"
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Im Guide steckt
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Konkrete Aha‑Momente statt Vibes
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Drei Schwerpunkte, die du im Alltag spürst – kompakt erklärt.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 md:col-span-2">
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Warum du oft anders reagierst</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Stressmuster erkennen – ohne dich kleinzureden.
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
          <p className="mt-2 text-xs text-black/50 dark:text-white/50">
            Kostenlos · danach sofort PDF · Abmelden jederzeit möglich
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Vertrauen
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              100k+ Views
            </p>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Inhalte, die nicht nur gut klingen – sondern ankommen.
            </p>
          </div>
          <Testimonial
            quote="Kurz, klar, ohne Schnickschnack – endlich was, das ich mir aufhebe und wirklich nutze."
            name="Lea"
            detail="hat den Guide geladen"
          />
          <Testimonial
            quote="Dachte, wieder so ein PDF-Schmarren – war überrascht, wie konkret die Punkte sind."
            name="Jonas"
            detail="hat den Guide geladen"
          />
        </div>
      </section>

      <section className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Du fühlst dich oft nicht verstanden?
          </h2>
          <p className="text-black/70 dark:text-white/70">
            Vielleicht fehlen dir nur die richtigen Worte für dein Muster. Der
            Guide übersetzt dein Sternzeichen in Klartext: Stärken, Trigger und
            ein paar erste Schritte – damit du nicht mehr gegen dich selbst
            arbeitest.
          </p>
          <CTA
            title="Hol dir den Guide in einer Minute"
            description="Direkt öffnen, auf Download tippen – PDF speichern. Fertig."
            cta={{ label: "Kostenlos herunterladen", href: "/freebie" }}
          />
        </div>
        <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 p-6 sm:p-8 dark:border-white/10">
          <div className="space-y-3">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Was du bekommst
            </p>
            <ul className="space-y-2 text-sm text-black/80 dark:text-white/80">
              <li>• Persönlichkeit in Klartext</li>
              <li>• Stärken & Trigger erkennen</li>
              <li>• Beziehungsmuster einordnen</li>
              <li>• Sofort als PDF – nichts Warten</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="so-funktionierts"
        className="scroll-mt-28 rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            So funktioniert’s
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
              <p className="mt-3 font-medium text-black dark:text-white">
                {s.title}
              </p>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-center">
          <Link
            href="/freebie"
            className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Jetzt starten
          </Link>
        </div>
      </section>

      <CTA
        title="Bereit für den Sternzeichen‑Guide?"
        description="Ein kurzes Formular, dann liegt das PDF bei dir – praktisch, lesbar, ohne Füllwort-Friedhof."
        cta={{ label: "Kostenlosen Guide holen", href: "/freebie" }}
      />
    </div>
  );
}
