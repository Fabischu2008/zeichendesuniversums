export function HumanDesignBodygraph({
  definedCenters,
}: {
  definedCenters: string[];
}) {
  const isDefined = (name: string) => definedCenters.includes(name);
  const centerClass = (name: string) =>
    isDefined(name)
      ? "fill-yellow-300 stroke-black"
      : "fill-white stroke-black";

  return (
    <svg viewBox="0 0 320 520" className="h-auto w-full max-w-[340px]" role="img" aria-label="Human Design Bodygraph">
      <polygon points="110,20 210,20 160,95" className={centerClass("Kopf")} strokeWidth="2" />
      <polygon points="118,108 202,108 160,170" className={centerClass("Ajna")} strokeWidth="2" />
      <rect x="118" y="184" width="84" height="95" rx="6" className={centerClass("Kehle")} strokeWidth="2" />
      <polygon points="160,288 214,322 160,360 106,322" className={centerClass("G")} strokeWidth="2" />
      <polygon points="214,318 276,340 214,382" className={centerClass("Herzzentrum")} strokeWidth="2" />
      <polygon points="276,340 312,372 276,404 240,372" className={centerClass("Solarplexus-Zentrum")} strokeWidth="2" />
      <polygon points="106,318 44,340 44,404 106,382" className={centerClass("Milz")} strokeWidth="2" />
      <rect x="118" y="374" width="84" height="82" rx="6" className={centerClass("Sakralzentrum")} strokeWidth="2" />
      <rect x="118" y="466" width="84" height="42" rx="6" className={centerClass("Wurzelzentrum")} strokeWidth="2" />

      {/* Main channels (simplified visual) */}
      <line x1="160" y1="95" x2="160" y2="108" stroke="black" strokeWidth="2" />
      <line x1="160" y1="170" x2="160" y2="184" stroke="black" strokeWidth="2" />
      <line x1="160" y1="279" x2="160" y2="288" stroke="black" strokeWidth="2" />
      <line x1="160" y1="360" x2="160" y2="374" stroke="black" strokeWidth="2" />
      <line x1="160" y1="456" x2="160" y2="466" stroke="black" strokeWidth="2" />
      <line x1="202" y1="230" x2="276" y2="360" stroke="black" strokeWidth="2" />
      <line x1="118" y1="230" x2="44" y2="360" stroke="black" strokeWidth="2" />
      <line x1="106" y1="322" x2="118" y2="410" stroke="black" strokeWidth="2" />
      <line x1="214" y1="322" x2="202" y2="410" stroke="black" strokeWidth="2" />
      <line x1="240" y1="372" x2="202" y2="410" stroke="black" strokeWidth="2" />
    </svg>
  );
}
