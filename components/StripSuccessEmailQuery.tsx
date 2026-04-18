"use client";

import { useEffect } from "react";

/**
 * Entfernt sensible Query-Parameter (`email`, `ap`, `apa`, `apb`) aus der URL ohne Reload.
 */
export function StripSuccessEmailQuery() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    let changed = false;
    if (u.searchParams.has("email")) {
      u.searchParams.delete("email");
      changed = true;
    }
    for (const k of ["ap", "apa", "apb"] as const) {
      if (u.searchParams.has(k)) {
        u.searchParams.delete(k);
        changed = true;
      }
    }
    if (!changed) return;
    window.history.replaceState(null, "", u.pathname + u.search + u.hash);
  }, []);
  return null;
}
