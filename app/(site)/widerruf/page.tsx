import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { SITE_NAME } from "@/lib/brand";
import { LEGAL_PROVIDER, LEGAL_STAND } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description: `Widerrufsrecht und Muster-Widerrufsformular bei ${SITE_NAME}.`,
};

export default function WiderrufPage() {
  return (
    <LegalPageShell title="Widerrufsbelehrung">
      <h2>Widerrufsrecht</h2>
      <p>
        Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen.
      </p>
      <p>
        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
        Vertragsschlusses.
      </p>
      <p>
        Um dein Widerrufsrecht auszuüben, musst du uns (
        {LEGAL_PROVIDER.name}, {LEGAL_PROVIDER.street},{" "}
        {LEGAL_PROVIDER.zipCity}, {LEGAL_PROVIDER.country}, E-Mail:{" "}
        <a href={`mailto:${LEGAL_PROVIDER.email}`}>{LEGAL_PROVIDER.email}</a>
        ) mittels einer eindeutigen Erklärung (z. B. ein mit der Post
        versandter Brief oder eine E-Mail) über deinen Entschluss, diesen
        Vertrag zu widerrufen, informieren. Du kannst dafür das beigefügte
        Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absendest.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir
        von dir erhalten haben, unverzüglich und spätestens binnen vierzehn
        Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über deinen
        Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir
        dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion
        eingesetzt hast, es sei denn, mit dir wurde ausdrücklich etwas anderes
        vereinbart; dir werden wegen dieser Rückzahlung keine Entgelte
        berechnet.
      </p>

      <h2>Besondere Hinweise zu digitalen Inhalten</h2>
      <p>
        <strong>Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen
        Inhalten:</strong> Dein Widerrufsrecht erlischt vorzeitig, wenn wir mit
        der Ausführung des Vertrags begonnen haben, nachdem du
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          ausdrücklich zugestimmt hast, dass wir vor Ablauf der Widerrufsfrist
          mit der Ausführung des Vertrags beginnen, und
        </li>
        <li>
          deine Kenntnis davon bestätigt hast, dass du durch deine Zustimmung mit
          Beginn der Ausführung des Vertrags dein Widerrufsrecht verlierst.
        </li>
      </ul>

      <hr className="my-10 border-black/10 dark:border-white/10" />

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn du den Vertrag widerrufen willst, fülle dieses Formular aus und
        sende es zurück.)
      </p>
      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-sm dark:border-white/10 dark:bg-white/[0.03]">
        <p>
          An
          <br />
          {LEGAL_PROVIDER.name}
          <br />
          {LEGAL_PROVIDER.street}
          <br />
          {LEGAL_PROVIDER.zipCity}
          <br />
          {LEGAL_PROVIDER.country}
          <br />
          E-Mail: {LEGAL_PROVIDER.email}
        </p>
        <p className="mt-4">
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der
          folgenden Dienstleistung (*)
        </p>
        <p className="mt-4">
          Bestellt am (*)/erhalten am (*)
          <br />
          _________________________
        </p>
        <p className="mt-4">
          Name des/der Verbraucher(s)
          <br />
          _________________________
        </p>
        <p className="mt-4">
          Anschrift des/der Verbraucher(s)
          <br />
          _________________________
        </p>
        <p className="mt-4">
          Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
          <br />
          _________________________
        </p>
        <p className="mt-4">Datum</p>
        <p className="mt-4 text-xs text-black/60 dark:text-white/60">
          (*) Unzutreffendes streichen.
        </p>
      </div>

      <p className="mt-8 text-xs text-black/50 dark:text-white/50">
        Stand: {LEGAL_STAND} · {SITE_NAME}
      </p>
    </LegalPageShell>
  );
}
