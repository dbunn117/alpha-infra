import type { CSSProperties } from "react";
import { SIGNAL_RED } from "@/components/brand-mark";

/*
 * Small system schematic for the proof cards, drawn in the hero diagram's
 * language: ink boxes for inputs and outputs, blue routes into a blue plate
 * that lists the work the system does, one Caveat annotation. Every stroke
 * carries data-stroke so it draws itself when the card's Reveal fires; text
 * fades in behind it (data-fade). viewBox 0 0 480 262.
 */
export type Schematic = {
  inputs: { lines: readonly string[] }[] | readonly { lines: readonly string[] }[];
  plate: { title: string; rows: readonly string[] };
  outputs: { lines: readonly string[] }[] | readonly { lines: readonly string[] }[];
  annotation: string;
};

const IN = { x: 16, w: 108 };
const PLATE = { x: 150, w: 168, y: 34, h: 176 };
const OUT = { x: 350, w: 116 };
const MID = PLATE.y + PLATE.h / 2;
/* Stacks of four use shorter, single-line boxes so they fit beside the plate. */
const boxSize = (n: number) => (n >= 4 ? { h: 32, gap: 12 } : { h: 40, gap: 16 });

function delay(s: number): CSSProperties {
  return { "--draw-delay": `${s}s` } as CSSProperties;
}

/* Off-grid rounded box, drawn as one stroke so it reads as pen. */
function boxPath(x: number, y: number, w: number, h: number) {
  const r = 6;
  return `M${x + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r + 0.5} v${h - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - 2 * r + 0.5} a${r},${r} 0 0 1 -${r},-${r} v-${h - 2 * r} a${r},${r} 0 0 1 ${r},-${r + 0.5} z`;
}

function stackYs(n: number, h: number, gap: number) {
  const total = n * h + (n - 1) * gap;
  const top = MID - total / 2;
  return Array.from({ length: n }, (_, i) => top + i * (h + gap));
}

