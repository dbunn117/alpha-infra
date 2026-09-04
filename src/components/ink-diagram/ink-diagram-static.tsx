import { inkPeak } from "@/content/site";
import { cn } from "@/lib/utils";
import { ANNOTATION, CLIP_HIDDEN, PLATE, SOURCES, TICK, VIEWBOX } from "./paths";

/*
 * The ink diagram, one markup source for both uses:
 *  - static final frame (reduced motion, no JS);
 *  - `animated`: the same markup with every drawn element parked in its
 *    hidden starting state as SVG attributes (motion animates those same
 *    attributes) and data-ink hooks for ink-animation.tsx to target.
 * Sources and the annotation are ink; routes and the system plate are blue;
 * the tick is Signal Red.
 */
export function InkDiagramStatic({
  className,
  animated = false,
  title = "Four data sources drawn into one running system",
}: {
  className?: string;
  animated?: boolean;
  title?: string;
}) {
  const a = animated;
  // Undrawn strokes also start invisible: a zero-length round-capped dash
  // would otherwise render as a dot at the start of every path.
  const strokeStart = a ? { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 } : {};
  const fadeStart = a ? { opacity: 0 } : {};

  return (
    <svg
      viewBox={VIEWBOX}
      role="img"
      aria-label={title}
      className={cn("ink-diagram h-auto w-full", a && "ink-animation", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g data-ink-stage="">
        <g className="text-foreground">
          {SOURCES.map((s) => (
            <g key={s.id} data-ink-source={s.id}>
              {s.strokes.map((d, k) => (
                <path key={d} d={d} pathLength={1} data-ink="stroke" data-ink-i={k} {...strokeStart} />
              ))}
              <text
                x={s.label.x}
                y={s.label.y}
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-heading italic"
                fontSize={15}
                data-ink="fade"
                {...fadeStart}
              >
                {inkPeak.sources.find((x) => x.id === s.id)?.label}
              </text>
            </g>
          ))}
        </g>

        <g className="text-primary">
          {SOURCES.map((s) => (
            <path
              key={s.id}
              d={s.route}
              pathLength={1}
              data-ink="stroke"
              data-ink-route={s.id}
              {...strokeStart}
            />
          ))}
          <g data-ink-plate="">
            <path
              d={PLATE.outline}
              pathLength={1}
              fill="currentColor"
              fillOpacity={a ? 0 : 0.06}
              data-ink="stroke"
              data-ink-plate-outline=""
              {...strokeStart}
            />
            <g data-ink="fade" {...fadeStart}>
              <text
                x={PLATE.label.x}
                y={PLATE.label.y}
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                className="font-heading"
                fontSize={18}
              >
                {inkPeak.systemLabel}
              </text>
              {PLATE.rows.map((row, i) => (
                <g key={row.y}>
                  <path d={row.dash} strokeWidth={1.5} />
                  <text
                    x={PLATE.rowText.x}
                    y={row.y}
                    fill="currentColor"
                    stroke="none"
                    className="font-sans"
                    fontSize={PLATE.rowText.fontSize}
                    opacity={0.9}
                  >
                    {inkPeak.actions[i]}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </g>

        <g data-ink-annotation="" className="text-foreground">
          <text
            x={ANNOTATION.text.x}
            y={ANNOTATION.text.y}
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            className="font-hand"
            fontSize={24}
            data-ink="clip"
            clipPath={a ? CLIP_HIDDEN : undefined}
          >
            {inkPeak.annotation}
          </text>
          <path d={ANNOTATION.arrow} strokeWidth={1.75} pathLength={1} data-ink="stroke" data-ink-arrow="" {...strokeStart} />
          <path d={ANNOTATION.arrowHead} strokeWidth={1.75} pathLength={1} data-ink="stroke" data-ink-arrowhead="" {...strokeStart} />
        </g>

        <svg
          x={TICK.x}
          y={TICK.y}
          width={TICK.size}
          height={TICK.size}
          viewBox="0 0 120 120"
          overflow="visible"
        >
          <g data-ink-tick="">
            <path
              d={TICK.d}
              pathLength={1}
              stroke={TICK.color}
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              data-ink="stroke"
              {...strokeStart}
            />
          </g>
        </svg>
      </g>
    </svg>
  );
}
