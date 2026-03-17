export type ProductCategory = "guide" | "compatibility" | "manifestation";

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

const products: Product[] = [
  {
    id: "p_guide_aries",
    name: "Sternzeichen Guide: Widder (Mini-Report)",
    slug: "guide-widder",
    price: 9,
    description:
      "Klartext über Antrieb, Trigger und Beziehungen – kompakt & umsetzbar.",
    image: "/images/product-guide.jpg",
    category: "guide",
    content:
      "Du bekommst einen kompakten Report mit Persönlichkeit, Stärken, Schattenseiten und 5 konkreten Alltag-Impulsen.",
    fileUrl: "/downloads/guide-widder.pdf",
  },
  {
    id: "p_compat_full",
    name: "Compatibility Vollanalyse (2 Zeichen)",
    slug: "compatibility-vollanalyse",
    price: 9,
    description:
      "Die komplette Beziehungsanalyse mit Stärken, Reibungspunkten und Lösungen.",
    image: "/images/product-compat.jpg",
    category: "compatibility",
    content:
      "Ideal für Dating, Beziehung oder Freundschaft – inkl. Kommunikations- und Konflikt-Guide.",
    fileUrl: "/downloads/compatibility.pdf",
  },
  {
    id: "p_manifest",
    name: "Manifestation Blueprint",
    slug: "manifestation-blueprint",
    price: 19,
    description:
      "Ein strukturierter Plan, der zu deinem Zeichen passt – statt 100 Methoden gleichzeitig.",
    image: "/images/product-manifest.jpg",
    category: "manifestation",
    content:
      "Du bekommst Rituale, Fokus-Framework und Wochenplan – abgestimmt auf deinen Stil.",
    fileUrl: "/downloads/manifestation.pdf",
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

