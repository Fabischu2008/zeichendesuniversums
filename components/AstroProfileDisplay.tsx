import type { AstroProfileResult } from "@/lib/astro/profile";
import { AstroRadixChart } from "@/components/AstroRadixChart";
import { VollreportCoachingCta } from "@/components/VollreportCoachingCta";
import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import { signFromEclipticLongitude } from "@/lib/astro/signs";

const ELEMENT_BAR: Record<string, string> = {
  Feuer: "bg-orange-500/85",
  Erde: "bg-amber-800/75",
  Luft: "bg-sky-500/75",
  Wasser: "bg-blue-600/75",
};

export function AstroProfileDisplay({
  profile,
  variant = "page",
}: {
  profile: AstroProfileResult;
  variant?: "page" | "embedded";
}) {
  const pad = variant === "page" ? "p-6 sm:p-8" : "p-4 sm:p-5";
  const chart = (profile as AstroProfileResult & { chart?: AstroProfileResult["chart"] })
    .chart;
  const sun = profile.planets.find((p) => p.key === "sun");
  const moon = profile.planets.find((p) => p.key === "moon");
  const ascSign = chart
    ? signFromEclipticLongitude(chart.angles.asc)
    : null;

  return (
    <div id="vollreport" className="scroll-mt-24 space-y-6">
      <section
        className={`rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 ${pad} dark:border-white/10`}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
          Astro-Archetyp
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {profile.archetype.title}
        </h2>
        <p className="mt-2 text-sm text-black/75 dark:text-white/75">
          {profile.archetype.subtitle}
        </p>
        {sun && moon && ascSign ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/80 px-3 py-1 text-xs font-semibold dark:border-white/20 dark:bg-black/30">
              <ZodiacSignIcon sign={sun.sign} sizeClassName="h-4 w-4" />
              Sonne: {sun.sign}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/80 px-3 py-1 text-xs font-semibold dark:border-white/20 dark:bg-black/30">
              <ZodiacSignIcon sign={moon.sign} sizeClassName="h-4 w-4" />
              Mond: {moon.sign}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/80 px-3 py-1 text-xs font-semibold dark:border-white/20 dark:bg-black/30">
              <ZodiacSignIcon sign={ascSign} sizeClassName="h-4 w-4" />
              Aszendent: {ascSign}
            </span>
          </div>
        ) : null}
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          {profile.meta.model}
        </p>
      </section>

      {chart ? (
        <section
          className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
        >
          <h3 className="text-xl font-semibold tracking-tight">Dein Chart</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Radix-Darstellung mit Whole-Sign-Häusern, Planeten und sensitiven Punkten.
          </p>
          <div className="mt-6 flex justify-center">
            <AstroRadixChart chart={chart} />
          </div>
        </section>
      ) : null}

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">Elemente-Mix</h3>
        <div className="mt-4 space-y-3">
          {profile.elementBalance.map((e) => (
            <div key={e.element}>
              <div className="flex items-center justify-between text-xs text-black/70 dark:text-white/70">
                <span className="font-medium">{e.element}</span>
                <span>
                  {e.percentage}% · {e.count}/{profile.planets.length}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${ELEMENT_BAR[e.element] ?? "bg-black/40"}`}
                  style={{ width: `${e.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-black/8 pt-8 dark:border-white/10">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
            Element-Analyse
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
            {profile.elementAnalysis.intro}
          </p>
          <div className="mt-6 space-y-8">
            {profile.elementAnalysis.blocks.map((block) => (
              <div key={block.element}>
                <p className="text-sm font-semibold text-black dark:text-white">
                  {block.title}
                  <span className="ml-2 font-normal text-black/50 dark:text-white/50">
                    ({block.count} Planet{block.count === 1 ? "" : "en"} ·{" "}
                    {block.percentage}%)
                  </span>
                </p>
                <div className="mt-2 space-y-2 text-sm leading-relaxed text-black/75 dark:text-white/75">
                  {block.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">
          Häuser-Schwerpunkte
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {profile.houseFocus.map((h) => (
            <div
              key={h.house}
              className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm dark:border-white/15 dark:bg-white/5"
            >
              <p className="text-xs text-black/60 dark:text-white/60">
                Haus {h.house}
              </p>
              <p className="mt-1 font-medium">{h.theme}</p>
              <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                {h.count} Planet{h.count === 1 ? "" : "en"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">Profilkern</h3>
        <p className="mt-3 text-sm text-black/75 dark:text-white/75">
          {profile.narrative.summary}
        </p>
        <p className="mt-2 text-sm text-black/75 dark:text-white/75">
          {profile.narrative.relationshipStyle}
        </p>
        <p className="mt-2 text-sm text-black/75 dark:text-white/75">
          {profile.narrative.growthPath}
        </p>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">
          Knoten, Lilith & Glückspunkt
        </h3>
        <div className="mt-4 space-y-3 text-sm text-black/75 dark:text-white/75">
          <p>{profile.narrative.nodesInsight}</p>
          <p>{profile.narrative.lilithInsight}</p>
          <p>{profile.narrative.fortuneInsight}</p>
          {profile.narrative.chironInsight ? (
            <p>{profile.narrative.chironInsight}</p>
          ) : null}
        </div>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">Planeten</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.planets.map((p) => (
            <div
              key={p.key}
              className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm dark:border-white/15 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-2xl tabular-nums" aria-hidden>
                  {p.glyph}
                </span>
                <ZodiacSignIcon sign={p.sign} sizeClassName="h-9 w-9" />
                <div className="min-w-0">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    {p.sign} · {p.degreeInSign}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-black/65 dark:text-white/65">
                {p.element} · Haus {p.house}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">
          Zusätzliche Punkte
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.specialPoints.map((p) => (
            <div
              key={p.key}
              className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm dark:border-white/15 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-xl" aria-hidden>
                  {p.glyph}
                </span>
                <ZodiacSignIcon sign={p.sign} sizeClassName="h-9 w-9" />
                <div className="min-w-0">
                  <p className="font-medium leading-tight">{p.name}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    {p.sign} · {p.degreeInSign}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-black/65 dark:text-white/65">
                {p.element} · Haus {p.house}
              </p>
              {p.note ? (
                <p className="mt-2 text-xs text-black/55 dark:text-white/55">
                  {p.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <VollreportCoachingCta />
    </div>
  );
}
