import type { AstroProfileResult } from "@/lib/astro/profile";
import { AstroRadixChart } from "@/components/AstroRadixChart";
import { VollreportCoachingCta } from "@/components/VollreportCoachingCta";
import { ZodiacSignIcon } from "@/components/ZodiacSignIcon";
import {
  signFromEclipticLongitude,
  symbolFromSign,
  type ZodiacSign,
} from "@/lib/astro/signs";

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

/** Chiron („weißer Lehrer“) im Kontext des Zeichens, in dem Chiron steht. */
function chironSignExplanation(sign: string): string {
  const map: Record<ZodiacSign, string> = {
    Widder:
      "In Widder wirkt dein Lehrer-Thema über Mut, Neuanfang und klare Grenzen: aus Verletzlichkeit wird oft eine ehrliche, direkte Art, andere zu stärken.",
    Stier:
      "In Stier zeigt sich Chiron über Werte, Nähe und Sicherheit: aus Unsicherheit wird oft ein feines Gespür dafür, was wirklich trägt – und wie man Ruhe schenkt.",
    Zwillinge:
      "In Zwillinge liegt das Thema in Worten, Lernen und Perspektiven: aus Missverständnissen wird oft ein Geschenk für klare, beruhigende Kommunikation.",
    Krebs:
      "In Krebs berührt Chiron Zuhause, Bindung und Verletzlichkeit: aus Rückzug wird oft eine warme Fähigkeit, emotionale Sicherheit für andere zu halten.",
    Löwe:
      "In Löwe geht es um Sichtbarkeit, Selbstwert und Herz: aus dem Gefühl, nicht gesehen zu werden, kann eine großzügige Art wachsen, andere wirklich zu feiern.",
    Jungfrau:
      "In Jungfrau zeigt sich das Muster im Alltag, im Körper und in der Hilfe: aus Kritik an sich selbst wird oft ein präziser, heilsamer Dienst an Klarheit und Gesundheit.",
    Waage:
      "In Waage spielt Chiron in Beziehung, Fairness und Harmonie: aus Unausgewogenheit wird oft ein feines Talent für Ausgleich – ohne dich selbst zu verlieren.",
    Skorpion:
      "In Skorpion berührt Chiron Vertrauen, Tiefe und Wandlung: aus Intensität wird oft eine ruhige Kraft, Tabus sanft zu benennen und echte Nähe zu ermöglichen.",
    Schütze:
      "In Schütze liegt das Thema bei Sinn, Freiheit und Wahrheit: aus Enttäuschung wird oft ein offener Blick, der anderen Orientierung und Hoffnung geben kann.",
    Steinbock:
      "In Steinbock zeigt sich Chiron über Verantwortung, Zeit und Ziele: aus Druck wird oft eine reife Art, Strukturen zu bauen, die Menschen langfristig tragen.",
    Wassermann:
      "In Wassermann geht es um Eigenständigkeit und Zukunft: aus Distanz wird oft ein klarer, humaner Blick für das Besondere – und dafür, ausgeschlossen zu werden.",
    Fische:
      "In Fische berührt Chiron Grenzenlosigkeit und Mitgefühl: aus Überforderung kann eine sanfte Weisheit wachsen, die andere intuitiv beruhigt und trägt.",
  };
  return map[sign as ZodiacSign] ?? `In ${sign} verbindet sich dein Chiron-Thema mit dem Qualitätsfeld dieses Zeichens: sensibel, persönlich und im Laufe der Zeit immer deutlicher erkennbar.`;
}

