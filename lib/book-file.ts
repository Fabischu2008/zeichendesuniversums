import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Liegt außerhalb von /public – nur über den signierten Download-Link erreichbar. */
export const BOOK_BALANCE_RELATIVE_PATH =
  "private/books/sternzeichen-in-balance.pdf";

export const BOOK_BALANCE_DOWNLOAD_NAME = "Dein-Sternzeichen-in-Balance.pdf";

export function getBookBalanceAbsolutePath(): string {
  return path.join(process.cwd(), BOOK_BALANCE_RELATIVE_PATH);
}

function bookPdfUrl(): string {
  return process.env.BOOK_PDF_URL?.trim() ?? "";
}

export function bookBalanceFileExists(): boolean {
  if (existsSync(getBookBalanceAbsolutePath())) return true;
  return bookPdfUrl().startsWith("http");
}

export async function readBookBalancePdf(): Promise<
  | { ok: true; buffer: Buffer }
  | { ok: false; message: string }
> {
  const local = getBookBalanceAbsolutePath();
  if (existsSync(local)) {
    try {
      const buffer = await readFile(local);
      if (buffer.byteLength === 0) {
        return { ok: false, message: "Buchdatei ist leer." };
      }
      return { ok: true, buffer };
    } catch (e) {
      console.error("[book-file] read local", e);
      return { ok: false, message: "Buchdatei konnte nicht gelesen werden." };
    }
  }

  const url = bookPdfUrl();
  if (!url.startsWith("http")) {
    return {
      ok: false,
      message:
        "Buchdatei fehlt (private/books/sternzeichen-in-balance.pdf oder BOOK_PDF_URL).",
    };
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, message: "Buchdatei unter BOOK_PDF_URL nicht erreichbar." };
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.byteLength === 0) {
      return { ok: false, message: "Buchdatei unter BOOK_PDF_URL ist leer." };
    }
    return { ok: true, buffer };
  } catch (e) {
    console.error("[book-file] fetch BOOK_PDF_URL", e);
    return { ok: false, message: "Buchdatei unter BOOK_PDF_URL nicht erreichbar." };
  }
}
