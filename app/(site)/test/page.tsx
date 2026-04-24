import type { Metadata } from "next";
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
    title: "Human Design",
    body: "Typ, Strategie und Bodygraph als ergänzende Perspektive.",
    href: "/tools/human-design",
    badge: "Energie",
  },
] as const;

const trustPoints = [
  "Klare Sprache statt esoterischer Nebel",
  "Tools + Guides + Blog in einem System",
  "Kostenlos starten, dann optional vertiefen",
] as const;

const upsellFlows = [
  {
    badge: "Astroprofil-Flow",
    title: "Nach dem Vollreport",
    body: "Nutzer gehen von der Profilauswertung in passende Vertiefung: 30-Min Astro-Reading, 60-Min Astro+Tarot oder 1:1 Coaching.",
    primaryCta: { label: "Astro-Readings ansehen", href: "/reading" },
    secondaryCta: { label: "Coaching Einfluss", href: "/coaching" },
    points: [
      "Astro-Reading: 33 EUR / 30 Min",
      "Astro + Tarot: 66,66 EUR / 60 Min",
      "Coaching Einfluss: 2.500 EUR",
    ],
  },
  {
    badge: "Beziehungs-Flow",
    title: "Nach der Paaranalyse",
    body: "Nutzer werden in ein fokussiertes Beziehungs-Reading geführt, das direkt an Dynamik, Reibungspunkte und Verbindung anknüpft.",
    primaryCta: { label: "Beziehungs-Reading", href: "/reading/beziehung" },
    secondaryCta: { label: "Zur Paaranalyse", href: "/tools/compatibility" },
    points: [
      "Beziehungs-Reading: 44,44 EUR",
      "Klarer Fokus auf Nähe, Grenzen, Kommunikation",
      "Gleicher Stripe -> Success Flow",
    ],
  },
] as const;

export default function TestHomePage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <Hero
        headline="Zeichen des Universums – deine Astro-Plattform"
        subline="Diese Test-Homepage bündelt den gesamten Einstieg: Freebies, Beziehungsfunnel, Tools und Blog. Ziel ist eine Seite, die sofort Orientierung gibt und in den passenden Flow führt."
        primaryCta={{ label: "Tools entdecken", href: "/tools" }}
        secondaryCta={{ label: "Kostenlos starten", href: "#newsletter" }}
        note="Testroute: /test (noindex)"
        imageSrc="/images/hero-cosmic-eye.png"
        imageAlt="Kosmischer Hintergrund"
      />

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

      <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-white to-violet-500/10 p-6 sm:p-8 dark:border-emerald-500/25 dark:from-emerald-500/10 dark:via-white/[0.04] dark:to-violet-500/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Monetarisierung 2.0
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Getrennte Upsell-Flows für Astro und Beziehung
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Damit Nutzer immer das passende Angebot sehen, werden Readings je
              Tool-Kontext getrennt ausgespielt.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex text-sm font-medium text-black/70 underline-offset-4 hover:underline dark:text-white/70"
          >
            Alle Produkte im Shop →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {upsellFlows.map((flow) => (
            <article
              key={flow.title}
              className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100">
                {flow.badge}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{flow.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                {flow.body}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/80 dark:text-white/80">
                {flow.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={flow.primaryCta.href}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-xs font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  {flow.primaryCta.label}
                </Link>
                <Link
                  href={flow.secondaryCta.href}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                >
                  {flow.secondaryCta.label}
                </Link>
              </div>
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
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Newsletter + Freebie
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Regelmäßig Insights erhalten und direkt mit dem Guide starten
            </h2>
            <p className="text-sm leading-7 text-black/75 dark:text-white/75">
              Trage dich ein und wir schicken dir künftig neue Inhalte, Tools und Updates. Als
              Start landest du direkt auf dem Download des kostenlosen Guides.
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
                source="homepage_test_newsletter"
                redirectTo="/freebie/download"
                submitLabel="Newsletter + Guide starten"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 md:grid-cols-3 dark:border-white/10 dark:bg-white/5">
        <div className="space-y-2">
          <p className="text-sm font-medium text-black/70 dark:text-white/70">Funnel 1</p>
          <p className="text-sm text-black/75 dark:text-white/75">/ → /freebie → /freebie/download</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-black/70 dark:text-white/70">Funnel 2</p>
          <p className="text-sm text-black/75 dark:text-white/75">/beziehung → /partnerschaft → /partnerschaft/download</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-black/70 dark:text-white/70">Monetarisierung</p>
          <p className="text-sm text-black/75 dark:text-white/75">/tools → /checkout → /success (+ Zugangsmail)</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/shop"
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Shop ansehen
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
        >
          Zur aktuellen Homepage
        </Link>
      </div>
    </div>
  );
}
