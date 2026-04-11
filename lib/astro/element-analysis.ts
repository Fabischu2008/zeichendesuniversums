import type { Element } from "@/lib/astro/profile";

export type ElementStrength = "fehlend" | "gering" | "mittel" | "stark" | "sehr_stark";

export type ElementBlock = {
  element: Element;
  count: number;
  percentage: number;
  strength: ElementStrength;
  title: string;
  paragraphs: string[];
};

export type ElementAnalysis = {
  /** Kurze Einordnung über alle vier Elemente */
  intro: string;
  /** Sortiert wie elementBalance (absteigend nach Anteil) */
  blocks: ElementBlock[];
};

function strengthFromCount(count: number): ElementStrength {
  if (count === 0) return "fehlend";
  if (count === 1) return "gering";
  if (count === 2) return "mittel";
  if (count === 3) return "stark";
  return "sehr_stark";
}

/** Feste Texte: Vorteile, Schwerpunkte, Schatten bei Übergewicht, Entwicklung bei Mangel – jeweils elementtypisch. */
const COPY: Record<
  Element,
  Record<
    ElementStrength,
    { title: string; paragraphs: string[] }
  >
> = {
  Feuer: {
    fehlend: {
      title: "Feuer – kaum vertreten",
      paragraphs: [
        "Feuer steht für Initiative, Mut und sichtbare Energie. Wenn es in deinem Planetenmix fast nicht vorkommt, kann es sich anfühlen, als fehle manchmal der Funken zum Loslegen oder du brauchst äußere Impulse, um in Schwung zu kommen.",
        "Das ist keine Schwäche: viele Menschen mit wenig Feuer sind dafür in anderen Qualitäten stark. Bewusst kleine Starts setzen, Körper und Ritual nutzen, um „anzuheizen“, kann helfen.",
      ],
    },
    gering: {
      title: "Feuer – eher zurückhaltend",
      paragraphs: [
        "Ein Planet im Feuer reicht oft, um punktuell Temperatur ins Leben zu bringen – etwa wenn es dich in bestimmten Themen wirklich packt.",
        "Achte darauf, ob du in Stressphasen eher abkühlst oder doch noch zünden kannst; manchmal ist wenig Feuer eine Einladung, Prioritäten klar zu wählen statt alles gleichzeitig anzuheizen.",
      ],
    },
    mittel: {
      title: "Feuer – ausgewogener Anteil",
      paragraphs: [
        "Zwei Feuer-Punkte geben dir eine solide Portion Drang nach Bewegung, Selbstbehauptung und Lebendigkeit, ohne dass alles nur von Impuls getragen wirkt.",
        "Du kannst starten und wieder zur Ruhe kommen – ein guter Mittelweg zwischen Anspringen und Durchhalten.",
      ],
    },
    stark: {
      title: "Feuer – spürbarer Schwerpunkt",
      paragraphs: [
        "Mit drei Planeten im Feuer ist dein Profil spürbar auf Antrieb, Sichtbarkeit und „Jetzt“ ausgerichtet: du willst etwas bewegen, dich zeigen, Herausforderungen spüren.",
        "Vorteile: Du kannst andere mitreißen, schnell entscheiden und Energie in Projekte legen. Feuer „heizt an“ – Themen werden lebendig, Ideen bekommen Tempo.",
        "Wenn das Feuer dominiert, kann es auch überhitzen: Impulsivität, Unruhe oder das Gefühl, Dinge „weg zu brennen“, bevor sie reifen. Pausen und Erde/Luft (Struktur, Klartext) wirken wie ein Rost, der die Flamme nutzbar macht.",
      ],
    },
    sehr_stark: {
      title: "Feuer – dominanter Pol",
      paragraphs: [
        "Vier oder mehr Planeten im Feuer machen dieses Element zu deinem klaren Schwerpunkt: viel Antrieb, Mut, Wettbewerbsgeist und Bedürfnis nach Wirkung.",
        "Stärken: Du bringst Schwung, startest, motivierst – Feuer kann alte Ballast-Themen energetisch „weg brennen“ und Neues platzieren. Es heizt Begeisterung und Kampfgeist an.",
        "Typische Reibung: zu viel Hitze auf einmal – Konflikte anfachen, alles sofort klären wollen oder dich und andere zu strapazieren. Bewusst Abkühlung (Ruhe, Planung, Zuhören) ist dein Ausgleich, nicht deine Bestrafung.",
      ],
    },
  },
  Erde: {
    fehlend: {
      title: "Erde – kaum vertreten",
      paragraphs: [
        "Erde steht für Beständigkeit, Körperlichkeit, konkrete Ergebnisse und „hält, was sie verspricht“. Fast ohne Erde kann sich vieles luftig oder unverankert anfühlen.",
        "Struktur von außen suchen (Kalender, Budget, feste Orte) oder kleine Gewohnheiten aufbauen ersetzt nicht Erde im Chart, gibt dir aber Boden unter den Füßen.",
      ],
    },
    gering: {
      title: "Erde – leicht untergewichtig",
      paragraphs: [
        "Ein Erd-Anteil zeigt: du hast Zugang zu Bodenständigkeit, aber sie ist nicht dein Hauptmotor – andere Elemente führen oft den Ton an.",
        "Sinnlichkeit und Routine bewusst pflegen (Essen, Natur, Handarbeit) kann Erde-Energie wecken, ohne dass du „umgebaut“ werden musst.",
      ],
    },
    mittel: {
      title: "Erde – solide gemischt",
      paragraphs: [
        "Zwei Erde-Punkte verbinden dich mit Realismus: du kannst abarbeiten, sparen, Qualität lieben und Schritt für Schritt bauen.",
        "Du bist weder reiner Materialist noch Luftikus – du kannst träumen und trotzdem liefern.",
      ],
    },
    stark: {
      title: "Erde – klar spürbar",
      paragraphs: [
        "Drei Planeten in der Erde machen Stabilität, Pflichtgefühl und Genuss an Halt zu einem großen Thema: du willst spüren, dass etwas steht.",
        "Vorteile: Zuverlässigkeit, Ausdauer, pragmatische Lösungen. Erde „formt“ – aus Ideen werden Dinge, aus Versprechen Realität.",
        "Schatten bei Überhang: Sturheit, Angst vor Verlust der Kontrolle, zu fest werden. Bewusst Wandel und Spielraum (Luft/Wasser/Feuer) verhindern, dass du im eigenen System einhaust.",
      ],
    },
    sehr_stark: {
      title: "Erde – dominanter Pol",
      paragraphs: [
        "Sehr viel Erde bedeutet: Sicherheit, Struktur und messbare Erfolge sind zentral. Du denkst in Ressourcen, Zeit und Qualität.",
        "Stärken: Du hältst durch, baust auf, reparierst – andere verlassen sich gern auf dich. Erde kann auch emotional „tragen“, ohne laut zu werden.",
        "Risiko: Erstarren, zu lange an Altem festhalten oder Flexibilität als Bedrohung sehen. Feuer und Luft helfen, neu zu starten und Perspektiven zu wechseln, ohne den Boden zu verlieren.",
      ],
    },
  },
  Luft: {
    fehlend: {
      title: "Luft – kaum vertreten",
      paragraphs: [
        "Luft steht für Denken, Sprache, Vernetzung und Abstand zur reinen Emotion. Ohne Luft kann Kommunikation oder mentale Flexibilität seltener der erste Reflex sein.",
        "Texte, Gespräche, Lernen mit anderen – das kann Luft-Energie aktivieren. Du musst nicht „luftiger werden“, aber Worte schaffen oft Luft zum Atmen.",
      ],
    },
    gering: {
      title: "Luft – punktuell da",
      paragraphs: [
        "Ein Luft-Punkt zeigt oft eine Insel, wo Analyse, Witz oder Austausch für dich leicht sind – auch wenn der Rest des Profils anders tickt.",
        "Diese Insel bewusst nutzen (Beruf, Freundeskreis) verhindert, dass alles nur über Gefühl oder Aktion läuft.",
      ],
    },
    mittel: {
      title: "Luft – ausgewogen",
      paragraphs: [
        "Zwei Luft-Punkte geben dir einen gesunden Mix aus Kopf, Gespräch und Ideenreichtum, ohne dass alles nur theoretisch bleibt.",
        "Du kannst verbinden und differenzieren – gut für Teams, Mediation und klare Worte.",
      ],
    },
    stark: {
      title: "Luft – spürbarer Schwerpunkt",
      paragraphs: [
        "Drei Planeten in der Luft machen Denken, Kommunikation und soziale Vernetzung zu einem Kern: du willst verstehen, formulieren, vergleichen.",
        "Vorteile: Schnelle Erfassung, Wortwitz, Fairness aus der Distanz, neue Perspektiven. Luft „lüftet“ – aus Gewusel wird Klarheit.",
        "Schatten: Kopfkino, oberflächliche Nähe, Schwierigkeit, beim emotionalen Ballast zu bleiben. Wasser und Erde helfen, Gefühl und Körper ernst zu nehmen.",
      ],
    },
    sehr_stark: {
      title: "Luft – dominanter Pol",
      paragraphs: [
        "Viel Luft bedeutet: Intellekt, Sprache und Beziehungen über Ideen sind dein Haupttrieb – du ordnest, erklärst, vernetzt.",
        "Stärken: Lernfähigkeit, Anpassung, diplomatische Lösungen. Luft kann Konflikte entschärfen, indem sie benennt, was passiert.",
        "Risiko: Emotionaler Abstand, Überanalyse, „alles schon durchgerechnet“ ohne zu fühlen. Bewusst langsamer werden, Körper, Stille oder Tiefe (Wasser) sind kein Gegenteil, sondern Ergänzung.",
      ],
    },
  },
  Wasser: {
    fehlend: {
      title: "Wasser – kaum vertreten",
      paragraphs: [
        "Wasser steht für Empathie, Intuition, emotionale Tiefe und innere Bilder. Fast ohne Wasser kann Nähe manchmal sachlicher oder kontrollierter wirken als du es dir von innen wünschst.",
        "Kunst, Musik, Träume, therapeutische Räume oder vertraute Menschen können Wasser-Qualität kultivieren – ohne dass du „weicher“ werden musst als du bist.",
      ],
    },
    gering: {
      title: "Wasser – eher sparsam",
      paragraphs: [
        "Ein Wasser-Punkt zeigt oft eine klare emotionale oder intuitive Quelle – ein Bereich, wo du feinfühlig bist, auch wenn der Rest des Charts trockener wirkt.",
        "Diese Quelle zu schützen (Zeit, Grenzen) verhindert, dass du dich überall gleich tief hineingibst.",
      ],
    },
    mittel: {
      title: "Wasser – ausgewogen",
      paragraphs: [
        "Zwei Wasser-Punkte geben dir Zugang zu Fühlung und Einfühlung, ohne dass Stimmungen alles überfluten.",
        "Du kannst nah sein und trotzdem navigieren – ein guter Mix für Beziehung und Selbstfürsorge.",
      ],
    },
    stark: {
      title: "Wasser – spürbarer Schwerpunkt",
      paragraphs: [
        "Drei Planeten im Wasser machen Emotion, Intuition und verborgene Stränge zu einem großen Thema: du spürst Stimmungen, Untertöne, oft eher als andere.",
        "Vorteile: Tiefe, Mitgefühl, kreative Sensibilität. Wasser „weicht auf“ – harte Kanten werden spürbar, Heilung wird möglich.",
        "Schatten: Grenzen verlieren, Aufsaugen fremder Stimmungen, Zurückziehen statt Klären. Luft und Feuer helfen, zu benennen und zu handeln, ohne die Tiefe zu verraten.",
      ],
    },
    sehr_stark: {
      title: "Wasser – dominanter Pol",
      paragraphs: [
        "Sehr viel Wasser bedeutet: emotionale Intelligenz, Fantasie und verbundenes Fühlen sind zentral – du lebst innen stark mit.",
        "Stärken: Einfühlung, Heilkraft, künstlerische oder therapeutische Qualitäten. Wasser kann alte Schichten lösen und neue Empathie fließen lassen.",
        "Risiko: Überflutung, Stimmungstiefs, Verschleierung statt Klarheit. Struktur (Erde), klare Worte (Luft) und mutige Schritte (Feuer) sind Anker, keine Bevormundung.",
      ],
    },
  },
};

