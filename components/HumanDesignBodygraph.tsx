type HumanDesignBodygraphProps = {
  definedCenters: string[];
  channels?: string[];
  gates?: number[];
};

type GateDot = { gate: number; x: number; y: number; size?: "xs" | "sm" | "md" };
type ChannelPath = { key: string; d: string };
type CenterShape = { key: string; d: string };

const CENTER_SHAPES: CenterShape[] = [
  { key: "Kopf", d: "M180 24 L216 90 H144 Z" },
  // Ajna must be an inverted triangle in standard bodygraph layout.
  { key: "Ajna", d: "M148 98 H212 L180 158 Z" },
  { key: "Kehle", d: "M144 162 H216 A8 8 0 0 1 224 170 V246 A8 8 0 0 1 216 254 H144 A8 8 0 0 1 136 246 V170 A8 8 0 0 1 144 162 Z" },
  { key: "G", d: "M180 256 L224 292 L180 328 L136 292 Z" },
  // Ego points to the right.
  { key: "Herzzentrum", d: "M222 282 L278 304 L222 340 Z" },
  // Solar plexus is a tilted right-facing quadrilateral.
  { key: "Solarplexus-Zentrum", d: "M238 344 L278 318 L312 352 L272 388 Z" },
  // Spleen is a mirrored left-facing quadrilateral.
  { key: "Milz", d: "M138 282 L82 304 L82 388 L138 342 Z" },
  { key: "Sakralzentrum", d: "M144 334 H216 A8 8 0 0 1 224 342 V414 A8 8 0 0 1 216 422 H144 A8 8 0 0 1 136 414 V342 A8 8 0 0 1 144 334 Z" },
  { key: "Wurzelzentrum", d: "M144 426 H216 A8 8 0 0 1 224 434 V502 A8 8 0 0 1 216 510 H144 A8 8 0 0 1 136 502 V434 A8 8 0 0 1 144 426 Z" },
];

const GATE_DOTS: GateDot[] = [
  // Head
  { gate: 64, x: 166, y: 84 }, { gate: 61, x: 180, y: 84 }, { gate: 63, x: 194, y: 84 },
  // Ajna
  { gate: 47, x: 160, y: 121 }, { gate: 24, x: 180, y: 121 }, { gate: 4, x: 200, y: 121 },
  { gate: 17, x: 164, y: 141 }, { gate: 11, x: 196, y: 141 }, { gate: 43, x: 180, y: 155 },
  // Throat
  { gate: 62, x: 158, y: 192 }, { gate: 23, x: 180, y: 192 }, { gate: 56, x: 202, y: 192 },
  { gate: 16, x: 158, y: 212 }, { gate: 20, x: 158, y: 230 }, { gate: 31, x: 158, y: 244 },
  { gate: 35, x: 202, y: 212 }, { gate: 12, x: 202, y: 230 }, { gate: 45, x: 202, y: 244 },
  { gate: 8, x: 180, y: 244 },
  // G
  { gate: 1, x: 180, y: 268 }, { gate: 7, x: 166, y: 290 }, { gate: 13, x: 194, y: 290 },
  { gate: 10, x: 154, y: 308 }, { gate: 15, x: 170, y: 308 }, { gate: 46, x: 190, y: 308 },
  { gate: 2, x: 180, y: 322 }, { gate: 25, x: 208, y: 290 },
  // Ego
  { gate: 21, x: 238, y: 304 }, { gate: 26, x: 230, y: 326 }, { gate: 40, x: 254, y: 342 }, { gate: 51, x: 224, y: 292 },
  // Spleen
  { gate: 48, x: 96, y: 306 }, { gate: 57, x: 104, y: 322 }, { gate: 44, x: 114, y: 338 },
  { gate: 50, x: 114, y: 356 }, { gate: 32, x: 104, y: 372 }, { gate: 28, x: 96, y: 388 }, { gate: 18, x: 104, y: 402 },
  // Solar Plexus
  { gate: 37, x: 286, y: 324 }, { gate: 22, x: 296, y: 340 }, { gate: 36, x: 306, y: 356 },
  { gate: 6, x: 258, y: 356 }, { gate: 49, x: 278, y: 356 }, { gate: 55, x: 296, y: 370 }, { gate: 30, x: 306, y: 386 },
  // Sacral
  { gate: 5, x: 166, y: 350 }, { gate: 14, x: 180, y: 350 }, { gate: 29, x: 194, y: 350 },
  { gate: 34, x: 166, y: 370 }, { gate: 27, x: 166, y: 388 }, { gate: 42, x: 166, y: 404 },
  { gate: 3, x: 180, y: 404 }, { gate: 9, x: 194, y: 370 }, { gate: 59, x: 194, y: 388 },
  // Root
  { gate: 53, x: 166, y: 444 }, { gate: 60, x: 180, y: 444 }, { gate: 52, x: 194, y: 444 },
  { gate: 54, x: 166, y: 462 }, { gate: 38, x: 166, y: 480 }, { gate: 58, x: 166, y: 496 },
  { gate: 19, x: 194, y: 462 }, { gate: 39, x: 194, y: 480 }, { gate: 41, x: 194, y: 496 },
];