function Label({ x, y, lines, delayS }: { x: number; y: number; lines: readonly string[]; delayS: number }) {
  const lh = 14;
  const start = y - ((lines.length - 1) * lh) / 2 + 4;
  return (
    <text
      x={x}
      y={start}
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      className="font-sans"
      fontSize={12}
      fontWeight={500}
      data-fade=""
      style={delay(delayS)}
    >
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : lh}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function ProofSchematic({ data, title }: { data: Schematic; title: string }) {
  const inBox = boxSize(data.inputs.length);
  const outBox = boxSize(data.outputs.length);
  const inYs = stackYs(data.inputs.length, inBox.h, inBox.gap);
  const outYs = stackYs(data.outputs.length, outBox.h, outBox.gap);
  // Routes run level with their boxes: a straight line from box to plate
  // and from plate to box, each ending in a small chevron at the edge it
  // enters. (Earlier they converged on the plate's mid-line and the S-bends
  // read as squiggles.)
  const chevron = (tipX: number, y: number) => `M${tipX - 7},${y - 5} L${tipX},${y} L${tipX - 7},${y + 5}`;
  const plateTitleY = PLATE.y + 34;
  const rowY0 = PLATE.y + 66;
  const rowGap = 34;

  return (
    <svg
      viewBox="0 0 480 262"
      role="img"
      aria-label={title}
      className="block h-auto w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Inputs: ink */}
      <g className="text-foreground">
        {data.inputs.map((input, i) => (
          <g key={input.lines.join(" ")}>
            <path d={boxPath(IN.x, inYs[i], IN.w, inBox.h)} pathLength={1} data-stroke style={delay(i * 0.12)} />
            <Label x={IN.x + IN.w / 2} y={inYs[i] + inBox.h / 2} lines={input.lines} delayS={0.2 + i * 0.12} />
          </g>
        ))}
      </g>

      {/* Routes and plate: blue */}
      <g className="text-primary">
        {data.inputs.map((input, i) => {
          const y = inYs[i] + inBox.h / 2;
          const x0 = IN.x + IN.w;
          const x1 = PLATE.x;
          return (
            <g key={input.lines.join(" ")}>
              <path d={`M${x0},${y} H${x1}`} pathLength={1} data-stroke style={delay(0.35 + i * 0.08)} />
              <path d={chevron(x1, y)} pathLength={1} data-stroke style={delay(0.5 + i * 0.08)} />
            </g>
          );
        })}

        <path
          d={boxPath(PLATE.x, PLATE.y, PLATE.w, PLATE.h)}
          pathLength={1}
          fill="currentColor"
          fillOpacity={0.06}
          data-stroke
          style={delay(0.6)}
        />
        <text
          x={PLATE.x + PLATE.w / 2}
          y={plateTitleY}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          className="font-heading"
          fontSize={17}
          data-fade=""
          style={delay(0.8)}
        >
          {data.plate.title}
        </text>
        {data.plate.rows.map((row, i) => {
          const y = rowY0 + i * rowGap;
          return (
            <g key={row}>
              <path
                d={`M${PLATE.x + 16},${y - 14} h${PLATE.w - 32.5}`}
                strokeWidth={1}
                opacity={0.5}
                pathLength={1}
                data-stroke
                style={delay(0.9 + i * 0.1)}
              />
              <text
                x={PLATE.x + 16}
                y={y + 4}
                fill="currentColor"
                stroke="none"
                className="font-sans"
                fontSize={11.5}
                opacity={0.9}
                data-fade=""
                style={delay(0.95 + i * 0.1)}
              >
                {row}
              </text>
            </g>
          );
        })}

        {data.outputs.map((output, i) => {
          const y = outYs[i] + outBox.h / 2;
          const x0 = PLATE.x + PLATE.w;
          const x1 = OUT.x;
          return (
            <g key={output.lines.join(" ")}>
              <path d={`M${x0},${y} H${x1}`} pathLength={1} data-stroke style={delay(1.2 + i * 0.08)} />
              <path d={chevron(x1, y)} pathLength={1} data-stroke style={delay(1.4 + i * 0.08)} />
            </g>
          );
        })}
      </g>

      {/* Outputs: ink */}
      <g className="text-foreground">
        {data.outputs.map((output, i) => (
          <g key={output.lines.join(" ")}>
            <path d={boxPath(OUT.x, outYs[i], OUT.w, outBox.h)} pathLength={1} data-stroke style={delay(1.5 + i * 0.12)} />
            <Label x={OUT.x + OUT.w / 2} y={outYs[i] + outBox.h / 2} lines={output.lines} delayS={1.7 + i * 0.12} />
          </g>
        ))}

      </g>

      {/* Annotation: the red pen. Handwritten, so Signal Red, under the plate
          with a short arrow up to it. The card's one red mark. */}
      <g style={{ color: SIGNAL_RED }}>
        <text
          x={PLATE.x + PLATE.w / 2 - 44}
          y={250}
          textAnchor="start"
          fill="currentColor"
          stroke="none"
          className="font-hand"
          fontSize={19}
          data-fade=""
          style={delay(1.9)}
        >
          {data.annotation}
        </text>
        <path
          d={`M${PLATE.x + PLATE.w / 2 - 68},${244} C${PLATE.x + PLATE.w / 2 - 78},${234} ${PLATE.x + PLATE.w / 2 - 62},${224} ${PLATE.x + PLATE.w / 2 - 54},${PLATE.y + PLATE.h + 5}`}
          strokeWidth={1.5}
          pathLength={1}
          data-stroke
          style={delay(2.0)}
        />
        <path
          d={`M${PLATE.x + PLATE.w / 2 - 61},${PLATE.y + PLATE.h + 9} L${PLATE.x + PLATE.w / 2 - 54},${PLATE.y + PLATE.h + 5} L${PLATE.x + PLATE.w / 2 - 49},${PLATE.y + PLATE.h + 13}`}
          strokeWidth={1.5}
          pathLength={1}
          data-stroke
          style={delay(2.2)}
        />
      </g>
    </svg>
  );
}
