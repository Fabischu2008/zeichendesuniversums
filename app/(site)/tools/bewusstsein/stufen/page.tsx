import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import { BewusstseinStufenInfo } from "./BewusstseinStufenInfo";

const path = "/tools/bewusstsein/stufen";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Bewusstseins-Stufen nach Sternzeichen",
  description:
    "Nachschlagewerk: alle acht Bewusstseins-Stufen für jedes Sternzeichen – Planet, Thema, Texte. Ergänzung zum Bewusstseins-Tool; Astrologie und persönliche Entwicklung bei Zeichen des Universums.",
  keywords: [
    "Bewusstseinsstufen",
    "Sternzeichen Stufen",
    "Astrologie Bewusstsein",
    "Sonnenzeichen Bedeutung",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Bewusstseins-Stufen · ${SITE_NAME}`,
    description:
      "Alle Stufen pro Sternzeichen – zum Nachlesen und Vertiefen.",
    url,
    locale: "de_DE",
  },
};

export default function BewusstseinStufenPage() {
  return <BewusstseinStufenInfo />;
}
