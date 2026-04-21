"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AstroRadixChart } from "@/components/AstroRadixChart";
import {
  type AstroChartData,
  type Element,
  ELEMENT_BY_SIGN,
} from "@/lib/astro/profile";
import {
  type ZodiacSign,
  ZODIAC_SYMBOLS,
  publicZodiacSvgPath,
} from "@/lib/astro/signs";

type StrategyCard = {
  id: string;
  title: string;
  area: "Kommunikation" | "Beziehung" | "Energie" | "Fokus" | "Selbstführung";
  today: string;
  week: string;
  avoid: string;
  premium?: boolean;
  kpi: string;
};

type WeeklyItem = {
  id: string;
  label: string;
};

type ElementName = "Feuer" | "Erde" | "Luft" | "Wasser";

type PlanetRow = {
  key: string;
  name: string;
  glyph: string;
  sign: ZodiacSign;
  house: number;
  degree: string;
  element: Element;
};

const PROFILE = {
  name: "Fabian",
  sun: "Skorpion" as ZodiacSign,
  moon: "Löwe" as ZodiacSign,
  ascendant: "Zwillinge" as ZodiacSign,
  archetype: "Der fokussierte Transformierer",
  lifeTheme:
    "Tiefe + Ausdruck balancieren: klare Kommunikation, starke Grenzen und mutige Entscheidungen.",
  relationshipStyle:
    "Intensiv, loyal, offen für Wachstum – braucht Ehrlichkeit statt Spielchen.",
};

const PLANET_ROWS: PlanetRow[] = [
  {
    key: "sun",
    name: "Sonne",
    glyph: "☉",
    sign: "Skorpion",
    house: 6,
    degree: "14°12'",
    element: "Wasser",
  },
  {
    key: "moon",
    name: "Mond",
    glyph: "☽",
    sign: "Löwe",
    house: 3,
    degree: "03°48'",
    element: "Feuer",
  },
  {
    key: "mercury",
    name: "Merkur",
    glyph: "☿",
    sign: "Skorpion",
    house: 6,
    degree: "22°10'",
    element: "Wasser",
  },
  {
    key: "venus",
    name: "Venus",
    glyph: "♀",
    sign: "Schütze",
    house: 7,
    degree: "05°31'",
    element: "Feuer",
  },
  {
    key: "mars",
    name: "Mars",
    glyph: "♂",
    sign: "Waage",
    house: 5,
    degree: "27°55'",
    element: "Luft",
  },
  {
    key: "jupiter",
    name: "Jupiter",
    glyph: "♃",
    sign: "Fische",
    house: 10,
    degree: "11°04'",
    element: "Wasser",
  },
  {
    key: "saturn",
    name: "Saturn",
    glyph: "♄",
    sign: "Wassermann",
    house: 9,
    degree: "18°19'",
    element: "Luft",
  },
  {
    key: "uranus",
    name: "Uranus",
    glyph: "♅",
    sign: "Steinbock",
    house: 8,
    degree: "12°42'",
    element: "Erde",
  },
  {
    key: "neptune",
    name: "Neptun",
    glyph: "♆",
    sign: "Steinbock",
    house: 8,
    degree: "16°07'",
    element: "Erde",
  },
  {
    key: "pluto",
    name: "Pluto",
    glyph: "♇",
    sign: "Skorpion",
    house: 6,
    degree: "20°33'",
    element: "Wasser",
  },
];

const RADIX_CHART: AstroChartData = {
  ascendantLongitude: 72,
  houseCusps: [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30],
  angles: {
    asc: 72,
    dsc: 252,
    mc: 340,
    ic: 160,
  },
  points: [
    { key: "sun", name: "Sonne", glyph: "☉", longitude: 224.2, sign: "Skorpion", house: 6 },
    { key: "moon", name: "Mond", glyph: "☽", longitude: 123.8, sign: "Löwe", house: 3 },
    { key: "mercury", name: "Merkur", glyph: "☿", longitude: 232.1, sign: "Skorpion", house: 6 },
    { key: "venus", name: "Venus", glyph: "♀", longitude: 245.5, sign: "Schütze", house: 7 },
    { key: "mars", name: "Mars", glyph: "♂", longitude: 207.9, sign: "Waage", house: 5 },
    { key: "jupiter", name: "Jupiter", glyph: "♃", longitude: 341.1, sign: "Fische", house: 10 },
    { key: "saturn", name: "Saturn", glyph: "♄", longitude: 318.3, sign: "Wassermann", house: 9 },
    { key: "uranus", name: "Uranus", glyph: "♅", longitude: 282.4, sign: "Steinbock", house: 8 },
    { key: "neptune", name: "Neptun", glyph: "♆", longitude: 286.1, sign: "Steinbock", house: 8 },
    { key: "pluto", name: "Pluto", glyph: "♇", longitude: 230.5, sign: "Skorpion", house: 6 },
    {
      key: "north_node",
      name: "Nordknoten",
      glyph: "☊",
      longitude: 188,
      sign: "Waage",
      house: 5,
      isSpecial: true,
    },
    {
      key: "chiron",
      name: "Chiron",
      glyph: "⚷",
      longitude: 133,
      sign: "Löwe",
      house: 3,
      isSpecial: true,
    },
  ],
};

