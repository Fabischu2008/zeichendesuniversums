import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/tools";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Astrologie-Tools & Horoskop-Rechner",
  description:
    "Kostenlose Astro-Tools von Zeichen des Universums: Geburtshoroskop & Big Three, Paaranalyse und Beziehungs-Kompatibilität (Synastrie), Astro-Karte, Human Design und Bewusstseins-Stufen – Astrologie und Bewusstsein praktisch erklärt.",
  keywords: [
    "Astrologie Tools",
    "Horoskop Rechner",
    "Paaranalyse",
    "Geburtshoroskop",
    "Kompatibilität Beziehung",
    "Human Design",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Astrologie-Tools & Horoskop · ${SITE_NAME}`,
    description:
      "Geburtshoroskop, Paaranalyse, Astro-Karte, Human Design, Bewusstsein – alle Tools auf einen Blick.",
    url,
    locale: "de_DE",
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Astrologie-Tools · ${SITE_NAME}`,
    description:
      "Horoskop-Tools: Kompatibilität, Big Three, Human Design und mehr.",
    images: socialTwitterImages(),
  },
};

type ToolAccent = "violet" | "rose" | "emerald" | "sky" | "amber" | "fuchsia";

const ACCENT_CARD: Record<ToolAccent, string> = {
  violet:
    "border-violet-500/20 from-violet-500/[0.12] via-white/80 to-sky-500/10 hover:border-violet-500/35 dark:from-violet-500/20 dark:via-white/5 dark:to-sky-500/10 dark:hover:border-violet-400/40",
  rose: "border-rose-500/20 from-rose-500/[0.1] via-white/80 to-amber-500/10 hover:border-rose-500/35 dark:from-rose-500/[0.15] dark:via-white/5 dark:to-amber-500/10 dark:hover:border-rose-400/40",
  emerald:
    "border-emerald-500/20 from-emerald-500/[0.1] via-white/80 to-violet-500/10 hover:border-emerald-500/35 dark:from-emerald-500/[0.12] dark:via-white/5 dark:to-violet-500/10 dark:hover:border-emerald-400/40",
  sky: "border-sky-500/20 from-sky-500/[0.1] via-white/80 to-violet-500/10 hover:border-sky-500/35 dark:from-sky-500/[0.15] dark:via-white/5 dark:to-violet-500/10 dark:hover:border-sky-400/40",
  amber:
    "border-amber-500/20 from-amber-500/[0.12] via-white/80 to-violet-500/10 hover:border-amber-500/35 dark:from-amber-500/[0.14] dark:via-white/5 dark:to-violet-500/10 dark:hover:border-amber-400/40",
  fuchsia:
    "border-fuchsia-500/20 from-fuchsia-500/[0.1] via-white/80 to-sky-500/10 hover:border-fuchsia-500/35 dark:from-fuchsia-500/[0.15] dark:via-white/5 dark:to-sky-500/10 dark:hover:border-fuchsia-400/40",
};

const ACCENT_TEXT: Record<ToolAccent, string> = {
  violet: "text-violet-800 dark:text-violet-200",
  rose: "text-rose-800 dark:text-rose-200",
  emerald: "text-emerald-800 dark:text-emerald-200",
  sky: "text-sky-800 dark:text-sky-200",
  amber: "text-amber-800 dark:text-amber-200",
  fuchsia: "text-fuchsia-800 dark:text-fuchsia-200",
};

const ACCENT_CHECK: Record<ToolAccent, string> = {
  violet: "text-violet-600 dark:text-violet-400",
  rose: "text-rose-600 dark:text-rose-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  sky: "text-sky-600 dark:text-sky-400",
  amber: "text-amber-700 dark:text-amber-300",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
};

type ToolEntry = {
  href: string;
  icon: string;
  accent: ToolAccent;
  title: string;
  subtitle: string;
  badge?: string;
  points: readonly string[];
  cta: string;
  related: readonly { href: string; label: string }[];
};

