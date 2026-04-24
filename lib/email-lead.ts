import { EMAIL_FROM_DISPLAY, SITE_NAME } from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function leadEmailSubject(
  firstName: string,
  lastName: string,
  resolvedSource?: string,
) {
  const tag =
    resolvedSource && resolvedSource !== "freebie"
      ? ` · ${resolvedSource}`
      : "";
  return `[${SITE_NAME}] Neuer Lead${tag}: ${firstName} ${lastName}`;
}

export function buildLeadEmailBodies(params: {
  resolvedSource: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneRaw: string;
}) {
  const { resolvedSource, firstName, lastName, email, phoneRaw } = params;
  const previewText = `Neuer Lead von ${firstName} ${lastName} (${resolvedSource}).`;
  const lines = [
    previewText,
    "",
    `${SITE_NAME} - Lead Eingang`,
    "------------------------------",
    `Quelle: ${resolvedSource}`,
    `Name: ${firstName} ${lastName}`,
    `E-Mail: ${email}`,
    phoneRaw ? `Telefon: ${phoneRaw}` : null,
  ].filter(Boolean) as string[];

  const textBody = lines.join("\n");
  const siteUrl = absoluteUrl("/");
  const logoUrl = absoluteUrl("/images/logo-eye-inline.png");

  const rows = [
    ["Quelle", resolvedSource],
    ["Name", `${firstName} ${lastName}`],
    ["E-Mail", email],
    ...(phoneRaw ? ([["Telefon", phoneRaw]] as const) : []),
  ];

  const innerRows = rows
    .map(
      ([k, v]) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:120px;vertical-align:top;">${escapeHtml(k)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:15px;vertical-align:top;">${escapeHtml(v)}</td>
    </tr>`,
    )
    .join("");

  const htmlBody = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:24px;background:#f1f5f9;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(previewText)}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;">
    <tr>
      <td style="padding:0 0 20px 0;">
        <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;color:#0f172a;">
          <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:0 14px 0 0;vertical-align:middle;">
                <img src="${escapeHtml(logoUrl)}" alt="" width="56" height="56" style="display:block;border-radius:12px;"/>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:18px;font-weight:700;letter-spacing:-0.02em;">${escapeHtml(SITE_NAME)}</span>
              </td>
            </tr>
          </table>
        </a>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border-radius:16px;padding:8px 0 0 0;box-shadow:0 4px 24px rgba(15,23,42,0.08);overflow:hidden;">
        <div style="padding:20px 22px 8px 22px;">
          <p style="margin:0;font-size:15px;font-weight:600;color:#7c3aed;">Neuer Lead</p>
          <p style="margin:8px 0 0 0;font-size:14px;line-height:1.5;color:#64748b;">Neuer Lead über die Website – Details in der Tabelle.</p>
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          ${innerRows}
        </table>
        <div style="padding:16px 22px 22px 22px;">
          <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;">Antworte direkt auf diese E-Mail, um ${escapeHtml(firstName)} zu kontaktieren (Reply-To ist gesetzt).</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 4px 0 4px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">${escapeHtml(SITE_NAME)} · <a href="${escapeHtml(siteUrl)}" style="color:#7c3aed;text-decoration:none;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { textBody, htmlBody };
}

export function defaultResendFrom() {
  return `${EMAIL_FROM_DISPLAY} <onboarding@resend.dev>`;
}
