import type { AstroProfileResult } from "@/lib/astro/profile";
import { AstroRadixChart } from "@/components/AstroRadixChart";
import { VollreportCoachingCta } from "@/components/VollreportCoachingCta";
import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import { signFromEclipticLongitude, symbolFromSign } from "@/lib/astro/signs";

const ELEMENT_BAR: Record<string, string> = {
  Feuer: "bg-orange-500/85",
  Erde: "bg-amber-800/75",
  Luft: "bg-sky-500/75",
  Wasser: "bg-blue-600/75",
};

function formatLongitudeDms(longitude: number) {
  const normalized = ((longitude % 360) + 360) % 360;
  const degTotal = normalized % 30;
  const deg = Math.floor(degTotal);
  const minFloat = (degTotal - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.round((minFloat - min) * 60);
  const secSafe = sec === 60 ? 59 : sec;
  return `${String(deg).padStart(2, "0")}°${String(min).padStart(2, "0")}'${String(secSafe).padStart(2, "0")}"`;
}

function objectCode(key: string): string {
  const map: Record<string, string> = {
    sun: "SU",
    moon: "MO",
    mercury: "ME",
    venus: "VE",
    mars: "MA",
    jupiter: "JU",
    saturn: "SA",
    uranus: "UR",
    neptune: "NE",
    pluto: "PL",
    north_node: "NN",
    south_node: "SN",
    chiron: "CH",
    lilith: "LI",
    part_of_fortune: "PF",
    asc: "AC",
    dsc: "DC",
    mc: "MC",
    ic: "IC",
  };
  return map[key] ?? key.slice(0, 2).toUpperCase();
}

function normalizeDegrees(deg: number) {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

function wholeSignHouseFromAsc(ascLon: number, pointLon: number) {
  const ascSignIndex = Math.floor(normalizeDegrees(ascLon) / 30);
  const pointSignIndex = Math.floor(normalizeDegrees(pointLon) / 30);
  return ((pointSignIndex - ascSignIndex + 12) % 12) + 1;
}

function signCoreKeyword(sign: string) {
  const map: Record<string, string> = {
    Widder: "direktem Vorwärtsdrang",
    Stier: "ruhiger Beständigkeit",
    Zwillinge: "geistiger Beweglichkeit",
    Krebs: "emotionaler Feinwahrnehmung",
    Löwe: "kreativer Strahlkraft",
    Jungfrau: "analytischer Präzision",
    Waage: "ausgleichender Beziehungsintelligenz",
    Skorpion: "tiefer Intensität",
    Schütze: "sinnorientierter Weite",
    Steinbock: "zielklarer Struktur",
    Wassermann: "unabhängiger Zukunftssicht",
    Fische: "intuitiver Durchlässigkeit",
  };
  return map[sign] ?? "eigener Kernenergie";
}

function signEmotionKeyword(sign: string) {
  const map: Record<string, string> = {
    Widder: "schnell, ehrlich und spontan",
    Stier: "ruhig, stabil und über Sicherheit",
    Zwillinge: "über Austausch und Verstehen",
    Krebs: "über Nähe, Vertrauen und Schutz",
    Löwe: "warmherzig und mit großem Ausdruck",
    Jungfrau: "über Ordnung, Klarheit und Sinnhaftigkeit",
    Waage: "über Harmonie und Beziehungsgleichgewicht",
    Skorpion: "tief, intensiv und transformierend",
    Schütze: "optimistisch, frei und zukunftsgerichtet",
    Steinbock: "kontrolliert, verlässlich und ernsthaft",
    Wassermann: "unabhängig, distanziert und geistig",
    Fische: "mitfühlend, weich und intuitiv",
  };
  return map[sign] ?? "auf eigene Weise";
}

function signAscKeyword(sign: string) {
  const map: Record<string, string> = {
    Widder: "aktiv, mutig und initiativ",
    Stier: "ruhig, verlässlich und bodenständig",
    Zwillinge: "wach, neugierig und kommunikativ",
    Krebs: "sensibel, beschützend und vorsichtig",
    Löwe: "präsent, kreativ und selbstbewusst",
    Jungfrau: "geordnet, aufmerksam und präzise",
    Waage: "freundlich, verbindend und diplomatisch",
    Skorpion: "intensiv, fokussiert und magnetisch",
    Schütze: "offen, optimistisch und freiheitsliebend",
    Steinbock: "ernsthaft, klar und verantwortungsvoll",
    Wassermann: "eigenständig, originell und unkonventionell",
    Fische: "weich, intuitiv und feinfühlig",
  };
  return map[sign] ?? "authentisch und eigen";
}

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
  const overviewRows = chart
    ? [
        ...profile.planets.map((p) => ({
          key: p.key,
          name: p.name,
          glyph: objectCode(p.key),
          dms: formatLongitudeDms(p.longitude),
          sign: p.sign,
          signSymbol: p.signSymbol,
          house: p.house,
        })),
        ...profile.specialPoints.map((p) => ({
          key: p.key,
          name: p.name,
          glyph: objectCode(p.key),
          dms: formatLongitudeDms(p.longitude),
          sign: p.sign,
          signSymbol: p.signSymbol,
          house: p.house,
        })),
        {
          key: "asc",
          name: "Aszendent",
          glyph: "AC",
          dms: formatLongitudeDms(chart.angles.asc),
          sign: signFromEclipticLongitude(chart.angles.asc),
          signSymbol: symbolFromSign(signFromEclipticLongitude(chart.angles.asc)),
          house: 1,
        },
        {
          key: "dsc",
          name: "Deszendent",
          glyph: "DC",
          dms: formatLongitudeDms(chart.angles.dsc),
          sign: signFromEclipticLongitude(chart.angles.dsc),
          signSymbol: symbolFromSign(signFromEclipticLongitude(chart.angles.dsc)),
          house: 7,
        },
        {
          key: "mc",
          name: "Medium Coeli",
          glyph: "MC",
          dms: formatLongitudeDms(chart.angles.mc),
          sign: signFromEclipticLongitude(chart.angles.mc),
          signSymbol: symbolFromSign(signFromEclipticLongitude(chart.angles.mc)),
          house: wholeSignHouseFromAsc(chart.angles.asc, chart.angles.mc),
        },
        {
          key: "ic",
          name: "Imum Coeli",
          glyph: "IC",
          dms: formatLongitudeDms(chart.angles.ic),
          sign: signFromEclipticLongitude(chart.angles.ic),
          signSymbol: symbolFromSign(signFromEclipticLongitude(chart.angles.ic)),
          house: wholeSignHouseFromAsc(chart.angles.asc, chart.angles.ic),
        },
      ]
    : [];
  const extraOrder = ["north_node", "south_node", "lilith", "part_of_fortune", "asc", "dsc", "mc", "ic"];
  const extraRows = extraOrder
    .map((k) => overviewRows.find((row) => row.key === k))
    .filter((row): row is NonNullable<(typeof overviewRows)[number]> => Boolean(row));
  const specialPointByKey = new Map<string, (typeof profile.specialPoints)[number]>(
    profile.specialPoints.map((p) => [p.key, p]),
  );
  const specialNotes: Record<string, string> = {
    north_node:
      "Entwicklungsrichtung: Dieses Haus zeigt, welche neuen Qualitäten du aktiv aufbauen solltest.",
    south_node:
      "Gewohnheitsmuster: Hier bist du sicher, kannst aber leicht im Alten stecken bleiben.",
    lilith:
      "Rohes Wahrheits-Thema: Wo du nichts beschonigen willst und klare innere Grenzen brauchst.",
    part_of_fortune:
      "Glückspunkt: Wenn du diese Qualität lebst, geht deine Energie in den erlösten Zustand – oft mit intensivem Flow, tiefer Erfüllung und einem Höhepunkt von Glücksgefühlen.",
    chiron:
      "Heilungsthema: Ein sensibler Bereich, der mit Zeit zu Stärke und Wissen reift.",
  };
  const angleNotes: Record<string, string> = {
    asc: "Aszendent: Deine unmittelbare Außenwirkung, dein spontaner Auftakt und die Art, wie du neue Situationen beginnst. Andere lesen darüber oft zuerst dein Temperament, deine Ausstrahlung und deinen natürlichen Grundmodus.",
    dsc: "Beziehungsstil: Welche Eigenschaften du in Partnerschaften suchst und aktivierst.",
    mc: "Berufungsachse: Wie du sichtbar wirst und wofür man dich öffentlich wahrnimmt.",
    ic: "Innere Basis: Was dir emotional Halt gibt und sich nach Zuhause anfühlt.",
  };
  const topHouse = profile.houseFocus[0];
  const secondHouse = profile.houseFocus[1];
  const northNode = profile.specialPoints.find((p) => p.key === "north_node");
  const southNode = profile.specialPoints.find((p) => p.key === "south_node");
  const lilith = profile.specialPoints.find((p) => p.key === "lilith");
  const fortune = profile.specialPoints.find((p) => p.key === "part_of_fortune");
  const coreSummary =
    sun && moon && ascSign
      ? `Im Kern wirkst du mit Sonne in ${sun.sign} aus ${signCoreKeyword(sun.sign)}. Emotional reagierst du mit Mond in ${moon.sign} eher ${signEmotionKeyword(moon.sign)}. Nach außen erscheinst du durch den Aszendenten in ${ascSign} meist ${signAscKeyword(ascSign)}.`
      : profile.narrative.summary;
  const lifeFocusSummary = topHouse
    ? `Dein stärkster Lebensfokus liegt aktuell in Haus ${topHouse.house} (${topHouse.theme}).${
        secondHouse
          ? ` Als zweiter Schwerpunkt zeigt sich Haus ${secondHouse.house} (${secondHouse.theme}).`
          : ""
      }`
    : profile.narrative.growthPath;
  const extraPointsSummary =
    northNode && southNode && lilith && fortune
      ? `Deine Entwicklungsachse läuft von Südknoten in ${southNode.sign} (Haus ${southNode.house}) hin zu Nordknoten in ${northNode.sign} (Haus ${northNode.house}): weg von alten Automatismen, hin zu bewusst gelebter Reifung. Lilith in ${lilith.sign} (Haus ${lilith.house}) zeigt, wo du kompromisslos echt sein willst. Der Glückspunkt in ${fortune.sign} (Haus ${fortune.house}) markiert den Bereich, in dem du am leichtesten in Flow, Erfüllung und innere Stimmigkeit kommst.`
      : profile.narrative.nodesInsight;

  return (
    <div id="vollreport" className="scroll-mt-24 space-y-6">
      <section
        className={`rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/16 via-violet-500/10 to-fuchsia-500/10 ${pad} dark:border-violet-400/30 dark:from-violet-500/25 dark:via-violet-500/18 dark:to-fuchsia-500/16`}
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
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/18 px-4 py-2 text-sm font-semibold text-violet-950 dark:border-violet-400/40 dark:bg-violet-500/25 dark:text-violet-50">
              Sonne: {sun.sign}
              <ZodiacSignIcon sign={sun.sign} sizeClassName="h-5 w-5" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/18 px-4 py-2 text-sm font-semibold text-violet-950 dark:border-violet-400/40 dark:bg-violet-500/25 dark:text-violet-50">
              Mond: {moon.sign}
              <ZodiacSignIcon sign={moon.sign} sizeClassName="h-5 w-5" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/18 px-4 py-2 text-sm font-semibold text-violet-950 dark:border-violet-400/40 dark:bg-violet-500/25 dark:text-violet-50">
              Aszendent: {ascSign}
              <ZodiacSignIcon sign={ascSign} sizeClassName="h-5 w-5" />
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

      {overviewRows.length ? (
        <section
          className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
        >
          <h3 className="text-xl font-semibold tracking-tight">Astrologische Übersicht</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Alle relevanten Positionen auf einen Blick: Grad, Zeichen und Haus.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] dark:border-violet-400/20 dark:bg-violet-500/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-black/[0.03] text-xs uppercase tracking-wide text-black/60 dark:bg-white/[0.06] dark:text-white/60">
                <tr>
                  <th className="px-3 py-2 font-semibold">Objekt</th>
                  <th className="px-3 py-2 font-semibold">Grad</th>
                  <th className="px-3 py-2 font-semibold">Zeichen</th>
                  <th className="px-3 py-2 font-semibold">Haus</th>
                </tr>
              </thead>
              <tbody>
                {overviewRows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-t border-black/8 dark:border-white/10"
                  >
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-xs font-semibold">{row.glyph}</span>
                        <span>{row.name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2 tabular-nums">{row.dms}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <ZodiacSignIcon sign={row.sign} sizeClassName="h-5 w-5" />
                        <span>{row.sign}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2">Haus {row.house}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {extraRows.length ? (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
                Erweiterte zusätzliche Punkte
              </h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {extraRows.map((row) => {
                  const specialPoint = specialPointByKey.get(row.key);
                  const note =
                    specialNotes[row.key] ??
                    specialPoint?.note ??
                    angleNotes[row.key] ??
                    null;
                  return (
                    <article
                      key={`extra-${row.key}`}
                      className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm dark:border-white/15 dark:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="shrink-0 text-xl font-semibold" aria-hidden>
                          {row.glyph}
                        </span>
                        <ZodiacSignIcon sign={row.sign} sizeClassName="h-9 w-9" />
                        <div className="min-w-0">
                          <p className="font-medium leading-tight">{row.name}</p>
                          <p className="text-xs text-black/60 dark:text-white/60">
                            {row.sign} · {row.dms}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-black/65 dark:text-white/65">
                        Haus {row.house}
                      </p>
                      {note ? (
                        <p className="mt-2 text-xs text-black/55 dark:text-white/55">
                          {note}
                        </p>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null}
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
        <h3 className="text-xl font-semibold tracking-tight">Gesamtbild</h3>
        <p className="mt-3 text-sm text-black/75 dark:text-white/75">
          {coreSummary}
        </p>
        <p className="mt-2 text-sm text-black/75 dark:text-white/75">
          {lifeFocusSummary}
        </p>
      </section>

      <section
        className={`rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/5 ${pad}`}
      >
        <h3 className="text-xl font-semibold tracking-tight">
          Knoten, Lilith & Glückspunkt
        </h3>
        <div className="mt-4 space-y-3 text-sm text-black/75 dark:text-white/75">
          <p>{extraPointsSummary}</p>
          {profile.narrative.chironInsight ? (
            <p>{profile.narrative.chironInsight}</p>
          ) : null}
        </div>
      </section>

      <VollreportCoachingCta />
    </div>
  );
}
