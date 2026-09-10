import { TOOL_ICON_PATHS } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";

export type Tool = { name: string; icon?: string };

/*
 * "Reads the tools you already run" strip: monochrome marks where the brand
 * permits, plain text badges otherwise. Everything renders in currentColor
 * so it sits inside the ink palette.
 */
export function ToolLogos({ tools, className }: { tools: readonly Tool[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
      {tools.map((tool) => {
        const icon = tool.icon ? TOOL_ICON_PATHS[tool.icon] : undefined;
        return (
          <li
            key={tool.name}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            {icon ? (
              <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-current" aria-hidden>
                <path d={icon.path} />
              </svg>
            ) : (
              <span aria-hidden className="inline-block size-1.5 rounded-full bg-current opacity-60" />
            )}
            <span>{tool.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
