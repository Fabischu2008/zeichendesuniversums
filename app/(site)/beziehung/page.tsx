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

const path = "/beziehung";
const funnelFormHref = "/freebie_beziehung";
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

const relationshipFaqs = [
  {
    question: "Ist das Beziehungs-PDF kostenlos?",
    answer:
      "Ja. Du trägst dich kurz ein und bekommst danach direkten Zugriff auf das kostenlose PDF.",
  },
  {
    question: "Für wen ist das Beziehungs-Freebie gedacht?",
    answer:
      "Für Singles, Dating-Phasen und Partnerschaften - immer dann, wenn du eure Dynamik klarer verstehen willst.",
  },
  {
    question: "Was mache ich nach dem PDF?",
    answer:
      "Als nächsten Schritt kannst du direkt in die Paaranalyse wechseln und eure Konstellation tiefer einordnen.",
  },
  {
    question: "Gibt es danach auch Reading oder Coaching?",
    answer:
      "Ja. Nach dem Freebie kannst du bei Bedarf ein Beziehungs-Reading buchen oder ein Erstgespräch fürs Coaching anfragen, wenn du persönliche Begleitung willst.",
  },
] as const;

const relationshipFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: relationshipFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function BeziehungLandingPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
      <JsonLd id="jsonld-beziehung-faq" data={relationshipFaqJsonLd} />
      <Hero
        headline="Beziehung besser verstehen: kostenloses PDF, Tools und Vertiefung"
        subline="Kein Warten auf Mails: Trag dich ein und lade das PDF zu Partnerschaft & Verbindung direkt herunter. Für alle, die Nähe, Kommunikation und wiederkehrende Muster besser verstehen wollen – ohne esoterisches Geschwurbel."
        primaryCta={{ label: "Jetzt PDF holen", href: funnelFormHref }}
        secondaryCta={{
          label: "So funktioniert’s",
          href: "#so-funktionierts",
        }}
        note="Lesezeit im PDF kompakt · Datei direkt nach dem Formular · kein Spam"
        imageSrc="/images/beziehung_hintergrund.PNG"
        imageSrcMobile="/images/beziehung_handy.png"
        imageAlt="Hintergrundbild Beziehung & Partnerschaft"
      />

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
            description="Direkt öffnen, auf Download tippen – Datei speichern. Fertig."
            cta={{ label: "Kostenlos herunterladen", href: funnelFormHref }}
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
          {relationshipFaqs.map((faq) => (
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
