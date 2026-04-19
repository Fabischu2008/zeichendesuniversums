import type { Metadata } from "next";
import Link from "next/link";
import { EmailForm } from "@/components/EmailForm";
import { SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/partnerschaft";
const url = absoluteUrl(path);

export const metadata: Metadata = {
  title: "Kostenloses Partnerschafts-PDF",
  description:
    "Kostenloser PDF-Guide zu Beziehung & Partnerschaft – Muster erkennen, Nähe stärken, klare Schritte. Von Zeichen des Universums; ideal vor der Paaranalyse.",
  keywords: [
    "Partnerschaft PDF",
    "Beziehung kostenlos",
    "Paar Guide",
    "Kommunikation Beziehung",
    "Astrologie Partnerschaft",
    "Zeichen des Universums",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: `Kostenloses Partnerschafts-PDF · ${SITE_NAME}`,
    description:
      "PDF zu Beziehung & Partnerschaft – kompakt, ohne Buzzwords. E-Mail eintragen, sofort downloaden.",
    url,
    locale: "de_DE",
  },
};

export default function PartnerschaftFreebiePage() {
  return (
    <div className="space-y-6">
      <Link
        href="/beziehung"
        className="inline-block text-sm text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
      >
        ← Zur Beziehungs‑Landingpage
      </Link>
      <div className="grid gap-8 lg:gap-10 md:grid-cols-2 md:items-start">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Kostenloses PDF: Partnerschaft &amp; Beziehung
        </h1>
        <p className="text-black/70 dark:text-white/70">
          Für alle, die ihre Verbindung bewusster gestalten wollen – ob du
          gerade datetest, in einer Partnerschaft steckst oder Freundschaften
          vertiefen willst. Kompakt, ohne esoterisches Geschwurbel.
        </p>
        <div className="rounded-3xl border border-black/5 bg-white/60 p-5 text-sm sm:p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold tracking-tight">Was du bekommst</p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">
            PDF zum Speichern &amp; Mitnehmen.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-black/80 dark:text-white/80">
            <li>• Wie Nähe und Distanz in Beziehungen wirken – und was du daraus ableiten kannst</li>
            <li>• Typische Kommunikationsmuster zwischen Menschen (ohne Schuldzuweisung)</li>
            <li>• Mini-Reflexion: Was brauchst du wirklich in der Verbindung?</li>
            <li>• Konkrete Impulse für den nächsten ehrlichen Schritt</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 text-sm sm:p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold tracking-tight">Quick Preview</p>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Beispiel‑Ausschnitt:
          </p>
          <div className="mt-4 space-y-3 rounded-2xl bg-black/5 p-4 text-sm text-black/80 dark:bg-white/10 dark:text-white/80">
            <p className="font-medium">Wenn Gespräche im Kreis laufen …</p>
            <p className="text-black/70 dark:text-white/70">
              Oft stecken unterschiedliche Bedürfnisse dahinter – z. B. Sicherheit
              vs. Freiraum. Klarheit schafft Spielraum für beide Seiten.
            </p>
            <p className="text-black/70 dark:text-white/70">
              <span className="font-medium">Impuls:</span> Eine Sache benennen,
              die du schätzt – bevor du den nächsten Wunsch formulierst.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-semibold tracking-tight">
          Jetzt kostenlos laden
        </h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Vorname, Nachname und E‑Mail (Telefon optional). Danach öffnet sich die
          Download‑Seite mit dem PDF.
        </p>
        <div className="mt-6">
          <EmailForm
            redirectTo="/partnerschaft/download"
            source="freebie_partnerschaft"
            submitLabel="PDF kostenlos laden"
          />
        </div>
        <p className="mt-4 text-xs text-black/50 dark:text-white/50">
          Kein Spam. Abmelden jederzeit möglich.
        </p>
      </div>
    </div>
    </div>
  );
}
