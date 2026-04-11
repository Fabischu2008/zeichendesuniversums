import type { ZodiacSign } from "@/lib/astro/signs";

export type BewusstseinStufe = {
  stufe: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  kurz: string;
  beschreibung: string;
};

export type BewusstseinZeichenProfil = {
  sign: ZodiacSign;
  planet: string;
  thema: string;
  einordnung: string;
  stufen: BewusstseinStufe[];
};

function S(
  stufe: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  kurz: string,
  beschreibung: string,
): BewusstseinStufe {
  return { stufe, kurz, beschreibung };
}

export const BEWUSSTSEIN_PROFILES: Record<ZodiacSign, BewusstseinZeichenProfil> = {
  Widder: {
    sign: "Widder",
    planet: "Mars",
    thema: "Selbstbehauptung und Energie",
    einordnung:
      "Deine Lebensbühne dreht sich um Mut, Tempo und die Frage: Wo darfst du dich zeigen – und wo wird aus Druck Gewalt?",
    stufen: [
      S(1, "Zusammenbruch & Angriff", "Du fühlst dich gereizt, machtlos oder wütend; reagierst impulsiv, gehst auf Distanz oder brichst Dinge ab. Grenzen verschwimmen, du verletzt dich oder andere."),
      S(2, "Ego-Schutz & Konkurrenz", "Alles wird zum Wettbewerb; du brauchst Recht haben, drängst dich durch oder ziehst dich beleidigt zurück. Andere sind Rivale oder Hindernis."),
      S(3, "Härte ohne Pause", "Du läufst auf Hochtouren, erkennst Erschöpfung zu spät. Direktheit kippt in Schärfe; du vergisst, dass auch andere Schutz brauchen."),
      S(4, "Klare Aktion", "Du setzt an, sprichst Klartext und übernimmst Verantwortung für deinen Teil. Streit wird thematisiert statt nur ausgetragen."),
      S(5, "Mut mit Herz", "Du startest Projekte mit Freude, stehst für dich ein, ohne andere klein zu machen. Energie fließt in sinnvolle Ziele."),
      S(6, "Disziplin & Fairness", "Du trainierst, lernst, hältst Wort. Konflikte löst du sportlich oder vertraglich – klar, aber nicht kaltherzig."),
      S(7, "Demut im Sturm", "Du weißt um deine Kraft und brauchst nicht mehr zu beweisen. Entschuldigen, nachgeben, neu justieren fällt dir leichter."),
      S(8, "Präsenz ohne Kampf", "Deine Anwesenheit wirkt, ohne Druck. Du schützt Schwächere, setzt Zeichen, ohne laut zu werden – reine, ruhige Klarheit."),
    ],
  },
  Stier: {
    sign: "Stier",
    planet: "Venus",
    thema: "Werte, Sicherheit und Genuss",
    einordnung: "Hier geht es um Halt im Körper und in der Welt: Was darf bleiben – und wann klebst du aus Angst vor Verlust?",
    stufen: [
      S(1, "Erstarrung & Leere", "Du fühlst dich leer oder erstarrt, hast keinen Zugang zu Lust und Wärme. Alles fühlt sich sinnlos oder bedrohlich an."),
      S(2, "Besitz & Kontrolle", "Du klammerst an Menschen, Geld oder Routinen. Neid und Vergleichen bestimmen dich; Veränderung wirkt wie Raub."),
      S(3, "Sturheit & Genuss als Flucht", "Du verweigerst dich oder übertreibst Essen, Kaufen, Starren aufs Handy. Weigerung und Übermaß wechseln sich ab."),
      S(4, "Stabilität & Sinnlichkeit", "Du baust Strukturen, die tragen: Schlaf, Ernährung, Raum. Du genießt bewusst, ohne dich voll zu machen."),
      S(5, "Treue & Qualität", "Du wählst wenige Dinge und Menschen, hältst zu ihnen. Verlässlichkeit wird zu deiner Visitenkarte."),
      S(6, "Schöpfen & Erhalten", "Du erschaffst dauerhaft Werte – beruflich oder privat. Du investierst langfristig und lässt reifen."),
      S(7, "Einfachheit & Großzügigkeit", "Du brauchst weniger Besitz, um sicher zu sein. Teilen fällt leichter; du genießt ohne Festhalten."),
      S(8, "Ruhe als Quelle", "Deine Ruhe ist ansteckend; andere spüren: Hier ist Platz. Du bist verbunden mit dem Lebendigen, ohne zu wollen."),
    ],
  },
  Zwillinge: {
    sign: "Zwillinge",
    planet: "Merkur",
    thema: "Austausch, Wissen und Bewegung",
    einordnung: "Deine Bühne ist der zwischenmenschliche Austausch: Wie klar sprichst du – und wann zerstreust du dich?",
    stufen: [
      S(1, "Chaos & Oberfläche", "Gedanken rasen, du redest viel, hörst wenig zu. Information überflutet dich; du fühlst dich zerrissen."),
      S(2, "Lüge & Spiel", "Worte werden Mittel zum Zweck; Ironie verletzt, Halbwahrheiten schützen dich. Nähe bleibt flach."),
      S(3, "Nervosität & Kritik", "Du analysierst alles tot, bist unzufrieden, suchst Fehler bei anderen. Innere Unruhe sucht Äußeres zum Bekämpfen."),
      S(4, "Klarheit & Dialog", "Du stellst Fragen, hörst zu, formulierst verständlich. Streit wird zum Gespräch; Information sortierst du."),
      S(5, "Neugier & Brücken", "Du vernetzt Menschen und Ideen, lernst mit Freude. Worte bauen Vertrauen statt Mauern."),
      S(6, "Präzision & Lehre", "Du strukturierst Wissen, schreibst, lehrst, übersetzt Komplexes. Kommunikation wird Dienst an anderen."),
      S(7, "Stille & Wahrheit", "Du weißt, wann Schweigen mehr sagt. Ehrlichkeit braucht nicht viele Worte; du hörst das Unausgesprochene."),
      S(8, "Weisheit im Wort", "Was du sagst, trifft den Kern und schützt. Deine Sprache öffnet Türen – ohne Manipulation, ohne Lärm."),
    ],
  },
  Krebs: {
    sign: "Krebs",
    planet: "Mond",
    thema: "Zugehörigkeit, Schutz und Gefühl",
    einordnung: "Es geht um Nähe und Sicherheit: Wo nährt dich Verbundenheit – und wo verstrickst du dich?",
    stufen: [
      S(1, "Überflutung & Rückzug", "Gefühle überrollen dich; du ziehst dich ein oder hängst an anderen wie an einem Rettungsring."),
      S(2, "Abhängigkeit & Kontrolle", "Du machst andere zum Elternteil oder zum Kind; Schuld und Pflicht vergiften die Nähe."),
      S(3, "Mauern & Stimmung", "Du versteckst dich hinter Ironie oder harter Schale, innen brennt es. Stimmungen bestimmen den Tag."),
      S(4, "Geborgenheit schaffen", "Du sorgst für Raum, Essen, Zeit – für dich und wen du liebst. Vertrauen wächst langsam und echt."),
      S(5, "Fürsorge & Intuition", "Du spürst, was gebraucht wird, ohne zu übernehmen. Nähe entsteht durch Zuhören und kleine Taten."),
      S(6, "Grenzen mit Herz", "Du sagst Nein, ohne Liebe zu entziehen. Du bleibst weich und klar zugleich."),
      S(7, "Vergeben & Loslassen", "Alte Verletzungen dürfen weich werden. Du brauchst nicht mehr, alles zu retten."),
      S(8, "Universelle Mutter/Vater", "Deine Wärme ist da, ohne Bedingung. Du hältst Raum – für dich und andere – ohne zu ersticken."),
    ],
  },
  Löwe: {
    sign: "Löwe",
    planet: "Sonne",
    thema: "Sichtbarkeit, Spiel und Würde",
    einordnung: "Deine Bühne ist das Licht: Wo darfst du strahlen – und wo wird aus Selbstausdruck Show?",
    stufen: [
      S(1, "Schatten & Demütigung", "Du fühlst dich unsichtbar, beschämt oder leer. Entweder versteckst du dich oder provozierst laut."),
      S(2, "Ego & Neid", "Du brauchst Applaus um jeden Preis; andere sind Konkurrenz. Kritik zerstört deine Stimmung."),
      S(3, "Drama & Stolz", "Alles wird groß gespielt; du verwechselst Lautstärke mit Bedeutung. Verletzlichkeit wirkt wie Schwäche."),
      S(4, "Selbstrespekt", "Du trittst auf, ohne andere zu drängen. Du nimmst Platz ein, den du dir erlaubst."),
      S(5, "Freude teilen", "Du feierst Erfolge mit anderen, motivierst, bringst Wärme. Dein Licht lässt andere mitschimmern."),
      S(6, "Verantwortung führen", "Du übernimmst Führung mit Fairness. Anerkennung gibst du weiter, nicht nur an dich."),
      S(7, "Demut im Rampenlicht", "Du brauchst weniger Bestätigung; du weißt um deinen Wert. Du kannst auch mal zurücktreten."),
      S(8, "Strahlen ohne Ego", "Deine Präsenz heilt und inspiriert, ohne Druck. Du bist Mittelpunkt, ohne andere zu verkleinern."),
    ],
  },
  Jungfrau: {
    sign: "Jungfrau",
    planet: "Merkur",
    thema: "Ordnung, Verbesserung und Dienst",
    einordnung: "Hier geht es um Unterscheidung und Nutzen: Wo hilft dein Scharfsinn – und wo frisst Kritik dich auf?",
    stufen: [
      S(1, "Zwang & Selbstabwertung", "Du fühlst dich schmutzig, falsch, nie gut genug. Kontrolle wird Zwangsritual; du leidest im Detail."),
      S(2, "Nörgeln & Kälte", "Du siehst nur Fehler – bei dir und anderen. Nähe wird zum Gutachten; Wärme fehlt."),
      S(3, "Überarbeitung & Angst", "Du optimierst bis zum Kollaps; delegieren fällt schwer. Körper und Schlaf leiden."),
      S(4, "Struktur & Hygiene", "Du schaffst klare Abläufe, saubere Zustände, sinnvolle Listen. Ordnung dient dem Leben."),
      S(5, "Hilfe & Kompetenz", "Du löst konkrete Probleme für andere; dein Wissen tut gut. Du verbesserst, ohne zu demütigen."),
      S(6, "Ethik & Handwerk", "Du arbeitest präzise und fair; Qualität ist Ehrensache. Kritik ist Werkzeug, keine Waffe."),
      S(7, "Annahme & Sanftmut", "Du erlaubst dir Unvollkommenheit. Perfektion ist nicht mehr Religion, sondern Service."),
      S(8, "Heilung im Kleinen", "Deine Aufmerksamkeit heilt durch präzise, liebevolle Taten. Du siehst das Wesentliche – und lässt den Rest los."),
    ],
  },
  Waage: {
    sign: "Waage",
    planet: "Venus",
    thema: "Beziehung, Ausgleich und Schönheit",
    einordnung: "Deine Bühne ist das Zwischenmenschliche: Harmonie finden – ohne dich aufzulösen?",
    stufen: [
      S(1, "Abhängigkeit & Leere", "Du existierst nur im Spiegel anderer; ohne Partner fühlst du dich nichts. Konflikt löst Panik aus."),
      S(2, "Manipulieren & Oberfläche", "Du schmeichelst, lügst nett oder spielst Opfer. Ehrlichkeit wirkt gefährlich."),
      S(3, "Unentschlossenheit & Groll", "Du schwankst endlos, sammelst stillen Groll. Harmonie auf Kosten deiner Wahrheit."),
      S(4, "Dialog & Fairness", "Du suchst Lösungen, die beiden Seiten Raum geben. Streit wird verhandelbar."),
      S(5, "Partnerschaft & Ästhetik", "Du gestaltest Begegnung: schöne Räume, klare Vereinbarungen, Respekt vor dem anderen."),
      S(6, "Diplomatie & Recht", "Du vermittelst, formulierst Verträge, bringst Parteien zusammen. Ausgleich wird Kunst."),
      S(7, "Ehrlichkeit in Liebe", "Du sagst, was du brauchst, ohne den Frieden zu zerstören. Nähe wird echt."),
      S(8, "Friede als Kraft", "Deine Ausgewogenheit ist nicht lauwarm – sie ist gerecht. Du verbindest, ohne zu verbiegen."),
    ],
  },
  Skorpion: {
    sign: "Skorpion",
    planet: "Pluto",
    thema: "Tiefe, Vertrauen und Wandlung",
    einordnung: "Es geht um Intensität und Tabus: Wo heilst du durch ehrliche Tiefe – und wo zerstörst du aus Angst?",
    stufen: [
      S(1, "Zerstörung & Obsession", "Du hängst in Abhängigkeiten, Eifersucht oder Machtspielen. Alles oder nichts – oft mit Schmerz."),
      S(2, "Misstrauen & Kontrolle", "Du durchsuchst, testest, versteckst dich. Intimität wird zum Verhör."),
      S(3, "Gift & Stille", "Du vergiftest dich mit alten Geschichten oder gehst in totale Isolation. Wut wird innerlich gegärt."),
      S(4, "Wahrheit aushalten", "Du benennst, was ist – bei dir zuerst. Verletzlichkeit wird zum Einstieg, nicht zum Drama."),
      S(5, "Loyalität & Intimität", "Du wählst Tiefe mit wenigen Menschen; Vertrauen wächst. Sex und Seele dürfen zusammenkommen."),
      S(6, "Loslassen & Erneuerung", "Du endest, was tot ist, ohne alles zu vernichten. Wandlung wird bewusster Prozess."),
      S(7, "Vergebung & Macht teilen", "Du brauchst nicht mehr zu kontrollieren, was du verstehst. Macht wird zu Verantwortung."),
      S(8, "Alchemie", "Aus Schmerz wird Weisheit, ohne dich zu verhärten. Deine Präsenz transformiert – still, tief, echt."),
    ],
  },
  Schütze: {
    sign: "Schütze",
    planet: "Jupiter",
    thema: "Sinn, Weite und Wahrheit",
    einordnung: "Deine Bühne ist die Suche nach Bedeutung: Wo expandierst du sinnvoll – und wo rennst du weg?",
    stufen: [
      S(1, "Zynismus & Leere", "Nichts hat Sinn; du flüchtest in Humor, Drogen oder Distanz. Glaube ist tot oder fanatisch."),
      S(2, "Moral & Überheblichkeit", "Du weißt alles besser, belehrst andere. Deine „Wahrheit“ wird Waffe."),
      S(3, "Ruhelosigkeit & Oberflächigkeit", "Du sammelst Erfahrungen ohne Verarbeitung. Nächstes Abenteuer – innen leer."),
      S(4, "Orientierung & Lernen", "Du stellst große Fragen und suchst Antworten mit Offenheit. Bildung wird Weg, nicht Status."),
      S(5, "Optimismus & Großzügigkeit", "Du teilst, was du lernst; andere dürfen mitwachsen. Hoffnung ist ansteckend."),
      S(6, "Ethik & Lehre", "Du lebst, was du lehrst. Dein Verhalten und deine Werte passen zusammen."),
      S(7, "Demut vor dem Unbekannten", "Du weißt: Nicht alles ist erklärbar. Glaube wird Weite statt Dogma."),
      S(8, "Weisheit & Freiheit", "Du bist frei, ohne flüchten zu müssen. Dein Sinn wirkt – leise, klar, verbindend."),
    ],
  },
  Steinbock: {
    sign: "Steinbock",
    planet: "Saturn",
    thema: "Struktur, Zeit und Verantwortung",
    einordnung: "Hier geht es um Form und Grenzen: Wo trägt Disziplin – und wo wird sie zu Kälte?",
    stufen: [
      S(1, "Erstarrung & Unterordnung", "Du fühlst dich ausgebrannt, unterwürfig oder hart wie Stein. Regeln quälen dich; Freude fehlt."),
      S(2, "Ego & Mauer", "Du kämpfst ums Überleben im System, wirst zynisch oder überambitioniert. Andere sind Stufe oder Hindernis."),
      S(3, "Härte & Gefühlsarmut", "Arbeit ersetzt alles; du verurteilst Gefühl als schwach. Melancholie liegt über allem."),
      S(4, "Ordnung & Kontinuität", "Du baust Schritt für Schritt: Strukturen, die halten. Du grenzt ab und hältst durch."),
      S(5, "Verlässlichkeit & Treue", "Du hältst Wort, schützt, was du aufgebaut hast. Verantwortung wird Ehre."),
      S(6, "Ethik & Konsequenz", "Du handelst nach Prinzipien, die du mitträgst. Disziplin dient dem Ganzen."),
      S(7, "Bescheidenheit & Würde", "Du brauchst weniger äußeren Rang; innere Würde reicht. Autorität wird Dienst."),
      S(8, "Stille Klarheit", "Du bist präsent, ohne Druck. Zeit und Form dienen dem Leben – nicht umgekehrt."),
    ],
  },
  Wassermann: {
    sign: "Wassermann",
    planet: "Uranus",
    thema: "Freiheit, Anderssein und Zukunft",
    einordnung: "Deine Bühne ist der Blick über den Tellerrand: Wo erneuerst du sinnvoll – und wo flüchtest du in Ideen?",
    stufen: [
      S(1, "Bruch & Isolation", "Du fühlst dich außerhalb, abgeschnitten, elektrisch überreizt oder taub. Zugehörigkeit fehlt."),
      S(2, "Rebellion ohne Ziel", "Du brichst nur um des Brechmens willen. Andere sind System; du bist dagegen – ohne Bauplan."),
      S(3, "Kopf-Kino & Distanz", "Du bleibst im Konzept, vermeidest Nähe. Emotionen wirken lästig oder irrational."),
      S(4, "Innovation & Team", "Du bringst neue Ideen in Gruppen; Regeln werden sinnvoll gebrochen. Freiheit hat Rahmen."),
      S(5, "Solidarität & Vielfalt", "Du stehst für Gleichheit und Respekt vor Anderssein. Freundschaft wird politisch und herzlich."),
      S(6, "Vision & Umsetzung", "Du verwandelst Utopien in Projekte. Zukunft wird konkret – Schritt für Schritt."),
      S(7, "Demut vor dem Kollektiv", "Du weißt: Auch du bist Teil des Ganzen. Führung bedeutet dienen an der Gemeinschaft."),
      S(8, "Erweckung im Alltag", "Deine Freiheit ansteckt, ohne Chaos. Du erneuerst Strukturen – liebevoll, klar, menschlich."),
    ],
  },
  Fische: {
    sign: "Fische",
    planet: "Neptun",
    thema: "Grenzen, Mitgefühl und Transzendenz",
    einordnung: "Es geht um Auflösung und Verbundenheit: Wo öffnest du dich dem Großen – und wo gehtst du unter?",
    stufen: [
      S(1, "Überflutung & Sucht", "Du flüchtest in Substanz, Drama oder Opferrolle. Grenzen existieren nicht; du ertrinkst."),
      S(2, "Täuschung & Opfer", "Du täuschst dich oder andere; du rettest, wo niemand gerettet werden will. Klärung wird gemieden."),
      S(3, "Verwirrung & Opfergang", "Du weißt nicht, was deins ist; Müdigkeit und Projektion bestimmen den Tag."),
      S(4, "Empathie & Kunst", "Du lässt Fühlen zu – in Musik, Bewegung, Zuhören. Grenzen lernen langsam."),
      S(5, "Hilfe & Mitgefühl", "Du stehst anderen bei, ohne dich aufzulösen. Sanftmut wird aktiv."),
      S(6, "Spiritualität & Ethik", "Du sucht Sinn jenseits des Ichs; Handeln folgt innerem Kompass."),
      S(7, "Grenzen mit Hingabe", "Du sagst Nein, ohne Liebe zu verlieren. Demut ohne Selbstaufgabe."),
      S(8, "Einssein im Frieden", "Du bist verbunden – ohne zu verschwinden. Dein Mitgefühl heilt, weil es klar ist."),
    ],
  },
};