const ELEMENT_SHARE: Array<{ element: ElementName; pct: number; color: string }> = [
  { element: "Wasser", pct: 36, color: "#38bdf8" },
  { element: "Feuer", pct: 29, color: "#fb7185" },
  { element: "Luft", pct: 21, color: "#a78bfa" },
  { element: "Erde", pct: 14, color: "#f59e0b" },
];

const STRATEGIES: StrategyCard[] = [
  {
    id: "communication",
    title: "Kommunikation in High-Emotion-Momenten",
    area: "Kommunikation",
    today: "Nutze heute die 2-Satz-Regel: Bedürfnis + klare Bitte, keine Beweisrede.",
    week: "Ein klärendes Gespräch mit Agenda vorbereiten (Thema, Ziel, Next Step).",
    avoid: "Zwischen den Zeilen testen, ob dein Gegenüber dich wirklich spürt.",
    kpi: "Response-Qualität +18%",
  },
  {
    id: "relationship",
    title: "Partnerschaft: Nähe ohne Kontrollmodus",
    area: "Beziehung",
    today: "Benenne 1 Wertschätzung, bevor du 1 schwierigen Punkt ansprichst.",
    week: "30-Minuten Check-in (Was stärkt uns? Was entzieht Energie?).",
    avoid: "Rückzug als Schutzreaktion, wenn es emotional wird.",
    kpi: "Konflikt-Intensität -22%",
  },
  {
    id: "energy",
    title: "Energie-Strategie für klare Entscheidungen",
    area: "Energie",
    today: "90 Minuten Fokusblock + 15 Minuten Decompression ohne Screen.",
    week: "2 feste Recovery-Slots im Kalender blocken und schützen.",
    avoid: "Alles gleichzeitig starten, wenn dein Nervensystem schon voll ist.",
    kpi: "Fokuszeit +2.4h/Woche",
  },
  {
    id: "focus",
    title: "Execution-Board für große Ziele",
    area: "Fokus",
    today: "Eine Priorität wählen: größter Hebel zuerst, Rest parken.",
    week: "Täglich 5-Minuten Review: Keep / Cut / Continue.",
    avoid: "Perfektionismus als Aufschiebe-Tarnung.",
    premium: true,
    kpi: "Sprint-Klarheit +31%",
  },
  {
    id: "selflead",
    title: "Self-Leadership bei Triggern",
    area: "Selbstführung",
    today: "Trigger erkennen -> 3 Atemzüge -> dann Antwort formulieren.",
    week: "Persönliches Trigger-Playbook mit 3 Gegenstrategien schreiben.",
    avoid: "Entscheidungen im emotionalen Peak treffen.",
    premium: true,
    kpi: "Impulsreaktionen -27%",
  },
];

const WEEKLY_ITEMS: WeeklyItem[] = [
  { id: "w1", label: "1 ehrliches Beziehungsgespräch mit klarer Intention" },
  { id: "w2", label: "2x 30 Minuten Fokuszeit fürs Hauptprojekt" },
  { id: "w3", label: "Täglicher 5-Minuten Check-in (Stimmung + Trigger)" },
  { id: "w4", label: "1 Regenerations-Slot komplett ohne Handy" },
];

const STORAGE_KEYS = {
  plan: "zd_dashboard_prototype_weekly_plan",
  reflection: "zd_dashboard_prototype_reflection",
} as const;

const AREA_BADGE: Record<StrategyCard["area"], string> = {
  Kommunikation: "text-sky-700 bg-sky-500/10 dark:text-sky-200 dark:bg-sky-500/20",
  Beziehung: "text-rose-700 bg-rose-500/10 dark:text-rose-200 dark:bg-rose-500/20",
  Energie: "text-violet-700 bg-violet-500/10 dark:text-violet-200 dark:bg-violet-500/20",
  Fokus: "text-amber-700 bg-amber-500/10 dark:text-amber-200 dark:bg-amber-500/20",
  Selbstführung: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-200 dark:bg-emerald-500/20",
};

