"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutClient({
  searchParams,
}: {
  searchParams?: Promise<{ productId?: string }>;
}) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function go() {
      const sp = await searchParams;
      const productId =
        sp?.productId && typeof sp.productId === "string" ? sp.productId : "";
      await new Promise((r) => setTimeout(r, 900));
      if (cancelled) return;
      router.replace(`/success${productId ? `?productId=${productId}` : ""}`);
    }

    void go();
    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-3xl border border-black/5 bg-white/60 p-8 text-center dark:border-white/10 dark:bg-white/5">
      <h1 className="text-2xl font-semibold tracking-tight">
        Weiterleitung zu Stripe…
      </h1>
      <p className="text-sm text-black/70 dark:text-white/70">
        (MVP‑Stub) In der echten Version würdest du jetzt Stripe Checkout sehen.
      </p>
    </div>
  );
}

