"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SIGNS = [
  "Widder",
  "Stier",
  "Zwillinge",
  "Krebs",
  "Löwe",
  "Jungfrau",
  "Waage",
  "Skorpion",
  "Schütze",
  "Steinbock",
  "Wassermann",
  "Fische",
];

function teaser(sign1: string, sign2: string) {
  if (!sign1 || !sign2) return null;
  const key = `${sign1}-${sign2}`;
  const score = (key.length * 13) % 100;
  const label =
    score > 75
      ? "Sehr starke Dynamik"
      : score > 55
        ? "Gute Basis"
        : score > 35
          ? "Spannend, aber reibungsreich"
          : "Braucht bewusste Kommunikation";
  return { score, label };
}

export default function CompatibilityToolPage() {
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");

  const result = useMemo(() => teaser(sign1, sign2), [sign1, sign2]);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Compatibility Tool
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Wähle 2 Sternzeichen – du bekommst ein Teaser-Ergebnis. Die komplette
          Analyse kannst du freischalten.
        </p>
      </header>

      <section className="grid gap-6 rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Sternzeichen 1</span>
          <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value)}
            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          >
            <option value="">Bitte wählen</option>
            {SIGNS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Sternzeichen 2</span>
          <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value)}
            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          >
            <option value="">Bitte wählen</option>
            {SIGNS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight">Ergebnis</h2>
        {result ? (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-black/70 dark:text-white/70">
              Teaser für <span className="font-medium">{sign1}</span> &{" "}
              <span className="font-medium">{sign2}</span>
            </p>
            <div className="rounded-2xl bg-black/5 p-4 dark:bg-white/10">
              <p className="text-sm">
                <span className="font-medium">{result.label}</span> · Score{" "}
                <span className="font-medium">{result.score}/100</span>
              </p>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                Das ist nur ein Teaser. Die Vollanalyse enthält Stärken,
                Reibungspunkte, Kommunikationsmuster und konkrete Lösungen.
              </p>
            </div>
            <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 text-sm dark:border-white/15 dark:bg-transparent">
              <p className="font-medium">🔒 Vollanalyse ist gesperrt</p>
              <p className="mt-1 text-black/70 dark:text-white/70">
                Schalte frei, um die <span className="font-medium">3 Haupt‑Trigger</span>,
                die <span className="font-medium">beste Kommunikations‑Strategie</span>{" "}
                und eure <span className="font-medium">Stärken</span> als Paar zu sehen.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop/compatibility-vollanalyse"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Jetzt freischalten (9€)
              </Link>
              <Link
                href="/freebie"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
              >
                Kostenloser Guide
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">
            Wähle zwei Zeichen, um ein Ergebnis zu sehen.
          </p>
        )}
      </section>
    </div>
  );
}

