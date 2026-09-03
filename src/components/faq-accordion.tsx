"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

/*
 * FAQ as a Base UI accordion. Height animates through the panel's own
 * --accordion-panel-height variable; closed answers stay findable
 * (hiddenUntilFound) so browser find-in-page still works.
 */
export function FaqAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <Accordion.Root className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <Accordion.Item key={item.question} value={i} className="group">
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-xl font-medium leading-snug tracking-tight text-foreground">
              {item.question}
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-soft group-data-open:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel
            hiddenUntilFound
            className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height,opacity] duration-300 ease-out-soft data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0"
          >
            <p className="measure pb-6 leading-relaxed text-muted-foreground">{item.answer}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