function ElementDonut() {
  let start = 0;
  const stops = ELEMENT_SHARE.map((part) => {
    const from = start;
    const to = start + part.pct;
    start = to;
    return `${part.color} ${from}% ${to}%`;
  }).join(", ");

  return (
    <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
      <div className="mx-auto">
        <div
          className="relative h-44 w-44 rounded-full"
          style={{ background: `conic-gradient(${stops})` }}
        >
          <div className="absolute inset-4 rounded-full bg-white/95 dark:bg-[#0b0f19]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] uppercase tracking-[0.16em] text-black/50 dark:text-white/50">
              Elemente
            </p>
            <p className="mt-1 text-xl font-semibold">{PROFILE.sun}</p>
            <p className="text-xs text-black/60 dark:text-white/60">Basis-Profilmix</p>
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        {ELEMENT_SHARE.map((part) => (
          <li
            key={part.element}
            className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: part.color }}
                aria-hidden
              />
              {part.element}
            </span>
            <span className="font-semibold">{part.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Big3Pill({ label, sign }: { label: string; sign: ZodiacSign }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
      <img
        src={publicZodiacSvgPath(sign)}
        alt={sign}
        className="h-8 w-8 rounded-full bg-white/80 p-1 dark:bg-white/10"
      />
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">{label}</p>
        <p className="text-sm font-semibold">
          {ZODIAC_SYMBOLS[sign]} {sign}
        </p>
      </div>
    </div>
  );
}

function StrategyPanel({ card }: { card: StrategyCard }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${AREA_BADGE[card.area]}`}>
          {card.area}
        </span>
        <span className="text-xs font-semibold text-black/55 dark:text-white/55">{card.kpi}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight">{card.title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-black/75 dark:text-white/75">
        <p>
          <span className="font-semibold text-black dark:text-white">Heute:</span> {card.today}
        </p>
        <p>
          <span className="font-semibold text-black dark:text-white">Diese Woche:</span> {card.week}
        </p>
        <p>
          <span className="font-semibold text-black dark:text-white">Vermeiden:</span> {card.avoid}
        </p>
      </div>
    </article>
  );
}

export function DashboardPrototypeClient() {
  const [isPremium, setIsPremium] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [reflection, setReflection] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    try {
      const rawPlan = window.localStorage.getItem(STORAGE_KEYS.plan);
      if (rawPlan) {
        setCompleted(JSON.parse(rawPlan) as Record<string, boolean>);
      }
      const rawReflection = window.localStorage.getItem(STORAGE_KEYS.reflection);
      if (rawReflection) {
        setReflection(rawReflection);
      }
    } catch {
      // Ignore localStorage read errors in prototype mode.
    }
  }, []);

  useEffect(() => {
    if (saveStatus !== "saved") return;
    const t = window.setTimeout(() => setSaveStatus("idle"), 1300);
    return () => window.clearTimeout(t);
  }, [saveStatus]);

  const visibleStrategies = useMemo(
    () => STRATEGIES.filter((s) => isPremium || !s.premium),
    [isPremium],
  );

  const completedCount = useMemo(
    () => WEEKLY_ITEMS.filter((w) => completed[w.id]).length,
    [completed],
  );

  function toggleWeeklyItem(id: string) {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(next));
      } catch {
        // Ignore localStorage write errors in prototype mode.
      }
      return next;
    });
  }

  function saveReflection() {
    try {
      window.localStorage.setItem(STORAGE_KEYS.reflection, reflection.trim());
    } catch {
      // Ignore localStorage write errors in prototype mode.
    }
    setSaveStatus("saved");
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0b0f19] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              SaaS Dashboard Prototype
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Willkommen zurück, {PROFILE.name}
            </h1>
            <p className="mt-2 text-sm leading-7 text-black/70 dark:text-white/70">
              Dein Astro-Profil wird hier in konkrete Strategien übersetzt: Fokus, Beziehung,
              Energie und Self-Leadership.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsPremium((v) => !v)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 px-5 text-sm font-semibold text-violet-900 hover:bg-violet-500/15 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-100 dark:hover:bg-violet-500/20"
            >
              {isPremium ? "Premium aktiv (Demo)" : "Free-Modus (Demo)"}
            </button>
            <Link
              href="/tools/birth-chart/profile"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              Vollprofil öffnen
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Streak</p>
          <p className="mt-2 text-2xl font-semibold">6 Tage</p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">Konstante Check-ins</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Wochenplan</p>
          <p className="mt-2 text-2xl font-semibold">
            {completedCount}/{WEEKLY_ITEMS.length}
          </p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">Aktionen erledigt</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Dominantes Element</p>
          <p className="mt-2 text-2xl font-semibold">{ELEMENT_BY_SIGN[PROFILE.sun]}</p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">Tiefe + Intuition</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Modus</p>
          <p className="mt-2 text-2xl font-semibold">{isPremium ? "Premium" : "Free"}</p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">Strategietiefe {isPremium ? "voll" : "limitiert"}</p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Astro-Profil</h2>
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-900 dark:bg-violet-500/15 dark:text-violet-100">
              Live Preview
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Big3Pill label="Sonne" sign={PROFILE.sun} />
            <Big3Pill label="Mond" sign={PROFILE.moon} />
            <Big3Pill label="Aszendent" sign={PROFILE.ascendant} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Archetyp</p>
              <p className="mt-2 text-lg font-semibold">{PROFILE.archetype}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Beziehungsstil</p>
              <p className="mt-2 text-sm leading-6 text-black/75 dark:text-white/75">{PROFILE.relationshipStyle}</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50 dark:text-white/50">Lebensfokus</p>
            <p className="mt-2 text-sm leading-6 text-black/75 dark:text-white/75">{PROFILE.lifeTheme}</p>
          </div>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight">Element-Balance</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Basierend auf deinem Profilmix ({ELEMENT_BY_SIGN[PROFILE.sun]} als Hauptton).
          </p>
          <div className="mt-5">
            <ElementDonut />
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight">Horoskop-Radix</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Visueller Überblick über Hausachsen, Planetenpositionen und wichtige Punkte.
          </p>
          <div className="mt-4 flex justify-center rounded-2xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.04]">
            <AstroRadixChart chart={RADIX_CHART} />
          </div>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight">Planeten-Matrix</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Zeichen, Haus und Element je Planet — direkt im Dashboard nutzbar.
          </p>
          <div className="mt-4 max-h-[520px] overflow-auto rounded-2xl border border-black/10 dark:border-white/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="sticky top-0 bg-white/95 text-xs uppercase tracking-[0.12em] text-black/55 backdrop-blur dark:bg-[#0b0f19]/95 dark:text-white/55">
                <tr>
                  <th className="px-3 py-2">Planet</th>
                  <th className="px-3 py-2">Zeichen</th>
                  <th className="px-3 py-2">Haus</th>
                  <th className="px-3 py-2">Grad</th>
                  <th className="px-3 py-2">Element</th>
                </tr>
              </thead>
              <tbody>
                {PLANET_ROWS.map((row) => (
                  <tr
                    key={row.key}
                    className="border-t border-black/10 odd:bg-black/[0.02] dark:border-white/10 dark:odd:bg-white/[0.03]"
                  >
                    <td className="px-3 py-2 font-medium">
                      {row.glyph} {row.name}
                    </td>
                    <td className="px-3 py-2">
                      {ZODIAC_SYMBOLS[row.sign]} {row.sign}
                    </td>
                    <td className="px-3 py-2">{row.house}</td>
                    <td className="px-3 py-2">{row.degree}</td>
                    <td className="px-3 py-2">{row.element}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Strategie-Zentrum</h2>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              Von Astro-Insight zu konkreter Umsetzung in Alltag, Beziehung und Arbeit.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visibleStrategies.map((card) => (
            <StrategyPanel key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight">7-Tage-Execution</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            SaaS-Style Task Layer für echte Verhaltensänderung.
          </p>

          <ul className="mt-5 space-y-3">
            {WEEKLY_ITEMS.map((item) => {
              const checked = !!completed[item.id];
              return (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm dark:border-white/10 dark:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleWeeklyItem(item.id)}
                      className="mt-1 h-4 w-4 rounded border-black/30"
                    />
                    <span className={checked ? "line-through opacity-60" : ""}>{item.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight">Daily Reflection Log</h2>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Kurzer Journal-Check-in als Datenbasis für spätere KI-Empfehlungen.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Heute habe ich gemerkt, dass ..."
            className="mt-4 h-36 w-full resize-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm outline-none placeholder:text-black/40 focus:border-black/30 dark:border-white/15 dark:bg-white/[0.04] dark:placeholder:text-white/40 dark:focus:border-white/30"
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={saveReflection}
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Reflexion speichern
            </button>
            {saveStatus === "saved" ? (
              <span className="text-sm text-emerald-700 dark:text-emerald-400">Gespeichert</span>
            ) : null}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-dashed border-black/20 bg-white/40 p-6 dark:border-white/20 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">Produkt-Roadmap aus dem Prototyp</h2>
        <ul className="mt-3 space-y-2 text-sm text-black/75 dark:text-white/75">
          <li>• Auth + Multi-Profile pro User (SaaS Core)</li>
          <li>• Serverseitige Strategie-Engine aus echten Astro-Daten</li>
          <li>• Premium-Entitlements + Usage Meter + Upgrade Flow</li>
          <li>• KI-Coach Layer: tägliche Impulse aus Profil + Log</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/birth-chart/profile"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Zum Astro-Profil
          </Link>
          <Link
            href="/test"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-black/5 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Zur Test-Homepage
          </Link>
        </div>
      </section>
    </div>
  );
}
