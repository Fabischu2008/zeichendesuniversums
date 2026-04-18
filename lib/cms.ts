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

export type Post = {
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
};

/** Checkout / Produkt-ID für das astrologische Vollprofil (Vollreport). Nicht im Shop-Katalog. */
export const PRODUCT_ID_ASTRO_VOLLPROFIL = "p_birth_profile" as const;
export const PRICE_ASTRO_VOLLPROFIL = 11.11;

/** Exakte Paaranalyse (Synastry) – Shop-Eintrag + später Checkout / Success wie Vollprofil. */
export const PRODUCT_ID_COMPAT_PAARANALYSE = "p_compat_full" as const;
export const PRICE_COMPAT_PAARANALYSE = 22.22;

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

export function getPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

