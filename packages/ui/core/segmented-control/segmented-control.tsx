import {
  SegmentedControl as KSegmented,
  type SegmentedControlRootProps,
} from "@kobalte/core/segmented-control";
import { omit, For } from "solid-js";

import { cn } from "cn";

// FIXME 样式问题

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SegmentedControlProps extends Omit<SegmentedControlRootProps, "class"> {
  options: Option[];
  label?: string;
  class?: string;
  size?: string;
}

export const SegmentedControl = (props: SegmentedControlProps) => {
  const others = omit(
    props,
    "options",
    "class",
    "label",
    "size",
  );

  return (
    <KSegmented class={cn("relative flex flex-col", props.class)} {...others}>
      {props.label && (
        <KSegmented.Label
          data-slot="segmented-control-label" class="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {props.label}
        </KSegmented.Label>
      )}
      <div
        data-slot="segmented-control-container" class="relative flex items-center w-full rounded-lg bg-foreground p-1 text-main"
      >
        <For each={props.options}>
          {(option) => (
            <KSegmented.Item
              value={option.value}
              disabled={option.disabled}
              data-slot="segmented-control-item" class="z-10 inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50 duration-200"
            >
              <KSegmented.ItemInput />
              <KSegmented.ItemLabel
                data-slot="segmented-control-item-label" class="flex w-full cursor-pointer items-center justify-center"
              >
                {option.label}
              </KSegmented.ItemLabel>
            </KSegmented.Item>
          )}
        </For>
        <KSegmented.Indicator
          data-slot="segmented-control-indicator" class="absolute z-0 bg-app shadow-sm rounded-md transition-all duration-200 ease-in-out"
        />
      </div>
    </KSegmented>
  );
};
