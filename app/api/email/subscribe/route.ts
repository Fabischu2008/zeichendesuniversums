import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;
  // Server-side route => safe to use service role.
  return createClient(supabaseUrl, serviceRoleKey);
}

// Supabase SQL (Table Editor → SQL, einmal ausführen wenn Spalten fehlen):
// alter table public.email_signups add column if not exists first_name text;
// alter table public.email_signups add column if not exists last_name text;
// alter table public.email_signups add column if not exists phone text;

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

  const supabase = getSupabase();
  const resolvedSource = source || "freebie";

  if (!supabase) {
    return NextResponse.json({ ok: true, source: resolvedSource, saved: false });
  }

  const baseRow = {
    email,
    source: resolvedSource,
    first_name: firstName,
    last_name: lastName,
  };
  const payload: typeof baseRow & { phone?: string } = { ...baseRow };
  if (phoneRaw) payload.phone = phoneRaw;

  let { error } = await supabase
    .from("email_signups")
    .upsert(payload, { onConflict: "email" });

  if (error && phoneRaw) {
    const retry = await supabase
      .from("email_signups")
      .upsert(baseRow, { onConflict: "email" });
    error = retry.error;
  }

  if (error) {
    return NextResponse.json(
      { ok: false, message: "DB speichern fehlgeschlagen." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, source: resolvedSource, saved: true });
}

