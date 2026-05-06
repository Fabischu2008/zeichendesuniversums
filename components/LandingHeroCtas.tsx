"use client";

import type { MouseEvent } from "react";

const SCROLL_OFFSET_PX = 24;

function scrollToTarget(targetId: string, focusInputId?: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(targetId);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY - SCROLL_OFFSET_PX;
  window.scrollTo({ top, behavior: "smooth" });

  if (focusInputId) {
    window.setTimeout(() => {
      const input = document.getElementById(focusInputId);
      if (input instanceof HTMLInputElement) {
        try {
          input.focus({ preventScroll: true });
        } catch {
          input.focus();
        }
      }
    }, 600);
  }
}

export function LandingHeroCtas() {
  function onPrimary(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToTarget("daten-eingeben", "landing-birthdate-input");
    history.replaceState(null, "", "#daten-eingeben");
  }

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="#daten-eingeben"
          onClick={onPrimary}
          className="inline-flex h-12 items-center justify-center rounded-full bg-violet-700 px-6 text-sm font-semibold text-white transition hover:bg-violet-600"
        >
          Jetzt kostenloses Profil starten
        </a>
      </div>
      <p className="mt-3 text-xs text-black/55 dark:text-white/55">
        Kostenlos & ohne E-Mail · Direkt zum vollständigen Profil
      </p>
    </>
  );
}
