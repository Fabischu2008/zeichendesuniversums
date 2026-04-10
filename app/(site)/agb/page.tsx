import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "AGB",
  description: `Allgemeine Geschäftsbedingungen von ${SITE_NAME}.`,
};

export default function AgbPage() {
  return (
    <LegalPageShell title="Allgemeine Geschäftsbedingungen (AGB)">
      <p className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        Hinweis: AGB sind für den Shop relevant. Bitte durch einen Anwalt oder
        einen auf dein Geschäftsmodell passenden Generator erstellen und diese
        Vorlage ersetzen.
      </p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über
        die Lieferung von digitalen Produkten und Leistungen zwischen{" "}
        {SITE_NAME} und Verbraucherinnen und Verbrauchern über die Website{" "}
        {CANONICAL_SITE_ORIGIN}.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>[Anpassen: Darstellung des Bestellvorgangs, Zahlung über Stripe, …]</p>

      <h2>§ 3 Preise und Zahlung</h2>
      <p>[Anpassen: Preise inkl. USt., Zahlungsmittel, …]</p>

      <h2>§ 4 Lieferung digitaler Inhalte</h2>
      <p>[Anpassen: Bereitstellung, Zugang, technische Voraussetzungen, …]</p>

      <h2>§ 5 Widerrufsrecht</h2>
      <p>
        Auf das gesetzliche Widerrufsrecht wird auf der Seite „Widerruf“
        gesondert hingewiesen. Bei digitalen Inhalten kann das Widerrufsrecht
        vorzeitig erlöschen, wenn du ausdrücklich zugestimmt hast und die
        Ausführung begonnen hat (§ 356 Abs. 1 BGB i. V. m. den Voraussetzungen
        dort).
      </p>

      <h2>§ 6 Haftung</h2>
      <p>[Anpassen nach deinem Risikoprofil – rechtlich prüfen lassen.]</p>

      <h2>§ 7 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Sofern du Verbraucher bist, gelten die zwingenden
        Verbraucherschutzvorschriften deines Aufenthaltsstaates, sofern diese
        günstiger sind.
      </p>

      <p className="text-xs text-black/50 dark:text-white/50">
        Stand: [Datum eintragen] · {SITE_NAME} · {CANONICAL_SITE_ORIGIN}
      </p>
    </LegalPageShell>
  );
}