function buildIntroPlain(
  balance: Array<{ element: Element; count: number; percentage: number }>,
): string {
  if (balance.length === 0) return "";
  const top = balance[0]!;
  let s = `Aus den zehn klassischen Planeten ergibt sich dein Elementprofil: am stärksten vertreten ist ${top.element} (${top.count} Planeten, ${top.percentage}%).`;
  const tail = balance.slice(1);
  if (tail.length > 0) {
    s += ` Weitere Anteile: ${tail.map((r) => `${r.element} ${r.count}`).join(", ")}.`;
  }
  s +=
    " Die folgenden Abschnitte beschreiben, was das für Stärken, Schwerpunkte und typische Spannungen bedeuten kann – immer als Tendenz, nicht als festes Urteil.";
  return s;
}

export function buildElementAnalysis(
  balance: Array<{ element: Element; count: number; percentage: number }>,
): ElementAnalysis {
  const blocks: ElementBlock[] = balance.map((row) => {
    const strength = strengthFromCount(row.count);
    const block = COPY[row.element][strength];
    return {
      element: row.element,
      count: row.count,
      percentage: row.percentage,
      strength,
      title: block.title,
      paragraphs: block.paragraphs,
    };
  });

  return {
    intro: buildIntroPlain(balance),
    blocks,
  };
}
