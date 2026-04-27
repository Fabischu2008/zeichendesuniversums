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
export const PRICE_ASTRO_VOLLPROFIL = 11.11;

/** Exakte Paaranalyse (Synastry) – Shop-Eintrag + später Checkout / Success wie Vollprofil. */
export const PRODUCT_ID_COMPAT_PAARANALYSE = "p_compat_full" as const;
export const PRICE_COMPAT_PAARANALYSE = 22.22;
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
      "Sternzeichen verstehen ohne Klischees: Bedeutung, Muster und Alltag",
    metaDescription:
      "Sternzeichen ohne Klischees erklärt: Was dein Zeichen wirklich über Persönlichkeit, Stressmuster und Beziehungen zeigt.",
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
      "Viele kennen nur die Kurzversion aus Social Media: \"Du bist X, also bist du immer so.\" Genau das macht Astrologie oberflächlich. In der Praxis geht es nicht um Etiketten, sondern um wiederkehrende Muster.",
      "## Was dein Sternzeichen wirklich beschreibt",
      "Dein Sonnenzeichen zeigt deinen Kern: worauf du ausgerichtet bist, was dir Energie gibt und wie du grundsätzlich Entscheidungen triffst. Es ist ein wichtiger Teil – aber eben nicht das ganze Bild.",
      "## Wo die meisten Fehlinterpretationen entstehen",
      "- **Kontext fehlt:** Verhalten hängt von Situation, Stress und Reifegrad ab.\n- **Einzelaspekt wird überbewertet:** Nur das Sonnenzeichen ohne Mond und Aszendent bleibt zu grob.\n- **Klischees ersetzen Beobachtung:** Aussagen wie \"immer eifersüchtig\" oder \"immer kühl\" bringen dich nicht weiter.",
      "## So nutzt du dein Sternzeichen sinnvoll im Alltag",
      "- Beobachte 2-3 typische Trigger-Situationen pro Woche.\n- Frage dich: \"Was brauche ich hier gerade wirklich?\"\n- Übersetze das in eine konkrete Handlung statt in ein Label.",
      "## Drei Reflexionsfragen für sofortige Klarheit",
      "- Wann fühle ich mich schnell missverstanden?\n- Wie reagiere ich unter Druck: Rückzug, Angriff oder Kontrolle?\n- Welcher kleine Schritt würde mir heute Stabilität geben?",
      "## Fazit",
      "Sternzeichen helfen dann, wenn sie zu ehrlicher Selbstbeobachtung führen. Nicht als Ausrede, sondern als Kompass für bessere Entscheidungen in Beziehung, Arbeit und Alltag.",
      "## Nächster Schritt",
      "Wenn du nach dem Überblick tiefer gehen willst, starte mit deinem kostenlosen Guide oder berechne direkt deine Big 3 für ein klareres Gesamtbild.",
    ].join("\n\n"),
    footerCta: {
      title: "Mehr als nur Sternzeichen",
      description:
        "Berechne Sonne, Mond und Aszendent kostenlos für ein deutlich genaueres Profil.",
      cta: { label: "Big 3 berechnen", href: "/tools/birth-chart" },
    },
  },
  {
    title: "Compatibility: Warum es bei euch knallt (und wie es besser geht)",
    slug: "compatibility-warum-es-knallt",
    seoTitle:
      "Kompatibilität in Beziehungen: Konflikte verstehen und besser lösen",
    metaDescription:
      "Warum es in Beziehungen knallt: typische Muster bei Nähe, Kommunikation und Tempo erkennen und konstruktiv lösen.",
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
      "In vielen Beziehungen liegt das Problem nicht in fehlender Liebe, sondern in wiederkehrenden Mustern. Ihr wollt eigentlich dasselbe – aber in unterschiedlichem Tempo, mit anderer Sprache und anderen Sicherheitsbedürfnissen.",
      "## Konflikte sind oft Übersetzungsfehler",
      "Ein häufiger Fall: Eine Person fordert mehr Nähe, die andere mehr Raum. Ohne Übersetzung klingt das schnell wie Kritik oder Rückzug, obwohl beide eigentlich Verbindung suchen.",
      "## Die fünf häufigsten Reibungspunkte",
      "- **Tempo:** Einer braucht sofort Klärung, der andere erst Abstand.\n- **Nähe/Distanz:** Unterschiedliche Bedürfnisse werden als Ablehnung gedeutet.\n- **Anerkennung:** Was für den einen selbstverständlich ist, fehlt dem anderen als sichtbares Signal.\n- **Kontrolle:** Sicherheit wird über Planung gesucht und als Druck erlebt.\n- **Freiheit:** Autonomie wird eingefordert und als Distanz missverstanden.",
      "## Was Kompatibilität wirklich bedeutet",
      "Kompatibilität heißt nicht \"immer harmonisch\". Sie bedeutet, dass ihr Unterschiede verstehbar macht und bewusst damit umgeht. Genau da hilft astrologische Analyse: Sie zeigt Muster, bevor sie eskalieren.",
      "## Sofort umsetzbarer Gesprächsrahmen",
      "Nehmt euch 15 Minuten pro Woche und beantwortet drei Fragen:\n1. Was hat diese Woche Verbindung gestärkt?\n2. Wo gab es Reibung?\n3. Was brauchen wir beide nächste Woche konkret?",
      "## Fazit",
      "Konflikte sind kein Beweis gegen Beziehung. Sie sind oft ein Hinweis auf fehlende Übersetzung. Wer Muster erkennt, kann Verbindung aktiv gestalten statt nur zu reagieren.",
      "## Nächster Schritt",
      "Starte mit dem Kompatibilitäts-Tool: erst Schnellcheck, dann bei Bedarf die tiefe Synastrie mit beiden Geburtsprofilen.",
    ].join("\n\n"),
    footerCta: {
      title: "Direkt ausprobieren: Paaranalyse",
      description:
        "Synastry mit echten Planetenlagen – kostenlose Vorschau, dann optional die Vollanalyse.",
      cta: { label: "Zur Paaranalyse", href: "/tools/compatibility" },
    },
  },
  {
    title:
      "Geburtshoroskop & Big Three: Sonne, Mond, Aszendent – warum Datum und Ort zählen",
    slug: "geburtshoroskop-big-three-tool",
    seoTitle:
      "Geburtshoroskop & Big Three berechnen: Sonne, Mond, Aszendent",
    metaDescription:
      "Big Three einfach erklärt: So berechnest du Sonne, Mond und Aszendent korrekt mit Datum, Uhrzeit und Geburtsort.",
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
      "Kurz gesagt: Sonne (Kern), Mond (Bedürfnisse, Gefühl) und Aszendent (wie du wirkst und neue Situationen angehst). Zusammen ergeben sie ein viel klareres Bild als das reine Sternzeichen allein.",
      "## Warum Uhrzeit und Ort nicht „Nice to have“ sind",
      "Der Aszendent hängt von der Rotation der Erde ab – ohne Geburtszeit und Ort wird er falsch oder unberechenbar. Sonne und Mond bewegen sich im Alltag schneller, als viele denken: ein paar Stunden können den Mondzeichen-Wechsel oder die Hauslage beeinflussen.",
      "## Was du mit dem kostenlosen Tool bekommst",
      "- Eingabe von Datum, Uhrzeit und Ort\n- Berechnung von Sonne, Mond und Aszendent\n- Einordnung, wie sich das im Alltag anfühlen kann – ohne esoterisches Geschwurbel",
      "## Nächster Schritt",
      "Trag deine Daten ein und sieh dir deine Big Three in Klartext an. Wenn du tiefer in Planeten, Häuser und Profil gehen willst, gibt es danach den Vollreport – aber der erste Schritt ist bewusst kostenlos und verständlich.",
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
      "Paaranalyse & Synastrie: astrologische Kompatibilität verstehen",
    metaDescription:
      "Synastrie verständlich erklärt: Warum echte Kompatibilität mehr ist als Sternzeichen-Matching und welche Aspekte in Beziehungen zählen.",
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
      "Sun-Sign-Vergleiche sind ein Einstieg – aber echte Paardynamik entsteht aus den Planetenlagen und Aspekten zwischen euch: z. B. Venus (Nähe, was ihr schön findet), Mars (Antrieb, Konfliktstil), Mond (emotionale Sprache).",
      "## Was Synastry in der Praxis bringt",
      "- Wo ihr euch natürlich trefft und wo es reibt\n- Welche Themen sich wiederholen (Kommunikation, Vertrauen, Tempo)\n- Konkrete Einordnung statt pauschalem „passt / passt nicht“",
      "## So gehst du mit dem Tool vor",
      "- Kurzer Check mit Sternzeichen möglich\n- Für belastbare Ergebnisse: Datum, Uhrzeit und Ort für beide Personen\n- Danach siehst du die echte Synastry – nicht nur ein Zufalls-Score",
      "## Häufige Fehlannahme",
      "Viele suchen ein „passt / passt nicht“. In der Realität geht es um Dynamik: Wo entstehen Trigger, wo Ergänzung, wo Wachstumschancen? Genau das ist der Mehrwert einer echten Paaranalyse.",
      "## Fazit",
      "Beziehung lebt von Klarheit. Wenn du verstehst, wie eure Horoskope sich begegnen, wird aus „wir sind halt verschieden“ oft ein übersetzbarer Konflikt – und genau dafür ist die Paaranalyse da.",
    ].join("\n\n"),
    footerCta: {
      title: "Paaranalyse starten",
      description:
        "Kostenlose Vorschau, dann exakte Synastry mit vollständigen Geburtsdaten.",
      cta: { label: "Zur Kompatibilität", href: "/tools/compatibility" },
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
  "paaranalyse-synastry-astrologie",
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

