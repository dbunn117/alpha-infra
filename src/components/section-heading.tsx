import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-bright">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
        {heading}
      </h2>
      {intro ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
