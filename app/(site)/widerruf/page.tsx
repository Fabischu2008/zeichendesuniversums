import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { CANONICAL_SITE_ORIGIN, SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Widerruf",
  description: `Widerrufsbelehrung und Widerrufsformular – ${SITE_NAME}.`,
};

export default function WiderrufPage() {
  return (
    <LegalPageShell title="Widerrufsrecht & Widerrufsformular">
      <p className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        Hinweis: Texte zur Widerrufsbelehrung sind abhängig von digitalen
        Inhalten und ggf. vorzeitigem Verlust des Widerrufsrechts. Bitte durch
        einen Anwalt oder passenden Generator ergänzen.
      </p>

      <h2>Widerrufsbelehrung</h2>
      <p>
        <strong>Widerrufsrecht</strong>
        <br />
        Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen den
        über einen Fernabsatzvertrag geschlossenen Vertrag zu widerrufen. Die
        Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
        [Bei digitalen Inhalten: Ergänzungen zu vorzeitigem Erlöschen nach
        Zustimmung und Beginn der Ausführung – rechtlich prüfen lassen.]
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        [Standardtext zu Rückzahlung und Fristen – anpassen, insbesondere bei
        digitalen Inhalten und Stripe-Abwicklung.]
      </p>

      <h2>Widerrufsformular</h2>
      <p>
        Wenn du den Vertrag widerrufen willst, fülle ein Formular mit folgendem
        Inhalt aus und sende es an [E-Mail oder Adresse]:
      </p>
      <p className="rounded-2xl bg-black/5 p-4 font-mono text-xs dark:bg-white/10">
        An: [Name, Anschrift]
        <br />
        <br />
        Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
        Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der
        folgenden Dienstleistung (*)
        <br />
        <br />
        Bestellt am (*)/erhalten am (*): ________________
        <br />
        Name des/der Verbraucher(s): ________________
        <br />
        Anschrift: ________________
        <br />
        Unterschrift (nur bei Mitteilung auf Papier): ________________
        <br />
        Datum: ________________
        <br />
        <br />(*) Unzutreffendes streichen.
      </p>

      <p className="text-xs text-black/50 dark:text-white/50">
        Stand: [Datum eintragen] · {SITE_NAME} · {CANONICAL_SITE_ORIGIN}
      </p>
    </LegalPageShell>
  );
}
