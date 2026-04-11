/**
 * API-Key für Profil-Link & transaktionale Mails (Resend).
 * Standard: `RESEND_API_KEY` (wie `/api/email/subscribe`).
 * Optional: `ZD_RESEND_PROFILE_KEY` nur wenn kein `RESEND_API_KEY` gesetzt ist
 * oder beide Keys absichtlich getrennt sind – sind **beide** gesetzt, gewinnt
 * `RESEND_API_KEY`, damit kein veralteter Test-Key in ZD den Live-Key überstimmt.
 */
export function getResendApiKeyForProfileMail(): string {
  const main = process.env.RESEND_API_KEY?.trim();
  const zd = process.env.ZD_RESEND_PROFILE_KEY?.trim();
  if (main && zd) return main;
  return zd || main || "";
}
