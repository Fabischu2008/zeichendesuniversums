import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/tools/bewusstsein";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Bewusstsein & Sternzeichen-Stufen",
  description:
    "Bewusstseins-Tool: zwölf Lebensbühnen (Sternzeichen) und acht Stufen der Bewusstheit – Selbsterkenntnis jenseits klassischer Horoskope, praktisch bei Zeichen des Universums.",
  keywords: [
    "Bewusstsein",
    "Bewusstseinsstufen",
    "Sternzeichen Entwicklung",
    "spirituelle Selbsterkenntnis",
    "Astrologie Bewusstsein",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Bewusstsein & Stufen · ${SITE_NAME}`,
    description:
      "Sternzeichen und Bewusstseins-Stufen: wo stehst du – und was wäre der nächste Schritt?",
    url,
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: `Bewusstsein & Stufen · ${SITE_NAME}`,
    description:
      "Tool zu Lebensbühnen und Bewusstseins-Stufen – ohne Geburtsort.",
  },
};

export default function BewusstseinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
