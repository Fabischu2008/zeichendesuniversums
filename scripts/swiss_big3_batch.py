#!/usr/bin/env python3
import json
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

import swisseph as swe
from timezonefinder import TimezoneFinder


SIGNS = [
    "Widder",
    "Stier",
    "Zwillinge",
    "Krebs",
    "Loewe",
    "Jungfrau",
    "Waage",
    "Skorpion",
    "Schuetze",
    "Steinbock",
    "Wassermann",
    "Fische",
]


def sign_name(lon: float) -> str:
    x = lon % 360.0
    return SIGNS[int(x // 30) % 12]


def main() -> int:
    raw = sys.stdin.read()
    payload = json.loads(raw)
    cases = payload.get("cases", [])

    tf = TimezoneFinder(in_memory=True)
    out = []
    skipped = 0

    for c in cases:
        date = c["date"]
        time = c["time"]
        lat = float(c["lat"])
        lon = float(c["lon"])

        tz_name = tf.timezone_at(lat=lat, lng=lon) or tf.closest_timezone_at(lat=lat, lng=lon)
        if not tz_name:
            skipped += 1
            continue

        local = datetime.fromisoformat(f"{date}T{time}:00").replace(tzinfo=ZoneInfo(tz_name))
        utc = local.astimezone(ZoneInfo("UTC"))
        hour_ut = utc.hour + utc.minute / 60.0 + utc.second / 3600.0
        jd_ut = swe.julday(utc.year, utc.month, utc.day, hour_ut, swe.GREG_CAL)

        sun_lon = swe.calc_ut(jd_ut, swe.SUN)[0][0]
        moon_lon = swe.calc_ut(jd_ut, swe.MOON)[0][0]
        # Placidus houses; ascmc[0] = Ascendant longitude.
        try:
            _cusps, ascmc = swe.houses_ex(jd_ut, lat, lon, b"P")
            asc_lon = ascmc[0]
        except Exception:
            skipped += 1
            continue

        out.append(
            {
                "id": c["id"],
                "tz": tz_name,
                "sun": sign_name(sun_lon),
                "moon": sign_name(moon_lon),
                "ascendant": sign_name(asc_lon),
            }
        )

    sys.stdout.write(json.dumps({"results": out, "skipped": skipped}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
