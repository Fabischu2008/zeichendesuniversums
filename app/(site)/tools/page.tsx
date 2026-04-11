import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools – Dein Einstieg",
  description:
    "Geburtshoroskop, Kompatibilität oder Bewusstseins-Stufen – kostenlos ausprobieren.",
};

const pathDu = {
  href: "/tools/birth-chart",
  title: "Mehr über dich",
  subtitle: "Persönlichkeit, Big 3 & Horoskop",
  points: [
    "Sonne, Mond & Aszendent – exakt berechnet",
    "Vollprofil mit Planeten, Häusern & Archetyp",
    "Ideal, wenn du Klarheit über dich selbst suchst",
  ],
  cta: "Zum Geburtshoroskop",
};

const pathPaar = {
  href: "/tools/compatibility",
  title: "Mehr über Beziehungen",
  subtitle: "Paar-Analyse (Synastry)",
  points: [
    "Zwei Geburtsprofile mit Datum, Uhrzeit & Ort",
    "Echte Aspekte zwischen euren Planeten",
    "Ideal für Partnerschaft, Dating oder Freundschaft",
  ],
  cta: "Zur Kompatibilität",
};

const pathBewusstsein = {
  href: "/tools/bewusstsein",
  title: "Bewusstsein & Entwicklung",
  subtitle: "Stufen der Bewusstheit",
  points: [
    "Zwölf Lebensbühnen mit je acht Stufen",
    "Selbsteinschätzung und nächste Schritte",
    "Ohne Geburtsort – nur Sternzeichen wählen",
  ],
  cta: "Zum Bewusstseins-Tool",
};

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
          Drei Einstiege:{" "}
          <strong className="font-medium text-black dark:text-white">dich</strong>{" "}
          klären,{" "}
          <strong className="font-medium text-black dark:text-white">
            Beziehung
          </strong>{" "}
          verstehen oder{" "}
          <strong className="font-medium text-black dark:text-white">
            Bewusstsein
          </strong>{" "}
          einordnen – kostenlos zum Ausprobieren.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Link
          href={pathDu.href}
          className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.12] via-white/80 to-sky-500/10 p-8 shadow-sm transition hover:-translate-y-1 hover:border-violet-500/35 hover:shadow-md dark:from-violet-500/20 dark:via-white/5 dark:to-sky-500/10 dark:hover:border-violet-400/40 sm:p-10"
        >
          <span
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-lg shadow-sm dark:bg-white/10"
            aria-hidden
          >
            ✶
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-800 dark:text-violet-200">
            {pathDu.subtitle}
          </span>
          <h2 className="mt-3 pr-14 text-2xl font-semibold tracking-tight sm:text-[1.65rem]">
            {pathDu.title}
          </h2>
          <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
            {pathDu.points.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-900 group-hover:gap-3 dark:text-violet-100">
            {pathDu.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>

        <Link
          href={pathPaar.href}
          className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-rose-500/20 bg-gradient-to-br from-rose-500/[0.1] via-white/80 to-amber-500/10 p-8 shadow-sm transition hover:-translate-y-1 hover:border-rose-500/35 hover:shadow-md dark:from-rose-500/[0.15] dark:via-white/5 dark:to-amber-500/10 dark:hover:border-rose-400/40 sm:p-10"
        >
          <span
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-lg shadow-sm dark:bg-white/10"
            aria-hidden
          >
            ♥
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-200">
            {pathPaar.subtitle}
          </span>
          <h2 className="mt-3 pr-14 text-2xl font-semibold tracking-tight sm:text-[1.65rem]">
            {pathPaar.title}
          </h2>
          <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
            {pathPaar.points.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-900 group-hover:gap-3 dark:text-rose-100">
            {pathPaar.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>

        <Link
          href={pathBewusstsein.href}
          className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.1] via-white/80 to-violet-500/10 p-8 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-md dark:from-emerald-500/[0.12] dark:via-white/5 dark:to-violet-500/10 dark:hover:border-emerald-400/40 sm:p-10 md:col-span-2 lg:col-span-1"
        >
          <span
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-lg shadow-sm dark:bg-white/10"
            aria-hidden
          >
            ◎
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
            {pathBewusstsein.subtitle}
          </span>
          <h2 className="mt-3 pr-14 text-2xl font-semibold tracking-tight sm:text-[1.65rem]">
            {pathBewusstsein.title}
          </h2>
          <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
            {pathBewusstsein.points.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 group-hover:gap-3 dark:text-emerald-100">
            {pathBewusstsein.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>
      </div>

      <section className="mx-auto max-w-xl rounded-3xl border border-black/5 bg-black/[0.02] px-6 py-8 text-center dark:border-white/10 dark:bg-white/[0.03] sm:px-8">
        <p className="text-sm font-medium text-black/80 dark:text-white/80">
          Danach: Guide, Shop oder nächstes Tool
        </p>
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">
          Viele starten mit dem{" "}
          <Link
            href="/freebie"
            className="font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
          >
            kostenlosen PDF-Guide
          </Link>{" "}
          oder schauen im{" "}
          <Link
            href="/shop"
            className="font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
          >
            Shop
          </Link>{" "}
          vorbei.
        </p>
      </section>
    </div>
  );
}
