import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildLeadEmailBodies, leadEmailSubject } from "@/lib/email-lead";
import { getResendFromForProfileMail } from "@/lib/email-resend-from";

export const runtime = "nodejs";

function isValidEmail(addr: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr);
}

/** Standard-Empfänger; per LEAD_TO_EMAIL in .env überschreiben. */
const DEFAULT_LEAD_TO_EMAIL = "zeichendesuniversums.info@gmail.com";

type SheetLeadPayload = {
  source: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  page?: string;
};

async function sendLeadToSheet(payload: SheetLeadPayload) {
  /** Read at request time — top-level `process.env.*` can be inlined empty at build on Vercel. */
  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim() || "";
  if (!webhookUrl) return;
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        created_at: new Date().toISOString(),
        ...payload,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(
        "[email/subscribe] LEADS_WEBHOOK_URL HTTP",
        res.status,
        await res.text().catch(() => ""),
      );
    } else {
      console.info("[email/subscribe] Lead webhook OK", res.status);
    }
  } catch (e) {
    // Ein fehlgeschlagenes Sheet-Logging darf niemals den Formularfluss blockieren.
    console.error("[email/subscribe] Google Sheets Webhook fehlgeschlagen:", e);
  }
}

/**
 * Leads per E-Mail (Resend).
 * .env.local: RESEND_API_KEY=re_… (https://resend.com → API Keys)
 * Optional: LEAD_TO_EMAIL, RESEND_FROM (Absender: getResendFromForProfileMail in lib/email-resend-from.ts)
 *
 * Hinweis: Mit onboarding@resend.dev darfst du testweise nur an die Adresse
 * senden, mit der du bei Resend registriert bist (hier: zeichendesuniversums.info@gmail.com).
 * Eigene Domain bei Resend verifizieren → beliebige Empfänger + RESEND_FROM setzen.
 */

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        email?: unknown;
        source?: unknown;
        phone?: unknown;
        first_name?: unknown;
        last_name?: unknown;
      }
    | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source =
    typeof body?.source === "string" ? body.source.trim().slice(0, 64) : "";
  const phoneRaw =
    typeof body?.phone === "string" ? body.phone.trim().slice(0, 32) : "";
  const firstName =
    typeof body?.first_name === "string"
      ? body.first_name.trim().slice(0, 80)
      : "";
  const lastName =
    typeof body?.last_name === "string"
      ? body.last_name.trim().slice(0, 80)
      : "";

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, message: "Bitte Vor- und Nachname eingeben." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Bitte eine gültige E‑Mail eingeben." },
      { status: 400 },
    );
  }

  const resolvedSource = source || "freebie";
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (
    process.env.LEAD_TO_EMAIL?.trim() || DEFAULT_LEAD_TO_EMAIL
  ).toLowerCase();
  const from = getResendFromForProfileMail();

  if (!apiKey) {
    await sendLeadToSheet({
      source: resolvedSource,
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phoneRaw || undefined,
      page: "/api/email/subscribe",
    });

    // Kein harter Fehler: Nutzer soll trotzdem zum PDF. E-Mail nur, wenn Key gesetzt ist.
    console.warn(
      "[email/subscribe] RESEND_API_KEY fehlt – Lead-E-Mail nicht gesendet. .env.local: RESEND_API_KEY=re_… (resend.com) bzw. in Vercel → Environment Variables.",
    );
    return NextResponse.json({
      ok: true,
      source: resolvedSource,
      saved: false,
      message:
        "E-Mail-Versand nicht aktiv: RESEND_API_KEY fehlt in der Server-Umgebung.",
    });
  }

  const { textBody, htmlBody } = buildLeadEmailBodies({
    resolvedSource,
    firstName,
    lastName,
    email,
    phoneRaw,
  });

  const resend = new Resend(apiKey);

  const payload = {
    from,
    to: [to] as string[],
    subject: leadEmailSubject(firstName, lastName, resolvedSource),
    text: textBody,
    html: htmlBody,
    replyTo: email,
  };

  try {
    let result = await resend.emails.send(payload);

    if (result.error) {
      console.warn(
        "[email/subscribe] Resend 1. Versuch:",
        JSON.stringify(result.error),
      );
      result = await resend.emails.send({
        from,
        to: [to],
        subject: payload.subject,
        text: textBody,
        html: htmlBody,
        replyTo: email,
      });
    }

    if (result.error) {
      console.error(
        "[email/subscribe] Resend endgueltig fehlgeschlagen:",
        JSON.stringify(result.error),
        "| Logs: resend.com → Emails / Logs. Mit onboarding@resend.dev oft nur Zustellung an die E-Mail deines Resend-Accounts – LEAD_TO_EMAIL muss dieselbe sein, oder eigene Domain verifizieren.",
      );
      return NextResponse.json({
        ok: true,
        source: resolvedSource,
        saved: false,
        message:
          result.error.message ||
          "Resend hat den Versand abgelehnt. Bitte Absender/Domain und API-Key prüfen.",
      });
    }

    console.info(
      "[email/subscribe] Resend OK, email_id:",
      result.data?.id ?? "?",
      "an",
      to,
    );

    await sendLeadToSheet({
      source: resolvedSource,
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phoneRaw || undefined,
      page: "/api/email/subscribe",
    });

    return NextResponse.json({ ok: true, source: resolvedSource, saved: true });
  } catch (e) {
    console.error("[email/subscribe] Resend Netzwerk/Exception:", e);
    return NextResponse.json({
      ok: true,
      source: resolvedSource,
      saved: false,
      message:
        "Netzwerkfehler beim E-Mail-Versand. Bitte später erneut versuchen.",
    });
  }
}
