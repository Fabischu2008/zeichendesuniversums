import type { AstroChartData } from "@/lib/astro/profile";

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function chartAngleFromLongitude(longitude: number, asc: number) {
  return (longitude - asc + 180 + 360) % 360;
}

export function AstroRadixChart({ chart }: { chart: AstroChartData }) {
  const size = 560;
  const c = size / 2;
  const rOuter = 235;
  const rSignsInner = 190;
  const rHousesInner = 120;
  const rPoints = 160;
  const asc = chart.angles.asc;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-auto w-full max-w-[560px]"
      role="img"
      aria-label="Radix Chart"
    >
      <circle cx={c} cy={c} r={rOuter} fill="none" stroke="currentColor" className="text-black/30 dark:text-white/35" />
      <circle
        cx={c}
        cy={c}
        r={rSignsInner}
        fill="none"
        stroke="currentColor"
        className="text-black/20 dark:text-white/25"
      />
      <circle
        cx={c}
        cy={c}
        r={rHousesInner}
        fill="none"
        stroke="currentColor"
        className="text-black/15 dark:text-white/20"
      />

      {chart.houseCusps.map((cusp, idx) => {
        const a = chartAngleFromLongitude(cusp, asc);
        const p0 = polarToCartesian(c, c, rOuter, a);
        const p1 = polarToCartesian(c, c, rHousesInner, a);
        const labelP = polarToCartesian(c, c, (rHousesInner + rSignsInner) / 2, a + 15);
        return (
          <g key={`house-${idx + 1}`}>
            <line
              x1={p0.x}
              y1={p0.y}
              x2={p1.x}
              y2={p1.y}
              stroke="currentColor"
              className="text-black/20 dark:text-white/25"
              strokeWidth="1"
            />
            <text
              x={labelP.x}
              y={labelP.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-black/60 text-[13px] dark:fill-white/65"
            >
              {idx + 1}
            </text>
          </g>
        );
      })}

      {Array.from({ length: 12 }).map((_, idx) => {
        const angle = idx * 30 + 15;
        const p = polarToCartesian(c, c, (rOuter + rSignsInner) / 2, angle);
        return (
          <text
            key={`sign-${idx}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-black/75 text-[20px] dark:fill-white/80"
          >
            {ZODIAC_GLYPHS[idx]}
          </text>
        );
      })}

      {chart.points.map((pt) => {
        const angle = chartAngleFromLongitude(pt.longitude, asc);
        const p = polarToCartesian(c, c, rPoints, angle);
        return (
          <g key={`pt-${pt.key}`} opacity={pt.isSpecial ? 0.82 : 1}>
            <circle cx={p.x} cy={p.y} r={pt.isSpecial ? 8 : 9} fill="currentColor" className="text-violet-600/85 dark:text-violet-300/85" />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-white text-[10px] dark:fill-black"
            >
              {pt.glyph}
            </text>
          </g>
        );
      })}

      {([
        ["ASC", chart.angles.asc],
        ["DSC", chart.angles.dsc],
        ["MC", chart.angles.mc],
        ["IC", chart.angles.ic],
      ] as const).map(([label, lon]) => {
        const angle = chartAngleFromLongitude(lon, asc);
        const p0 = polarToCartesian(c, c, rOuter + 2, angle);
        const p1 = polarToCartesian(c, c, rHousesInner - 10, angle);
        const pl = polarToCartesian(c, c, rOuter + 18, angle);
        return (
          <g key={`angle-${label}`}>
            <line
              x1={p0.x}
              y1={p0.y}
              x2={p1.x}
              y2={p1.y}
              stroke="currentColor"
              className="text-black/55 dark:text-white/60"
              strokeWidth="1.8"
            />
            <text
              x={pl.x}
              y={pl.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-black text-[10px] font-semibold dark:fill-white"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
