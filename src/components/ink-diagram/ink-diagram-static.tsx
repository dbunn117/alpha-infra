import { inkPeak } from "@/content/site";
import { ANNOTATION, PLATE, SOURCES, TICK, VIEWBOX } from "./paths";
import { cn } from "@/lib/utils";

/*
 * The diagram's final frame with no motion: used as card art, for reduced
 * motion, and as the no-JS fallback. Server component.
 */
export function InkDiagramStatic({
  className,
  showAnnotation = true,
  tickTone = "red",
  title = "Four data sources drawn into one running system",
}: {
  className?: string;
  showAnnotation?: boolean;
  /* "mono" keeps the tick in currentColor so a page shows one red at a time */
  tickTone?: "red" | "mono";
  title?: string;
}) {
  return (
    <svg
      viewBox={VIEWBOX}
      role="img"
      aria-label={title}
      className={cn("ink-diagram h-auto w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g opacity={0.9}>
        {SOURCES.map((s) => (
          <g key={s.id}>
            {s.strokes.map((d) => (
              <path key={d} d={d} />
            ))}
            <text
              x={s.label.x}
              y={s.label.y}
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-heading italic"
              fontSize={15}
            >
              {inkPeak.sources.find((x) => x.id === s.id)?.label}
            </text>
            <path d={s.route} opacity={0.7} />
          </g>
        ))}
        <path d={PLATE.outline} fill="currentColor" fillOpacity={0.06} />
        {PLATE.rows.map((d) => (
          <path key={d} d={d} opacity={0.45} strokeWidth={1.5} />
        ))}
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
        {showAnnotation ? (
          <>
            <text
              x={ANNOTATION.text.x}
              y={ANNOTATION.text.y}
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              className="font-hand"
              fontSize={24}
            >
              {inkPeak.annotation}
            </text>
            <path d={ANNOTATION.arrow} strokeWidth={1.75} />
            <path d={ANNOTATION.arrowHead} strokeWidth={1.75} />
          </>
        ) : null}
      </g>
      <svg
        x={TICK.x}
        y={TICK.y}
        width={TICK.size}
        height={TICK.size}
        viewBox="0 0 120 120"
        overflow="visible"
      >
        <path
          d={TICK.d}
          stroke={tickTone === "red" ? TICK.color : "currentColor"}
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </svg>
  );
}
