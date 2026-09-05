import { Collapsible as KCollapsible, type CollapsibleRootProps } from "@kobalte/core/collapsible";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { ChevronDown } from "../icons";

import { cn } from "../../utils/cn";

interface CollapsibleProps extends CollapsibleRootProps {
  title: JSX.Element;
  children: JSX.Element;
  class?: string;
  triggerClass?: string;
  contentClass?: string;
  contentTextClass?: string;
  iconClass?: string;
}

export const Collapsible = (props: CollapsibleProps) => {
  const others = omit(
    props,
    "title",
    "children",
    "class",
    "triggerClass",
    "contentClass",
    "contentTextClass",
    "iconClass",
  );

  return (
    <KCollapsible class={cn("w-full space-y-2", props.class)} {...others}>
      <KCollapsible.Trigger
        class={cn(
          "flex w-full items-center justify-between border border-light bg-foreground px-4 py-2 text-sm font-medium hover:bg-foreground/80 transition-all group mb-0",
          props.triggerClass,
        )}
      >
        <span>{props.title}</span>
        <ChevronDown
          class={cn(
            "h-4 w-4 text-zinc-500 transition-transform duration-200 group-data-expanded:rotate-180",
            props.iconClass,
          )}
        />
      </KCollapsible.Trigger>

      <KCollapsible.Content
        class={cn(
          "overflow-hidden text-sm transition-all data-expanded:animate-collapsible-down data-closed:animate-collapsible-up",
          props.contentClass,
        )}
      >
        <div
          class={cn("px-4 py-3 text-main border border-light border-t-0!", props.contentTextClass)}
        >
          {props.children}
        </div>
      </KCollapsible.Content>
    </KCollapsible>
  );
};
