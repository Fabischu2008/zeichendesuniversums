#!/usr/bin/env python3
import json
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

import swisseph as swe
from timezonefinder import TimezoneFinder


def norm(x: float) -> float:
    v = x % 360.0
    return v + 360.0 if v < 0 else v


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
            utc = datetime.fromisoformat(utc_iso.replace("Z", "+00:00")).astimezone(ZoneInfo("UTC"))
            tz_name = "UTC(from-app)"
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

        try:
            _cusps, ascmc = swe.houses_ex(jd_ut, lat, lon, b"P")
            asc = norm(ascmc[0])
            mc = norm(ascmc[1])
        except Exception:
            skipped += 1
            continue

        sun = norm(swe.calc_ut(jd_ut, swe.SUN)[0][0])
        moon = norm(swe.calc_ut(jd_ut, swe.MOON)[0][0])
        mean_node = norm(swe.calc_ut(jd_ut, swe.MEAN_NODE)[0][0])
        south_node = norm(mean_node + 180.0)
        mean_apog = norm(swe.calc_ut(jd_ut, swe.MEAN_APOG)[0][0])

        chiron = None
        try:
            chiron = norm(swe.calc_ut(jd_ut, swe.CHIRON)[0][0])
        except Exception:
            chiron = None

        out.append(
            {
                "id": c["id"],
                "tz": tz_name,
                "angles": {
                    "asc": asc,
                    "mc": mc,
                    "dsc": norm(asc + 180.0),
                    "ic": norm(mc + 180.0),
                },
                "planets": {"sun": sun, "moon": moon},
                "special": {
                    "north_node": mean_node,
                    "south_node": south_node,
                    "lilith": mean_apog,
                    "chiron": chiron,
                },
            }
        )

    sys.stdout.write(json.dumps({"results": out, "skipped": skipped}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
