"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import { ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astro/signs";
import { getBewusstseinProfil } from "@/lib/tools/bewusstsein-data";

export function BewusstseinStufenInfo() {
  const [sign, setSign] = useState<ZodiacSign>("Widder");
  const profil = useMemo(() => getBewusstseinProfil(sign), [sign]);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Link
        href="/tools/bewusstsein"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zum Bewusstsein-Tool
      </Link>

      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Infoseite
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Stufen nach Sternzeichen
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Wähle ein Sonnenzeichen und lies die <strong className="font-medium">acht Stufen</strong>{" "}
          dieser Lebensbühne – unabhängig vom Fragebogen. Die Texte sind dieselben wie in der
          Auswertung des Tools.
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold tracking-tight">Sonnenzeichen wählen</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Tippe auf ein Zeichen – darunter erscheinen Planet, Thema und alle Stufen 1–8.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {ZODIAC_SIGNS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSign(s)}
              className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center text-xs font-medium transition sm:text-sm ${
                sign === s
                  ? "border-violet-500 bg-violet-500/10 text-violet-950 dark:border-violet-400 dark:bg-violet-500/15 dark:text-violet-50"
                  : "border-black/10 hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/10"
              }`}
            >
              <ZodiacSignIcon sign={s} sizeClassName="h-10 w-10 sm:h-11 sm:w-11" />
              <span className="leading-tight">{s}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] via-white to-amber-500/10 p-6 sm:p-8 dark:border-white/10 dark:from-violet-500/12 dark:via-white/5 dark:to-amber-500/10">
        <div className="flex flex-wrap items-start gap-4">
          <ZodiacSignIcon sign={sign} sizeClassName="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{profil.sign}</h2>
            <p className="mt-1 text-sm text-black/65 dark:text-white/65">
              Planet: <span className="font-medium text-black dark:text-white">{profil.planet}</span>
              {" · "}
              Thema: <span className="font-medium text-black dark:text-white">{profil.thema}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
              {profil.einordnung}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
            Die acht Stufen
          </h3>
          <ul className="space-y-3">
            {profil.stufen.map((st) => (
              <li
                key={st.stufe}
                className="rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  Stufe {st.stufe} · {st.kurz}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/80 dark:text-white/80">
                  {st.beschreibung}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="text-xs text-black/50 dark:text-white/50">
        Hinweis: Stufen beschreiben typische Ausprägungen – keine feste „Stufe fürs Leben“. Zum
        Einordnen mit Situationsfragen nutze das{" "}
        <Link
          href="/tools/bewusstsein"
          className="font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
        >
          Bewusstsein-Tool
        </Link>
        .
      </p>
    </div>
  );
}
