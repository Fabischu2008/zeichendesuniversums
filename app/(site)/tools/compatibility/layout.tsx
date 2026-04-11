import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kompatibilität (Synastry)",
  description:
    "Zwei Geburtsprofile: echte Synastry-Analyse mit Aspekten zwischen Sonne, Mond, Merkur, Venus, Mars, Jupiter und Saturn.",
};

export default function CompatibilityLayout({ children }: { children: ReactNode }) {
  return children;
}