const tools: readonly ToolEntry[] = [
  {
    href: "/tools/birth-chart",
    icon: "✶",
    accent: "violet",
    title: "Mehr über dich",
    subtitle: "Persönlichkeit & vollständiges Horoskop",
    points: [
      "Exakte Berechnung auf Basis deiner Geburtsdaten",
      "Vollprofil mit Big 3, Planeten, Häusern & Archetyp",
      "Ideal, wenn du Klarheit über dich selbst suchst",
    ],
    cta: "Zum Geburtshoroskop",
    related: [
      { href: "/geburtshoroskop-erstellen", label: "Einstieg lesen" },
      { href: "/big-3-bedeutung", label: "Big 3 erklärt" },
    ],
  },
  {
    href: "/tools/compatibility",
    icon: "♥",
    accent: "rose",
    title: "Mehr über Beziehungen",
    subtitle: "Vollständige Paaranalyse (Synastrie)",
    points: [
      "Zwei Geburtsprofile mit Datum, Uhrzeit & Ort",
      "Direkt vollständige Synastrie ohne Vorschau",
      "Ideal für Partnerschaft, Dating oder Freundschaft",
    ],
    cta: "Zur Kompatibilität",
    related: [
      { href: "/beziehung", label: "Beziehungs-Hub" },
      { href: "/synastrie-einfach-erklaert", label: "Synastrie erklärt" },
    ],
  },
  {
    href: "/tools/stone-finder",
    icon: "◇",
    accent: "amber",
    title: "Stone Finder",
    subtitle: "Welcher Kristall passt jetzt?",
    badge: "Neu",
    points: [
      "Fünf kurze Fragen zu Absicht, Stimmung und Energie",
      "Persönliche Top-Empfehlung plus Alternativen",
      "Sofort nutzbar – ohne Geburtsdaten",
    ],
    cta: "Zum Stone Finder",
    related: [{ href: "/freebie-auswahl", label: "Kostenloser Guide" }],
  },
  {
    href: "/tools/human-design",
    icon: "⬡",
    accent: "fuchsia",
    title: "Human Design",
    subtitle: "Typ, Autorität & Bodygraph",
    points: [
      "Typ, Strategie, Autorität und Profil berechnet",
      "Bodygraph mit Zentren, Kanälen und Toren",
      "Zweite Perspektive neben dem Geburtshoroskop",
    ],
    cta: "Zum Human Design",
    related: [{ href: "/tools/birth-chart", label: "Geburtshoroskop" }],
  },
  {
    href: "/tools/astro-map",
    icon: "◎",
    accent: "sky",
    title: "Astro-Karte",
    subtitle: "Orte & ihre Wirkung",
    points: [
      "Zeigt, welche Planetenlinien welche Orte prägen",
      "Hilfreich für Reisen, Umzug oder Neuanfang",
      "Basiert auf denselben Geburtsdaten",
    ],
    cta: "Zur Astro-Karte",
    related: [{ href: "/tools/birth-chart", label: "Geburtshoroskop" }],
  },
  {
    href: "/tools/bewusstsein",
    icon: "◉",
    accent: "emerald",
    title: "Bewusstsein & Entwicklung",
    subtitle: "Stufen der Bewusstheit",
    points: [
      "Zwölf Lebensbühnen mit je acht Stufen",
      "Selbsteinschätzung und nächste Schritte",
      "Ohne Geburtsort – nur Sternzeichen wählen",
    ],
    cta: "Zum Bewusstseins-Tool",
    related: [
      { href: "/tools/bewusstsein/stufen", label: "Alle Stufen" },
      { href: "/blog", label: "Passende Artikel" },
    ],
  },
] as const;

