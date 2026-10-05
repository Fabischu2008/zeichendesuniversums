/**
 * Zentrale Klassen-Tokens für ein einheitliches Erscheinungsbild.
 *
 * Regeln:
 * - Primär-Aktion ist immer violet-700 (entspricht THEME_COLOR in lib/brand.ts)
 * - Interaktive Elemente sind mindestens 44px hoch (h-11 / h-12)
 * - Sektionen `rounded-3xl`, Karten `rounded-2xl`, Buttons `rounded-full`
 */

export const btnBase =
  "inline-flex items-center justify-center rounded-full px-6 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

export const btnPrimary = `${btnBase} h-12 bg-violet-700 text-white hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-500`;

export const btnSecondary = `${btnBase} h-12 border border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10`;

export const btnGhost = `${btnBase} h-11 px-4 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white`;

/** Große Inhaltssektion mit weicher Fläche. */
export const sectionCard =
  "rounded-3xl border border-black/5 bg-white/60 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5";

/** Kleinere Karte innerhalb einer Sektion. */
export const card =
  "rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5";

/** Kleines Label über der Überschrift. */
export const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300";

/** Zurück-Link am Anfang einer Tool-Seite. */
export const backLink =
  "inline-block rounded-full text-sm text-black/55 outline-none transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:text-white/55 dark:hover:text-white";

/** Textlink im Fließtext. */
export const inlineLink =
  "font-medium text-violet-800 underline-offset-4 hover:underline dark:text-violet-200";

/** Auswahl-Button in Quizzes/Wizards. */
export function choiceButton(active: boolean): string {
  return [
    "rounded-2xl border px-5 py-4 text-left transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60",
    active
      ? "border-violet-700 bg-violet-700 text-white dark:border-violet-500 dark:bg-violet-600"
      : "border-black/10 bg-white hover:border-black/20 hover:bg-black/[0.03] dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10",
  ].join(" ");
}
