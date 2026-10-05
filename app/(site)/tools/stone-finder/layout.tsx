import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/stone-finder";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Stone Finder – welcher Kristall passt jetzt?",
  description:
    "Stone Finder: fünf kurze Fragen zu Absicht, Stimmung und Energie – persönliche Kristall-Empfehlung bei Zeichen des Universums.",
  keywords: [
    "Stone Finder",
    "Kristall finden",
    "Heilstein",
    "welcher Stein passt",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Stone Finder · ${SITE_NAME}`,
    description:
      "Fünf Fragen – persönliche Stein-Empfehlung für deinen aktuellen Zustand.",
    url,
    locale: "de_DE",
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Stone Finder · ${SITE_NAME}`,
    description:
      "Welcher Kristall unterstützt dich gerade? Kurzes Quiz, klare Empfehlung.",
    images: socialTwitterImages(),
  },
};

export default function StoneFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
