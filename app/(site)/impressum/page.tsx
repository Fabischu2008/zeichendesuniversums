import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${SITE_NAME}.`,
};

export default function ImpressumPage() {
  return (
    <LegalPageShell title="Impressum">
      <p className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        Hinweis: Die folgenden Angaben sind Platzhalter. Bitte durch deine
        vollständigen Impressumsdaten ersetzen und bei Bedarf rechtlich prüfen
        lassen.
      </p>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <strong>[Vor- und Nachname oder Firmenname]</strong>
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ und Ort]
        <br />
        [Land, falls nicht Deutschland]
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [optional]
        <br />
        E-Mail: [E-Mail-Adresse]
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [falls
        vorhanden, sonst Absatz entfernen]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>[Name und Anschrift wie oben oder des verantwortlichen Redakteurs]</p>

      <h2>EU-Online-Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse findest du oben im Impressum.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>

      <p className="text-xs text-black/50 dark:text-white/50">
        Stand: [Datum eintragen] · {SITE_NAME} · {CANONICAL_SITE_ORIGIN}
      </p>
    </LegalPageShell>
  );
}
