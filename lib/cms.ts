export type ProductCategory =
  | "guide"
  | "compatibility";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
  content: string;
  fileUrl?: string;
};

/** Unteres CTA auf der Artikel-Seite; fehlt es, gilt der Standard (Freebie). */
export type PostFooterCta = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

/** Farbakzente für Cover & Typografie (Blog). */
export type PostAccent = "violet" | "rose" | "amber";

export type Post = {
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  footerCta?: PostFooterCta;
  /** Styling (Ränder, Überschriften). Standard: violet */
  accent?: PostAccent;
  /** Optionales Cover unter /public (z. B. /images/hero-cosmic-eye.png) */
  coverImage?: string;
  coverAlt?: string;
};

/** Checkout / Produkt-ID für das astrologische Vollprofil (Vollreport). Nicht im Shop-Katalog. */
export const PRODUCT_ID_ASTRO_VOLLPROFIL = "p_birth_profile" as const;
export const PRICE_ASTRO_VOLLPROFIL = 4.44;

/** Exakte Paaranalyse (Synastry) – Shop-Eintrag + später Checkout / Success wie Vollprofil. */
export const PRODUCT_ID_COMPAT_PAARANALYSE = "p_compat_full" as const;
export const PRICE_COMPAT_PAARANALYSE = 7.77;
export const PRODUCT_ID_READING_PROFILE_30 = "p_reading_profile_30" as const;
export const PRICE_READING_PROFILE_30 = 33.33;
export const PRODUCT_ID_READING_TAROT_60 = "p_reading_tarot_60" as const;
export const PRICE_READING_TAROT_60 = 66.66;
export const PRODUCT_ID_READING_RELATIONSHIP = "p_reading_relationship" as const;
export const PRICE_READING_RELATIONSHIP = 44.44;
export const PRODUCT_ID_COACHING_EINFLUSS = "p_coaching_einfluss" as const;
export const PRICE_COACHING_EINFLUSS = 2500;

export function checkoutHrefForProduct(productId: string): string {
  return `/checkout?productId=${encodeURIComponent(productId)}`;
}

const products: Product[] = [
  {
    id: PRODUCT_ID_ASTRO_VOLLPROFIL,
    name: "Geburtshoroskop Vollreport",
    slug: "geburtshoroskop-vollreport",
    price: PRICE_ASTRO_VOLLPROFIL,
    description:
      "Dein vollständiges Geburtshoroskop mit Big 3, Planeten, Häusern und persönlicher Deutung.",
    image: "/auge.jpg",
    category: "guide",
    content:
      "Exakte Berechnung auf Basis von Datum, Uhrzeit und Ort. Enthält Archetyp, Lebensfokus, Beziehungsstil und klare Handlungsimpulse.",
    fileUrl: "/downloads/geburtshoroskop-vollreport.pdf",
  },
  {
    id: PRODUCT_ID_COMPAT_PAARANALYSE,
    name: "Kompatibilität Vollanalyse",
    slug: "compatibility-vollanalyse",
    price: PRICE_COMPAT_PAARANALYSE,
    description:
      "Die komplette Paaranalyse für Beziehung, Partnerschaft und Dynamik zwischen zwei Profilen.",
    image: "/auge.jpg",
    category: "compatibility",
    content:
      "Mit Synastry-Aspekten, Dimensionsanalyse und konkreten Empfehlungen zu Kommunikation, Vertrauen und Langfristigkeit.",
    fileUrl: "/downloads/compatibility.pdf",
  },
  {
    id: PRODUCT_ID_READING_PROFILE_30,
    name: "Astro-Reading",
    slug: "reading-profil-30",
    price: PRICE_READING_PROFILE_30,
    description:
      "30 Min Astro-Reading mit Analyse deines Geburtshoroskop-Bilds und klaren Impulsen fuer Alltag und Beziehungen.",
    image: "/auge.jpg",
    category: "guide",
    content:
      "Halbe Stunde Reading mit Analyse deines Geburtsbilds/Horoskops, Selbstreflexion und konkreten Next Steps fuer deinen Alltag.",
  },
  {
    id: PRODUCT_ID_READING_TAROT_60,
    name: "Astro + Tarot-Reading",
    slug: "reading-tarot-60",
    price: PRICE_READING_TAROT_60,
    description:
      "60 Min Reading mit gleicher Horoskop-Analyse wie im Astro-Reading plus Tarot-Legung zu einem speziellen Thema.",
    image: "/auge.jpg",
    category: "guide",
    content:
      "60 Minuten Reading: Analyse deines Geburtsbilds/Horoskops und zusaetzlich eine Tarot-Legung zu einem speziellen Thema mit konkreten Impulsen.",
  },
  {
    id: PRODUCT_ID_READING_RELATIONSHIP,
    name: "Beziehungs-Reading",
    slug: "reading-beziehung",
    price: PRICE_READING_RELATIONSHIP,
    description:
      "Beziehungsfokus mit klaren Impulsen zu Verbindung, Kommunikation und wiederkehrenden Mustern.",
    image: "/auge.jpg",
    category: "compatibility",
    content:
      "Fokussiertes Reading fuer Beziehungsthemen mit konkreten Schritten zu Naehe, Grenzen, Kommunikation und Verbundenheit.",
  },
  {
    id: PRODUCT_ID_COACHING_EINFLUSS,
    name: "Einfluss Coaching",
    slug: "coaching-einfluss",
    price: PRICE_COACHING_EINFLUSS,
    description:
      "Intensive Begleitung mit persoenlichem Coach und 2 Calls pro Woche.",
    image: "/auge.jpg",
    category: "guide",
    content:
      "Premium-Coaching fuer tiefe Selbstreflexion und Einfluss auf dein eigenes System, um mehr Einklang, Verbundenheit und Wohlbefinden zu verankern.",
  },
];