export function getBewusstseinProfil(sign: ZodiacSign): BewusstseinZeichenProfil {
  return BEWUSSTSEIN_PROFILES[sign];
}

export function naechsterSchrittText(
  sign: ZodiacSign,
  aktuelleStufe: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
): { ueberschrift: string; text: string } {
  const profil = BEWUSSTSEIN_PROFILES[sign];
  if (aktuelleStufe >= 8) {
    return {
      ueberschrift: "Auf deiner Stufe bleiben & vertiefen",
      text:
        "Auch hohe Stufen brauchen Pflege: bleib in Kontakt mit Körper, ehrlichen Menschen und kleinen Alltagsritualen, die dich erden. Bewusstheit ist kein Endpunkt – Rückschläge sind normal; achtsam kehrst du zurück.",
    };
  }
  const next = profil.stufen.find((s) => s.stufe === aktuelleStufe + 1)!;
  return {
    ueberschrift: `Richtung Stufe ${next.stufe}: ${next.kurz}`,
    text: `Ein möglicher nächster Schritt: ${next.beschreibung} Wähle eine kleine Übung in den kommenden Wochen: z. B. ein Verhalten beobachten, ohne zu urteilen; eine ehrliche Unterhaltung führen; oder eine Gewohnheit ändern, die dich auf Stufe ${aktuelleStufe} hält. Kein Druck – nur Neugier.`,
  };
}
