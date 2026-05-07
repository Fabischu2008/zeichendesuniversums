import type { AstroProfileResult } from "@/lib/astro/profile";

const SESSION_KEY = "zd:astro:session_v1";
const UNLOCK_KEY = "zd:vollreport:unlocked_v1";

/** Nach setVollreportUnlocked / fehlgeschlagenem ?unlock=-Redeem — Profil-Page hört zu und aktualisiert den Zugriffs-State. */
export const VOLLREPORT_UNLOCK_STORAGE_EVENT = "zd:vollreport-unlock-storage-v1";

export type StoredPlace = {
  id: string;
  label: string;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};

export type StoredBig3 = {
  sun: string;
  moon: string;
  ascendant: string;
  meta?: { tz?: string; utc?: string };
};

export type StoredAstroSessionV1 = {
  version: 1;
  birthdate: string;
  birthtime: string;
  place: StoredPlace;
  big3?: StoredBig3 | null;
  profile?: AstroProfileResult | null;
  savedAt: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function readAstroSession(): StoredAstroSessionV1 | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const o = parsed as Partial<StoredAstroSessionV1>;
    if (o.version !== 1 || !o.birthdate || !o.birthtime || !o.place) return null;
    return o as StoredAstroSessionV1;
  } catch {
    return null;
  }
}

export function writeAstroSession(session: StoredAstroSessionV1): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* quota / private mode */
  }
}

/** Legt Geburtsdaten, optional Big 3 und Profil im Browser ab (ohne Server). */
export function mergeAstroSession(
  partial: Partial<StoredAstroSessionV1> &
    Pick<StoredAstroSessionV1, "birthdate" | "birthtime" | "place">,
): void {
  const prev = readAstroSession();
  const birthContextChanged = Boolean(
    prev &&
      (prev.birthdate !== partial.birthdate ||
        prev.birthtime !== partial.birthtime ||
        prev.place.id !== partial.place.id ||
        prev.place.lat !== partial.place.lat ||
        prev.place.lon !== partial.place.lon),
  );
  const next: StoredAstroSessionV1 = {
    version: 1,
    birthdate: partial.birthdate,
    birthtime: partial.birthtime,
    place: partial.place,
    big3:
      partial.big3 !== undefined
        ? partial.big3
        : birthContextChanged
          ? null
          : (prev?.big3 ?? null),
    profile:
      partial.profile !== undefined
        ? partial.profile
        : birthContextChanged
          ? null
          : (prev?.profile ?? null),
    savedAt: new Date().toISOString(),
  };
  writeAstroSession(next);
}

export function setStoredProfile(profile: AstroProfileResult | null): void {
  const prev = readAstroSession();
  if (!prev) return;
  writeAstroSession({
    ...prev,
    profile,
    savedAt: new Date().toISOString(),
  });
}

export function setVollreportUnlocked(unlocked: boolean): void {
  if (!isBrowser()) return;
  try {
    if (unlocked) {
      localStorage.setItem(UNLOCK_KEY, "1");
    } else {
      localStorage.removeItem(UNLOCK_KEY);
    }
  } catch {
    /* */
  }
  try {
    window.dispatchEvent(
      new CustomEvent(VOLLREPORT_UNLOCK_STORAGE_EVENT, {
        detail: { unlocked: hasVollreportUnlocked() },
      }),
    );
  } catch {
    /* */
  }
}

export function hasVollreportUnlocked(): boolean {
  if (!isBrowser()) return false;
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}
