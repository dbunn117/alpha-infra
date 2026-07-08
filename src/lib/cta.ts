import { cva, type VariantProps } from "class-variance-authority";

/*
 * Marketing-scale button/link styles built on the semantic design tokens so
 * they stay correct in both light and dark themes. Apply to a native <button>,
 * an <a>, or a Next <Link> via className — no client component required.
 */
export const cta = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90",
        outline:
          "border border-border bg-background/40 text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        subtle: "bg-secondary text-secondary-foreground hover:bg-muted",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type CtaVariants = VariantProps<typeof cta>;
