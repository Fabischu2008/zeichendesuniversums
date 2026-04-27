import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";
import { LEGAL_PROVIDER, LEGAL_STAND } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Informationen zur Verarbeitung personenbezogener Daten bei ${SITE_NAME}.`,
};

export default function DatenschutzPage() {
  return (
    <LegalPageShell title="Datenschutzerklärung">
      <p>
        Mit der folgenden Information informieren wir dich über die Verarbeitung
        personenbezogener Daten beim Nutzen von {SITE_NAME} (
        {CANONICAL_SITE_ORIGIN}).
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <p>
        <strong>{LEGAL_PROVIDER.name}</strong>
        <br />
        {LEGAL_PROVIDER.street}
        <br />
        {LEGAL_PROVIDER.zipCity}
        <br />
        {LEGAL_PROVIDER.country}
        <br />
        E-Mail:{" "}
        <a href={`mailto:${LEGAL_PROVIDER.email}`}>{LEGAL_PROVIDER.email}</a>
      </p>

      <h2>2. Hosting und technische Bereitstellung</h2>
      <p>
        Die Website wird gehostet bei <strong>Vercel Inc.</strong>, 440 N
        Barranca Ave #4133, Covina, CA 91723, USA. Beim Aufruf der Seiten
        werden technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit
        des Abrufs, übertragene Datenmenge, Browsertyp) verarbeitet. Rechtsgrundlage
        ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren
        und stabilen Bereitstellung der Website). Weitere Informationen:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com/legal/privacy-policy
        </a>
        . Eine Verarbeitung in Drittländern (insbesondere den USA) kann nicht
        ausgeschlossen werden; soweit erforderlich, erfolgt die Übermittlung auf
        Grundlage geeigneter Garantien (insbesondere EU-Standardvertragsklauseln).
      </p>

      <h2>3. Server-Logfiles</h2>
      <p>
        Beim rein informatorischen Besuch werden in Logfiles u. a. IP-Adresse,
        Zeitpunkt, angeforderte URL und Statuscodes gespeichert. Die Speicherung
        dient der Sicherheit (Missbrauchserkennung) und der technischen
        Fehleranalyse. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Die Daten
        werden nach Erreichen des Zwecks gelöscht bzw. anonymisiert, soweit
        keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
      </p>

      <h2>4. Kontakt per E-Mail</h2>
      <p>
        Wenn du uns per E-Mail kontaktierst, verarbeiten wir die von dir
        mitgeteilten Daten zur Bearbeitung der Anfrage. Rechtsgrundlage: Art. 6
        Abs. 1 lit. b DSGVO (Vertragsanbahnung/-durchführung) bzw. Art. 6 Abs. 1
        lit. f DSGVO (Kommunikation).
      </p>

      <h2>5. Newsletter und kostenlose Angebote (E-Mail)</h2>
      <p>
        Wenn du dich für den Newsletter oder ein kostenloses Angebot anmeldest,
        verarbeiten wir die von dir angegebenen Daten (z. B. E-Mail-Adresse,
        ggf. Vorname) zum Versand der Inhalte bzw. zur Zustellung des
        kostenlosen Materials. Der Versand erfolgt über den Dienst{" "}
        <strong>Resend</strong> (Resend Inc., USA). Rechtsgrundlage bei
        kostenlosem Lead-Magnet: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
        Rechtsgrundlage bei rein transaktionalen E-Mails im Zusammenhang mit
        einer Bestellung: Art. 6 Abs. 1 lit. b DSGVO. Weitere Informationen:{" "}
        <a
          href="https://resend.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          resend.com/legal/privacy-policy
        </a>
        . Eine Verarbeitung in Drittländern (insbesondere den USA) kann
        stattfinden; soweit erforderlich, erfolgt sie auf Grundlage geeigneter
        Garantien (insbesondere EU-Standardvertragsklauseln).
      </p>
      <p>
        Zur internen Organisation können Anmeldungen zusätzlich über einen
        automatisierten Webhook an <strong>Make (Integromat)</strong> und von
        dort in eine <strong>Google Sheets</strong>-Tabelle übermittelt werden.
        Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) bzw. Art. 6
        Abs. 1 lit. f DSGVO, soweit technisch erforderlich. Hinweise zu Make:{" "}
        <a
          href="https://www.make.com/en/privacy-notice"
          target="_blank"
          rel="noopener noreferrer"
        >
          make.com/en/privacy-notice
        </a>
        ; zu Google:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/privacy
        </a>
        .
      </p>
      <p>
        Du kannst die Einwilligung zur Nutzung deiner E-Mail-Adresse für
        werbliche Zwecke jederzeit mit Wirkung für die Zukunft widerrufen, z. B.
        per E-Mail an {LEGAL_PROVIDER.email} oder über den Abmeldelink in
        unseren E-Mails.
      </p>

      <h2>6. Zahlungen (Stripe)</h2>
      <p>
        Für kostenpflichtige Angebote nutzen wir den Zahlungsdienstleister{" "}
        <strong>Stripe Payments Europe Ltd.</strong>, Irland. Bei einer
        Bestellung werden die zur Abwicklung erforderlichen Zahlungsdaten an
        Stripe übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Mehr
        dazu in der Datenschutzerklärung von Stripe:{" "}
        <a
          href="https://stripe.com/de/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          stripe.com/de/privacy
        </a>
        . Stripe kann Daten in Drittländer (insbesondere die USA) übermitteln;
        dies erfolgt auf Basis der von Stripe bereitgestellten
        Datenschutzgarantien, insbesondere Standardvertragsklauseln.
      </p>

      <h2>7. Terminbuchung (Calendly)</h2>
      <p>
        Sofern du über einen Link auf unserer Website einen Termin bei{" "}
        <strong>Calendly</strong> buchst, gelten die Datenschutzbestimmungen von
        Calendly; wir verarbeiten dabei die von dir dort eingegebenen Daten nur
        soweit zur Durchführung des Termins erforderlich. Rechtsgrundlage: Art.
        6 Abs. 1 lit. b DSGVO.{" "}
        <a
          href="https://calendly.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          calendly.com/privacy
        </a>
      </p>

      <h2>8. Cookies und ähnliche Technologien</h2>
      <p>
        Sofern wir Cookies oder vergleichbare Technologien einsetzen, die nicht
        technisch unbedingt erforderlich sind, holen wir – soweit gesetzlich
        vorgeschrieben – deine Einwilligung ein (TTDSG/DSGVO). Technisch
        notwendige Cookies können auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
        bzw. § 25 Abs. 2 TTDSG eingesetzt werden.
      </p>

      <h2>9. Speicherdauer</h2>
      <p>
        Personenbezogene Daten speichern wir nur so lange, wie es für die
        jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen
        dies erfordern.
      </p>

      <h2>10. Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16
        DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art.
        18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen
        die Verarbeitung (Art. 21 DSGVO), soweit die Voraussetzungen erfüllt
        sind. Sofern die Verarbeitung auf Einwilligung beruht, kannst du diese
        jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).
      </p>
      <p>
        Du hast zudem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren. Zuständig für uns ist u. a. der{" "}
        <strong>
          Landesbeauftragte für den Datenschutz und die Informationsfreiheit
          Rheinland-Pfalz
        </strong>
        , Hintere Bleiche 34, 55116 Mainz,{" "}
        <a href="https://www.datenschutz.rlp.de/">www.datenschutz.rlp.de</a>.
      </p>

      <p className="text-xs text-black/50 dark:text-white/50">
        Stand: {LEGAL_STAND} · {SITE_NAME}
      </p>
    </LegalPageShell>
  );
}
