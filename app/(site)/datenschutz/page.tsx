import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${SITE_NAME} – Informationen zur Verarbeitung personenbezogener Daten.`,
};

export default function DatenschutzPage() {
  return (
    <LegalPageShell title="Datenschutzerklärung">
      <p className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        Hinweis: Diese Datenschutzerklärung ist eine strukturierte Vorlage mit
        typischen Punkten für diese Website (Formular, E-Mail, Hosting, Shop).
        Bitte Inhalte an deine konkrete Datenverarbeitung anpassen und
        rechtlich prüfen lassen.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <br />
        <strong>[Vor- und Nachname oder Firmenname]</strong>
        <br />
        [Straße und Hausnummer, PLZ Ort]
        <br />
        E-Mail: [E-Mail-Adresse]
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird gehostet bei{" "}
        <strong>[Anbieter, z. B. Vercel Inc.]</strong>. Beim Aufruf der Seiten
        können technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des
        Abrufs) verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO (berechtigtes Interesse an einem sicheren und effizienten
        Betrieb).
      </p>

      <h2>3. Kontaktaufnahme und Freebie (E-Mail-Formular)</h2>
      <p>
        Wenn du das Formular für den kostenlosen Guide nutzt, verarbeiten wir
        die von dir angegebenen Daten (z. B. Vorname, Nachname, E-Mail-Adresse,
        optional Telefon), um deine Anfrage zu bearbeiten und den Zugang zum
        PDF bereitzustellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
        (Vertrag/Anbahnung) bzw. Art. 6 Abs. 1 lit. a DSGVO, soweit eine
        Einwilligung erforderlich ist.
      </p>
      <p>
        Für den Versand von Transaktions-E-Mails kann ein Dienst wie{" "}
        <strong>Resend</strong> eingesetzt werden. Es gelten die
        Datenschutzbestimmungen des jeweiligen Anbieters.
      </p>

      <h2>4. Bestellungen und Zahlungen (Shop)</h2>
      <p>
        Wenn du über unseren Shop bestellst, verarbeiten wir die zur
        Vertragsabwicklung erforderlichen Daten. Zahlungen können über{" "}
        <strong>Stripe</strong> abgewickelt werden. Dabei gelten die
        Datenschutzhinweise von Stripe. Rechtsgrundlage ist Art. 6 Abs. 1 lit.
        b DSGVO.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Soweit wir technisch notwendige Cookies einsetzen, erfolgt dies auf
        Grundlage von Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TTDSG. Für
        nicht notwendige Cookies würde – sofern eingesetzt – eine Einwilligung
        nach § 25 Abs. 1 TTDSG i. V. m. Art. 6 Abs. 1 lit. a DSGVO erforderlich
        sein; passe diesen Absatz an dein tatsächliches Cookie-Setup an.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die
        jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen
        dies erfordern.
      </p>

      <h2>7. Deine Rechte</h2>
      <p>Du hast nach der DSGVO insbesondere folgende Rechte:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <h2>8. Änderungen</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
        stets den aktuellen rechtlichen Anforderungen entspricht.
      </p>

      <p className="text-xs text-black/50 dark:text-white/50">
        Stand: [Datum eintragen] · {SITE_NAME} · {CANONICAL_SITE_ORIGIN}
      </p>
    </LegalPageShell>
  );
}
