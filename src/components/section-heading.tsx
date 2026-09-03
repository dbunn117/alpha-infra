import { cn } from "@/lib/utils";

/*
 * Chapter heading. Eyebrows are tracked mono and rationed (at most three per
 * page); most chapters rely on the heading alone. Default alignment is left,
 * the editorial grammar; `center` is reserved for the FAQ.
 */
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
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-balance font-heading text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.75rem]">
        {heading}
      </h2>
      {intro ? (
        <p
          className={cn(
            "measure mt-5 text-pretty text-lg leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
