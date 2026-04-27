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
    seoTitle: "Sternzeichen verstehen – ohne Klischees",
    metaDescription:
      "Kompakte Erklärung, warum Sternzeichen oft missverstanden werden und wie du sie sinnvoll nutzt.",
    keywords: ["sternzeichen", "astrologie", "persönlichkeit"],
    content: [
      "## Warum sich vieles falsch anfühlt",
      "Sternzeichen werden oft als Schubladen benutzt. Sinnvoll wird es erst, wenn du Muster statt Labels liest.",
      "## 3 Fragen, die du dir stellen solltest",
      "- Was triggert mich wirklich?\n- Wie reagiere ich unter Stress?\n- Was ist mein natürlicher Antrieb?",
      "## Nächster Schritt",
      "Hol dir den kostenlosen Guide und starte mit Klarheit statt Rätselraten.",
    ].join("\n\n"),
  },
  {
    title: "Compatibility: Warum es bei euch knallt (und wie es besser geht)",
    slug: "compatibility-warum-es-knallt",
    seoTitle: "Compatibility – Konflikte verstehen",
    metaDescription:
      "Beziehungen scheitern selten an Liebe, sondern an Mustern. So erkennst du sie.",
    keywords: ["compatibility", "beziehung", "kommunikation"],
    content: [
      "## Konflikte sind oft nur Übersetzungsfehler",
      "Wenn ihr unterschiedliche Bedürfnisse habt, braucht ihr eine gemeinsame Sprache.",
      "## 5 typische Reibungspunkte",
      "- Tempo\n- Nähe/Distanz\n- Anerkennung\n- Kontrolle\n- Freiheit",
      "## Mini-Tool",
      "Probier das Compatibility Tool und hol dir die Vollanalyse, wenn du tiefer gehen willst.",
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
      "Geburtshoroskop & Big Three kostenlos berechnen | Sonne, Mond, Aszendent",
    metaDescription:
      "Was Big Three in der Astrologie bedeuten und wie du Sonne, Mond und Aszendent exakt zu deinem Geburtszeitpunkt berechnest – mit kostenlosem Tool.",
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
      "Paaranalyse & Synastry – astrologische Kompatibilität verstehen",
    metaDescription:
      "Warum echte Kompatibilität mehr ist als „Passt Widder zu Löwe?“ – Synastry, Aspekte und wie du es mit einem Tool konkret machst.",
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

