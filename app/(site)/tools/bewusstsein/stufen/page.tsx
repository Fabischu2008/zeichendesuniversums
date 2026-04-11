import type { Metadata } from "next";
import { BewusstseinStufenInfo } from "./BewusstseinStufenInfo";

export const metadata: Metadata = {
  title: "Stufen nach Sternzeichen",
  description:
    "Alle acht Bewusstseins-Stufen für jedes Sonnenzeichen: Planet, Thema und Beschreibungen – zum Nachlesen.",
};

export default function BewusstseinStufenPage() {
  return <BewusstseinStufenInfo />;
}