/** Nordknoten: Aufgabenpol im jeweiligen Zeichen (in dem der NK steht). */
function northNodeSignExplanation(sign: string): string {
  const map: Record<ZodiacSign, string> = {
    Widder:
      "In Widder geht es ums mutige Anfangen, klare Kanten und ehrliche Initiative – du darfst lernen, dich sichtbar zu behaupten, ohne alles sofort retten zu müssen.",
    Stier:
      "In Stier geht es um Beständigkeit, Werte und sinnliche Sicherheit – du darfst Stabilität aufbauen, ohne dich in Besitzdenken oder Starrheit zu verlieren.",
    Zwillinge:
      "In Zwillinge geht es um Neugier, Austausch und bewegliche Gedanken – du darfst dich intellektuell öffnen, ohne dich im oberflächlichen Getriebe zu verlieren.",
    Krebs:
      "In Krebs geht es um Nähe, Schutz und emotionale Tiefe – du darfst Bindung wagen, ohne dich nur noch um andere zu kreisen.",
    Löwe:
      "In Löwe geht es um Herz, Ausdruck und Selbstwert – du darfst strahlen und spielerisch führen, ohne Stolz zur Panzerung zu machen.",
    Jungfrau:
      "In Jungfrau geht es um Klarheit, Alltagstauglichkeit und heilsame Verbesserung – du darfst Ordnung schaffen, ohne dich im Perfektionismus zu erschöpfen.",
    Waage:
      "In Waage geht es um Beziehung, Fairness und stimmige Balance – du darfst verbinden und verhandeln, ohne Harmonie um jeden Preis zu kaufen.",
    Skorpion:
      "In Skorpion geht es um Vertrauen, Intensität und echte Wandlung – du darfst Tiefe gehen, ohne Kontrolle als einzigen Schutz zu nehmen.",
    Schütze:
      "In Schütze geht es um Sinn, Weite und ehrliche Orientierung – du darfst visionär werden, ohne aus Verbindlichkeit auszusteigen.",
    Steinbock:
      "In Steinbock geht es um Reife, Verantwortung und langfristigen Aufbau – du darfst Grenzen setzen, ohne Gefühle komplett einzufrieren.",
    Wassermann:
      "In Wassermann geht es um Eigenständigkeit, Perspektivwechsel und Gemeinschaft – du darfst anders denken, ohne dich emotional komplett abzuschotten.",
    Fische:
      "In Fische geht es um Mitgefühl, Intuition und Loslassen – du darfst weich und verbunden sein, ohne Grenzen komplett zu verwischen.",
  };
  return (
    map[sign as ZodiacSign] ??
    `In ${sign} zeigt sich dein Aufgabenpol über die Kernqualitäten dieses Zeichens – persönlich und im Laufe der Zeit immer klarer erkennbar.`
  );
}

/** Südknoten: Komfortpol im jeweiligen Zeichen (in dem der SK steht). */
function southNodeSignExplanation(sign: string): string {
  const map: Record<ZodiacSign, string> = {
    Widder:
      "In Widder kennst du impulsiven Drive und schnelles Handeln gut – das kann trösten, wird aber leicht zur Gewohnheit; der Südknoten erinnert daran, nicht nur im Not-Modus zu leben.",
    Stier:
      "In Stier kennst du Sicherheit, Genuss und Beständigkeit gut – das gibt Halt, kann aber zu Festhalten führen, wenn Veränderung nötig wird.",
    Zwillinge:
      "In Zwillinge kennst du mentale Beweglichkeit und viele Kontakte gut – das macht leicht, kann aber innerlich unruhig werden, wenn Tiefe fehlt.",
    Krebs:
      "In Krebs kennst du Fürsorge, Rückzug und emotionale Intuition gut – das schützt, kann aber zu Überidentifikation mit „für andere da sein“ werden.",
    Löwe:
      "In Löwe kennst du Herz, Präsenz und Selbstausdruck gut – das stärkt, kann aber zu dramatischer Abhängigkeit von Anerkennung werden.",
    Jungfrau:
      "In Jungfrau kennst du Analyse, Hilfe und Verbesserung gut – das dient, kann aber zu Dauer-Kontrolle und Selbstkritik werden.",
    Waage:
      "In Waage kennst du Diplomatie, Harmonie und Paarbezug gut – das verbindet, kann aber zu Konfliktvermeidung und Außenorientierung werden.",
    Skorpion:
      "In Skorpion kennst du Tiefe, Loyalität und Intensität gut – das bindet stark, kann aber zu Misstrauen oder emotionaler Enge werden.",
    Schütze:
      "In Schütze kennst du Freiheit, Humor und Sinn gut – das erweitert, kann aber zu Flucht vor Verbindlichkeit werden.",
    Steinbock:
      "In Steinbock kennst du Pflicht, Kontrolle und langen Atem gut – das trägt, kann aber zu emotionaler Härte und Funktionieren werden.",
    Wassermann:
      "In Wassermann kennst du Distanz, Ideen und Unabhängigkeit gut – das klärt, kann aber zu innerer Isolation werden.",
    Fische:
      "In Fische kennst du Einfühlung, Auflösung und Intuition gut – das öffnet, kann aber zu Grenzenlosigkeit und Übernahme fremder Stimmungen werden.",
  };
  return (
    map[sign as ZodiacSign] ??
    `In ${sign} liegen dir vertraute Muster besonders nah – hilfreich als Ressource, nicht als einziger Ort, an dem du bleiben musst.`
  );
}

