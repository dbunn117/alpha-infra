import { cva, type VariantProps } from "class-variance-authority";

/*
 * Marketing-scale button/link styles built on the semantic design tokens so
 * they stay correct in both Paper and Ink. Apply to a native <button>, an
 * <a>, or a Next <Link> via className, no client component required.
 * Transitions are explicit (never `transition-all`); the press is a 1px sink.
 */
export const cta = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out active:translate-y-px active:scale-[0.99] motion-reduce:transform-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-elev-1 hover:-translate-y-px hover:shadow-elev-2",
        outline:
          "border border-border bg-background/40 text-foreground hover:border-foreground/40 hover:bg-muted/60",
        ghost: "text-foreground hover:bg-muted",
        subtle: "bg-secondary text-secondary-foreground hover:bg-muted",
        link: "link-draw h-auto rounded-none px-0 text-foreground",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", className: "h-auto px-0" },
      { variant: "link", size: "md", className: "h-auto px-0" },
      { variant: "link", size: "lg", className: "h-auto px-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type CtaVariants = VariantProps<typeof cta>;
