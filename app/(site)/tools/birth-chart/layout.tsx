import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/birth-chart";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Geburtshoroskop & Big Three",
  description:
    "Kostenloses Astro-Tool: Sonne, Mond und Aszendent exakt berechnen – persönliches Geburtshoroskop und Horoskop-Grundlagen. Praktische Astrologie bei Zeichen des Universums.",
  keywords: [
    "Geburtshoroskop",
    "Big Three",
    "Sonne Mond Aszendent",
    "Astrologie",
    "Horoskop berechnen",
    "Aszendent",
    "Sternzeichen",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Geburtshoroskop & Big Three · ${SITE_NAME}`,
    description:
      "Horoskop-Tool: Big Three exakt zu Datum, Uhrzeit und Ort – Astrologie ohne Fuzzis.",
    url,
    locale: "de_DE",
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Geburtshoroskop & Big Three · ${SITE_NAME}`,
    description:
      "Sonne, Mond, Aszendent berechnen – kostenloses Geburtshoroskop-Tool.",
    images: socialTwitterImages(),
  },
};

export default function BirthChartLayout({ children }: { children: ReactNode }) {
  return children;
}