function ToolCard({ tool }: { tool: ToolEntry }) {
  return (
    <div className="flex min-h-full flex-col gap-3">
      <Link
        href={tool.href}
        className={`group relative flex flex-1 flex-col overflow-hidden rounded-[1.75rem] border bg-gradient-to-br p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-10 ${ACCENT_CARD[tool.accent]}`}
      >
        <span
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-lg shadow-sm dark:bg-white/10"
          aria-hidden
        >
          {tool.icon}
        </span>
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${ACCENT_TEXT[tool.accent]}`}
        >
          {tool.badge ? `${tool.badge} · ` : ""}
          {tool.subtitle}
        </span>
        <h2 className="mt-3 pr-14 text-2xl font-semibold tracking-tight sm:text-[1.65rem]">
          {tool.title}
        </h2>
        <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
          {tool.points.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span
                className={`mt-0.5 shrink-0 ${ACCENT_CHECK[tool.accent]}`}
                aria-hidden
              >
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <span
          className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 ${ACCENT_TEXT[tool.accent]}`}
        >
          {tool.cta}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
      <p className="text-center text-xs leading-relaxed text-black/60 dark:text-white/55">
        {tool.related.map((item, i) => (
          <span key={item.href}>
            {i > 0 ? " · " : ""}
            <Link href={item.href} className="underline-offset-2 hover:underline">
              {item.label}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}

const landingPages = [
  {
    href: "/aszendent-berechnen",
    title: "Aszendent berechnen (gratis) + Bedeutung",
    imageDesktop: "/images/landing/lp-aszendent-berechnen-v2.jpg",
    imageMobile: "/images/landing/lp-aszendent-berechnen-v2.jpg",
  },
  {
    href: "/mondzeichen-beziehung",
    title: "Mondzeichen in Beziehungen: Nähe & Trigger",
    imageDesktop: "/images/landing/lp-mondzeichen-beziehung-v2.jpg",
    imageMobile: "/images/landing/lp-mondzeichen-beziehung-v2.jpg",
  },
  {
    href: "/synastrie-einfach-erklaert",
    title: "Synastrie einfach erklärt: Paaranalyse verstehen",
    imageDesktop: "/images/landing/lp-synastrie-einfach-erklaert-v2.jpg",
    imageMobile: "/images/landing/lp-synastrie-einfach-erklaert-v2.jpg",
  },
  {
    href: "/beziehungsanalyse-astrologie",
    title: "Beziehungsanalyse: klar und alltagstauglich",
    imageDesktop: "/images/landing/lp-beziehungsanalyse-astrologie-v2.jpg",
    imageMobile: "/images/landing/lp-beziehungsanalyse-astrologie-v2.jpg",
  },
  {
    href: "/big-3-bedeutung",
    title: "Big 3 verstehen: Sonne, Mond, Aszendent",
    imageDesktop: "/images/landing/lp-big3-bedeutung-v2.jpg",
    imageMobile: "/images/landing/lp-big3-bedeutung-v2.jpg",
  },
  {
    href: "/sternzeichen-kompatibilitaet",
    title: "Sternzeichen-Kompatibilität: Schnellcheck",
    imageDesktop: "/images/landing/lp-sternzeichen-kompatibilitaet-v2.jpg",
    imageMobile: "/images/landing/lp-sternzeichen-kompatibilitaet-v2.jpg",
  },
  {
    href: "/venus-mars-kompatibilitaet",
    title: "Venus & Mars: Anziehung besser verstehen",
    imageDesktop: "/images/landing/lp-venus-mars-kompatibilitaet-v2.jpg",
    imageMobile: "/images/landing/lp-venus-mars-kompatibilitaet-v2.jpg",
  },
  {
    href: "/astrologie-beziehungstipps",
    title: "7 Beziehungstipps für den Alltag",
    imageDesktop: "/images/landing/lp-astrologie-beziehungstipps-v2.jpg",
    imageMobile: "/images/landing/lp-astrologie-beziehungstipps-v2.jpg",
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <header className="mx-auto max-w-2xl space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Schritt 1 · Wähle dein Thema
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          Was willst du gerade klären?
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Sechs Einstiege: dich{" "}
          <strong className="font-medium text-black dark:text-white">
            verstehen
          </strong>
          , deine{" "}
          <strong className="font-medium text-black dark:text-white">
            Beziehung
          </strong>{" "}
          einordnen oder dein{" "}
          <strong className="font-medium text-black dark:text-white">
            Bewusstsein
          </strong>{" "}
          entwickeln – alle kostenlos. Kontext zuerst:{" "}
          <Link
            href="/geburtshoroskop-erstellen"
            className="font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200"
          >
            Geburtshoroskop erstellen
          </Link>
          {" · "}
          <Link
            href="/beziehung"
            className="font-medium text-rose-800 underline-offset-4 hover:underline dark:text-rose-200"
          >
            Beziehung &amp; Paaranalyse
          </Link>
          .
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Orientierung
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Du bist unsicher, welches Tool für dich passt?
            </h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Dann starte mit einer kurzen Erklärseite. So verstehst du schnell, worum es
              geht, und kannst danach das passende Tool für deinen nächsten Schritt wählen.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {landingPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative isolate overflow-hidden rounded-2xl border border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 dark:border-white/15"
            >
              <div className="relative min-h-[170px]">
                <Image
                  src={item.imageMobile}
                  alt={`${item.title} Hintergrund mobil`}
                  fill
                  sizes="100vw"
                  className="object-cover object-center sm:hidden"
                />
                <Image
                  src={item.imageDesktop}
                  alt={`${item.title} Hintergrund`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="hidden object-cover object-center sm:block"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition group-hover:from-black/85"
                />
                <div className="relative z-10 flex min-h-[170px] flex-col justify-end p-4">
                  <p className="text-sm font-semibold leading-snug text-white">
                    {item.title}
                  </p>
                  <span className="mt-2 inline-flex items-center text-xs font-medium text-white/90">
                    Jetzt öffnen <span className="ml-1" aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.14] via-white to-sky-500/[0.14] p-6 shadow-sm sm:p-8 dark:border-violet-400/25 dark:from-violet-500/20 dark:via-white/[0.04] dark:to-sky-500/15">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-800 dark:text-violet-200">
            Weiter geht&rsquo;s
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Was möchtest du als Nächstes machen?
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
            Wenn du noch Orientierung willst, starte mit einem kostenlosen Guide.
            Wenn du dir erst einen Überblick über alles holen möchtest, geh zurück
            zur Startseite.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/freebie-auswahl"
              className="group inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-500"
            >
              Kostenlosen Guide wählen
              <span aria-hidden className="ml-2 transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/"
              className="group inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Zur Startseite
              <span aria-hidden className="ml-2 transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
