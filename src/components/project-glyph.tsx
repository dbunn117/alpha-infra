import type { Project } from "@/content/projects";

/*
 * Small drawn glyphs for featured catalogue cards, in the ink diagram's
 * language: ink for the data, blue for what the system does. They sketch
 * the shape of each artifact (a ranked list, a map, a waterfall) and carry
 * no real figures. Strokes draw on the card's Reveal via data-stroke.
 * viewBox 0 0 200 72.
 */
const S = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* Rough contiguous-US silhouette as dot rows: each row lists [from, to]
   column runs on a 28-column grid. Impressionistic on purpose. */
const MAP_ROWS: readonly (readonly [number, number])[][] = [
  [[3, 9], [12, 19], [25, 26]],
  [[2, 21], [24, 26]],
  [[1, 25]],
  [[1, 25]],
  [[1, 24]],
  [[2, 23]],
  [[4, 22]],
  [[9, 14], [20, 22]],
  [[11, 13], [22, 22]],
];

export function ProjectGlyph({ kind }: { kind: NonNullable<Project["glyph"]> }) {
  return (
    <svg viewBox="0 0 200 72" aria-hidden className="block h-auto w-full" {...S} strokeWidth={2}>
      {kind === "bars" ? (
        <>
          <g className="text-border" stroke="currentColor">
            {[14, 30, 46, 62].map((y) => (<path key={y} d={`M20,${y} H180`} strokeWidth={1} />))}
          </g>
          <g className="text-primary" stroke="currentColor" strokeWidth={6}>
            <path d="M20,14 H164" pathLength={1} data-stroke />
            <path d="M20,30 H138" pathLength={1} data-stroke />
            <path d="M20,46 H112" pathLength={1} data-stroke />
            <path d="M20,62 H84" pathLength={1} data-stroke />
          </g>
        </>
      ) : null}

      {kind === "compare" ? (
        <>
          <path d="M16,60 H184" className="text-border" stroke="currentColor" strokeWidth={1} />
          <path d="M16,50 C50,46 80,40 110,34 S160,24 184,20" className="text-muted-foreground" stroke="currentColor" strokeDasharray="4 5" />
          <path d="M16,52 C46,50 70,30 104,38 S150,12 184,10" className="text-primary" stroke="currentColor" strokeWidth={2.5} pathLength={1} data-stroke />
        </>
      ) : null}

      {kind === "map" ? (
        <>
          {/* a dot-matrix landmass (rows of [from, to] columns), then market
              bubbles sized like the real tool's: no outline to get wrong */}
          <g className="text-muted-foreground" fill="currentColor" stroke="none" opacity={0.45}>
            {MAP_ROWS.flatMap((segments, row) =>
              segments.flatMap(([from, to]) =>
                Array.from({ length: to - from + 1 }, (_, k) => (
                  <circle key={`${row}-${from + k}`} cx={14 + (from + k) * 6.4} cy={9 + row * 6.8} r={1.15} />
                ))
              )
            )}
          </g>
          <g className="text-primary" stroke="currentColor" fill="currentColor" fillOpacity={0.16} strokeWidth={1.75}>
            <circle cx="30" cy="30" r="9" />
            <circle cx="92" cy="48" r="7" />
            <circle cx="118" cy="24" r="5" />
            <circle cx="144" cy="42" r="11" />
            <circle cx="170" cy="22" r="6" />
          </g>
        </>
      ) : null}

      {kind === "waterfall" ? (
        <g strokeLinecap="butt">
          <path d="M16,62 H184" className="text-border" stroke="currentColor" strokeWidth={1} />
          {/* opening and closing totals in ink, the movements between them in blue */}
          <g className="text-foreground" stroke="currentColor" strokeWidth={18}>
            <path d="M34,62 V30" />
            <path d="M166,62 V40" />
          </g>
          <g className="text-primary" stroke="currentColor" strokeWidth={18}>
            <path d="M67,30 V16" />
            <path d="M100,16 V34" />
            <path d="M133,34 V40" />
          </g>
          <g className="text-muted-foreground" stroke="currentColor" strokeWidth={1} strokeDasharray="2 3">
            <path d="M43,30 H58 M76,16 H91 M109,34 H124 M142,40 H157" />
          </g>
        </g>
      ) : null}

      {kind === "draft" ? (
        <>
          <path d="M60,8 H128 L142,22 V64 H60 Z M128,8 V22 H142" className="text-foreground" stroke="currentColor" pathLength={1} data-stroke />
          <g className="text-border" stroke="currentColor">
            <path d="M72,30 H130 M72,40 H124 M72,50 H110" />
          </g>
          <path d="M112,52 L119,59 L134,42" className="text-primary" stroke="currentColor" strokeWidth={2.5} pathLength={1} data-stroke />
        </>
      ) : null}

      {kind === "flow" ? (
        <>
          <g className="text-foreground" stroke="currentColor">
            <path d="M18,22 H62 V52 H18 Z" pathLength={1} data-stroke />
            <path d="M18,22 L40,40 L62,22" />
          </g>
          <g className="text-primary" stroke="currentColor">
            <path d="M66,37 C86,37 92,18 112,18" pathLength={1} data-stroke />
            <path d="M66,37 H112" pathLength={1} data-stroke />
            <path d="M66,37 C86,37 92,56 112,56" pathLength={1} data-stroke />
          </g>
          <g className="text-foreground" stroke="currentColor">
            <path d="M116,10 H176 V26 H116 Z M116,29 H176 V45 H116 Z M116,48 H176 V64 H116 Z" />
          </g>
        </>
      ) : null}
    </svg>
  );
}
