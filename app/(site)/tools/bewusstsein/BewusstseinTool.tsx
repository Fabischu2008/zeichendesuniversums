"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import { ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astro/signs";
import {
  getBewusstseinProfil,
  naechsterSchrittText,
} from "@/lib/tools/bewusstsein-data";
import {
  BEWUSSTSEIN_FRAGEN,
  berechneStufeAusFragebogen,
  type StufeZahl,
} from "@/lib/tools/bewusstsein-fragen";

export function BewusstseinTool() {
  const [sign, setSign] = useState<ZodiacSign | null>(null);
  /** Index der aktuellen Frage 0–3 */
  const [frageIndex, setFrageIndex] = useState(0);
  /** Gewählte Stufe pro Frage (gleiche Reihenfolge wie Fragen) */
  const [antwortStufen, setAntwortStufen] = useState<StufeZahl[]>([]);
  /** Nach Abschluss des Fragebogens berechnet */
  const [berechneteStufe, setBerechneteStufe] = useState<StufeZahl | null>(null);
  const [mittelwert, setMittelwert] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const profil = useMemo(() => (sign ? getBewusstseinProfil(sign) : null), [sign]);
  const fragen = useMemo(
    () => (sign ? BEWUSSTSEIN_FRAGEN[sign] : null),
    [sign],
  );

  const aktuelle = useMemo(() => {
    if (!profil || !berechneteStufe) return null;
    return profil.stufen.find((s) => s.stufe === berechneteStufe) ?? null;
  }, [profil, berechneteStufe]);

  const naechster = useMemo(() => {
    if (!sign || !berechneteStufe) return null;
    return naechsterSchrittText(sign, berechneteStufe);
  }, [sign, berechneteStufe]);

  const aktuelleFrage = fragen?.[frageIndex] ?? null;

  useEffect(() => {
    if (berechneteStufe && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [berechneteStufe]);

  function resetSign() {
    setSign(null);
    setFrageIndex(0);
    setAntwortStufen([]);
    setBerechneteStufe(null);
    setMittelwert(null);
  }

  function waehleSign(s: ZodiacSign) {
    setSign(s);
    setFrageIndex(0);
    setAntwortStufen([]);
    setBerechneteStufe(null);
    setMittelwert(null);
  }

  function antwortWaehlen(stufe: StufeZahl) {
    if (!fragen) return;
    const next = [...antwortStufen];
    next[frageIndex] = stufe;
    setAntwortStufen(next);
    if (frageIndex < fragen.length - 1) {
      setFrageIndex(frageIndex + 1);
      return;
    }
    const { stufe: s, mittelwert: m } = berechneStufeAusFragebogen(next);
    setBerechneteStufe(s);
    setMittelwert(m);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <Link
        href="/tools"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Themenwahl
      </Link>

      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Tool · Bewusstsein
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Stufen der Bewusstheit
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Zuerst wählst du dein <strong className="font-medium">Sonnenzeichen</strong>
          . Dann beantwortest du <strong className="font-medium">vier Situationen</strong>
          – wie du typischerweise denkst oder reagierst. Daraus leiten wir eine{" "}
          <strong className="font-medium">Stufe (1–8)</strong> ab und zeigen passende
          Texte sowie Entwicklungsimpulse. Das ist eine Selbsteinschätzung, keine
          Diagnose. Alle Stufen kannst du auch{" "}
          <Link
            href="/tools/bewusstsein/stufen"
            className="font-medium text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
          >
            ohne Fragebogen nachlesen
          </Link>
          .
        </p>
      </header>

      <section className="rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              1 · Dein Sternzeichen
            </h2>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              Orientierung am Sonnenzeichen (Geburtsdatum).
            </p>
          </div>
          {sign ? (
            <button
              type="button"
              onClick={() => resetSign()}
              className="text-sm font-medium text-violet-700 hover:underline dark:text-violet-300"
            >
              Zeichen ändern
            </button>
          ) : null}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {ZODIAC_SIGNS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => waehleSign(s)}
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

      {sign && profil && fragen && aktuelleFrage && berechneteStufe === null ? (
        <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/45 dark:text-white/45">
            2 · Fragebogen · {frageIndex + 1} / {fragen.length}
          </p>
          <p className="mt-2 text-sm text-black/65 dark:text-white/65">
            <span className="font-medium text-black dark:text-white">{profil.sign}</span>{" "}
            · {profil.planet} · {profil.thema}
          </p>
          <h2 className="mt-4 text-lg font-semibold leading-snug text-black dark:text-white">
            {aktuelleFrage.situation}
          </h2>
          <div className="mt-6 grid gap-3">
            {aktuelleFrage.optionen.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => antwortWaehlen(opt.stufe)}
                className="rounded-2xl border border-black/10 px-4 py-3 text-left text-sm leading-relaxed text-black/85 transition hover:bg-black/[0.04] dark:border-white/15 dark:text-white/85 dark:hover:bg-white/10"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {frageIndex > 0 ? (
            <button
              type="button"
              onClick={() => {
                setAntwortStufen((prev) => prev.slice(0, frageIndex));
                setFrageIndex((i) => Math.max(0, i - 1));
              }}
              className="mt-6 text-sm font-medium text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
            >
              ← Zurück zur vorherigen Frage
            </button>
          ) : null}
        </section>
      ) : null}

      {sign && berechneteStufe && aktuelle && naechster ? (
        <section
          ref={resultRef}
          className="scroll-mt-24 space-y-6 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-white to-amber-500/10 p-6 sm:p-8 dark:border-white/10 dark:from-violet-500/15 dark:via-white/5 dark:to-amber-500/10"
        >
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Deine Auswertung
          </h2>

          {mittelwert !== null ? (
            <p className="text-sm text-black/65 dark:text-white/65">
              Aus deinen Antworten ergibt sich ein Mittelwert von etwa{" "}
              <span className="font-medium text-black dark:text-white">
                {mittelwert.toFixed(1)}
              </span>{" "}
              (gerundet: <strong className="font-medium">Stufe {berechneteStufe}</strong>
              ).
            </p>
          ) : null}

          <div className="rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
              Stufe {aktuelle.stufe} · {aktuelle.kurz}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/80 dark:text-white/80">
              {aktuelle.beschreibung}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.08] p-4 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900 dark:text-emerald-200">
              {naechster.ueberschrift}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/80 dark:text-white/80">
              {naechster.text}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setFrageIndex(0);
                setAntwortStufen([]);
                setBerechneteStufe(null);
                setMittelwert(null);
              }}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Fragebogen wiederholen
            </button>
            <Link
              href="/tools/bewusstsein/stufen"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Alle Stufen nachlesen
            </Link>
          </div>

          <p className="text-xs text-black/50 dark:text-white/50">
            Methode: Es gibt keine „richtige“ Antwort – wähle, was dich am ehesten
            beschreibt. Aus vier Antworten wird je eine Stufe (1–8) gewichtet; der
            Mittelwert wird gerundet. Inspiriert vom Modell der Lebensbühnen; Texte
            eigenständig formuliert. Bei Belastung oder Krise: professionelle Hilfe
            suchen.
          </p>
        </section>
      ) : null}
    </div>
  );
}
