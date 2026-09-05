import { Tabs as KTabs, type TabsRootProps } from "@kobalte/core/tabs";
import { omit, For } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "../../utils/cn";

export type TabItem = {
  value: string;
  label: string | JSX.Element;
  content: JSX.Element;
  disabled?: boolean;
};

interface TabsProps extends TabsRootProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  class?: string;
  listClass?: string;
  triggerClass?: string;
  indicatorClass?: string;
  contentClass?: string;
}

export const Tabs = (props: TabsProps) => {
  const others = omit(
    props,
    "class",
    "listClass",
    "triggerClass",
    "indicatorClass",
    "contentClass",
  );

  return (
    <KTabs class={cn("flex flex-col w-full", props.class)} {...others}>
      <KTabs.List class={cn("relative flex items-center border-b border-base", props.listClass)}>
        <For each={props.items}>
          {(item) => (
            <KTabs.Trigger
              class={cn(
                "relative flex h-9 items-center justify-center px-4 text-sm font-medium transition-colors outline-none select-none cursor-pointer text-muted hover:text-muted/80 data-selected:text-main",
                props.triggerClass,
              )}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </KTabs.Trigger>
          )}
        </For>
        <KTabs.Indicator
          class={cn(
            "absolute -bottom-px h-0.5 bg-reversal-bg transition-all duration-200",
            props.indicatorClass,
          )}
        />
      </KTabs.List>

      <For each={props.items}>
        {(item) => (
          <KTabs.Content
            class={cn("mt-4 text-sm text-main focus-visible:outline-none", props.contentClass)}
            value={item.value}
          >
            {item.content}
          </KTabs.Content>
        )}
      </For>
    </KTabs>
  );
};
