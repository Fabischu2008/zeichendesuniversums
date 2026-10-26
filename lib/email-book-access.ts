import { Resend } from "resend";
import {
  BOOK_BALANCE_DOWNLOAD_NAME,
  bookBalanceFileExists,
  readBookBalancePdf,
} from "@/lib/book-file";
import { getResendApiKeyForProfileMail } from "@/lib/email-resend-env";
import { getResendFromForProfileMail } from "@/lib/email-resend-from";
import { isValidProfileEmail } from "@/lib/email-profile-access";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendBookAccessEmail(params: {
  to: string;
  downloadUrl: string;
  includeCall: boolean;
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const { to, downloadUrl, includeCall } = params;
  if (!to || !isValidProfileEmail(to)) {
    return { ok: false, message: "Keine gültige Kunden-E-Mail." };
  }
  if (!downloadUrl.startsWith("http")) {
    return { ok: false, message: "Ungültiger Download-Link." };
  }
  if (!bookBalanceFileExists()) {
    return {
      ok: false,
      message:
        "Buchdatei fehlt (private/books/sternzeichen-in-balance.pdf oder BOOK_PDF_URL). Ohne Datei kein Versand.",
    };
  }

  const apiKey = getResendApiKeyForProfileMail();
  const from = getResendFromForProfileMail();
  if (!apiKey) {
    return {
      ok: false,
      message: "E-Mail-Versand ist nicht konfiguriert (RESEND_API_KEY).",
    };
  }

  const subject = includeCall
    ? "Dein Buch + der nächste Schritt zum Call"
    : "Dein Buch: Sternzeichen in Balance";
  const callHint = includeCall
    ? "\n\nFür den Perspektivenwechsel öffne die Success-Seite oder Calendly und wähle deinen Termin."
    : "";
  const text = [
    "Hallo,",
    "",
    "hier ist dein Buch „Dein Sternzeichen in Balance“.",
    "",
    downloadUrl,
    "",
    "Bitte den Link nicht öffentlich teilen.",
    callHint.trim(),
    "",
    "Viele Grüße",
    "Zeichen des Universums",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const href = downloadUrl.replace(/"/g, "&quot;");
  const html = `
    <p>Hallo,</p>
    <p>hier ist dein Buch <strong>Dein Sternzeichen in Balance</strong>.</p>
    <p><a href="${href}">${escapeHtml(downloadUrl)}</a></p>
    <p>Bitte teile den Link nicht öffentlich.</p>
    ${
      includeCall
        ? "<p>Für den Perspektivenwechsel wählst du als Nächstes deinen Termin.</p>"
        : ""
    }
  `;

  const file = await readBookBalancePdf();
  if (!file.ok) {
    return { ok: false, message: file.message };
  }

  // Resend-Limit im Blick: große Dateien nur als Link, nicht als Anhang.
  const attachments =
    file.buffer.byteLength <= 15 * 1024 * 1024
      ? [
          {
            filename: BOOK_BALANCE_DOWNLOAD_NAME,
            content: file.buffer.toString("base64"),
          },
        ]
      : undefined;

  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
      ...(attachments ? { attachments } : {}),
    });
    if (result.error) {
      return { ok: false, message: result.error.message || "Versand fehlgeschlagen." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email-book-access]", e);
    return { ok: false, message: "Versand fehlgeschlagen." };
  }
}
