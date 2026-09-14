import Link from "next/link";
import type { CSSProperties } from "react";
import { levels } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/*
 * The three levels drawn as a staircase in the hero diagram's language: ink
 * treads and risers, a blue plate on each step (the middle one split in two),
 * a Caveat note per step naming the offer, and a drawn arrow for value. The
 * staircase is decorative on small screens (text columns carry the content)
 * and hidden below md, where the three columns stack.
 */
function delay(s: number): CSSProperties {
  return { "--draw-delay": `${s}s` } as CSSProperties;
}

const W = 960;
const STEP = 300;
const X0 = 30;
const TREAD_Y = [232, 164, 96]; // step tops, ascending
const BASE_Y = 296;

function plateBox(x: number, y: number, w: number, h: number) {
  const r = 8;
  return `M${x + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r + 0.5} v${h - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - 2 * r + 0.5} a${r},${r} 0 0 1 -${r},-${r} v-${h - 2 * r} a${r},${r} 0 0 1 ${r},-${r + 0.5} z`;
}

function Staircase() {
  const items = levels.items;
  return (
    <svg
      viewBox={`0 0 ${W} 330`}
      role="img"
      aria-label="Three levels drawn as a staircase: an AI-native team, AI applications split into productivity and engineered, and connected intelligence"
      className="block h-auto w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Steps: ink */}
      <g className="text-foreground">
        {/* ground */}
        <path d={`M${X0},${BASE_Y} h${STEP * 3 - 0.5}`} strokeWidth={1.5} opacity={0.5} pathLength={1} data-stroke style={delay(0)} />
        {TREAD_Y.map((y, i) => {
          const x = X0 + i * STEP;
          const riserFrom = i === 0 ? BASE_Y : TREAD_Y[i - 1];
          return (
            <g key={y}>
              <path d={`M${x},${riserFrom} V${y + 0.5}`} pathLength={1} data-stroke style={delay(0.15 + i * 0.35)} />
              <path d={`M${x},${y} h${STEP + (i === 2 ? -0.5 : 0.5)}`} pathLength={1} data-stroke style={delay(0.3 + i * 0.35)} />
            </g>
          );
        })}
        <path d={`M${X0 + STEP * 3},${TREAD_Y[2]} V${BASE_Y - 0.5}`} strokeWidth={1.5} opacity={0.5} pathLength={1} data-stroke style={delay(1.35)} />
      </g>

      {/* Plates: blue */}
      <g className="text-primary">
        {items.map((item, i) => {
          const x = X0 + i * STEP + 22;
          const w = STEP - 44;
          const h = 56;
          const y = TREAD_Y[i] - h - 12;
          const split = "split" in item ? item.split : null;
          return (
            <g key={item.title}>
              <path d={plateBox(x, y, w, h)} fill="currentColor" fillOpacity={0.06} pathLength={1} data-stroke style={delay(0.5 + i * 0.35)} />
              <text
                x={x + 14}
                y={y + 24}
                fill="currentColor"
                stroke="none"
                className="font-heading"
                fontSize={19}
                data-fade=""
                style={delay(0.7 + i * 0.35)}
              >
                {item.order}. {item.title}
              </text>
              {split ? (
                <g data-fade="" style={delay(0.85 + i * 0.35)}>
                  <path d={`M${x + w / 2},${y + 32} v${h - 40}`} strokeWidth={1} strokeDasharray="3 4" opacity={0.7} />
                  <text x={x + 14} y={y + 45} fill="currentColor" stroke="none" className="font-sans" fontSize={11.5} opacity={0.9}>
                    {split[0].label}
                  </text>
                  <text x={x + w / 2 + 10} y={y + 45} fill="currentColor" stroke="none" className="font-sans" fontSize={11.5} opacity={0.9}>
                    {split[1].label}
                  </text>
                </g>
              ) : (
                <text
                  x={x + 14}
                  y={y + 45}
                  fill="currentColor"
                  stroke="none"
                  className="font-sans"
                  fontSize={11.5}
                  opacity={0.9}
                  data-fade=""
                  style={delay(0.85 + i * 0.35)}
                >
                  {item.subtitle}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* Annotations: Caveat, inside each step */}
      <g className="text-foreground">
        {items.map((item, i) => {
          const x = X0 + i * STEP + 24;
          const y = TREAD_Y[i] + 30;
          return (
            <text
              key={item.title}
              x={x}
              y={y}
              fill="currentColor"
              stroke="none"
              className="font-hand"
              fontSize={19}
              data-fade=""
              style={delay(1.6 + i * 0.2)}
            >
              {item.annotation}
            </text>
          );
        })}
        {/* value arrow: continues the ground line past the last step */}
        <path d={`M${X0 + STEP * 3 + 2},${BASE_Y} h${W - X0 - STEP * 3 - 14}`} strokeWidth={1.5} pathLength={1} data-stroke style={delay(2.2)} />
        <path d={`M${W - 22},${BASE_Y - 6} L${W - 12},${BASE_Y} L${W - 22},${BASE_Y + 6}`} strokeWidth={1.5} pathLength={1} data-stroke style={delay(2.5)} />
        <text x={X0} y={BASE_Y + 24} fill="currentColor" stroke="none" className="caption" fontSize={11} data-fade="" style={delay(2.4)}>
          more value, and more of the business, as you climb
        </text>
      </g>
    </svg>
  );
}

export function LevelsLadder() {
  return (
    <Chapter id="levels" title="Levels">
      <div className="container-page">
        <SectionHeading eyebrow={levels.eyebrow} heading={levels.heading} intro={levels.intro} />

        <Reveal className="mt-12 hidden md:block">
          <Staircase />
        </Reveal>

        <ol className="mt-8 grid gap-8 md:mt-4 md:grid-cols-3 md:gap-6">
          {levels.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08}>
              <div className="border-t border-border pt-5">
                <p className="caption md:hidden">Level {item.order}</p>
                <h3 className="mt-1 text-lg md:hidden">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                {"split" in item ? (
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-xs md:hidden">
                    {item.split.map((s) => (
                      <div key={s.label}>
                        <dt className="font-semibold text-primary">{s.label}</dt>
                        <dd className="text-muted-foreground">{s.note}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <p className="mt-4 text-sm">
                  <span className="text-muted-foreground">Gets you there: </span>
                  <Link href={`/services/${item.offer.slug}`} className="link-draw font-medium text-primary">
                    {item.offer.name}
                  </Link>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 text-sm text-muted-foreground">
          {levels.decideNote}{" "}
          <Link href={levels.decideHref} className="link-draw font-medium text-primary">
            Leadership AI Sprint
          </Link>
        </p>
      </div>
    </Chapter>
  );
}
