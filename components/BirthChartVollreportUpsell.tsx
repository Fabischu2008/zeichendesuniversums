"use client";

import Link from "next/link";
import { getProductBySlug } from "@/lib/cms";

const SHOP_SLUG = "astro-vollprofil";

export function BirthChartVollreportUpsell() {
  const product = getProductBySlug(SHOP_SLUG);
  const price = product?.price ?? 19;
  const title = product?.name ?? "Astrologisches Vollprofil";

  const reportBullets = [
    "Ausformulierte Deutung statt nur Planeten-Tabelle",
    "Klare Impulse zu Stärken, Schatten & Entwicklungspfad",
    "Strukturiert zum Lesen, Speichern & Wiederholen (PDF-Stil)",
    "Passt zu dem, was du im Tool schon gesehen hast – nur vertieft",
  ];

  return (
    <section
      className="relative overflow-hidden rounded-[1.75rem] border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.14] via-white to-amber-500/10 p-6 shadow-sm dark:from-violet-500/20 dark:via-white/[0.06] dark:to-amber-500/10 sm:p-8"
      aria-labelledby="vollreport-funnel-heading"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/20" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-800 dark:text-violet-200">
          Schritt 3 · Dein nächster Schritt
        </p>
        <h2
          id="vollreport-funnel-heading"
          className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Du hast die Big 3 – willst du den vollen roten Faden?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/75 dark:text-white/75">
          Im kostenlosen Tool siehst du, <strong className="font-medium">was</strong>{" "}
          astrologisch zu dir passt. Der{" "}
          <strong className="font-medium">Vollreport</strong> erklärt dir{" "}
          <strong className="font-medium">warum</strong> das zusammenhängt und was
          du daraus im Alltag machst – ohne Esoterik-Sprech ohne Ende.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl border border-black/8 bg-white/90 p-5 dark:border-white/10 dark:bg-black/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">
              Kostenloses Tool
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-black/75 dark:text-white/75">
              <li className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                Big 3 exakt berechnet
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                Optionale technische Chart-Vorschau (Beta)
              </li>
              <li className="flex gap-2">
                <span className="text-black/35 dark:text-white/35">—</span>
                Keine ausführliche Begleitung / PDF
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.08] p-5 dark:border-violet-400/25 dark:bg-violet-500/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-900 dark:text-violet-100">
              {title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-black/85 dark:text-white/85">
              {reportBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-violet-600 dark:text-violet-300">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-2xl font-semibold tracking-tight text-violet-950 dark:text-violet-50">
              {price} €{" "}
              <span className="text-sm font-normal text-black/50 dark:text-white/50">
                einmalig
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={`/shop/${SHOP_SLUG}?from=birth-chart`}
            className="inline-flex h-12 min-w-[200px] flex-1 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Vollreport freischalten
          </Link>
          <Link
            href="/freebie"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 bg-white/80 px-6 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Erst den kostenlosen Guide holen
          </Link>
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Nach dem Kauf erhältst du die inhaltliche Auswertung passend zum Produkt
          im Shop – unabhängig von der Beta-Technik-Ansicht hier auf der Seite.
        </p>
      </div>
    </section>
  );
}
