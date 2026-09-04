/*
 * Geometry for the ink diagram, shared by the scrubbed and static renderers.
 * viewBox 0 0 800 520. Control points are nudged a few units off-grid on
 * purpose so the strokes read as pen, not CAD.
 */
export const VIEWBOX = "0 0 800 520";

export type SourceId = "crm" | "sheets" | "email" | "accounting";

export type Source = {
  id: SourceId;
  /* label anchor */
  label: { x: number; y: number };
  /* glyph strokes, drawn in order */
  strokes: string[];
  /* route from this source to the system plate */
  route: string;
};

export const SOURCES: Source[] = [
  {
    id: "crm",
    label: { x: 110, y: 144 },
    strokes: [
      "M78,62 h63 a8,8 0 0 1 8,8.5 v39 a8,8 0 0 1 -8,8 h-63 a8,8 0 0 1 -8,-8 v-39 a8,8 0 0 1 8,-8.5 z",
      "M104,85 a8,8 0 1 1 -16,0.4 a8,8 0 1 1 16,-0.4 z",
      "M118,80 h20.5 M118,92 h14",
    ],
    route: "M150,90 C222,88 238,236 300,236",
  },
  {
    id: "sheets",
    label: { x: 690, y: 164 },
    strokes: [
      "M654,82 h72 v56.5 h-72.5 z",
      "M654,101 h72 M654.5,120 h71.5",
      "M678,82 v56 M702,82.5 v55.5",
    ],
    route: "M654,110 C582,112 562,236 500,236",
  },
  {
    id: "email",
    label: { x: 120, y: 482 },
    strokes: [
      "M82,404 h76 v52 h-76.5 z",
      "M82,404 L120,437 L158,404.5",
    ],
    route: "M158,430 C230,432 242,290 300,290",
  },
  {
    id: "accounting",
    label: { x: 680, y: 468 },
    strokes: [
      "M646,378 h68 v64.5 h-68.5 z",
      "M658,394 h44 M658,408 h44.5 M658.5,422 h28",
      "M694,424 h10 M694,428 h10",
    ],
    route: "M646,410 C574,412 560,290 500,290",
  },
];

export const PLATE = {
  outline:
    "M312,200 h176 a12,12 0 0 1 12,12 v96 a12,12 0 0 1 -12,12.5 h-176.5 a12,12 0 0 1 -12,-12 v-96 a12,12 0 0 1 12,-12.5 z",
  /* three action rows: a short pen dash, then the label */
  rows: [
    { y: 268, dash: "M324,264 h9" },
    { y: 288, dash: "M324,284 h9.5" },
    { y: 308, dash: "M324,304 h9" },
  ],
  rowText: { x: 341, fontSize: 12.5 },
  label: { x: 400, y: 236 },
};

export const ANNOTATION = {
  text: { x: 400, y: 384 },
  arrow: "M446,362 C432,352 420,342 410,328",
  arrowHead: "M404,338 L410,327 L420,331",
};

/* Brand mark, nested at the plate's top-right corner (see brand-mark.tsx) */
export const TICK = {
  x: 464,
  y: 164,
  size: 72,
  d: "M18,64 L46,92 L102,22",
  color: "#C4283C",
};

/* Time-based timeline for the hero animation, in seconds (one loop) */
export const TIMELINE = {
  sourceStart: 0,
  sourceGap: 0.6,
  strokeDuration: 0.45,
  strokeStagger: 0.4,
  labelDuration: 0.4,
  routesStart: 3.6,
  routeGap: 0.5,
  routeDuration: 1.0,
  plateStart: 5.8,
  plateDuration: 1.0,
  plateFillStart: 6.6,
  plateFillDuration: 0.8,
  annotationStart: 7.6,
  annotationDuration: 1.1,
  arrowStart: 8.0,
  arrowDuration: 0.5,
  arrowHeadStart: 8.45,
  arrowHeadDuration: 0.2,
  tickStart: 9.0,
  tickDuration: 0.8,
  settleStart: 9.8,
  settleDuration: 0.5,
  fadeStart: 12.8,
  fadeDuration: 0.5,
} as const;

export const CLIP_HIDDEN = "inset(-20% 100% -20% -2%)";
export const CLIP_SHOWN = "inset(-20% 0% -20% -2%)";
