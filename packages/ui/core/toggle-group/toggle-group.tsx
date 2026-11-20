import { ToggleGroup as KToggleGroup, type ToggleGroupRootProps } from "@kobalte/core/toggle-group";
import { omit, For } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

// TODO 单选，多选出现问题

interface Option {
  label: string | JSX.Element;
  value: string;
  disabled?: boolean;
}

export interface ToggleGroupProps extends Omit<ToggleGroupRootProps, "class"> {
  options: Option[];
  class?: string;
  size?: string;
  variant?: string;
}

export const ToggleGroup = (props: ToggleGroupProps) => {
  const others = omit(props, "options", "class", "size", "variant");

  return (
    <KToggleGroup
      class={cn(
        "inline-flex items-center justify-center rounded-md border border-light bg-transparent p-1",
        props.class,
      )}
      {...(others as any)}
    >
      <For each={props.options}>
        {(option) => (
          <KToggleGroup.Item
            value={option.value}
            disabled={option.disabled}
            data-slot="toggle-group-item" class="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-foreground/80 hover:text-muted/80"
          >
            {option.label}
          </KToggleGroup.Item>
        )}
      </For>
    </KToggleGroup>
  );
};
