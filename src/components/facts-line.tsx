import { cn } from "@/lib/utils";

/* The three real figures, set as a mono ledger line rather than a metric strip. */
export function FactsLine({
  stats,
  className,
}: {
  stats: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl className={cn("grid gap-6 border-y border-border py-6 sm:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dt className="font-heading text-2xl font-medium tabular-nums">{stat.value}</dt>
          <dd className="caption">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
