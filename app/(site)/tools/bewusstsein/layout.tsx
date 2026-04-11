import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bewusstseins-Stufen",
  description:
    "Ordne dich deiner Lebensbühne zu: zwölf Sternzeichen, acht Stufen – Selbsteinschätzung und nächste Schritte.",
};

export default function BewusstseinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