function moonNodeCalculationHint(): string {
  return "Berechnung: mittlerer Mondknoten (ekliptikal), Whole-Sign-Häuser.";
}

function houseFieldHint(house: number): string {
  const map: Record<number, string> = {
    1: "Identität, Auftreten und Selbstführung",
    2: "Werte, Sicherheit und Selbstwert",
    3: "Denken, Lernen und Kommunikation",
    4: "Zuhause, Herkunft und innere Basis",
    5: "Kreativität, Freude und Herz-Ausdruck",
    6: "Alltag, Gesundheit und hilfreiche Struktur",
    7: "Beziehung, Spiegelung und Bindung",
    8: "Tiefe Prozesse, Vertrauen und Wandlung",
    9: "Sinn, Weltbild und Perspektive",
    10: "Berufung, Sichtbarkeit und Richtung",
    11: "Netzwerk, Gemeinschaft und Vision",
    12: "Rückzug, Unterbewusstes und Regeneration",
  };
  return map[house] ?? "zentrale Lebensdynamik";
}

function lilithSignExplanation(sign: string): string {
  const map: Record<ZodiacSign, string> = {
    Widder: "Lilith in Widder will ungefilterte Ehrlichkeit und klare Selbstbehauptung.",
    Stier: "Lilith in Stier fordert verkörperte Werte, Grenzen und echte Selbstachtung.",
    Zwillinge: "Lilith in Zwillinge fordert unzensierte Sprache und geistige Eigenständigkeit.",
    Krebs: "Lilith in Krebs fordert emotionalen Selbstschutz ohne Schuldgefühl.",
    Löwe: "Lilith in Löwe fordert authentischen Selbstausdruck statt Anpassungs-Performance.",
    Jungfrau: "Lilith in Jungfrau fordert Klarheit ohne Selbstabwertung und Dauerkritik.",
    Waage: "Lilith in Waage fordert Beziehung auf Augenhöhe statt Harmoniedruck.",
    Skorpion: "Lilith in Skorpion fordert radikale Wahrhaftigkeit in Nähe und Vertrauen.",
    Schütze: "Lilith in Schütze fordert gelebte Wahrheit statt gefälliger Weltbilder.",
    Steinbock: "Lilith in Steinbock fordert souveräne Grenzen gegen Pflicht-Übergriff.",
    Wassermann: "Lilith in Wassermann fordert Freiheit, Anderssein und innere Unabhängigkeit.",
    Fische: "Lilith in Fische fordert klare energetische Grenzen bei offenem Mitgefühl.",
  };
  return map[sign as ZodiacSign] ?? `Lilith in ${sign} fordert kompromisslose Ehrlichkeit mit deinem inneren Kompass.`;
}