const CHANNEL_PATHS: ChannelPath[] = [
  { key: "64-47", d: "M168 90 L162 120" },
  { key: "61-24", d: "M180 90 L180 120" },
  { key: "63-4", d: "M192 90 L198 120" },
  { key: "17-62", d: "M164 142 L158 190" },
  { key: "43-23", d: "M180 156 L180 190" },
  { key: "11-56", d: "M196 142 L202 190" },
  { key: "31-7", d: "M158 244 L166 290" },
  { key: "8-1", d: "M180 244 L180 268" },
  { key: "33-13", d: "M202 244 L194 290" },
  { key: "20-10", d: "M158 230 C154 268 154 296 154 308" },
  { key: "20-34", d: "M158 230 C160 290 162 344 166 370" },
  { key: "45-21", d: "M202 244 C216 268 228 290 238 304" },
  { key: "12-22", d: "M202 230 C246 272 282 320 296 340" },
  { key: "35-36", d: "M202 212 C254 260 292 324 306 356" },
  { key: "48-16", d: "M96 306 C116 262 136 232 158 212" },
  { key: "57-20", d: "M104 322 C122 284 142 252 158 230" },
  { key: "57-10", d: "M104 322 C124 316 140 312 154 308" },
  { key: "34-57", d: "M166 370 C142 358 122 340 104 322" },
  { key: "10-34", d: "M154 308 C160 330 162 350 166 370" },
  { key: "25-51", d: "M208 290 L224 292" },
  { key: "44-26", d: "M114 338 C160 332 198 330 230 326" },
  { key: "37-40", d: "M286 324 L254 342" },
  { key: "27-50", d: "M166 388 C140 382 126 368 114 356" },
  { key: "59-6", d: "M194 388 C220 382 238 370 258 356" },
  { key: "3-60", d: "M180 404 L180 444" },
  { key: "42-53", d: "M166 404 L166 444" },
  { key: "9-52", d: "M194 370 L194 444" },
  { key: "2-14", d: "M180 322 L180 350" },
  { key: "5-15", d: "M166 350 L170 308" },
  { key: "46-29", d: "M190 308 L194 350" },
  { key: "32-54", d: "M104 372 C130 400 148 430 166 462" },
  { key: "28-38", d: "M96 388 C124 420 144 450 166 480" },
  { key: "18-58", d: "M104 402 C128 434 146 466 166 496" },
  { key: "41-30", d: "M194 496 C254 476 292 434 306 386" },
  { key: "39-55", d: "M194 480 C248 460 280 418 296 370" },
  { key: "19-49", d: "M194 462 C238 444 264 404 278 356" },
];

function labelClass(size?: GateDot["size"]) {
  if (size === "xs") return "text-[6.3px]";
  if (size === "sm") return "text-[6.8px]";
  return "text-[7.2px]";
}

export function HumanDesignBodygraph({ definedCenters, channels = [], gates = [] }: HumanDesignBodygraphProps) {
  const isDefined = (name: string) => definedCenters.includes(name);
  const centerClass = (name: string) =>
    isDefined(name) ? "fill-yellow-300 stroke-black" : "fill-white stroke-black";

  const channelSet = new Set(channels);
  const gateSet = new Set(gates);
  const hasChannel = (key: string) => {
    if (channelSet.has(key)) return true;
    const [a, b] = key.split("-");
    return channelSet.has(`${b}-${a}`);
  };

  return (
    <svg
      viewBox="0 0 360 530"
      className="h-auto w-full max-w-[360px]"
      role="img"
      aria-label="Human Design Bodygraph"
    >
      {CHANNEL_PATHS.map((line) => (
        <g key={line.key}>
          <path d={line.d} stroke="#111" strokeWidth="4.2" strokeLinecap="round" fill="none" />
          <path d={line.d} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {hasChannel(line.key) ? (
            <path d={line.d} stroke="#efd94b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          ) : null}
        </g>
      ))}

      {CENTER_SHAPES.map((center) => (
        <path key={center.key} d={center.d} className={centerClass(center.key)} strokeWidth="2" />
      ))}

      {GATE_DOTS.map((g) => {
        const isActive = gateSet.has(g.gate);
        return (
          <g key={`gate-${g.gate}`}>
            {isActive ? <circle cx={g.x} cy={g.y} r={6.4} fill="#71757a" stroke="#111" strokeWidth="0.85" /> : null}
            <text
              x={g.x}
              y={g.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={`${isActive ? "fill-white font-semibold" : "fill-black"} ${labelClass(g.size)}`}
            >
              {g.gate}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
