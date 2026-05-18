import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/compatibility";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Paaranalyse & Beziehungs-Kompatibilität",
  description:
    "Paaranalyse und Beziehungstool: Astrologische Kompatibilität für Partnerschaft, Liebe und Freundschaft – echte Synastrie (Partnerhoroskop) mit Aspekten zwischen Sonne, Mond, Venus, Mars und mehr. Direkt vollständig und kostenlos berechenbar bei Zeichen des Universums.",
  keywords: [
    "Paaranalyse",
    "Beziehungstool",
    "Partnerschaft Astrologie",
    "Beziehung Horoskop",
    "Liebeshoroskop",
    "Partnerhoroskop",
    "Synastrie",
    "Kompatibilität Paar",
    "Astro Beziehung",
    "Astrologie Partnerschaft",
    "Horoskop Paar",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Paaranalyse & Beziehungs-Kompatibilität · ${SITE_NAME}`,
    description:
      "Beziehung & Astrologie: Synastrie für zwei Geburtsprofile – Partnerschaft, Dating, Freundschaft.",
    url,
    locale: "de_DE",
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Paaranalyse & Kompatibilität · ${SITE_NAME}`,
    description:
      "Partnerhoroskop & Paaranalyse: Astro-Kompatibilität für Beziehung und Partnerschaft.",
    images: socialTwitterImages(),
  },
};

export default function CompatibilityLayout({ children }: { children: ReactNode }) {
  return children;
}