function fortuneSignExplanation(sign: string): string {
  const map: Record<ZodiacSign, string> = {
    Widder: "Flow entsteht durch mutigen Start, direkte Entscheidungen und Handlung.",
    Stier: "Flow entsteht durch Ruhe, Qualität, Körperbezug und wertige Kontinuität.",
    Zwillinge: "Flow entsteht durch Austausch, Lernen, Schreiben und bewegliches Denken.",
    Krebs: "Flow entsteht durch emotionale Sicherheit, Bindung und nährende Räume.",
    Löwe: "Flow entsteht durch Herz, Kreativität, Spiel und sichtbaren Ausdruck.",
    Jungfrau: "Flow entsteht durch sinnvolle Ordnung, Präzision und praktische Hilfe.",
    Waage: "Flow entsteht durch Kooperation, Schönheit, Fairness und gute Abstimmung.",
    Skorpion: "Flow entsteht durch Tiefe, Fokus, Transformationsbereitschaft und Wahrheit.",
    Schütze: "Flow entsteht durch Sinn, Vision, Weite und inspirierende Perspektive.",
    Steinbock: "Flow entsteht durch Verantwortung, Struktur, Timing und Verlässlichkeit.",
    Wassermann: "Flow entsteht durch Innovation, Freiheit, Netzwerk und neue Ideen.",
    Fische: "Flow entsteht durch Intuition, Mitgefühl, Kreativität und inneres Vertrauen.",
  };
  return map[sign as ZodiacSign] ?? `Flow zeigt sich bei ${sign}, wenn du die Kernqualität dieses Zeichens bewusst lebst.`;
}

