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

const path = "/beziehung";
const funnelFormHref = "/partnerschaft";
const ogImage = absoluteUrl(SOCIAL_PREVIEW_IMAGE);

export const metadata: Metadata = {
  title: "Partnerschaft & Beziehung – kostenloses PDF",
  description:
    `${SITE_NAME}: kostenloses PDF zu Nähe, Kommunikation und Beziehungsmustern – direkt nach dem Formular. Plus Paaranalyse & Astrologie-Tools für echte Kompatibilität.`,
  alternates: { canonical: path },
  openGraph: {
    title: `Partnerschaft & Beziehung – kostenloses PDF · ${SITE_NAME}`,
    description:
      "Beziehungsfunnel: PDF-Guide zu Partnerschaft & Verbindung, dann optional die Paaranalyse (Synastry). Klar, ohne Buzzwords.",
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
    body: "Du landest auf der Download‑Seite und speicherst das PDF sofort.",
  },
] as const;

export default function BeziehungLandingPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      <Hero
        headline="Dein Beziehungs‑PDF – klar, kurz, sofort da"
        subline="Kein Warten auf Mails: Trag dich ein und lade das PDF zu Partnerschaft & Verbindung direkt herunter. Für alle, die Nähe, Kommunikation und wiederkehrende Muster besser verstehen wollen – ohne esoterisches Geschwurbel."
        primaryCta={{ label: "Jetzt PDF holen", href: funnelFormHref }}
        secondaryCta={{
          label: "So funktioniert’s",
          href: "#so-funktionierts",
        }}
        note="Lesezeit im PDF kompakt · Datei direkt nach dem Formular · kein Spam"
        imageSrc="/images/hero-cosmic-eye.png"
        imageAlt="Kosmischer Hintergrund mit blauem Auge"
      />

      <p className="text-center text-sm text-black/50 dark:text-white/50">
        <Link
          href="/"
          className="underline decoration-black/20 underline-offset-4 hover:text-black dark:decoration-white/25 dark:hover:text-white"
        >
          ← Zur Hauptseite ({SITE_NAME})
        </Link>
      </p>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Im PDF steckt
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Beziehung in Klartext – nicht nur „Wir passen zusammen“
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Drei Schwerpunkte rund um Verbindung – kompakt, zum Mitnehmen.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 md:col-span-2">
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Nähe &amp; Distanz</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Was du brauchst – und wo es bei euch knirscht.
              </p>
            </li>
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Kommunikation ohne Vorwurf</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Muster erkennen statt im Kreis zu reden.
              </p>
            </li>
            <li className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <p className="font-medium">Nächster ehrlicher Schritt</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Konkrete Impulse für Dating, Paar oder enge Freundschaft.
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <Link
            href={funnelFormHref}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Zum kostenlosen PDF
          </Link>
          <p className="mt-2 text-xs text-black/50 dark:text-white/50">
            Kostenlos · danach sofort Download · Abmelden jederzeit möglich
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
            quote="Endlich nicht nur Sternzeichen-Meme – sondern was ich im Alltag wirklich spüre."
            name="Lea"
            detail="hat den Guide geladen"
          />
          <Testimonial
            quote="Kurz genug für einen Kaffee, konkret genug, dass ich’s mir aufhebe."
            name="Jonas"
            detail="hat den Guide geladen"
          />
        </div>
      </section>

      <section className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Wieder dieselbe Diskussion – nur lauter?
          </h2>
          <p className="text-black/70 dark:text-white/70">
            Oft fehlen nur Worte für das Muster dahinter. Das PDF hilft dir,
            Nähe, Grenzen und Bedürfnisse klarer zu benennen – ob du single
            bist, datetest oder in einer Partnerschaft steckst.
          </p>
          <CTA
            title="Hol dir das PDF in einer Minute"
            description="Formular ausfüllen, auf die Download‑Seite – Datei speichern. Fertig."
            cta={{ label: "Zum Formular", href: funnelFormHref }}
          />
        </div>
        <div className="rounded-3xl border border-black/5 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 p-6 sm:p-8 dark:border-white/10">
          <div className="space-y-3">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">
              Was du bekommst
            </p>
            <ul className="space-y-2 text-sm text-black/80 dark:text-white/80">
              <li>• Impulse zu Nähe, Kommunikation &amp; Mustern</li>
              <li>• Reflexion ohne Schuldzuweisung</li>
              <li>• Sofort als PDF – nichts Warten</li>
              <li>• Danach: optional Paaranalyse (Astrologie)</li>
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
            href={funnelFormHref}
            className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Jetzt starten
          </Link>
        </div>
      </section>

      <CTA
        title="Bereit für dein Beziehungs‑PDF?"
        description="Ein kurzes Formular, dann liegt die Datei bei dir – praktisch, lesbar, ohne Füllwort-Friedhof."
        cta={{ label: "Kostenloses PDF holen", href: funnelFormHref }}
      />

      <p className="text-center text-sm text-black/50 dark:text-white/50">
        Mehr Astrologie &amp; Tools?{" "}
        <Link
          href="/tools/compatibility"
          className="font-medium text-violet-800 underline decoration-violet-500/30 underline-offset-4 hover:text-violet-950 dark:text-violet-200 dark:hover:text-white"
        >
          Zur Paaranalyse
        </Link>
        {" · "}
        <Link
          href="/"
          className="underline decoration-black/20 underline-offset-4 hover:text-black dark:decoration-white/25 dark:hover:text-white"
        >
          Zur Hauptseite
        </Link>
      </p>
    </div>
  );
}
