import { cn } from "@/lib/utils";

export function StatStrip({
  stats,
  className,
}: {
  stats: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3",
        className
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card p-6">
          <dt className="stat-number text-2xl font-semibold sm:text-[1.75rem]">
            {stat.value}
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
