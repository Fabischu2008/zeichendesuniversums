"use client";

import { useEffect } from "react";

/**
 * Entfernt `email` aus der URL ohne Reload (verhindert erneuten Auto-Versand beim Aktualisieren).
 */
export function StripSuccessEmailQuery() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    if (!u.searchParams.has("email")) return;
    u.searchParams.delete("email");
    window.history.replaceState(null, "", u.pathname + u.search + u.hash);
  }, []);
  return null;
}
