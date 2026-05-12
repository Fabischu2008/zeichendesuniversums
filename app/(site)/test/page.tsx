import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailForm } from "@/components/EmailForm";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/test";

export const metadata: Metadata = {
  title: "Homepage Test",
  description:
    "Testseite für die neue Gesamt-Homepage von Zeichen des Universums.",
  alternates: { canonical: path },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: `Homepage Test · ${SITE_NAME}`,
    description:
      "Testaufbau für die zentrale Homepage mit Einstiegen in Tools, Freebies, Blog und Shop.",
    url: absoluteUrl(path),
  },
};

const entryCards = [
  {
    title: "Kostenlose Guides",
    body: "Sternzeichen- und Partnerschafts-Freebie mit direktem PDF-Download.",
    href: "/freebie-auswahl",
    cta: "Zu den Guides",
  },
  {
    title: "Tools",
    body: "Big Three, Paaranalyse, Astro-Map und Bewusstseins-Tool an einem Ort.",
    href: "/tools",
    cta: "Zu den Tools",
  },
  {
    title: "Blog",
    body: "Artikel zu Big 3, Synastrie und Beziehung – mit direkten Einstiegen in Rechner und Erklärseiten.",
    href: "/blog",
    cta: "Zum Astrologie-Blog",
  },
  {
    title: "Reading & Coaching",
    body: "Persönliche Begleitung mit Readings oder Erstgespräch für Coaching.",
    href: "/reading",
    cta: "Zu Reading & Coaching",
  },
] as const;

const hubColumns = [
  {
    title: "Geburtshoroskop & Selbst",
    intro:
      "Vom Einstieg bis zur exakten Berechnung: alles an einem Ort verlinkt.",
    links: [
      { href: "/geburtshoroskop-erstellen", label: "Geburtshoroskop erstellen" },
      { href: "/big-3-bedeutung", label: "Big 3: Sonne, Mond, Aszendent" },
      { href: "/aszendent-berechnen", label: "Aszendent berechnen" },
      { href: "/tools/birth-chart", label: "Zum Geburtshoroskop-Tool" },
    ],
  },
  {
    title: "Beziehung & Synastrie",
    intro:
      "Mehr als Sternzeichen-Matching: Dynamik verstehen und im Tool ausprobieren.",
    links: [
      { href: "/beziehung", label: "Beziehung & Paaranalyse (Überblick)" },
      { href: "/synastrie-einfach-erklaert", label: "Synastrie einfach erklärt" },
      { href: "/mondzeichen-beziehung", label: "Mondzeichen in Beziehungen" },
      { href: "/tools/compatibility", label: "Zur Kompatibilitäts-Analyse" },
    ],
  },
] as const;

const toolTeaser = [
  {
    title: "Geburtshoroskop",
    body: "Sonne, Mond und Aszendent exakt berechnen und direkt einordnen.",
    href: "/tools/birth-chart",
    badge: "Self-Discovery",
  },
  {
    title: "Paaranalyse",
    body: "Synastry für zwei Profile: Reibungspunkte, Dynamik und Potenziale.",
    href: "/tools/compatibility",
    badge: "Beziehung",
  },
  {
    title: "Bewusstseins-Tool",
    body: "Interaktive Fragen und klare Einordnung für deinen nächsten Entwicklungsschritt.",
    href: "/tools/bewusstsein",
    badge: "Bewusstsein",
  },
] as const;

const trustPoints = [
  "Klare Sprache statt esoterischer Nebel",
  "Tools + Guides + Blog in einem System",
  "Kostenlos starten, dann optional vertiefen",
] as const;

const freebieTeasers = [
  {
    title: "Sternzeichen-Freebie",
    body: "Kurz, klar und sofort als PDF: dein Einstieg in Muster, Stärken und Alltag.",
    href: "/sternzeichen",
    cta: "Zur Sternzeichen-Landingpage",
    imageDesktop: "/images/freebie_hintergrund.jpg",
    imageMobile: "/images/freebie_handy.jpg",
  },
  {
    title: "Beziehungs-Freebie",
    body: "Impulse zu Nähe, Kommunikation und Dynamik mit direktem PDF-Download.",
    href: "/beziehung",
    cta: "Zur Beziehungsseite",
    imageDesktop: "/images/beziehung_hintergrund.jpg",
    imageMobile: "/images/beziehung_handy.jpg",
  },
] as const;

