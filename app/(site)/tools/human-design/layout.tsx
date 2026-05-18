import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/human-design";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Human Design Chart berechnen",
  description:
    "Human Design Bodygraph aus Geburtsdatum, -zeit und -ort: Typ, Strategie, Autorität und Zentren – dein persönliches HD-Chart. Kostenlos testen bei Zeichen des Universums.",
  keywords: [
    "Human Design",
    "Human Design Chart",
    "Bodygraph",
    "HD Typ Strategie",
    "Human Design berechnen",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Human Design Chart · ${SITE_NAME}`,
    description:
      "Bodygraph & Human Design: Typ, Zentren und Profil aus deinen Geburtsdaten.",
    url,
    locale: "de_DE",
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Human Design Chart · ${SITE_NAME}`,
    description:
      "Human Design berechnen: Bodygraph, Typ und Autorität – kostenloses Tool.",
    images: socialTwitterImages(),
  },
};

export default function HumanDesignLayout({ children }: { children: ReactNode }) {
  return children;
}
