import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/astro-map";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Astro-Karte & Astrokartographie",
  description:
    "Interaktive Astro-Karte: Planetenlinien, Einfluss-Zonen und Ortsbezug – Astrokartographie und Relokation für dein persönliches Astro-Horoskop. Tool von Zeichen des Universums.",
  keywords: [
    "Astro-Karte",
    "Astrokartographie",
    "Relokation Astrologie",
    "Planetenlinien",
    "Astrologie Karte",
    "Horoskop Orte",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Astro-Karte & Astrokartographie · ${SITE_NAME}`,
    description:
      "Astro-Karte mit Geburtsdaten: Linien, Qualitäten und Einfluss – praktisch erklärt.",
    url,
    locale: "de_DE",
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Astro-Karte · ${SITE_NAME}`,
    description:
      "Astrokartographie-Tool: Planetenlinien und Ortsbezug berechnen.",
    images: socialTwitterImages(),
  },
};

export default function AstroMapLayout({ children }: { children: ReactNode }) {
  return children;
}
