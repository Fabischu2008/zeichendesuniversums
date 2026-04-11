/**
 * API-Key für Profil-Link & transaktionale Mails (Resend).
 * Zuerst eigener Key (z. B. zweites Resend-Projekt), sonst globaler `RESEND_API_KEY`.
 */
export function getResendApiKeyForProfileMail(): string {
  return (
    process.env.ZD_RESEND_PROFILE_KEY?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    ""
  );
}
