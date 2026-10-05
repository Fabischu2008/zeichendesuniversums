"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  findStones,
  STONE_INTENTS,
  STONE_LIFE_AREAS,
  STONE_MOODS,
  type StoneEnergy,
  type StoneIntent,
  type StoneLifeArea,
  type StoneMood,
  type StoneQuizAnswers,
} from "@/lib/stones";
import { ToolFooterCta } from "@/components/ToolFooterCta";
import {
  backLink,
  btnGhost,
  btnPrimary,
  btnSecondary,
  choiceButton,
  eyebrow,
  sectionCard,
} from "@/lib/ui";

const ZODIAC = [
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

const STEPS = [
  { id: "intent", title: "Was brauchst du gerade am meisten?" },
  { id: "mood", title: "Wie fühlst du dich aktuell?" },
  { id: "lifeArea", title: "In welchem Bereich soll der Stein helfen?" },
  { id: "energy", title: "Welche Art von Energie suchst du?" },
  { id: "zodiac", title: "Dein Sternzeichen (optional)" },
  { id: "result", title: "Dein persönlicher Stein" },
] as const;

function ChoiceButton({
  active,
  title,
  hint,
  onClick,
}: {
  active: boolean;
  title: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={choiceButton(active)}
    >
      <span className="block text-sm font-medium sm:text-base">{title}</span>
      {hint ? (
        <span
          className={[
            "mt-1.5 block text-xs sm:text-sm",
            active ? "text-white/80" : "text-black/55 dark:text-white/55",
          ].join(" ")}
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

export function StoneFinderTool() {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<StoneIntent | "">("");
  const [mood, setMood] = useState<StoneMood | "">("");
  const [lifeArea, setLifeArea] = useState<StoneLifeArea | "">("");
  const [energy, setEnergy] = useState<StoneEnergy | "egal" | "">("");
  const [zodiac, setZodiac] = useState("");

  const results = useMemo(() => {
    if (!intent || !mood || !lifeArea || !energy) return [];
    const answers: StoneQuizAnswers = {
      intent,
      mood,
      lifeArea,
      energy,
      zodiac: zodiac || undefined,
    };
    return findStones(answers);
  }, [intent, mood, lifeArea, energy, zodiac]);

  const top = results[0];
  const alternatives = results.slice(1);
  const progress = ((step + 1) / STEPS.length) * 100;
  const isResult = step === STEPS.length - 1;

  function canContinue() {
    if (step === 0) return Boolean(intent);
    if (step === 1) return Boolean(mood);
    if (step === 2) return Boolean(lifeArea);
    if (step === 3) return Boolean(energy);
    if (step === 4) return true;
    return false;
  }

  function next() {
    if (step < STEPS.length - 1 && canContinue()) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setStep(0);
    setIntent("");
    setMood("");
    setLifeArea("");
    setEnergy("");
    setZodiac("");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <Link href="/tools" className={backLink}>
        ← Zur Themenwahl
      </Link>

      <header className="space-y-4">
        <p className={eyebrow}>Tool · Stone Finder</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcher Stein unterstützt dich jetzt?
        </h1>
        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
          Fünf kurze Fragen zu Absicht, Stimmung, Lebensbereich und Energie –
          danach eine klare Empfehlung. Orientierung, kein medizinischer Rat.
        </p>
      </header>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-black/50 dark:text-white/50">
          <span>
            Schritt {step + 1} von {STEPS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Schritt ${step + 1} von ${STEPS.length}`}
          className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <section className={sectionCard}>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {STEPS[step].title}
        </h2>

        {step === 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STONE_INTENTS.map((i) => (
              <ChoiceButton
                key={i.value}
                active={intent === i.value}
                title={i.label}
                hint={i.hint}
                onClick={() => setIntent(i.value)}
              />
            ))}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STONE_MOODS.map((m) => (
              <ChoiceButton
                key={m.value}
                active={mood === m.value}
                title={m.label}
                hint={m.hint}
                onClick={() => setMood(m.value)}
              />
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STONE_LIFE_AREAS.map((a) => (
              <ChoiceButton
                key={a.value}
                active={lifeArea === a.value}
                title={a.label}
                hint={a.hint}
                onClick={() => setLifeArea(a.value)}
              />
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ChoiceButton
              active={energy === "sanft"}
              title="Sanft"
              hint="Weich, beruhigend, öffnend"
              onClick={() => setEnergy("sanft")}
            />
            <ChoiceButton
              active={energy === "kraftvoll"}
              title="Kraftvoll"
              hint="Erdend, aktivierend, klar"
              onClick={() => setEnergy("kraftvoll")}
            />
            <ChoiceButton
              active={energy === "egal"}
              title="Egal"
              hint="Hauptsache passend"
              onClick={() => setEnergy("egal")}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-6 space-y-3">
            <label htmlFor="stone-zodiac" className="block text-sm font-medium">
              Sternzeichen
            </label>
            <select
              id="stone-zodiac"
              name="zodiac"
              value={zodiac}
              onChange={(e) => setZodiac(e.target.value)}
              className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:border-white/15 dark:bg-black/20"
            >
              <option value="">Überspringen</option>
              {ZODIAC.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            <p className="text-sm text-black/50 dark:text-white/50">
              Optional – verbessert die Empfehlung leicht, ist aber kein Muss.
            </p>
          </div>
        ) : null}

        {isResult ? (
          <div className="mt-8 space-y-8" aria-live="polite">
            {top ? (
              <div className="rounded-[1.75rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-transparent p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  Deine Top‑Empfehlung
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {top.stone.name}
                </h3>
                <p className="mt-3 text-base leading-7 text-black/80 dark:text-white/80">
                  {top.stone.shortEffect}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-black/70 dark:text-white/70 sm:text-base">
                  {top.reasons.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-6 text-black/60 dark:text-white/60 sm:text-base">
                  <span className="font-medium text-black dark:text-white">
                    Anwendung:
                  </span>{" "}
                  {top.stone.howToUse}
                </p>
                <p className="mt-3 text-sm text-black/60 dark:text-white/60">
                  {top.stone.forWhom}
                </p>
              </div>
            ) : (
              <p className="text-base text-black/70 dark:text-white/70">
                Keine passende Empfehlung – starte das Quiz neu mit anderen
                Antworten.
              </p>
            )}

            {alternatives.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Auch passend
                </h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {alternatives.map(({ stone, reasons }) => (
                    <article
                      key={stone.id}
                      className="rounded-2xl border border-black/5 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/5"
                    >
                      <h4 className="text-lg font-semibold">{stone.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                        {stone.shortEffect}
                      </p>
                      <p className="mt-3 text-xs text-black/50 dark:text-white/50">
                        {reasons[0]}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={restart} className={btnSecondary}>
                Nochmal starten
              </button>
              <Link href="/freebie-auswahl" className={btnPrimary}>
                Kostenlosen Guide holen
              </Link>
            </div>
          </div>
        ) : null}

        {!isResult ? (
          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className={btnGhost}
            >
              Zurück
            </button>
            <button
              type="button"
              disabled={!canContinue()}
              onClick={next}
              className={btnPrimary}
            >
              {step === 4 ? "Ergebnis zeigen" : "Weiter"}
            </button>
          </div>
        ) : null}
      </section>

      <ToolFooterCta />
    </div>
  );
}