function angleSignExplanation(key: string, sign: string): string {
  if (key === "asc") {
    return `Mit AC in ${sign} wirkst du im Erstkontakt oft ${signAscKeyword(sign)}.`;
  }
  if (key === "dsc") {
    return `Mit DC in ${sign} suchst du in Beziehungen besonders ${signAscKeyword(sign)}e Qualitäten als Gegenpol.`;
  }
  if (key === "mc") {
    return `Mit MC in ${sign} wird deine berufliche Sichtbarkeit über ${signCoreKeyword(sign)} geprägt.`;
  }
  return `Mit IC in ${sign} findest du innere Stabilität über ${signEmotionKeyword(sign)}e Selbstregulation.`;
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
  const extraOrder = [
    "north_node",
    "south_node",
    "lilith",
    "part_of_fortune",
    "chiron",
    "asc",
    "dsc",
    "mc",
    "ic",
  ];
  const extraRows = extraOrder
    .map((k) => overviewRows.find((row) => row.key === k))
    .filter((row): row is NonNullable<(typeof overviewRows)[number]> => Boolean(row));
  const specialPointByKey = new Map<string, (typeof profile.specialPoints)[number]>(
    profile.specialPoints.map((p) => [p.key, p]),
  );
  const specialNotes: Record<string, string> = {
    lilith:
      "Rohes Wahrheits-Thema: Wo du nichts beschonigen willst und klare innere Grenzen brauchst.",
    part_of_fortune:
      "Glückspunkt: Wenn du diese Qualität lebst, geht deine Energie in den erlösten Zustand – oft mit intensivem Flow, tiefer Erfüllung und einem Höhepunkt von Glücksgefühlen.",
    chiron:
      "Chiron als „weißer Lehrer“: ein sensibles Lernfeld, an dem du über echte Erfahrung zu Tiefe, Mitgefühl und klarer Begleitung reifen kannst.",
  };
  const angleNotes: Record<string, string> = {
    asc: "Aszendent: Deine unmittelbare Außenwirkung, dein spontaner Auftakt und die Art, wie du neue Situationen beginnst. Andere lesen darüber oft zuerst dein Temperament, deine Ausstrahlung und deinen natürlichen Grundmodus.",
    dsc: "Beziehungsstil: Welche Eigenschaften du in Partnerschaften suchst und aktivierst.",
    mc: "Berufungsachse: Wie du sichtbar wirst und wofür man dich öffentlich wahrnimmt.",
    ic: "Innere Basis: Was dir emotional Halt gibt und sich nach Zuhause anfühlt.",
  };
  const topHouse = profile.houseFocus[0];
  const secondHouse = profile.houseFocus[1];
  const chiron = profile.specialPoints.find((p) => p.key === "chiron");
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
                  const baseNote =
                    specialNotes[row.key] ??
                    specialPoint?.note ??
                    angleNotes[row.key] ??
                    null;
                  let note: string | null = baseNote;
                  if (row.key === "north_node") {
                    note = [
                      "Der Nordknoten (aufsteigend) ist dein Aufgabenpol: Qualitäten, die du in diesem Leben bewusst üben und integrieren darfst.",
                      northNodeSignExplanation(row.sign),
                      `Haus ${row.house} zeigt das Lebensfeld (${houseFieldHint(row.house)}), in dem sich diese Entwicklung besonders konkret anfühlt.`,
                    ].join(" ");
                  } else if (row.key === "south_node") {
                    note = [
                      "Der Südknoten (absteigend) ist dein Komfortpol: vertraute Muster und alte Sicherheit – hilfreich als Basis, aber nicht als einziger Aufenthaltsort.",
                      southNodeSignExplanation(row.sign),
                      `Haus ${row.house} beschreibt (${houseFieldHint(row.house)}), wo dir dieser Stil am natürlichsten und vertrautesten ist.`,
                      moonNodeCalculationHint(),
                    ].join(" ");
                  } else if (row.key === "chiron") {
                    note = [
                      baseNote,
                      chironSignExplanation(row.sign),
                      `In Haus ${row.house} zeigt sich dieses Thema besonders über ${houseFieldHint(row.house).toLowerCase()}.`,
                    ]
                      .filter(Boolean)
                      .join(" ");
                  } else if (row.key === "lilith") {
                    note = [
                      baseNote,
                      lilithSignExplanation(row.sign),
                      `In Haus ${row.house} wird das konkret bei ${houseFieldHint(row.house).toLowerCase()}.`,
                    ]
                      .filter(Boolean)
                      .join(" ");
                  } else if (row.key === "part_of_fortune") {
                    note = [
                      baseNote,
                      fortuneSignExplanation(row.sign),
                      `In Haus ${row.house} wird dieser Flow besonders über ${houseFieldHint(row.house).toLowerCase()} aktiviert.`,
                    ]
                      .filter(Boolean)
                      .join(" ");
                  } else if (["asc", "dsc", "mc", "ic"].includes(row.key)) {
                    note = [
                      baseNote,
                      angleSignExplanation(row.key, row.sign),
                      `Hausbezug hier: ${houseFieldHint(row.house)}.`,
                    ]
                      .filter(Boolean)
                      .join(" ");
                  }
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
        <h3 className="text-xl font-semibold tracking-tight">
          Chiron · der „weiße Lehrer“
        </h3>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Chiron steht in der Astrologie oft für ein sensibles Lernfeld: wo alte Verletztheit zu
          Weisheit, Mitgefühl und einem ruhigen inneren Lehrer werden kann – nicht als Moral,
          sondern als gelebte Reife.
        </p>
        {profile.narrative.chironInsight && chiron ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-black/80 dark:text-white/80">
              {profile.narrative.chironInsight}
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-black/65 dark:text-white/65">
            Chiron konnte in dieser Engine-Version nicht berechnet werden. Planetenpositionen,
            Mondknoten und übrige Punkte bleiben unverändert nutzbar.
          </p>
        )}
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

      <VollreportCoachingCta />
    </div>
  );
}
