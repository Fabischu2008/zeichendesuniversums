#!/usr/bin/env python3
import json
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

import swisseph as swe
from timezonefinder import TimezoneFinder


PLANETS = {
    "sun": swe.SUN,
    "moon": swe.MOON,
    "mercury": swe.MERCURY,
    "venus": swe.VENUS,
    "mars": swe.MARS,
    "jupiter": swe.JUPITER,
    "saturn": swe.SATURN,
    "uranus": swe.URANUS,
    "neptune": swe.NEPTUNE,
    "pluto": swe.PLUTO,
}


def main() -> int:
    payload = json.loads(sys.stdin.read())
    cases = payload.get("cases", [])
    tf = TimezoneFinder(in_memory=True)
    out = []
    skipped = 0

    for c in cases:
        lat = float(c["lat"])
        lon = float(c["lon"])
        utc_iso = c.get("utc")
        if isinstance(utc_iso, str) and utc_iso:
            tz_name = "UTC(from-app)"
            utc = datetime.fromisoformat(utc_iso.replace("Z", "+00:00")).astimezone(ZoneInfo("UTC"))
        else:
            date = c["date"]
            time = c["time"]
            tz_name = tf.timezone_at(lat=lat, lng=lon) or tf.closest_timezone_at(lat=lat, lng=lon)
            if not tz_name:
                skipped += 1
                continue
            local = datetime.fromisoformat(f"{date}T{time}:00").replace(tzinfo=ZoneInfo(tz_name))
            utc = local.astimezone(ZoneInfo("UTC"))
        hour_ut = utc.hour + utc.minute / 60.0 + utc.second / 3600.0
        jd_ut = swe.julday(utc.year, utc.month, utc.day, hour_ut, swe.GREG_CAL)

        planets = {}
        for key, body in PLANETS.items():
            lon_deg = swe.calc_ut(jd_ut, body)[0][0] % 360.0
            planets[key] = lon_deg

        out.append({"id": c["id"], "tz": tz_name, "planets": planets})

    sys.stdout.write(json.dumps({"results": out, "skipped": skipped}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
