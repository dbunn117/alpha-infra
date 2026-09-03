"use client";

import * as React from "react";
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";
import { inkPeak } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ANNOTATION, PLATE, SOURCES, STAGES, TICK, VIEWBOX } from "./paths";

type Progress = MotionValue<number>;

/* 0..1 over a sub-range of the act's progress, clamped */
function useRange(p: Progress, from: number, to: number) {
  return useTransform(p, [from, to], [0, 1], { clamp: true });
}

/* A pen stroke that draws itself over [from, to] */
function Stroke({
  p,
  from,
  to,
  d,
  className,
  strokeWidth,
}: {
  p: Progress;
  from: number;
  to: number;
  d: string;
  className?: string;
  strokeWidth?: number;
}) {
  const pathLength = useRange(p, from, to);
  const opacity = useTransform(pathLength, [0, 0.02], [0, 1], { clamp: true });
  return (
    <m.path
      d={d}
      style={{ pathLength, opacity }}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

function FadeGroup({
  p,
  from,
  to,
  children,
}: {
  p: Progress;
  from: number;
  to: number;
  children: React.ReactNode;
}) {
  const opacity = useRange(p, from, to);
  return <m.g style={{ opacity }}>{children}</m.g>;
}

function SourceGlyph({
  p,
  index,
}: {
  p: Progress;
  index: number;
}) {
  const source = SOURCES[index];
  const [rangeStart, rangeEnd] = STAGES.sources;
  const window = rangeEnd - rangeStart - (SOURCES.length - 1) * STAGES.sourceStagger;
  const start = rangeStart + index * STAGES.sourceStagger;
  const end = start + window;
  const per = window / source.strokes.length;
  const label = inkPeak.sources.find((s) => s.id === source.id)?.label;

  return (
    <g>
      {source.strokes.map((d, k) => (
        <Stroke key={d} p={p} from={start + k * per} to={start + (k + 1) * per} d={d} />
      ))}
      <FadeGroup p={p} from={end - window * 0.3} to={end}>
        <text
          x={source.label.x}
          y={source.label.y}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          className="font-heading italic"
          fontSize={15}
        >
          {label}
        </text>
      </FadeGroup>
    </g>
  );
}

function Route({ p, index }: { p: Progress; index: number }) {
  const [rangeStart, rangeEnd] = STAGES.routes;
  const window = rangeEnd - rangeStart - (SOURCES.length - 1) * STAGES.routeStagger;
  const start = rangeStart + index * STAGES.routeStagger;
  return (
    <Stroke p={p} from={start} to={start + window} d={SOURCES[index].route} className="opacity-70" />
  );
}

function Plate({ p }: { p: Progress }) {
  const outline = useRange(p, STAGES.plate[0], STAGES.plate[1]);
  const fill = useRange(p, STAGES.plateFill[0], STAGES.plateFill[1]);
  const fillOpacity = useTransform(fill, [0, 1], [0, 0.06]);
  const outlineOpacity = useTransform(outline, [0, 0.02], [0, 1], { clamp: true });
  const rowsOpacity = useTransform(fill, [0, 1], [0, 0.45]);
  return (
    <g>
      <m.path
        d={PLATE.outline}
        fill="currentColor"
        style={{ pathLength: outline, fillOpacity, opacity: outlineOpacity }}
      />
      <m.g style={{ opacity: rowsOpacity }}>
        {PLATE.rows.map((d) => (
          <path key={d} d={d} strokeWidth={1.5} />
        ))}
      </m.g>
      <m.g style={{ opacity: fill }}>
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
      </m.g>
    </g>
  );
}

/* Caveat annotation "written" left to right via clip-path, then its arrow */
function Annotation({ p }: { p: Progress }) {
  const reveal = useRange(p, STAGES.annotation[0], STAGES.annotation[1]);
  const hidden = useTransform(reveal, (v) => (1 - v) * 100);
  const clipPath = useMotionTemplate`inset(-20% ${hidden}% -20% -2%)`;
  const arrowStart = STAGES.annotation[0] + 0.04;
  return (
    <g>
      <m.text
        x={ANNOTATION.text.x}
        y={ANNOTATION.text.y}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        className="font-hand"
        fontSize={24}
        style={{ clipPath }}
      >
        {inkPeak.annotation}
      </m.text>
      <Stroke p={p} from={arrowStart} to={arrowStart + 0.05} d={ANNOTATION.arrow} strokeWidth={1.75} />
      <Stroke p={p} from={arrowStart + 0.04} to={arrowStart + 0.06} d={ANNOTATION.arrowHead} strokeWidth={1.75} />
    </g>
  );
}

/* The one red element: the brand tick, drawn last, with a single settle */
function Tick({ p }: { p: Progress }) {
  const pathLength = useRange(p, STAGES.tick[0], STAGES.tick[1]);
  const tickOpacity = useTransform(pathLength, [0, 0.02], [0, 1], { clamp: true });
  const scale = useMotionValue(1);
  const settled = React.useRef(false);

  useMotionValueEvent(p, "change", (v) => {
    if (v >= STAGES.settleAt && !settled.current) {
      settled.current = true;
      animate(scale, [1, 1.06, 1], { duration: 0.5, ease: EASE_OUT });
    } else if (v < STAGES.settleAt - 0.1 && settled.current) {
      settled.current = false;
    }
  });

  return (
    <svg
      x={TICK.x}
      y={TICK.y}
      width={TICK.size}
      height={TICK.size}
      viewBox="0 0 120 120"
      overflow="visible"
    >
      <m.g style={{ scale }}>
        <m.path
          d={TICK.d}
          stroke={TICK.color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength, opacity: tickOpacity }}
        />
      </m.g>
    </svg>
  );
}

export function InkDiagram({
  progress,
  className,
}: {
  progress: Progress;
  className?: string;
}) {
  return (
    <svg
      viewBox={VIEWBOX}
      role="img"
      aria-label="Four data sources drawn into one running system"
      className={cn("ink-diagram h-auto w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g opacity={0.9}>
        {SOURCES.map((s, i) => (
          <SourceGlyph key={s.id} p={progress} index={i} />
        ))}
        {SOURCES.map((s, i) => (
          <Route key={s.id} p={progress} index={i} />
        ))}
        <Plate p={progress} />
        <Annotation p={progress} />
      </g>
      <Tick p={progress} />
    </svg>
  );
}