const posts: Post[] = [
  {
    title: "Wie dein Sternzeichen wirklich tickt (ohne Klischees)",
    slug: "sternzeichen-ohne-klischees",
    seoTitle:
      "Sternzeichen ohne Klischees: Bedeutung, Stressmuster, Beziehung",
    metaDescription:
      "Sonnenzeichen sinnvoll nutzen: Was es leistet, wo Social Media übertreibt – und wie Big 3 und Tool ein klareres Bild liefern.",
    keywords: [
      "Sternzeichen Bedeutung",
      "Sternzeichen verstehen",
      "Astrologie ohne Klischees",
      "Persönlichkeit Astrologie",
      "Sternzeichen Beziehung",
    ],
    accent: "amber",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Sternzeichen-Bedeutung ohne Klischees",
    content: [
      "## Warum sich Sternzeichen oft unpassend anfühlen",
      "Viele kennen nur die Kurzversion aus Social Media: „Du bist X, also bist du immer so.“ Genau das macht Astrologie oberflächlich. In der Praxis geht es nicht um Etiketten, sondern um wiederkehrende Muster – und darum, sie **in Kontext** zu setzen. Unser [Sternzeichen-Überblick](/sternzeichen) fasst den Einstieg ohne Klischees zusammen.",
      "## Was dein Sternzeichen wirklich beschreibt",
      "Wenn jemand nach dem Sternzeichen fragt, meint das fast immer die **Sonne**: deinen Kern, dein Entwicklungsthema, worauf du langfristig ausgerichtet bist und wie du Prioritäten setzt. Das ist wertvoll – aber nur ein Teil des Bildes. Dazu kommen z. B. emotionale Sprache (Mond) und dein Auftreten (Aszendent). [Big 3: Sonne, Mond, Aszendent](/big-3-bedeutung) und das [Geburtshoroskop-Tool](/tools/birth-chart) mit Datum, Uhrzeit und Ort machen daraus ein stimmigeres Gesamtbild.",
      "## Wo die meisten Fehlinterpretationen entstehen",
      "- **Kontext fehlt:** Verhalten hängt von Situation, Stress und Reifegrad ab.\n- **Einzelaspekt wird überbewertet:** Nur das Sonnenzeichen ohne Mond und Aszendent bleibt zu grob.\n- **Klischees ersetzen Beobachtung:** Aussagen wie „immer eifersüchtig“ oder „immer kühl“ bringen dich nicht weiter – sie ersetzen keine ehrliche Selbstreflexion.",
      "## So nutzt du dein Sternzeichen sinnvoll im Alltag",
      "- Beobachte zwei bis drei typische Trigger-Situationen pro Woche (Arbeit, Partnerschaft, Familie).\n- Frage dich: „Was brauche ich hier gerade wirklich – Klarheit, Nähe, Zeit oder Struktur?“\n- Übersetze die Antwort in **eine** kleine Handlung statt in ein festes Label.",
      "## Drei Reflexionsfragen für sofortige Klarheit",
      "- Wann fühle ich mich schnell missverstanden?\n- Wie reagiere ich unter Druck: Rückzug, Angriff oder Kontrolle?\n- Welcher kleine Schritt würde mir heute Stabilität geben?",
      "## Fazit",
      "Sonnenzeichen helfen dann, wenn sie zu ehrlicher Selbstbeobachtung führen: nicht als Ausrede, sondern als Kompass für bessere Entscheidungen in Beziehung, Arbeit und Alltag.",
      "## Nächster Schritt",
      "Wenn du nach dem Überblick tiefer gehen willst: [kostenloser Guide](/freebie-auswahl) zum Einstieg – oder direkt [Geburtshoroskop-Tool](/tools/birth-chart) für Sonne, Mond und Aszendent mit klarem nächsten Schritt.",
    ].join("\n\n"),
    footerCta: {
      title: "Mehr als nur Sternzeichen",
      description:
        "Berechne Sonne, Mond und Aszendent kostenlos für ein deutlich genaueres Profil.",
      cta: { label: "Big 3 berechnen", href: "/tools/birth-chart" },
    },
  },
  {
    title: "Warum es in der Beziehung knallt (und wie ihr es besser löst)",
    slug: "compatibility-warum-es-knallt",
    seoTitle:
      "Beziehung: Konflikte verstehen – Nähe, Tempo, Kommunikation",
    metaDescription:
      "Typische Reibung in Partnerschaften: Nähe vs. Raum, Tempo, Anerkennung. So erkennt ihr Muster früh – inkl. Synastrie-Tool und Lesetipps.",
    keywords: [
      "Kompatibilität Beziehung",
      "Beziehungsmuster erkennen",
      "Konflikte in Beziehungen",
      "Synastrie Grundlagen",
      "Kommunikation Partnerschaft",
    ],
    accent: "rose",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Beziehungsdynamik und Kompatibilität",
    content: [
      "## Warum es trotz Liebe immer wieder knallt",
      "In vielen Beziehungen liegt das Problem nicht in fehlender Zuneigung, sondern in **wiederkehrenden Mustern**: gleiche Trigger, gleiche Eskalation, gleiche Enttäuschung. Oft wollt ihr Verbindung – aber mit anderem Tempo, anderer Sprache oder anderen Sicherheitsbedürfnissen. Orientierung ohne Fachjargon: [Beziehungs-Hub](/beziehung).",
      "## Konflikte sind oft Übersetzungsfehler",
      "Klassiker: Eine Person braucht Nähe, die andere braucht Luft zum Denken. Ohne Benennung wirkt das wie Kälte oder Klammern – obwohl beide eigentlich Stabilität suchen. Astrologie kann hier **keine** Moral liefern, aber eine gemeinsame Sprache für Dynamik. Grundlagen: [Synastrie einfach erklärt](/synastrie-einfach-erklaert).",
      "## Die fünf häufigsten Reibungspunkte",
      "- **Tempo:** Einer will sofort Klärung, der andere braucht erst Abstand.\n- **Nähe/Distanz:** Unterschiedliche Bedürfnisse werden als Ablehnung gelesen.\n- **Anerkennung:** Was für den einen selbstverständlich ist, fehlt dem anderen als sichtbares Signal.\n- **Kontrolle:** Sicherheit über Planung – vom anderen als Druck erlebt.\n- **Freiheit:** Autonomie einfordern – vom anderen als Distanz missverstanden.",
      "## Was Kompatibilität wirklich bedeutet",
      "Kompatibilität heißt nicht „immer harmonisch“. Sie heißt: Unterschiede **benennbar** machen und bewusst damit umgehen – statt jedes Mal von vorn zu raten. Eine belastbare technische Grundlage liefert die [Paaranalyse](/tools/compatibility) mit beiden Geburtsprofilen (Datum, Uhrzeit, Ort), weil sie über reines Sternzeichen-Matching hinausgeht.",
      "## Sofort umsetzbarer Gesprächsrahmen",
      "Nehmt euch 15 Minuten pro Woche und beantwortet drei Fragen:\n1. Was hat diese Woche Verbindung gestärkt?\n2. Wo gab es Reibung – und welches Bedürfnis steckte dahinter?\n3. Was braucht ihr beide nächste Woche **konkret** (ein Satz pro Person)?",
      "## Fazit",
      "Konflikte sind selten der Beweis, dass „es nicht passt“. Oft fehlt die Übersetzung. Wer Muster erkennt, kann Verbindung aktiv gestalten – statt nur heftiger zu reagieren.",
      "## Nächster Schritt",
      "[Kompatibilitäts-Tool](/tools/compatibility): Schnellcheck möglich, für Tiefe beide Geburtsprofile. Vertiefung: [Mondzeichen in Beziehungen](/mondzeichen-beziehung), [Venus & Mars](/venus-mars-kompatibilitaet), [Beziehungstipps](/astrologie-beziehungstipps).",
    ].join("\n\n"),
    footerCta: {
      title: "Direkt ausprobieren: Paaranalyse",
      description:
        "Synastrie mit echten Planetenlagen – Einstieg möglich, Tiefe mit vollständigen Geburtsdaten.",
      cta: { label: "Zur Paaranalyse", href: "/tools/compatibility" },
    },
  },
  {
    title:
      "Geburtshoroskop & Big Three: Sonne, Mond, Aszendent – warum Datum und Ort zählen",
    slug: "geburtshoroskop-big-three-tool",
    seoTitle:
      "Geburtshoroskop & Big Three: Sonne, Mond, Aszendent richtig berechnen",
    metaDescription:
      "Big Three verständlich: Sonne, Mond, Aszendent – warum Uhrzeit und Ort Pflicht sind, was du im kostenlosen Tool bekommst und wie du weitergehst.",
    keywords: [
      "Geburtshoroskop",
      "Big Three",
      "Aszendent berechnen",
      "Sonne Mond Aszendent",
      "Astrologie Tool",
    ],
    accent: "violet",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Sternenhimmel – Geburtshoroskop & Big Three",
    content: [
      "## Was „Big Three“ überhaupt meint",
      "**Sonne:** Kern, langfristige Ausrichtung, woran du dich entwickelst. **Mond:** emotionale Sprache, was dich reguliert, was dich schnell triggert oder beruhigt. **Aszendent:** wie du auf andere wirkst, wie du Neues startest – oft bevor du „Sonne“-typisch reagierst. Zusammen sind sie deutlich aussagekräftiger als das Sonnenzeichen allein. Vertiefung: [Big 3 Bedeutung](/big-3-bedeutung), Einstieg: [Geburtshoroskop erstellen](/geburtshoroskop-erstellen).",
      "## Warum Uhrzeit und Ort nicht optional sind",
      "Der Aszendent hängt daran, **welches Zeichen am östlichen Horizont** zur Geburtsminute aufging – das ändert sich schnell. Ohne verlässliche Geburtszeit und Ort wird der Aszendent schlicht falsch oder nicht bestimmbar. Auch die **Häuser** (Lebensbereiche im Rad) brauchen diese Daten. Kurz erklärt: [Aszendent berechnen](/aszendent-berechnen).",
      "## Häufiger Fehler",
      "Eine „ungefähre“ Uhrzeit erfinden, damit „irgendein“ Aszendent passt – das verwässert alles Folgende. Besser: ehrlich mit Unsicherheit umgehen und mit dem arbeiten, was stabil bleibt (siehe [Geburtszeit unbekannt](/blog/geburtszeit-unbekannt-astrologie)).",
      "## Was du mit dem kostenlosen Tool bekommst",
      "- Eingabe von Datum, Uhrzeit und Ort\n- Berechnung von Sonne, Mond und Aszendent\n- Klartext-Einordnung, wie sich das im Alltag anfühlen kann – ohne verschwommenes Esoterik-Vokabular",
      "## Nächster Schritt",
      "Trag deine Daten im [Geburtshoroskop-Tool](/tools/birth-chart) ein. Wenn du danach in Planeten, Häuser und Profil einsteigen willst, gibt es optional den Vollreport – der erste Schritt bleibt bewusst niederschwellig.",
    ].join("\n\n"),
    footerCta: {
      title: "Big Three jetzt berechnen",
      description:
        "Kostenloses Tool: Datum, Uhrzeit, Ort – deine Sonne, dein Mond, dein Aszendent.",
      cta: { label: "Zum Geburtshoroskop-Tool", href: "/tools/birth-chart" },
    },
  },
  {
    title:
      "Paaranalyse & Synastry: Wie sich zwei Horoskope wirklich treffen (nicht nur zwei Sternzeichen)",
    slug: "paaranalyse-synastry-astrologie",
    seoTitle:
      "Paaranalyse & Synastrie: Kompatibilität jenseits vom Sternzeichen",
    metaDescription:
      "Synastrie verständlich: Venus, Mars, Mond und Aspekte – warum zwei Sonnenzeichen nicht reichen und wie du mit dem Tool sinnvoll startest.",
    keywords: [
      "Paaranalyse",
      "Synastrie",
      "Kompatibilität Astrologie",
      "Partnerhoroskop",
      "Beziehung Horoskop",
    ],
    accent: "rose",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Zwei Horoskope – Paaranalyse & Synastry",
    content: [
      "## Zwei Sternzeichen reichen nicht",
      "Sun-Sign-Vergleiche sind ein Einstieg – schnell, einprägsam, aber dünn. Echte Paardynamik zeigt sich, wenn Planeten **zwischen** euren Charts in Beziehung treten: z. B. Venus (Nähe, Werte, was ihr schön findet), Mars (Antrieb, Konfliktstil), Mond (emotionale Sprache, Regulation). Einstieg ohne Fachchinesisch: [Sternzeichen-Kompatibilität](/sternzeichen-kompatibilitaet) und der [Beziehungs-Hub](/beziehung).",
      "## Was Synastrie in der Praxis bringt",
      "- Wo ihr euch leicht trefft – und wo es wieder knallt\n- Welche Themen sich wiederholen (Kommunikation, Vertrauen, Tempo, Geld, Familie)\n- Konkrete Einordnung statt pauschalem „passt / passt nicht“",
      "## So gehst du mit dem Tool vor",
      "- Kurzer Check mit Sternzeichen ist möglich\n- Für belastbare Ergebnisse: **Datum, Uhrzeit und Ort** für beide Personen\n- Danach siehst du die Synastrie im Kontext – im [Kompatibilitäts-Tool](/tools/compatibility)",
      "## Häufige Fehlannahme",
      "Viele wollen ein Ja/Nein. In der Praxis geht es um **Dynamik**: Wo entstehen Trigger, wo ergänzt ihr euch, wo braucht ihr Übersetzung? Genau dort ist der Mehrwert einer Paaranalyse – nicht als Schicksal, sondern als Gesprächs- und Reflexionshilfe.",
      "## Fazit",
      "Beziehung lebt von Klarheit. Wenn ihr versteht, wie eure Charts sich begegnen, wird aus „wir sind halt verschieden“ oft ein benennbares Muster – und damit ein Ansatzpunkt statt Endlos-Schleife.",
      "## Nächster Schritt",
      "[Kompatibilitäts-Tool](/tools/compatibility) öffnen, Daten eintragen, gemeinsam die Auswertung lesen. Hintergrund: [Synastrie einfach erklärt](/synastrie-einfach-erklaert), [Beziehungsanalyse](/beziehungsanalyse-astrologie).",
    ].join("\n\n"),
    footerCta: {
      title: "Paaranalyse starten",
      description:
        "Mit Datum, Uhrzeit und Ort für beide – Synastrie im Kontext statt Sternzeichen-Ratekarte.",
      cta: { label: "Zur Kompatibilität", href: "/tools/compatibility" },
    },
  },
  {
    title: "Die 12 Häuser im Geburtshoroskop: Lebensfelder statt Esoterik-Rätsel",
    slug: "haeuser-geburtshoroskop-bedeutung",
    seoTitle:
      "12 Häuser im Geburtshoroskop: Bedeutung ohne Fachchinesisch",
    metaDescription:
      "Häuser im Horoskop: was die zwölf Lebensfelder meinen, warum Ort und Uhrzeit zählen – und wie du Planeten im Haus im Alltag nutzt.",
    keywords: [
      "Häuser Horoskop",
      "Geburtshoroskop Häuser",
      "12 Häuser Astrologie",
      "Big 3",
      "Astrologie erklärt",
    ],
    accent: "violet",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Geburtshoroskop und Häuser",
    content: [
      "## Kurz gesagt: Häuser sind Schauplätze, keine mystischen „Energien“",
      "Die zwölf Häuser teilen das Geburtshoroskop-Rad in **Lebensbereiche** (Themenfelder), in denen sich deine Planeten zeigen: z. B. Selbstbild, Werte/Komfort, Kommunikation, Zuhause/Familie, Kreativität, Arbeit/Gesundheit, Partnerschaft, geteilte Ressourcen, Weltbild, Karriere/öffentliche Rolle, Freundeskreis, Rückzug/Inneres. Ein Planet **in** einem Haus beschreibt eher **wo** ein Thema typischerweise aufläuft – nicht „wer du bist“ im Sinne eines Etiketts.",
      "## Warum das ohne exakte Geburtsdaten bricht",
      "Häuser werden aus **Aszendent** und Häusersystem (bei uns Placidus) abgeleitet. Ohne verlässliche Geburtszeit und Ort fehlen belastbare Häuser – dann bleiben u. a. Sonnen-, Mond- und Venuszeichen oft der stabilste Teil. Orientierung: [Geburtshoroskop erstellen](/geburtshoroskop-erstellen), [Aszendent berechnen](/aszendent-berechnen).",
      "## Mini-Beispiel",
      "Stell dir vor, du debattierst ständig über Geld oder Vertrauen im Alltag – das kann im Chart stärker im 2., 8. oder 7. Haus sitzen (je nach Gesamtbild). Der Wert liegt nicht im „Bingo“, sondern im **Muster**: Welches Thema wiederholt sich, und welches Bedürfnis steckt dahinter?",
      "## So nutzt du Häuser pragmatisch",
      "- Ordne ein aktuelles Thema einem Bereich zu (z. B. viele Gespräche in der Clique → eher 11./3. Haus-Thema).\n- Frag: Welches Bedürfnis – Sicherheit, Anerkennung, Autonomie, Nähe?\n- Setze **eine** kleine Alltagshandlung, die zu diesem Bedürfnis passt.",
      "## Nächster Schritt",
      "Rad im [Geburtshoroskop-Tool](/tools/birth-chart) rechnen und parallel [Big 3 Bedeutung](/big-3-bedeutung) lesen – so verknüpfst du Planeten mit Lebensfeldern, ohne dich in Deutungsstress zu reden.",
    ].join("\n\n"),
    footerCta: {
      title: "Rad & Häuser berechnen",
      description: "Datum, Uhrzeit, Ort – dann siehst du Planeten in Häusern im Klartext.",
      cta: { label: "Zum Tool", href: "/tools/birth-chart" },
    },
  },
  {
    title: "Aszendent vs. Sternzeichen: der eine Satz, der alles klärt",
    slug: "aszendent-sternzeichen-unterschied",
    seoTitle: "Aszendent vs. Sternzeichen: Unterschied in zwei Minuten",
    metaDescription:
      "Sternzeichen = Sonne. Aszendent = erste Schicht nach außen. Plus Mond – so ergänzen sich die Big 3, und so rechnest du es verlässlich.",
    keywords: [
      "Aszendent Sternzeichen Unterschied",
      "Aszendent Bedeutung",
      "Sonnenzeichen",
      "Big 3",
    ],
    accent: "violet",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Aszendent und Sternzeichen",
    content: [
      "## Sternzeichen = fast immer die Sonne",
      "Die Frage „Welches Sternzeichen bist du?“ meint in der Regel die **Sonne**: dein Kern, dein Entwicklungsthema, worauf du langfristig ausgerichtet bist – und wie du Prioritäten setzt.",
      "## Aszendent = erste Schicht nach außen",
      "Der Aszendent ist das Zeichen, das am **östlichen Horizont** zur Geburtsminute aufging. Er beschreibt oft, wie du **ankommst**, wie du Neues **startest** und welche Rolle du zuerst einlegst – bevor Mond oder Sonne „inhaltlich“ nachziehen. Deshalb kann es sich anfühlen, als wärst du „gar nicht wie dein Sternzeichen“: Innen Sonne, außen zuerst Aszendent.",
      "## Und der Mond?",
      "Der Mond steht für emotionale Sprache, Regulation und Bedürfnisse – oft sichtbar in Stress oder in dem, was dich schnell beruhigt. Sonne + Mond + Aszendent zusammen sind die **Big 3**: [Big 3 Bedeutung](/big-3-bedeutung).",
      "## Merksatz",
      "**Sonne:** wer du langfristig lernst zu sein. **Aszendent:** wie du startest und wirkst. **Mond:** was du emotional brauchst.",
      "## Nächster Schritt",
      "Mit Datum, Uhrzeit und Ort im [Geburtshoroskop-Tool](/tools/birth-chart) rechnen. Schritt-für-Schritt: [Aszendent berechnen](/aszendent-berechnen).",
    ].join("\n\n"),
    footerCta: {
      title: "Aszendent & Big 3",
      description: "Mit Geburtszeit und Ort bekommst du belastbare Werte.",
      cta: { label: "Jetzt berechnen", href: "/tools/birth-chart" },
    },
  },
  {
    title: "Geburtszeit unbekannt: Was Astrologie (noch) für dich tun kann",
    slug: "geburtszeit-unbekannt-astrologie",
    seoTitle:
      "Geburtszeit unbekannt: Horoskop-Teile, die trotzdem Sinn ergeben",
    metaDescription:
      "Ohne Uhrzeit: kein verlässlicher Aszendent, keine Häuser – dafür Sonne, oft Mond und Planeten in Zeichen. Ehrlich erklärt, mit nächstem Schritt im Tool.",
    keywords: [
      "Geburtszeit unbekannt Horoskop",
      "Aszendent ohne Uhrzeit",
      "Mondzeichen",
      "Astrologie",
    ],
    accent: "amber",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Geburtszeit und Horoskop",
    content: [
      "## Was ohne Uhrzeit (fast) sicher fehlt",
      "Aszendent und Häuser brauchen die Erdrotation zur **Geburtsminute** am Geburtsort. Ohne belastbare Uhrzeit sind Aussagen zu Aszendent und Hausstellungen **nicht** verlässlich – und eine erfundene Zeit hilft niemandem.",
      "## Was oft noch stabil nutzbar ist",
      "Das **Sonnenzeichen** bleibt. Der **Mond** kann stabil sein – außer er wechselt am Geburtstag knapp das Zeichen; dann brauchst du die Uhrzeit oder eine astronomische Prüfung. Die übrigen Planeten in Zeichen liefern oft weiterhin Muster für Reflexion (Venus: Nähe/Werte, Mars: Tempo/Konflikt usw.). Beziehungskontext: [Mondzeichen in Beziehungen](/mondzeichen-beziehung).",
      "## Pragmatischer Weg",
      "- Frag nach Geburtsurkunde, Krankenhausbrief oder Familienwissen (auch „früher Nachmittag“ ist besser als nichts).\n- Nutze **keine** Fantasie-Uhrzeit, nur damit ein Aszendent „hinpasst“.\n- Arbeite transparent mit dem, was sicher ist – und markiere Unsicherheit.",
      "## Nächster Schritt",
      "Einstieg [Geburtshoroskop erstellen](/geburtshoroskop-erstellen), dann [Geburtshoroskop-Tool](/tools/birth-chart): so siehst du, welche Bausteine mit deinen Daten sinnvoll sind.",
    ].join("\n\n"),
    footerCta: {
      title: "Tool mit deinen Daten",
      description: "Trag ein, was du weißt – und nutze die stabilen Bausteine.",
      cta: { label: "Zum Geburtshoroskop-Tool", href: "/tools/birth-chart" },
    },
  },
  {
    title: "Big Three im Alltag: Sonne, Mond, Aszendent wirklich anwenden",
    slug: "big-three-im-alltag-praxis",
    seoTitle: "Big 3 im Alltag: Sonne, Mond, Aszendent konkret anwenden",
    metaDescription:
      "Keine Theorie-Schleife: Sonne für Richtung, Mond für Bedürfnisse, Aszendent für Startmodus – mit Mini-Beispielen und Links zu Tool und Big-3-Erklärung.",
    keywords: [
      "Big Three Alltag",
      "Sonne Mond Aszendent",
      "Selbstreflexion Astrologie",
    ],
    accent: "violet",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Big Three im Alltag",
    content: [
      "## Sonne: langfristiger Kompass",
      "Bei größeren Entscheidungen (Jobwechsel, Umzug, Beziehungsklärung) lohnt sich eine ruhige Frage: Was wäre hier **wachstumsrichtig** für mich – nicht maximal bequem, sondern stimmig mit dem, wer ich werden will? Das ist keine Fantasie-Formel, sondern ein Filter gegen reine Kurzfristreaktionen.",
      "## Mond: Bedürfnis-Scanner",
      "Der Mond steht für emotionale Regulation: Schlaf, Nähe, Rückzug, Austausch, Struktur, Bewegung. Mini-Check: „Was brauche ich heute wirklich – und was ist nur Ablenkung?“ In Paarkonflikten zeigt der Mond oft **wie** ihr Stress sprecht – nicht nur **was**. Mehr dazu: [Mondzeichen in Beziehungen](/mondzeichen-beziehung).",
      "## Aszendent: Startmodus",
      "Wie startest du neue Projekte oder schwierige Gespräche: direkt, vorsichtig, charmant, sachlich? Wenn Innen (Sonne) und Außenstart (Aszendent) auseinanderlaufen, fühlt sich das wie Doppelbelastung an – das ist häufig, nicht „falsch“.",
      "## Mini-Alltag",
      "- **Sonne:** eine Entscheidung diese Woche bewusst an deinem langfristigen Thema ausrichten.\n- **Mond:** 10 Minuten täglich für ein echtes Bedürfnis (ohne Screen).\n- **Aszendent:** den ersten Satz in einem schwierigen Talk bewusst entschlacken (kurz, klar, freundlich).",
      "## Nächster Schritt",
      "[Geburtshoroskop-Tool](/tools/birth-chart) mit Datum, Uhrzeit, Ort – plus Lesen: [Big 3 Bedeutung](/big-3-bedeutung).",
    ].join("\n\n"),
    footerCta: {
      title: "Big 3 berechnen",
      description: "Mit Datum, Uhrzeit und Ort – dann wird es konkret.",
      cta: { label: "Zum Rechner", href: "/tools/birth-chart" },
    },
  },
  {
    title: "Was Synastrie nicht kann (und warum das gut ist)",
    slug: "synastrie-grenzen-ehrlich",
    seoTitle:
      "Synastrie: was Paaranalyse kann – und was sie nicht leisten darf",
    metaDescription:
      "Ehrliche Grenzen: keine Therapie, kein Schicksal, kein Gut/Schlecht. Dafür Sprache für Dynamik, Nähe und Konflikt – mit Tool und Lesepfaden.",
    keywords: [
      "Synastrie Grenzen",
      "Paaranalyse Astrologie",
      "Kompatibilität",
    ],
    accent: "rose",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Synastrie und Grenzen",
    content: [
      "## Kein Gut/Schlecht-Urteil",
      "Synastrie beschreibt **Spannungsbögen und Chancen** zwischen zwei Charts – keine Moral. „Passt / passt nicht“ ist Marketing, kein seriöses Modell. In der Praxis geht es um: Wo wird es leicht, wo wird es laut, wo braucht ihr Übersetzung?",
      "## Kein Ersatz für Therapie, Medizin oder Grenzschutz",
      "Bei Gewalt, Kontrolle, Sucht oder psychischer Krise sind Fachstellen entscheidend. Ein Chart ersetzt keine Diagnose, keine Therapie und **keine** Sicherheitsentscheidung.",
      "## Keine Garantie für die Zukunft",
      "Charts zeigen Tendenzen und wiederkehrende Muster. Wie ihr handelt (Kommunikation, Therapie, Pausen, klare Vereinbarungen) bleibt bei euch.",
      "## Was sie sehr wohl kann",
      "Gemeinsame Sprache für Nähe/Distanz, Tempo, Konfliktstil, was euch beruhigt vs. triggert – besonders hilfreich, wenn ihr euch „im Kreis“ fühlt. Technisch: [Kompatibilitäts-Tool](/tools/compatibility). Kontext: [Synastrie einfach erklärt](/synastrie-einfach-erklaert), [Beziehung](/beziehung).",
      "## Kurz-Check",
      "Wenn ihr aus der Auswertung **eine** konkrete Vereinbarung mitnehmt (z. B. „15 Minuten Pause vor Klärung“), habt ihr mehr gewonnen als aus jedem Sternzeichen-Meme.",
    ].join("\n\n"),
    footerCta: {
      title: "Muster sehen, nicht werten",
      description: "Synastrie mit beiden Profilen – sachlich statt mystisch.",
      cta: { label: "Zur Paaranalyse", href: "/tools/compatibility" },
    },
  },
  {
    title: "Mond-Mond in der Synastrie: wenn zwei Gefühlswelten aufeinandertreffen",
    slug: "mond-mond-synastrie-paar",
    seoTitle:
      "Mond–Mond in der Synastrie: emotionale Sprache in der Partnerschaft",
    metaDescription:
      "Warum der Mond in Paarcharts oft wichtiger ist als das Sonnenzeichen: Nähe, Sicherheit, Trigger – und wie du es mit Tool und Mond-Landing nutzt.",
    keywords: [
      "Mond Synastrie",
      "Mondzeichen Beziehung",
      "Paaranalyse",
    ],
    accent: "rose",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Mond in der Synastrie",
    content: [
      "## Der Mond ist kein „Nebenbei“",
      "In der Paaranalyse zeigt der Mond oft, **wie** ihr Stress sprecht, was euch schnell unsicher macht und was euch wieder runterbringt. Das ist in vielen Alltagskonflikten relevanter als ein Sun-Sign-Meme.",
      "## Harmonisch vs. herausfordernd",
      "Nicht jede Mond-Kombination fühlt sich „weich“ an. Manche Konstellationen erzeugen Reibung – und trotzdem kann sie produktiv sein, wenn ihr sie **benennen** und **übersetzen** lernt. Ohne Namen wird aus Reibung schnell persönliche Kritik.",
      "## Im Alltag",
      "- Sprecht über **Bedürfnisse**, nicht nur über Verhalten („du machst immer…“).\n- Vereinbart Signale für „ich bin überfordert“ vs. „ich brauche Nähe“.\n- Nutzt die Auswertung als Gesprächsstarter, nicht als Beweis.",
      "## Nächster Schritt",
      "[Mondzeichen in Beziehungen](/mondzeichen-beziehung) lesen, dann [Kompatibilitäts-Tool](/tools/compatibility) mit beiden Geburtsprofilen – dort siehst du Mond-Kontakte im Gesamtkontext.",
    ].join("\n\n"),
    footerCta: {
      title: "Paar-Chart rechnen",
      description: "Mit Datum, Uhrzeit und Ort für beide Personen.",
      cta: { label: "Zur Synastrie", href: "/tools/compatibility" },
    },
  },
  {
    title: "Venus im Zeichen vs. Venus im Haus: was in Beziehungen wirklich zählt",
    slug: "venus-zeichen-vs-haus-partnerschaft",
    seoTitle:
      "Venus im Zeichen vs. Haus: Liebesstil und Lebensbereiche im Chart",
    metaDescription:
      "Venus-Zeichen: wie du annäherst und was dir gefällt. Venus-Haus: wo das Thema im Leben auftaucht. Mit Hinweis auf Datenqualität und Paar-Tool.",
    keywords: [
      "Venus Zeichen",
      "Venus Haus Horoskop",
      "Beziehung Astrologie",
    ],
    accent: "rose",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Venus in Astrologie",
    content: [
      "## Venus im Zeichen: „Wie“ du liebst und was dir gefällt",
      "Stil der Annäherung, Geschmack, Harmoniebedürfnis, was dich anzieht – das steckt stark im Venuszeichen. Das ist weniger „welches Sternzeichen passt“, sondern: Welche Sprache der Nähe nutzt du?",
      "## Venus im Haus: „Wo“ es im Leben aufflackert",
      "Das Haus zeigt den Bereich, in dem Venus-Themen typischerweise laut werden: z. B. Freundeskreis, Öffentlichkeit, Zuhause, Arbeit, geteilte Finanzen – je nach Gesamtbild. **Ohne verlässliche Geburtszeit** sind Hausstellungen nicht seriös bestimmbar.",
      "## Für Paare: Zeichen ist nicht die ganze Geschichte",
      "Zwei Venuszeichen zu vergleichen ist ein erster Impuls – entscheidend sind oft **Aspekte** zwischen euch: ob ihr euch gegenseitig beruhigt, motiviert oder in dieselben Reibungsmuster treibt. Vertiefung: [Venus & Mars](/venus-mars-kompatibilitaet), technisch: [Paaranalyse](/tools/compatibility).",
    ].join("\n\n"),
    footerCta: {
      title: "Venus & Mars im Chart",
      description: "Komplette Synastrie mit beiden Profilen.",
      cta: { label: "Zur Paaranalyse", href: "/tools/compatibility" },
    },
  },
  {
    title: "Sternzeichen-Match vs. echtes Chart: warum der Unterschied massiv ist",
    slug: "sternzeichen-vs-vollchart-kompatibilitaet",
    seoTitle:
      "Sternzeichen-Match vs. volles Chart: warum der Unterschied so groß ist",
    metaDescription:
      "Sun-Sign ist der Trailer – echte Paardynamik braucht Mond, Venus, Mars und Aspekte. Schrittfolge: Schnellcheck, dann Synastrie-Tool mit vollen Daten.",
    keywords: [
      "Sternzeichen Kompatibilität",
      "Synastrie",
      "Partnerhoroskop",
    ],
    accent: "rose",
    coverImage: "/images/hero-cosmic-eye.png",
    coverAlt: "Kompatibilität und Chart",
    content: [
      "## Der Sun-Sign-Check ist der Trailer",
      "Zwei Sternzeichen zu vergleichen ist schnell, teilbar, leicht zu merken – und deshalb überall. Er fängt einen **kleinen Ausschnitt** ein: vor allem die Sonne als Kernmotiv, nicht eure emotionale Sprache, Nähebedürfnisse oder Konfliktstile.",
      "## Was ein volles Paar-Chart anders macht",
      "**Mond:** wie ihr Stress und Nähe handhabt. **Venus:** was euch verbindet, was ihr schön findet. **Mars:** Tempo, Direktheit, wie Konflikt entsteht und wieder abklingt. **Aspekte** zwischen euch zeigen, ob Themen sich eher verstärken oder ausgleichen – genau dort entstehen viele Alltagsmuster.",
      "## Schrittfolge, die Zeit spart",
      "1. [Sternzeichen-Kompatibilität](/sternzeichen-kompatibilitaet) als Einstieg.\n2. Wenn ihr ernsthaft klären wollt: [Kompatibilitäts-Tool](/tools/compatibility) mit Datum, Uhrzeit, Ort für beide.\n3. Kontext lesen: [Beziehung](/beziehung), [Synastrie einfach erklärt](/synastrie-einfach-erklaert).",
      "## Nächster Schritt",
      "Tool öffnen, Daten sauber eintragen, **gemeinsam** die Auswertung lesen – das reduziert Missverständnisse mehr als jede einzelne Sonnenzeichen-Liste.",
    ].join("\n\n"),
    footerCta: {
      title: "Von Sun-Sign zu Synastrie",
      description: "Mit beiden Geburtsprofilen siehst du die volle Dynamik.",
      cta: { label: "Tool öffnen", href: "/tools/compatibility" },
    },
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 3);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

const POST_LIST_ORDER = [
  "geburtshoroskop-big-three-tool",
  "haeuser-geburtshoroskop-bedeutung",
  "aszendent-sternzeichen-unterschied",
  "geburtszeit-unbekannt-astrologie",
  "big-three-im-alltag-praxis",
  "paaranalyse-synastry-astrologie",
  "synastrie-grenzen-ehrlich",
  "mond-mond-synastrie-paar",
  "venus-zeichen-vs-haus-partnerschaft",
  "sternzeichen-vs-vollchart-kompatibilitaet",
  "compatibility-warum-es-knallt",
  "sternzeichen-ohne-klischees",
] as const;

export function getPosts(): Post[] {
  const rank = new Map<string, number>(
    POST_LIST_ORDER.map((slug, i) => [slug, i]),
  );
  return [...posts].sort((a, b) => {
    const ra = rank.get(a.slug) ?? 999;
    const rb = rank.get(b.slug) ?? 999;
    return ra - rb;
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

