import type { ZodiacSign } from "@/lib/astro/signs";

export type StufeZahl = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BewusstseinFrageOption = {
  label: string;
  /** Welcher Stufe diese Antwort am nächsten kommt (für Mittelwert) */
  stufe: StufeZahl;
};

export type BewusstseinFrage = {
  id: string;
  situation: string;
  optionen: [BewusstseinFrageOption, BewusstseinFrageOption, BewusstseinFrageOption, BewusstseinFrageOption];
};

function O(label: string, stufe: StufeZahl): BewusstseinFrageOption {
  return { label, stufe };
}

function F(
  id: string,
  situation: string,
  a: BewusstseinFrageOption,
  b: BewusstseinFrageOption,
  c: BewusstseinFrageOption,
  d: BewusstseinFrageOption,
): BewusstseinFrage {
  return { id, situation, optionen: [a, b, c, d] };
}

/** Vier situative Selbsteinschätzungs-Fragen pro Sternzeichen (jeweils vier Antworten mit Stufen-Gewicht). */
export const BEWUSSTSEIN_FRAGEN: Record<ZodiacSign, BewusstseinFrage[]> = {
  Widder: [
    F(
      "widder-1",
      "In einer Runde kritisiert dich jemand vor anderen – spontan, ohne Vorwarnung. Was trifft dich am ehesten?",
      O("Dir wird schnell heiß oder du verhaust dich innerlich; du brauchst erst mal einen Moment, bevor du sachlich bist", 2),
      O("Du willst dich nicht klein machen: du erklärst deine Sicht klar, auch wenn die Stimmung hochgeht", 3),
      O("Du fragst nach: Was genau meinst du – und willst es ohne persönliche Attacke klären", 5),
      O("Du merkst, dass dir das zu öffentlich ist, und schlägst vor, es einzeln oder später zu besprechen", 7),
    ),
    F(
      "widder-2",
      "Die Deadline kommt näher, es wird knapp mit dem, was du dir vorgenommen hast. Wie gehst du typischerweise damit um?",
      O("Dir fällt schwer, noch einen Zugang zu finden; du ziehst dich eher zurück oder lässt es sacken", 1),
      O("Du ziehst einen Sprint: viel auf einmal, auch wenn du andere oder dich selbst unter Druck setzt", 3),
      O("Du sortierst: Was muss wirklich noch rein – und was kann warten oder weg?", 5),
      O("Du reduzierst Tempo bewusst: lieber weniger, dafür stabil, statt alles zu verwüsten", 6),
    ),
    F(
      "widder-3",
      "Dein Gegenüber in einer Beziehung wird plötzlich stiller und distanzierter. Du neigst eher dazu, …",
      O("… nachzuhaken oder dich komplett abzuschotten – je nach Tagesform", 2),
      O("… schnell Klärung zu wollen: „Was ist los?“ – auch wenn es drängt", 4),
      O("… offen zu fragen, was der anderen Person gerade hilft oder fehlt", 5),
      O("… Raum zu geben, ohne dich komplett unsichtbar zu machen", 7),
    ),
    F(
      "widder-4",
      "Abends, wenn es ruhig wird: Womit beschäftigt dich dein Kopf am ehesten?",
      O("Mit dem, was heute gereizt hat – es zieht noch nach", 2),
      O("Mit Plänen, Ideen, nächsten Schritten; Abschalten fällt schwer", 4),
      O("Du nimmst den Tag in groben Zügen positiv oder neutral mit", 5),
      O("Du kannst loslassen: wenig Theater im Kopf, eher Ruhe oder Klarheit", 8),
    ),
  ],
  Stier: [
    F(
      "stier-1",
      "Etwas von außen durchkreuzt deine finanzielle oder praktische Planung (Preis, Job, Umzug …). Dein erster Zugang?",
      O("Du fühlst dich erst mal leer oder wie gelähmt; du willst das Thema nicht anfassen", 1),
      O("Du klammertst an Kontrolle oder suchst Schuldige – das gibt dir Halt", 2),
      O("Du gehst die Liste durch: Was ist noch realistisch, was muss neu verhandelt werden?", 5),
      O("Du passt dich langsam an, ohne dich komplett zu verbiegen", 6),
    ),
    F(
      "stier-2",
      "Jemand verändert „deinen“ Ablauf oder deinen gewohnten Platz (Küche, Schreibtisch, Routine). Wie reagierst du typischerweise?",
      O("Dir wird schnell unbehaglich oder du ziehst dich zurück", 2),
      O("Du bleibst bei deinem Gewohnten, bis es wirklich nicht anders geht", 3),
      O("Du suchst einen Kompromiss: Was ist verhandelbar, was nicht?", 4),
      O("Du nimmst mit, was sich gut anfühlt, und lässt bewusst los, was nicht mehr passt", 7),
    ),
    F(
      "stier-3",
      "Jemand bricht ein Versprechen dir gegenüber. Was beschreibt deine erste innere Bewegung am ehesten?",
      O("Du fühlst dich im Bauch getroffen und denkst: Vertrauen ist schwer", 2),
      O("Du wirst kühl oder willst Konsequenzen – Fairness ist dir wichtig", 3),
      O("Du willst verstehen: war Absicht, Vergessen oder Überforderung im Spiel?", 5),
      O("Du sagst klar, was für dich nicht ok ist – ohne die Person komplett zu verurteilen", 6),
    ),
    F(
      "stier-4",
      "Du hast das Gefühl, es bewegt sich wenig – beruflich oder privat. Innerlich …",
      O("… wirst du schwer oder suchst Trost in Gewohnheiten (Essen, Kaufen, Serie)", 2),
      O("… juckt es dich: du willst Veränderung, auch wenn du nicht weißt wohin", 3),
      O("… fragst du: Welcher kleine Schritt wäre heute noch möglich und gut für mich?", 5),
      O("… nimmst du Stillstand auch als Erholung – ohne sofort etwas falsch zu machen", 8),
    ),
  ],
  Zwillinge: [
    F(
      "zwillinge-1",
      "Du wirst in eine hitzige Diskussion hineingezogen (Familie, Arbeit, Gruppe). Was ist dir am vertrautesten?",
      O("Dir wird schnell zu viel Input; du brichst ab, gehst weg oder sagst irgendetwas, um Ruhe zu haben", 1),
      O("Du bist mit dabei: Kontern, Ironie, Punkte sammeln – auch wenn es schärfer wird", 2),
      O("Du versuchst, ein Thema nach dem anderen zu klären, statt alles auf einmal", 5),
      O("Du hörst zu, sagst dann einen präzisen Satz – ohne alle überzeugen zu müssen", 7),
    ),
    F(
      "zwillinge-2",
      "Zu viele Nachrichten, Tabs und Infos – wenig Ruhe. Wie gehst du damit typischerweise um?",
      O("Du kommst von nichts zu Ende; der Kopf fühlt sich voll an", 1),
      O("Du bleibst an der Oberfläche: viel lesen, wenig vertiefen", 2),
      O("Du wählst drei Prioritäten und schiebst den Rest bewusst nach hinten", 4),
      O("Du machst bewusst Pause: Stille, kurz weg vom Bildschirm", 7),
    ),
    F(
      "zwillinge-3",
      "Dein Gegenüber ist inhaltlich da, emotional aber abwesend oder kühl. Du neigst eher dazu, …",
      O("… viele Nachfragen zu stellen oder das Thema zu wechseln, weil es unangenehm wird", 2),
      O("… locker weiterzureden, statt das Unbehagen zu benennen", 3),
      O("… zu sagen: „Ich spüre Distanz – passt das für dich gerade?“", 5),
      O("… Abstand zu geben, ohne gleich Drama zu machen", 6),
    ),
    F(
      "zwillinge-4",
      "Abends lässt du den Tag Revue passieren. Was passt am ehesten?",
      O("Gedankenkarussell – Szenarien, die kein Ende nehmen", 2),
      O("Listen und Pläne für morgen; Gefühl bleibt eher kurz", 4),
      O("Kurz: Was war heute überraschend oder lehrreich?", 5),
      O("Du brauchst wenig Worte mehr – Stille oder leichte Müdigkeit fühlt sich gut an", 8),
    ),
  ],
  Krebs: [
    F(
      "krebs-1",
      "Du fühlst dich emotional voll oder überfordert (Streit, schlechte Nachricht, viel Nähe). Dein erster Reflex?",
      O("Du brauchst erst mal Schutz: weinen, weg oder ganz leise werden", 1),
      O("Du suchst Halt an Menschen oder ärgerst dich, dass „keiner“ da ist", 2),
      O("Du kannst benennen, was du brauchst: Zeit, Nähe, Pause, klare Grenze", 5),
      O("Du sorgst sanft für dich (Tee, Luft, eine Nachricht) – ohne dir Vorwürfe zu machen", 6),
    ),
    F(
      "krebs-2",
      "Jemand in deinem Umfeld überschreitet für dich eine Grenze (Thema, Körper, Vertrauen). Was trifft eher zu?",
      O("Du bist innerlich überwältigt und findest auf Anhieb keine Worte", 1),
      O("Du wirst kontrollierend oder ziehst dich passiv-aggressiv zurück", 2),
      O("Du sagst klar, was für dich nicht geht – mit kurzer Begründung", 5),
      O("Du entscheidest bewusst: klären, Abstand oder Ende – ohne dich kleinzumachen", 7),
    ),
    F(
      "krebs-3",
      "Du fühlst dich im Stich gelassen oder allein mit etwas Schwierigem. Innerlich …",
      O("… denkst du: Wieder ich – und es tut weh", 2),
      O("… ziehst du die Tür zu: zeige nichts mehr", 3),
      O("… fragst du dich: Was brauche ich jetzt konkret – auch wenn es klein ist?", 4),
      O("… tröstest du dich und holst dir Unterstützung – beides ist erlaubt", 6),
    ),
    F(
      "krebs-4",
      "Wenn du Zeit nur für dich hast – wie fühlt sich das am ehesten an?",
      O("Traurigkeit oder Schwere, die lange sitzt", 2),
      O("Grübeln über andere und was sie denken könnten", 3),
      O("Kleine Dankbarkeit: etwas Schönes vom Tag", 5),
      O("Ruhe, die nicht bedrohlich ist – du bist bei dir", 8),
    ),
  ],
  Löwe: [
    F(
      "loewe-1",
      "In einer Gruppe wirst du übergangen, nicht gefragt oder „unsichtbar“. Was machst du typischerweise?",
      O("Du ziehst dich klein zurück oder provozierst bewusst Aufmerksamkeit", 1),
      O("Du wirst lauter, witziger oder dramatischer – damit man dich wieder sieht", 2),
      O("Du sagst freundlich: „Ich hätte auch gern ein Wort dazu“", 5),
      O("Du merkst, dass dir das weh tut, ohne deinen Wert an Applaus zu hängen", 7),
    ),
    F(
      "loewe-2",
      "Jemand gibt dir Feedback zu deiner Arbeit oder deinem Auftreten – direkt und ehrlich. Dein erster Zugang?",
      O("Du fühlst dich getroffen oder willst sofort kontern", 2),
      O("Du rechtfertigst dich oder hörst nur halb zu", 3),
      O("Du suchst den nutzbaren Kern, ohne dich komplett kleinzureden", 5),
      O("Du kannst „Danke für die Klarheit“ sagen – auch wenn es sticht", 6),
    ),
    F(
      "loewe-3",
      "In einer Beziehung oder Freundschaft strahlt der andere gerade sichtbar mehr (Erfolg, Aufmerksamkeit). Du neigst eher dazu, …",
      O("… dich zu vergleichen und dich klein zu fühlen oder abzuwenden", 2),
      O("… mitzuhalten oder dich zu profilieren", 3),
      O("… mitzufreuen und daran zu erinnern, dass dein Wert davon unabhängig ist", 5),
      O("… dich für die andere Person zu freuen – ohne dich selbst zu vergessen", 7),
    ),
    F(
      "loewe-4",
      "Niemand schaut zu – kein Post, kein Publikum. Wer bist du dann für dich am ehesten?",
      O("Unsicher oder leer, weil die Rolle fehlt", 2),
      O("Noch in einer Rolle, auch wenn niemand zuschaut", 3),
      O("Du bist du: mit Macken und Stärken, ohne Show", 6),
      O("Ruhig, klar, ohne etwas beweisen zu müssen", 8),
    ),
  ],
  Jungfrau: [
    F(
      "jungfrau-1",
      "Ein Fehler wird sichtbar – und zwar in einem Moment, in dem andere mitbekommen. Was trifft dich zuerst?",
      O("Scham oder Erstarren: du willst am liebsten weg", 1),
      O("Du suchst schnell: Woher kam das – bei dir oder woanders?", 2),
      O("Du gehst zum ersten sachlichen Schritt: Was ist zu korrigieren?", 5),
      O("Du kannst den Fehler benennen, ohne dich komplett zu verurteilen", 6),
    ),
    F(
      "jungfrau-2",
      "Um dich herum herrscht Chaos (Wohnung, Projekt, Familie). Wie gehst du typischerweise damit um?",
      O("Du spürst innerliche Enge: alles muss sofort stimmen", 1),
      O("Du nörgelst oder übernimmst heimlich alles selbst", 2),
      O("Du packst ein kleines Paket ab: ein Bereich nach dem anderen", 4),
      O("Du ordnest mit Geduld – für dich und andere", 6),
    ),
    F(
      "jungfrau-3",
      "Jemand arbeitet für deinen Geschmack schlampig oder kommt Zusagen nicht nach. Dein Muster?",
      O("Du wirst innerlich streng oder ziehst dich emotional zurück", 2),
      O("Du übernimmst und sammelst still Groll", 3),
      O("Du machst eine klare Vereinbarung: wer was bis wann", 5),
      O("Du bietest Hilfe oder Struktur an – ohne die Arbeit dauerhaft zu schlucken", 7),
    ),
    F(
      "jungfrau-4",
      "Abends sprichst du mit dir selbst – innerer Dialog. Was klingt am vertrautesten?",
      O("Hart: „Hätte, müsste, nie gut genug“", 1),
      O("Organisiert: was morgen alles besser laufen soll", 4),
      O("Anerkennung für das, was du heute geschafft hast", 5),
      O("Sanft: „Für heute reicht es.“", 8),
    ),
  ],
  Waage: [
    F(
      "waage-1",
      "Zwei Menschen, die dir wichtig sind, ziehen dich in einen offenen Konflikt. Du neigst eher dazu, …",
      O("… schnell einzuknicken oder innerlich zu eskalieren, nur um Ruhe zu haben", 1),
      O("… zu schmeicheln, zu beschwichtigen oder die Wahrheit zu weichzeichnen", 2),
      O("… zu fragen, was beiden wichtig ist – wie ein Moderator", 5),
      O("… deine Position klar zu sagen, auch wenn es unbequem ist", 7),
    ),
    F(
      "waage-2",
      "Du spürst: In der Beziehung wird es still und kühl, ohne dass jemand es anspricht. Was machst du typischerweise?",
      O("Du frierst ein oder hängst dich fester rein", 1),
      O("Du bleibst oberflächlich freundlich und sammelst innen Groll", 2),
      O("Du sprichst es an: „Ich spüre Distanz – wie geht es dir?“", 5),
      O("Du willst Klarheit: Was wollen wir beide – ohne langes Drama?", 6),
    ),
    F(
      "waage-3",
      "Du musst entscheiden – und eine Seite wird enttäuscht sein. Was trifft eher zu?",
      O("Du schiebst die Entscheidung vor dich her", 2),
      O("Du suchst einen Mittelweg, mit dem oft niemand richtig glücklich ist", 3),
      O("Du erklärst fair, warum du so entscheidest", 5),
      O("Du trägst die Entscheidung – auch wenn sie weh tut", 7),
    ),
    F(
      "waage-4",
      "Harmonie mit dir selbst – wie fühlt sich das für dich am ehesten an?",
      O("Abhängig davon, was andere von dir halten", 1),
      O("Als würdest du dir selbst etwas schönreden", 2),
      O("Ausgleich zwischen Wunsch und dem, was gerade möglich ist", 5),
      O("Ruhe im Bauch, auch wenn nicht alles perfekt ist", 8),
    ),
  ],
  Skorpion: [
    F(
      "skorpion-1",
      "Du hast den Eindruck, jemand hat dich getäuscht oder Dinge bewusst verschwiegen. Dein erster Impuls?",
      O("Alles oder nichts: totale Konfrontation oder komplettes Wegducken", 1),
      O("Du wachst nach: Kontrolle, Nachforschung, kalter Zorn", 2),
      O("Du sagst, was du weißt und brauchst – und was deine Grenze ist", 5),
      O("Du willst die volle Wahrheit aushalten, ohne Menschen zu zerstören", 7),
    ),
    F(
      "skorpion-2",
      "Nähe wird plötzlich unbequem oder verletzlich. Was ist dir vertrauter?",
      O("Abbruch oder Wegdrehen – lieber Ende als unkontrollierbar", 1),
      O("Testen, nachhaken, im Zweifel kontrollieren", 2),
      O("Langsamer tiefer gehen – nur was beide wirklich wollen", 5),
      O("Vertrauen als Prozess: Schritt für Schritt, ohne Zwang", 6),
    ),
    F(
      "skorpion-3",
      "Etwas Altes wird wach – Verlust, Enttäuschung, alte Geschichte. Innerlich …",
      O("… spielen Bilder von Konsequenzen oder du erstarst", 2),
      O("… schluckst du alles runter, bis es drückt", 3),
      O("… suchst du aktive Hilfe: Gespräch, Bewegung, Therapie, was zu dir passt", 5),
      O("… lässt du Schicht für Schicht los – ohne dich zu zwingen", 7),
    ),
    F(
      "skorpion-4",
      "Wenn es still um dich ist – wie erlebst du deine innere Tiefe am ehesten?",
      O("Als Bedrohung oder „zu viel“", 2),
      O("Als Geheimnis, das dich beschäftigt, ohne Ende", 3),
      O("Als Quelle von Klarheit oder Intuition", 6),
      O("Als Ruhe, die nicht kämpfen muss", 8),
    ),
  ],
  Schütze: [
    F(
      "schuetze-1",
      "Etwas, das dir Sinn gab (Job, Projekt, Überzeugung), fühlt sich plötzlich leer an. Was machst du typischerweise?",
      O("Du wirst zynisch oder flüchtest in Ablenkung", 1),
      O("Du erklärst anderen oder dir selbst, wie es eigentlich sein müsste", 2),
      O("Du fragst neu: Was brauche ich jetzt – nicht nur ideologisch, sondern lebendig?", 5),
      O("Du lässt zu, dass du nicht alles weißt – und bleibst neugierig", 7),
    ),
    F(
      "schuetze-2",
      "Jemand redet herablassend zu dir oder stellt deine Kompetenz infrage. Dein Muster?",
      O("Du klappst zusammen oder fährst verbal zurück", 2),
      O("Du willst es allen zeigen – Beweiszwang", 3),
      O("Du setzt eine Grenze und gehst dann weiter – ohne dich aufzureiben", 5),
      O("Du nimmst nicht alles persönlich; manches sagt mehr über den anderen aus", 6),
    ),
    F(
      "schuetze-3",
      "Viele offene Türen – viele Ideen, wenig Ruhe. Wie gehst du damit um?",
      O("Du bleibst liegen oder überflutest dich mit Optionen", 1),
      O("Du springst von einer Option zur nächsten – FOMO inklusive", 3),
      O("Du wählst eine Richtung für eine Weile – bewusst", 5),
      O("Du wartest ab, bis es innen ruhiger wird, bevor du entscheidest", 7),
    ),
    F(
      "schuetze-4",
      "Was gibt dir im Alltag am ehesten das Gefühl von Sinn – nicht im Idealfall, sondern real?",
      O("Ablenkung, Spaß, Abstand vom Ernst", 2),
      O("Anerkennung, Status, klare Meinung", 3),
      O("Lernen, ehrlicher Austausch, etwas weiterkommen", 5),
      O("Momente, in denen du klein und verbunden fühlst – ohne große Worte", 8),
    ),
  ],
  Steinbock: [
    F(
      "steinbock-1",
      "Regeln oder Rahmenbedingungen ändern sich – dein Plan passt nicht mehr. Dein erster Zugang?",
      O("Du fühlst dich gelähmt oder alles wirkt sinnlos", 1),
      O("Du wirst zynisch oder verteidigst dich mit Schuld bei anderen", 2),
      O("Du sortierst neu: Was ist noch stabil – und was ist nur Gewohnheit?", 4),
      O("Du erinnerst dich: Pläne dienen dem Leben, nicht umgekehrt", 7),
    ),
    F(
      "steinbock-2",
      "Du bist dauerhaft voll – Arbeit, Verantwortung – und innerlich leer. Was trifft eher zu?",
      O("Du ziehst weiter durch, bis es kracht", 2),
      O("Du drückst Gefühle weg und funktionierst", 3),
      O("Du sagst irgendwann Stop und schreibst Prioritäten um", 5),
      O("Du nimmst Körper und Beziehungen ernst – nicht nur die Liste", 6),
    ),
    F(
      "steinbock-3",
      "Jemand wirkt dir gegenüber weich, unklar oder unzuverlässig. Wie reagierst du typischerweise?",
      O("Du wirst innerlich kalt oder wertend", 2),
      O("Du wirst hart – Schutz vor Enttäuschung", 3),
      O("Du machst Fristen und klare Erwartungen sichtbar", 5),
      O("Du versuchst zu verstehen, ohne alles allein zu stemmen", 6),
    ),
    F(
      "steinbock-4",
      "„Erfolg“ ist da – aber innen fühlt es sich kühl an. Was beschreibt das am ehesten?",
      O("Leere trotz Leistung", 2),
      O("Pflichtgefühl ohne echte Freude", 3),
      O("Stolz, gemischt mit Dankbarkeit für das, was geklappt hat", 5),
      O("Stille Zufriedenheit – ohne Vergleich mit anderen", 8),
    ),
  ],
  Wassermann: [
    F(
      "wassermann-1",
      "Die Gruppe will dich in eine Rolle stecken, die dir nicht passt („du bist immer …“). Du neigst eher dazu, …",
      O("… dich zu isolieren oder laut abzubrechen", 1),
      O("… rebellisch zu sein, ohne klare Alternative", 2),
      O("… neu zu verhandeln: Was passt zu mir – und was zur Gruppe?", 5),
      O("… anders zu bleiben und trotzdem Brücken zu bauen", 7),
    ),
    F(
      "wassermann-2",
      "Es wird emotional geladen – du bist eher im Kopf unterwegs. Was ist dir vertrauter?",
      O("Du fühlst dich überfordert oder gehst in Abwehr", 2),
      O("Du erklärst und analysierst – Nähe wird schwer", 3),
      O("Du sagst: „Ich bin unsicher – ich brauch einen Moment.“", 5),
      O("Du lässt Nähe zu – auch wenn es ungewohnt ist", 6),
    ),
    F(
      "wassermann-3",
      "Dein Vorschlag oder deine Idee wird abgelehnt. Dein erster Reflex?",
      O("„Hier passt ich nicht hin.“", 2),
      O("Du gehst in Opposition oder erklärst lange warum alle falsch liegen", 3),
      O("Du nimmst Feedback auf und behältst, was für dich stehen bleibt", 5),
      O("Du bleibst dabei, unterschiedlich zu denken – ohne die Gruppe zu verlassen", 6),
    ),
    F(
      "wassermann-4",
      "Freiheit – was bedeutet das für dich im Alltag am ehesten?",
      O("Weg können, wenn es eng wird", 2),
      O("Recht haben und nicht eingeengt werden", 3),
      O("Selbst entscheiden, wofür du Verantwortung übernimmst", 6),
      O("Verbunden sein und trotzdem du selbst bleiben", 8),
    ),
  ],
  Fische: [
    F(
      "fische-1",
      "Grenzen werden unscharf – du nimmst Stimmungen, Sorgen oder Erwartungen stark auf. Was trifft eher zu?",
      O("Du fühlst dich ertrunken oder willst weg von allem", 1),
      O("Du spielst mit oder weichst aus – damit es keinen Konflikt gibt", 2),
      O("Du benennst weich, aber klar: „So geht es mir nicht gut.“", 5),
      O("Du bleibst klar und einfühlsam zugleich – für dich und andere", 7),
    ),
    F(
      "fische-2",
      "Jemand braucht dich emotional stark (Freund:in, Familie). Dein Muster?",
      O("Du gibst alles und bist danach leer", 1),
      O("Du weichst aus oder erzeugst Drama, weil es zu viel wird", 2),
      O("Du hilfst innerhalb deiner Grenzen – und sagst Nein, wenn nötig", 5),
      O("Du suchst echte Nähe statt Retterrolle", 6),
    ),
    F(
      "fische-3",
      "Du merkst: Gerade weißt du nicht genau, was du fühlst. Wie gehst du damit um?",
      O("Du fühlst dich durcheinander oder flüchtest in Ablenkung", 2),
      O("Du projizierst: andere „sollten“ wissen, was los ist", 3),
      O("Du sammelst kleine Signale: Körper, Tagebuch, ein Satz am Tag", 4),
      O("Du vertraust darauf, dass Klarheit langsam kommen darf", 6),
    ),
    F(
      "fische-4",
      "Verbundenheit mit „mehr“ als nur dem Alltag – was kommt dir am nächsten?",
      O("Du fühlst dich überflutet von allem", 1),
      O("Du träumst dich in eine schönere Geschichte", 2),
      O("Kunst, Musik, kleine Rituale, echtes Mitgefühl im Tag", 5),
      O("Ein Frieden, der weich und klar zugleich ist", 8),
    ),
  ],
};

/** Mittelwert der gewählten Stufen → gerundet 1–8; bei Gleichstand konservativ zur nächsten ganzen Zahl. */
export function berechneStufeAusFragebogen(stufen: StufeZahl[]): {
  stufe: StufeZahl;
  mittelwert: number;
} {
  if (stufen.length === 0) {
    return { stufe: 4, mittelwert: 4 };
  }
  const sum = stufen.reduce((a, b) => a + b, 0);
  const mittelwert = sum / stufen.length;
  const gerundet = Math.round(mittelwert);
  const stufe = Math.min(8, Math.max(1, gerundet)) as StufeZahl;
  return { stufe, mittelwert };
}
