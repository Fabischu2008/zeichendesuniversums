import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";
import {
  LEGAL_PHONE,
  LEGAL_PROVIDER,
  LEGAL_STAND,
  LEGAL_UST_ID,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${SITE_NAME}.`,
};

export default function ImpressumPage() {
  return (
    <LegalPageShell title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <strong>{LEGAL_PROVIDER.name}</strong>
        <br />
        {LEGAL_PROVIDER.street}
        <br />
        {LEGAL_PROVIDER.zipCity}
        <br />
        {LEGAL_PROVIDER.country}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href={`mailto:${LEGAL_PROVIDER.email}`}>{LEGAL_PROVIDER.email}</a>
        {LEGAL_PHONE ? (
          <>
            <br />
            Telefon: {LEGAL_PHONE}
          </>
        ) : null}
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer
        ausgewiesen.
      </p>
      <p>
        {LEGAL_UST_ID ? (
          <>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
            <strong>{LEGAL_UST_ID}</strong>
          </>
        ) : (
          <>
            Die Umsatzsteuer-Identifikationsnummer gemäß § 27 a
            Umsatzsteuergesetz wird nach Erhalt hier ergänzt.
          </>
        )}
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {LEGAL_PROVIDER.name}
        <br />
        {LEGAL_PROVIDER.street}, {LEGAL_PROVIDER.zipCity}
      </p>

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
      <p>
        Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
        Stand: {LEGAL_STAND} · {SITE_NAME} · {CANONICAL_SITE_ORIGIN}
      </p>
    </LegalPageShell>
  );
}
