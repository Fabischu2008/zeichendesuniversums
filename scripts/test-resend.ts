/**
 * Lokal: Testet den Resend-Versand (Profil-Link-Mail).
 *
 * 1. `.env.local` mit `ZD_RESEND_PROFILE_KEY=re_...` oder `RESEND_API_KEY=re_...`
 * 2. Empfänger-Adresse als Argument
 *
 *   npm run test:resend -- deine@email.de
 */
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { sendProfileAccessEmail } from "../lib/email-profile-access";

const to = process.argv[2]?.trim();
if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
  console.error("Usage: npm run test:resend -- deine@email.de");
  process.exit(1);
}

if (
  !process.env.ZD_RESEND_PROFILE_KEY?.trim() &&
  !process.env.RESEND_API_KEY?.trim()
) {
  console.error(
    "Kein Resend-Key. Lege in .env.local z. B. an:\n  ZD_RESEND_PROFILE_KEY=re_...\noder RESEND_API_KEY=re_...\n(Siehe .env.example)",
  );
  process.exit(1);
}

const profileUrl =
  process.env.TEST_PROFILE_URL?.trim() ||
  "https://zeichendesuniversums.com/tools/birth-chart/profile?unlock=test-token#vollreport&zd-u=test-token";

void (async () => {
  console.log("Sende Test-Mail an", to, "…");
  const r = await sendProfileAccessEmail({ to, profileUrl });
  if (r.ok) {
    console.log("OK – prüfe Posteingang (und Spam).");
  } else {
    console.error("Fehler:", r.message);
    process.exit(1);
  }
})();
