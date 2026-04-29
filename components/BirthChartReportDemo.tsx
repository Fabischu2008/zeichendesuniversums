import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import { ELEMENT_BY_SIGN, type Element } from "@/lib/astro/profile";
import type { ZodiacSign } from "@/lib/astro/signs";

const ELEMENT_BAR: Record<Element, string> = {
  Feuer: "bg-orange-500/85",
  Erde: "bg-amber-800/75",
  Luft: "bg-sky-500/75",
  Wasser: "bg-blue-600/75",
};

function elementMixFromBig3(sun: ZodiacSign, moon: ZodiacSign, asc: ZodiacSign) {
  const counts: Record<Element, number> = {
    Feuer: 0,
    Erde: 0,
    Luft: 0,
    Wasser: 0,
  };
  for (const s of [sun, moon, asc]) {
    counts[ELEMENT_BY_SIGN[s]] += 1;
  }
  const total = 3;
  return (Object.keys(counts) as Element[]).map((element) => ({
    element,
    percentage: Math.round((counts[element] / total) * 100),
    count: counts[element],
  }));
}

export function BirthChartReportDemo({
  sun,
  moon,
  ascendant,
}: {
  sun: ZodiacSign;
  moon: ZodiacSign;
  ascendant: ZodiacSign;
}) {
  const mix = elementMixFromBig3(sun, moon, ascendant);

  return (
    <div className="relative mt-8 space-y-6">
      <div className="mb-2 flex justify-start sm:mb-0 sm:pointer-events-none sm:absolute sm:inset-0 sm:z-10 sm:items-start sm:justify-end sm:p-3">
        <span className="rounded-full border border-black/15 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/60 shadow-sm backdrop-blur-sm dark:border-white/20 dark:bg-black/70 dark:text-white/70">
          Demo · keine echten Profiltexte
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-dashed border-black/20 bg-black/[0.02] p-4 opacity-[0.92] dark:border-white/25 dark:bg-white/[0.03] sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.03)_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.04)_100%)]"
        />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          So könnte dein Vollreport aussehen
        </p>
        <p className="mt-2 text-sm text-black/65 dark:text-white/65">
          Nur zur Orientierung – echte Deutungstexte, Häuser und alle Planeten
          gibt es nach dem Kauf inkl. persönlichem Zugangslink.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-black/10 pb-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <ZodiacSignIcon sign={sun} sizeClassName="h-12 w-12" />
            <div>
              <p className="text-xs text-black/50 dark:text-white/50">Sonne</p>
              <p className="font-medium">{sun}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ZodiacSignIcon sign={moon} sizeClassName="h-12 w-12" />
            <div>
              <p className="text-xs text-black/50 dark:text-white/50">Mond</p>
              <p className="font-medium">{moon}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ZodiacSignIcon sign={ascendant} sizeClassName="h-12 w-12" />
            <div>
              <p className="text-xs text-black/50 dark:text-white/50">Aszendent</p>
              <p className="font-medium">{ascendant}</p>
            </div>
          </div>
        </div>

        <section className="mt-4 rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
          <h3 className="text-sm font-semibold tracking-tight">Radix (Beispielansicht)</h3>
          <p className="mt-1 text-xs text-black/50 dark:text-white/50">
            Im Vollreport siehst du dein persönliches Radix mit Häusern und Planetenpositionen.
          </p>
          <div className="mt-3 flex items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-sky-500/[0.06] to-amber-500/[0.08] p-3 dark:border-violet-300/20 dark:from-violet-500/10 dark:via-sky-500/10 dark:to-amber-500/10">
            <svg
              viewBox="0 0 240 240"
              className="h-auto w-full max-w-[280px] text-black/75 dark:text-white/75"
              role="img"
              aria-label="Beispiel-Radix"
            >
              <defs>
                <radialGradient id="radixGlow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="120" cy="120" r="108" fill="url(#radixGlow)" />
              <circle cx="120" cy="120" r="102" fill="none" stroke="currentColor" opacity="0.45" />
              <circle cx="120" cy="120" r="92" fill="none" stroke="currentColor" opacity="0.18" />
              <circle cx="120" cy="120" r="80" fill="none" stroke="currentColor" opacity="0.24" />
              <circle cx="120" cy="120" r="56" fill="none" stroke="currentColor" opacity="0.2" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 120 + Math.cos(a) * 102;
                const y1 = 120 + Math.sin(a) * 102;
                const x2 = 120 + Math.cos(a) * 56;
                const y2 = 120 + Math.sin(a) * 56;
                return (
                  <line
                    key={`radix-line-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    opacity="0.26"
                  />
                );
              })}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = ((i * 30 + 15) - 90) * (Math.PI / 180);
                const x = 120 + Math.cos(a) * 91;
                const y = 120 + Math.sin(a) * 91;
                return (
                  <circle
                    key={`radix-dot-${i}`}
                    cx={x}
                    cy={y}
                    r="1.6"
                    fill="currentColor"
                    opacity="0.38"
                  />
                );
              })}
              {["☉", "☽", "☿", "♀", "♂", "♃", "♄"].map((g, i) => {
                const a = ((i * 43 + 8) - 90) * (Math.PI / 180);
                const x = 120 + Math.cos(a) * 70;
                const y = 120 + Math.sin(a) * 70;
                return (
                  <g key={`radix-glyph-${g}-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="10.5"
                      fill="currentColor"
                      opacity="0.1"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="13.5"
                      fill="currentColor"
                      opacity="0.82"
                    >
                      {g}
                    </text>
                  </g>
                );
              })}
              <text
                x="120"
                y="120"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="currentColor"
                opacity="0.45"
              >
                RADIX
              </text>
            </svg>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-amber-500/10 p-4 dark:border-white/10">
          <p className="text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
            Archetyp (Auszug im Vollreport)
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-black/45 dark:text-white/50">
            Platzhalter-Überschrift – im Vollreport personalisiert
          </p>
          <p className="mt-2 text-sm text-black/55 dark:text-white/55">
            Hier steht später dein ausformulierter roter Faden aus Sonne, Mond,
            Aszendent und allen Planeten – nicht sichtbar in der Demo.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
          <h3 className="text-sm font-semibold tracking-tight">
            Element-Mix (vereinfacht aus Big 3)
          </h3>
          <p className="mt-1 text-xs text-black/50 dark:text-white/50">
            Nur grobe Verteilung – der Vollreport nutzt dein komplettes Chart.
          </p>
          <div className="mt-4 space-y-3">
            {mix.map((e) => (
              <div key={e.element}>
                <div className="flex items-center justify-between text-xs text-black/70 dark:text-white/70">
                  <span className="font-medium">{e.element}</span>
                  <span>
                    {e.percentage}% · {e.count}/3
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full ${ELEMENT_BAR[e.element]}`}
                    style={{ width: `${e.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
          <h3 className="text-sm font-semibold tracking-tight">Häuser-Schwerpunkte</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              { h: "1", t: "Ich & Auftritt" },
              { h: "4", t: "Wurzeln" },
              { h: "7", t: "Beziehung" },
            ].map((x) => (
              <div
                key={x.h}
                className="rounded-xl border border-black/10 bg-black/[0.02] p-3 text-sm dark:border-white/15 dark:bg-white/5"
              >
                <p className="text-xs text-black/50 dark:text-white/50">Haus {x.h}</p>
                <p className="mt-1 font-medium text-black/40 dark:text-white/40">{x.t}</p>
                <p className="mt-1 text-xs text-black/35 dark:text-white/35">…</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
          <h3 className="text-sm font-semibold tracking-tight">Planeten im Horoskop</h3>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {["☉", "☽", "☿", "♀", "♂", "♃"].map((g, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] text-xl text-black/25 dark:border-white/15 dark:bg-white/5 dark:text-white/25"
              >
                {g}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-black/45 dark:text-white/45">
            Im Kaufprofil: alle Planeten mit Zeichen, Grad und Haus – lesbar.
          </p>
        </section>
      </div>
    </div>
  );
}
