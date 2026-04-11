"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PRODUCT_ID_ASTRO_VOLLPROFIL } from "@/lib/cms";

/**
 * MVP ohne Stripe: E-Mail erfassen, dann /success mit gleichem Profil-Produkt.
 */
export function CheckoutCollectEmail({ productId }: { productId: string }) {
  const [email, setEmail] = useState("");
  const vollprofil = productId === PRODUCT_ID_ASTRO_VOLLPROFIL;

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    q.set("productId", productId);
    const trimmed = email.trim();
    if (trimmed) q.set("email", trimmed);
    window.location.href = `/success?${q.toString()}`;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-black/5 bg-white/60 p-8 dark:border-white/10 dark:bg-white/5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          {vollprofil
            ? "Wir senden dir den persönlichen Profil-Link an deine E-Mail. Optional kannst du die Adresse leer lassen und den Link nur auf der nächsten Seite kopieren."
            : "Optional: E-Mail für die Bestätigung. Du kannst sie auch leer lassen."}
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-black dark:text-white">
            E-Mail (empfohlen)
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            autoComplete="email"
            className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm dark:border-white/15 dark:bg-black/20"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Weiter zur Bestätigung
        </button>
      </form>
      <p className="text-center text-xs text-black/50 dark:text-white/50">
        <Link href="/shop" className="underline-offset-2 hover:underline">
          Zurück zum Shop
        </Link>
      </p>
    </div>
  );
}
