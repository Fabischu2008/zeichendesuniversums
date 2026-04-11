"use client";

import { useEffect } from "react";
import { setVollreportUnlocked } from "@/lib/astro/profile-client-storage";

/** Setzt nach erfolgreichem Kauf des Vollprofils das Freischalt-Flag im Browser. */
export function VollreportUnlockOnSuccess({ active }: { active: boolean }) {
  useEffect(() => {
    if (active) {
      setVollreportUnlocked(true);
    }
  }, [active]);
  return null;
}
