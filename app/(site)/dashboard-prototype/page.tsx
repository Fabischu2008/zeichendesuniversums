import type { Metadata } from "next";
import { DashboardPrototypeClient } from "./DashboardPrototypeClient";

export const metadata: Metadata = {
  title: "Dashboard Prototyp",
  description:
    "Interaktiver Dashboard-Prototyp für personalisierte Strategien auf Basis des Geburtshoroskops.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function DashboardPrototypePage() {
  return <DashboardPrototypeClient />;
}
