import type { Metadata } from "next";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { GeburtshoroskopLandingFunnel } from "@/components/GeburtshoroskopLandingFunnel";
import { LandingHeroCtas } from "@/components/LandingHeroCtas";
import { SITE_NAME } from "@/lib/brand";
import {
  socialOpenGraphImages,
  socialTwitterImages,
} from "@/lib/social-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/geburtshoroskop-erstellen";

export const metadata: Metadata = {
  title: "Kostenloses Geburtshoroskop berechnen – vollständiges Profil",
  description:
    "Gib Geburtsdatum, Uhrzeit und Ort ein und öffne dein vollständiges astrologisches Profil kostenlos.",
  alternates: { canonical: path },
  openGraph: {
    title: `Kostenloses Geburtshoroskop · ${SITE_NAME}`,
    description:
      "Kostenlos berechnen und direkt das vollständige Profil mit Planeten, Häusern und Aspekten öffnen.",
    url: absoluteUrl(path),
    images: socialOpenGraphImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: `Kostenloses Geburtshoroskop · ${SITE_NAME}`,
    description:
      "Geburtsdatum, Uhrzeit, Ort – vollständiges Profil kostenlos öffnen.",
    images: socialTwitterImages(),
  },
};

const faqs: FaqItem[] = [
  {
    question: "Ist die Berechnung von Sonne, Mond und Aszendent wirklich kostenlos?",
    answer:
      "Ja. Du gibst Datum, Uhrzeit und Geburtsort ein und siehst sofort deine Big 3 – ohne E-Mail, ohne Anmeldung, ohne Zahlung.",
  },
  {
    question: "Was bekomme ich nach der Berechnung?",
    answer:
      "Du wirst direkt zum vollständigen astrologischen Profil geführt: mit Big 3, Planeten, Häusern, Aspekten und ausformulierten Deutungen.",
  },
  {
    question: "Muss ich zahlen oder mich anmelden?",
    answer:
      "Nein. Die Berechnung und das vollständige Profil sind kostenlos und ohne Anmeldung nutzbar.",
  },
  {
    question: "Was, wenn ich meine Geburtszeit nicht kenne?",
    answer:
      "Sonne und Mond werden auch ohne exakte Uhrzeit ungefähr richtig. Der Aszendent braucht die Geburtszeit – ohne sie kannst du das Vollprofil ohne Aszendent erhalten oder zuerst die Geburtszeit aus deiner Geburtsurkunde nachreichen.",
  },
  {
    question: "Was kostet das Geburtshoroskop?",
    answer:
      "Die Berechnung im Tool ist kostenlos. Nur der ausführliche Vollreport ist kostenpflichtig.",
  },
];

export default function GeburtshoroskopLandingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">

      <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-violet-500/10 via-white to-white p-6 sm:p-8 dark:from-violet-400/15 dark:via-black dark:to-black">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-55px] h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-violet-200/15 dark:border-violet-300/10 animate-[spin_90s_linear_infinite]"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
          Persönliches Geburtshoroskop
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Sonne, Mond &amp;{" "}
          <em className="italic text-violet-700 dark:text-violet-300">
            Aszendent
          </em>{" "}
          kostenlos berechnen
        </h1>
        <p className="mt-4 text-base leading-relaxed text-black/75 dark:text-white/75">
          Gib Datum, Uhrzeit und Geburtsort ein und starte direkt dein
          vollständiges Geburtshoroskop - ohne E-Mail, ohne Anmeldung, ohne
          Zahlung.
        </p>

        <LandingHeroCtas />
      </section>

      <GeburtshoroskopLandingFunnel />
      <FaqSection id="geburtshoroskop" items={faqs} />

    </div>
  );
}
