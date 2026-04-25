import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmailForm } from "@/components/EmailForm";
import { Hero } from "@/components/Hero";
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
    title: "Astrologie-Tools",
    body: "Big Three, Kompatibilität, Astro-Map, Human Design und Bewusstsein.",
    href: "/tools",
    cta: "Zu den Tools",
  },
  {
    title: "Kostenlose Guides",
    body: "Sternzeichen- und Partnerschafts-Freebie mit direktem PDF-Download.",
    href: "/freebie",
    cta: "Zum Astro-Freebie",
  },
  {
    title: "Beziehungs-Funnel",
    body: "Landingpage mit Fokus auf Partnerschaft, Kommunikation und Synastry.",
    href: "/beziehung",
    cta: "Zur Beziehungsseite",
  },
  {
    title: "Blog",
    body: "Artikel mit klaren CTAs direkt in die passenden Tools.",
    href: "/blog",
    cta: "Zum Blog",
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
    body: "Interaktive Fragen und klare Einordnung fuer deinen naechsten Entwicklungsschritt.",
    href: "/tools/bewusstsein",
    badge: "Bewusstsein",
  },
] as const;

const trustPoints = [
  "Klare Sprache statt esoterischer Nebel",
  "Tools + Guides + Blog in einem System",
  "Kostenlos starten, dann optional vertiefen",
] as const;

const quickStart = [
  {
    title: "1) Kostenlos starten",
    body: "Freebie laden oder direkt mit dem Geburtshoroskop-Tool starten.",
    href: "/freebie",
    cta: "Kostenlos starten",
  },
  {
    title: "2) Passenden Flow wählen",
    body: "Self-Discovery mit Astroprofil oder Beziehungsklarheit mit Paaranalyse.",
    href: "/tools",
    cta: "Zu den Tools",
  },
  {
    title: "3) Persönlich vertiefen",
    body: "Reading oder Coaching buchen, wenn du konkrete Begleitung willst.",
    href: "/shop",
    cta: "Zu Readings & Coaching",
  },
] as const;

const freebieTeasers = [
  {
    title: "Sternzeichen-Freebie",
    body: "Kurz, klar und sofort als PDF: dein Einstieg in Muster, Staerken und Alltag.",
    href: "/sternzeichen",
    cta: "Zur Sternzeichen-Landingpage",
    imageDesktop: "/images/freebie_hintergrund.png",
    imageMobile: "/images/freebie_handy.png",
  },
  {
    title: "Beziehungs-Freebie",
    body: "Impulse zu Naehe, Kommunikation und Dynamik mit direktem PDF-Download.",
    href: "/beziehung",
    cta: "Zur Beziehungsseite",
    imageDesktop: "/images/beziehung_hintergrund.PNG",
    imageMobile: "/images/beziehung_handy.png",
  },
] as const;

export default function TestHomePage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <Hero
        headline="Astrologie, die dich ins Handeln bringt"
        subline="Starte kostenlos mit dem passenden Guide und gehe danach direkt in die Tools fuer deinen naechsten Schritt."
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
              Waehle dein Freebie: Selbstverstaendnis oder Beziehungsklarheit
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Schnellstart
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              In drei Schritten zum passenden Angebot
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {quickStart.map((step) => (
            <article
              key={step.title}
              className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                {step.body}
              </p>
              <Link
                href={step.href}
                className="mt-4 inline-flex text-sm font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200"
              >
                {step.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Haupt-Einstiege
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Diese vier Einstiege sollen die Nutzer sofort in den richtigen Bereich bringen.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {entryCards.map((card) => (
            <article
              key={card.href}
              className="rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                {card.body}
              </p>
              <Link
                href={card.href}
                className="mt-4 inline-flex text-sm font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200"
              >
                {card.cta} →
              </Link>
            </article>
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
              Regelmaessige Updates zu Sternzeichen, Beziehungen und passenden
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

      <section className="rounded-3xl border border-black/5 bg-white/50 p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-black/65 dark:text-white/70">
            Mehr von Zeichen des Universums:
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/links"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Alle Links ansehen
            </Link>
            <Link
              href="https://calendly.com/zeichendesuniversums-info/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Erstgespraech buchen
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
