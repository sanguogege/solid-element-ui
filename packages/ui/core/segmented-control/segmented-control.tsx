import {
  SegmentedControl as KSegmented,
  type SegmentedControlRootProps,
} from "@kobalte/core/segmented-control";
import { omit, For } from "solid-js";

import { cn } from "../../utils/cn";

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
  containerClass?: string;
  itemClass?: string;
  indicatorClass?: string;
  labelClass?: string;
  itemLabelClass?: string;
}

export const SegmentedControl = (props: SegmentedControlProps) => {
  const others = omit(
    props,
    "options",
    "class",
    "label",
    "size",
    "containerClass",
    "itemClass",
    "indicatorClass",
    "labelClass",
    "itemLabelClass",
  );

  return (
    <KSegmented class={cn("relative flex flex-col", props.class)} {...others}>
      {props.label && (
        <KSegmented.Label
          class={cn(
            "mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            props.labelClass,
          )}
        >
          {props.label}
        </KSegmented.Label>
      )}
      <div
        class={cn(
          "relative flex items-center w-full rounded-lg bg-foreground p-1 text-main",
          props.containerClass,
        )}
      >
        <For each={props.options}>
          {(option) => (
            <KSegmented.Item
              value={option.value}
              disabled={option.disabled}
              class={cn(
                "z-10 inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50 duration-200",
                props.itemClass,
              )}
            >
              <KSegmented.ItemInput />
              <KSegmented.ItemLabel
                class={cn(
                  "flex w-full cursor-pointer items-center justify-center",
                  props.itemLabelClass,
                )}
              >
                {option.label}
              </KSegmented.ItemLabel>
            </KSegmented.Item>
          )}
        </For>
        <KSegmented.Indicator
          class={cn(
            "absolute z-0 bg-app shadow-sm rounded-md transition-all duration-200 ease-in-out",
            props.indicatorClass,
          )}
        />
      </div>
    </KSegmented>
  );
};
