import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";
import { LEGAL_PROVIDER, LEGAL_STAND } from "@/lib/legal";

export const metadata: Metadata = {
  title: "AGB",
  description: `Allgemeine Geschäftsbedingungen von ${SITE_NAME}.`,
};

export default function AgbPage() {
  return (
    <LegalPageShell title="Allgemeine Geschäftsbedingungen (AGB)">
      <p>
        Für alle Verträge zwischen {LEGAL_PROVIDER.name} (nachfolgend
        „Anbieter“) und dir als Kundin bzw. Kunden über digitale Produkte und
        Dienstleistungen von {SITE_NAME} ({CANONICAL_SITE_ORIGIN}) gelten diese
        Allgemeinen Geschäftsbedingungen (AGB) in der zum Zeitpunkt des
        Vertragsschlusses gültigen Fassung.
      </p>

      <h2>§ 1 Geltungsbereich und Vertragspartner</h2>
      <p>
        (1) Diese AGB gelten für Verbraucher im Sinne von § 13 BGB. Unternehmer
        im Sinne von § 14 BGB werden ausdrücklich nicht angesprochen; abweichende
        oder ergänzende Vereinbarungen bedürfen der Schriftform.
      </p>
      <p>
        (2) Vertragspartner ist {LEGAL_PROVIDER.name}, {LEGAL_PROVIDER.street},{" "}
        {LEGAL_PROVIDER.zipCity}, {LEGAL_PROVIDER.country}, erreichbar unter{" "}
        <a href={`mailto:${LEGAL_PROVIDER.email}`}>{LEGAL_PROVIDER.email}</a>.
      </p>

      <h2>§ 2 Vertragsgegenstand</h2>
      <p>
        (1) Gegenstand des Angebots sind digitale Inhalte (z. B. PDFs,
        Berichte, Zugang zu Online-Inhalten) sowie ggf. damit verbundene
        Dienstleistungen, wie auf der Website beschrieben.
      </p>
      <p>
        (2) Eigenschaften und Umfang der jeweiligen Leistung ergeben sich aus
        der Produktbeschreibung auf der Website zum Zeitpunkt der Bestellung.
      </p>

      <h2>§ 3 Vertragsschluss</h2>
      <p>
        (1) Die Darstellung von Produkten auf der Website stellt kein
        rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe einer
        Bestellung dar.
      </p>
      <p>
        (2) Mit Abschluss des Bestellvorgangs (z. B. Klick auf den Button zur
        Zahlung) gibst du ein verbindliches Angebot zum Abschluss eines
        Kaufvertrags ab. Der Vertrag kommt zustande, sobald wir die Annahme
        bestätigen – typischerweise durch automatische Bestätigungs-E-Mail nach
        erfolgreicher Zahlung – oder indem wir dir den Zugang zu den digitalen
        Inhalten bereitstellen.
      </p>
      <p>
        (3) Die Abwicklung der Zahlung erfolgt über den Zahlungsdienstleister
        Stripe. Mit Nutzung des Checkout-Prozesses erklärst du dich mit den für
        Stripe geltenden Bedingungen einverstanden, soweit diese für die
        Zahlungsabwicklung relevant sind.
      </p>

      <h2>§ 4 Preise und Zahlung</h2>
      <p>
        (1) Die auf der Website angegebenen Preise sind Endpreise. Als
        Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer
        ausgewiesen.
      </p>
      <p>
        (2) Die Zahlung erfolgt über die im Checkout angebotenen Zahlungsarten
        (z. B. Kreditkarte, ggf. weitere von Stripe unterstützte Methoden).
        Der Rechnungsbetrag ist mit Vertragsschluss zur Zahlung fällig.
      </p>

      <h2>§ 5 Bereitstellung digitaler Inhalte</h2>
      <p>
        (1) Nach vollständiger Zahlung stellen wir dir die digitalen Inhalte in
        der beschriebenen Form bereit (z. B. Download-Link, E-Mail mit Anhang
        oder Zugang zu einer geschützten Seite).
      </p>
      <p>
        (2) Es besteht keine Verpflichtung zur Bereitstellung von
        physischen Datenträgern, sofern nicht ausdrücklich anders angegeben.
      </p>

      <h2>§ 6 Widerrufsrecht</h2>
      <p>
        Verbraucher haben ein gesetzliches Widerrufsrecht. Die Einzelheiten
        ergeben sich aus der gesonderten{" "}
        <a href="/widerruf" className="underline">
          Widerrufsbelehrung
        </a>{" "}
        und dem Muster-Widerrufsformular.
      </p>
      <p>
        Bei digitalen Inhalten kann das Widerrufsrecht vorzeitig erlöschen,
        wenn du ausdrücklich zustimmst, dass mit der Ausführung vor Ende der
        Widerrufsfrist begonnen wird, und du deine Kenntnis vom vorzeitigen
        Erlöschen des Widerrufsrechts bestätigt hast (§ 356 Abs. 5 BGB).
      </p>

      <h2>§ 7 Gewährleistung und Haftung</h2>
      <p>
        (1) Es gelten die gesetzlichen Gewährleistungsrechte.
      </p>
      <p>
        (2) Für leichte Fahrlässigkeit haften wir nur bei Verletzung
        wesentlicher Vertragspflichten (Kardinalpflichten); die Haftung ist in
        diesem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
        Die vorstehenden Haftungsbeschränkungen gelten nicht bei Vorsatz,
        grober Fahrlässigkeit, Verletzung von Leben, Körper oder Gesundheit
        sowie bei zwingender gesetzlicher Haftung.
      </p>

      <h2>§ 8 Urheberrecht und Nutzung</h2>
      <p>
        Die bereitgestellten Inhalte sind urheberrechtlich geschützt. Eine
        Weitergabe an Dritte, öffentliche Zugänglichmachung oder kommerzielle
        Nutzung ohne ausdrückliche Zustimmung ist nicht gestattet.
      </p>

      <h2>§ 9 Schlussbestimmungen</h2>
      <p>
        (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
        des UN-Kaufrechts. Zwingende Verbraucherschutzvorschriften des Staates,
        in dem du deinen gewöhnlichen Aufenthalt hast, bleiben unberührt, sofern
        sie dir günstiger sind.
      </p>
      <p>
        (2) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise
        unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
        Bestimmungen unberührt.
      </p>

      <p className="text-xs text-black/50 dark:text-white/50">
        Stand: {LEGAL_STAND} · {SITE_NAME}
      </p>
    </LegalPageShell>
  );
}
