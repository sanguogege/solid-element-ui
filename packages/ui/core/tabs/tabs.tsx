import { Tabs as KTabs, type TabsRootProps } from "@kobalte/core/tabs";
import { omit, For } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

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
}

export const Tabs = (props: TabsProps) => {
  const others = omit(
    props,
    "class",
  );

  return (
    <KTabs class={cn("flex flex-col w-full", props.class)} {...others}>
      <KTabs.List data-slot="tabs-list" class="relative flex items-center border-b border-base">
        <For each={props.items}>
          {(item) => (
            <KTabs.Trigger
              data-slot="tabs-trigger" class="relative flex h-9 items-center justify-center px-4 text-sm font-medium transition-colors outline-none select-none cursor-pointer text-muted hover:text-muted/80 data-selected:text-main"
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </KTabs.Trigger>
          )}
        </For>
        <KTabs.Indicator
          data-slot="tabs-indicator" class="absolute -bottom-px h-0.5 bg-reversal-bg transition-all duration-200"
        />
      </KTabs.List>

      <For each={props.items}>
        {(item) => (
          <KTabs.Content
            data-slot="tabs-content" class="mt-4 text-sm text-main focus-visible:outline-none"
            value={item.value}
          >
            {item.content}
          </KTabs.Content>
        )}
      </For>
    </KTabs>
  );
};
