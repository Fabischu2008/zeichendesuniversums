import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";
import TestHomePage from "./test/page";

export const metadata: Metadata = {
  title: "Zeichen des Universums - Astrologie und Bewusstsein",
  description:
    "Astrologie-Tools, kostenlose Freebies und klare naechste Schritte fuer Selbstverstaendnis und Beziehungsklarheit.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `Zeichen des Universums · ${SITE_NAME}`,
    description:
      "Starte kostenlos mit dem passenden Freebie und gehe danach direkt in die Tools.",
    url: absoluteUrl("/"),
  },
};

export default TestHomePage;
