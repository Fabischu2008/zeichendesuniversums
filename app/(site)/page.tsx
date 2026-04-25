import type { Metadata } from "next";
import {
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import TestHomePage from "./test/page";

export const metadata: Metadata = {
  title: "Astrologie-Tools, kostenlose Guides & Bewusstsein",
  description:
    "Zeichen des Universums: kostenlose Guides, Astrologie-Tools und klare naechste Schritte fuer Selbstverstaendnis, Beziehungsklarheit und Bewusstsein.",
  keywords: [
    "Astrologie Tools",
    "kostenlose Guides",
    "Sternzeichen",
    "Beziehung",
    "Paaranalyse",
    "Bewusstsein",
    "Zeichen des Universums",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: `Zeichen des Universums · ${SITE_NAME}`,
    description:
      "Starte kostenlos mit dem passenden Freebie und gehe danach direkt in die Tools.",
    url: absoluteUrl("/"),
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: absoluteUrl(SOCIAL_PREVIEW_IMAGE),
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Zeichen des Universums · ${SITE_NAME}`,
    description:
      "Kostenlose Guides, Astrologie-Tools und klare naechste Schritte fuer deinen Alltag.",
    images: [absoluteUrl(SOCIAL_PREVIEW_IMAGE)],
  },
};

export default TestHomePage;
