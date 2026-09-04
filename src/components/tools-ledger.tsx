import { tools } from "@/content/site";
import { cn } from "@/lib/utils";

/* Tools as a typeset ledger: four label lines, no pills, no cards. */
export function ToolsLedger({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm font-semibold text-muted-foreground">{tools.heading}</p>
      <dl className="mt-4 divide-y divide-border border-y border-border">
        {tools.groups.map((group) => (
          <div key={group.label} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6">
            <dt className="caption pt-1">
              {group.label}
            </dt>
            <dd className={cn("text-sm text-foreground")}>{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
