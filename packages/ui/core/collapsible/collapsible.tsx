import { Collapsible as KCollapsible, type CollapsibleRootProps } from "@kobalte/core/collapsible";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { ChevronDown } from "@lucide/solid";
import { cn } from "cn";

interface CollapsibleProps extends CollapsibleRootProps {
  title: JSX.Element;
  children: JSX.Element;
  class?: string;
}

export const Collapsible = (props: CollapsibleProps) => {
  const others = omit(
    props,
    "title",
    "children",
    "class",
  );

  return (
    <KCollapsible class={cn("w-full space-y-2", props.class)} {...others}>
      <KCollapsible.Trigger
        data-slot="collapsible-trigger" class="flex w-full items-center justify-between border border-light bg-foreground px-4 py-2 text-sm font-medium hover:bg-foreground/80 transition-all group mb-0"
      >
        <span>{props.title}</span>
        <ChevronDown
          data-slot="collapsible-icon" class="h-4 w-4 text-zinc-500 transition-transform duration-200 group-data-expanded:rotate-180"
        />
      </KCollapsible.Trigger>

      <KCollapsible.Content
        data-slot="collapsible-content" class="overflow-hidden text-sm transition-all data-expanded:animate-collapsible-down data-closed:animate-collapsible-up"
      >
        <div
          data-slot="collapsible-content-text" class="px-4 py-3 text-main border border-light border-t-0!"
        >
          {props.children}
        </div>
      </KCollapsible.Content>
    </KCollapsible>
  );
};