const homeFaqs = [
  {
    question: "Wie starte ich am besten?",
    answer:
      "Am einfachsten startest du mit der Freebie-Auswahl. Dort wählst du zwischen Sternzeichen- und Beziehungs-Guide und bekommst danach direkte nächste Schritte.",
  },
  {
    question: "Sind die Guides wirklich kostenlos?",
    answer:
      "Ja. Beide Freebies sind kostenlos. Nach dem kurzen Formular kannst du die PDF-Datei direkt herunterladen.",
  },
  {
    question: "Was bringt mir der Einstieg über Tools?",
    answer:
      "Die Tools liefern dir sofort tieferen Kontext, z. B. zu Big Three, Paaranalyse oder Bewusstsein. So bekommst du schneller Klarheit für deinen Alltag.",
  },
  {
    question: "Wann machen Readings oder Coaching Sinn?",
    answer:
      "Wenn du nach Guide und Tools tiefer gehen willst, sind Readings der nächste Schritt. Für persönliche Begleitung kannst du ein Erstgespräch fürs Coaching buchen.",
  },
] as const;

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function TestHomePage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <JsonLd id="jsonld-home-faq" data={homeFaqJsonLd} />
      <Hero
        headline="Astrologie-Tools, Guides und Readings für klare nächste Schritte"
        subline="Starte kostenlos mit dem passenden Guide und bekomme klare, alltagstaugliche Impulse zu Persönlichkeit, Beziehungen und wiederkehrenden Mustern. Danach kannst du direkt in die Tools wechseln und deinen nächsten Schritt mit mehr Klarheit gehen."
        primaryCta={{ label: "Kostenlos starten", href: "/freebie-auswahl" }}
        secondaryCta={{ label: "Tools benutzen", href: "/tools" }}
        imageSrc="/images/hero-cosmic-eye.png"
        imageAlt="Kosmischer Hintergrund"
      />

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Freebie Einstieg
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Kostenlose Guides: Selbstverständnis oder Beziehungsklarheit
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {freebieTeasers.map((teaser) => (
            <Link
              key={teaser.href}
              href={teaser.href}
              className="group relative isolate overflow-hidden rounded-2xl border border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 dark:border-white/15"
            >
              <div className="relative min-h-[280px]">
                <Image
                  src={teaser.imageMobile}
                  alt={`${teaser.title} Hintergrund mobil`}
                  fill
                  sizes="100vw"
                  className="object-cover object-center sm:hidden"
                />
                <Image
                  src={teaser.imageDesktop}
                  alt={`${teaser.title} Hintergrund`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hidden object-cover object-center sm:block"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10 transition group-hover:from-black/80"
                />
                <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-5 sm:p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {teaser.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/90">
                    {teaser.body}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-white underline underline-offset-4">
                    {teaser.cta} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Themen-Hubs
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Geburtshoroskop oder Beziehung – direkt zur richtigen Seite
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200"
          >
            Alle Blog-Artikel →
          </Link>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/70 dark:text-white/70">
          Erst Kontext lesen, dann mit dem passenden Tool rechnen – ohne Umwege.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {hubColumns.map((col) => (
            <div
              key={col.title}
              className="rounded-2xl border border-black/8 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <h3 className="text-lg font-semibold tracking-tight">{col.title}</h3>
              <p className="mt-2 text-sm text-black/65 dark:text-white/65">
                {col.intro}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200"
                    >
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Übersicht
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Vier klare Bereiche: Guides, Tools, Blog-Artikel und persönliche Begleitung.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {entryCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                {card.body}
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-violet-800 underline-offset-4 group-hover:underline dark:text-violet-200">
                {card.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Tool-Teaser
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Drei schnelle Einstiege in die beliebtesten Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex text-sm font-medium text-black/70 underline-offset-4 hover:underline dark:text-white/70"
          >
            Alle Tools ansehen →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {toolTeaser.map((tool) => (
            <article
              key={tool.href}
              className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-900 dark:bg-violet-500/15 dark:text-violet-100">
                {tool.badge}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                {tool.body}
              </p>
              <Link
                href={tool.href}
                className="mt-4 inline-flex text-sm font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200"
              >
                Jetzt öffnen →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Häufige Fragen zum Einstieg
          </h2>
        </div>
        <div className="mt-6 space-y-3">
          {homeFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
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

      <section
        id="newsletter"
        className="rounded-3xl border border-black/5 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 p-6 sm:p-8 dark:border-white/10"
      >
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Newsletter
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Astro-Impulse direkt in dein Postfach
            </h2>
            <p className="text-sm leading-7 text-black/75 dark:text-white/75">
              Regelmäßige Updates zu Sternzeichen, Beziehungen und passenden
              Tools - kurz, alltagstauglich und ohne Spam.
            </p>
            <ul className="space-y-2 pt-1 text-sm text-black/80 dark:text-white/80">
              {trustPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold tracking-tight">Jetzt anmelden</p>
            <p className="mt-1 text-xs text-black/60 dark:text-white/60">
              Vorname, Nachname, E-Mail (Telefon optional)
            </p>
            <div className="mt-4">
              <EmailForm
                source="homepage_newsletter"
                redirectTo={null}
                submitLabel="Newsletter abonnieren"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-white to-violet-500/10 p-5 sm:p-6 dark:border-emerald-500/25 dark:from-emerald-500/10 dark:via-white/[0.04] dark:to-violet-500/10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-black/80 dark:text-white/80">
              Alle Profile, Inhalte und Kontaktwege an einem Ort.
            </p>
            <p className="mt-1 text-xs text-black/60 dark:text-white/60">
              Über die Link-Seite kommst du gesammelt zu allen Kanälen.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/links"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Zu allen Profilen
            </Link>
            <Link
              href="https://calendly.com/zeichendesuniversums-info/meeting"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Erstgespräch buchen
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
