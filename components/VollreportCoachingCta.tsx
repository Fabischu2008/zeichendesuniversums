import Link from "next/link";

export const VOLLREPORT_CTA_READING_HREF = "/reading";
export const VOLLREPORT_CTA_COACHING_HREF = "/coaching";

export function VollreportCoachingCta({
  context = "astro",
}: {
  context?: "astro" | "relationship";
}) {
  const eyebrow =
    context === "relationship" ? "Nach der Paaranalyse" : "Nach dem Horoskop";
  const body =
    context === "relationship"
      ? "Wenn du die Dynamik persönlich durchgehen willst: das Reading zu Geburtshoroskop und Energieflüssen – oder ein Erstgespräch fürs Coaching."
      : "Die Chart-Ansicht ist der Startpunkt. Im Reading gehen wir Geburtshoroskop und Energieflüsse durch und du nimmst einen konkreten nächsten Schritt mit.";

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.12] via-white to-violet-500/10 p-6 shadow-sm dark:from-emerald-500/15 dark:via-white/[0.04] dark:to-violet-500/10 sm:p-8"
      aria-labelledby="vollreport-coaching-cta-heading"
    >
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-500/15" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-200">
          {eyebrow}
        </p>
        <h2
          id="vollreport-coaching-cta-heading"
          className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Persönlich vertiefen
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/75 dark:text-white/75">
          {body}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={VOLLREPORT_CTA_READING_HREF}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Reading buchen
          </Link>
          <Link
            href={VOLLREPORT_CTA_COACHING_HREF}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/12 bg-white/90 px-6 text-sm font-medium text-black hover:bg-black/5 sm:w-auto dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Coaching anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
