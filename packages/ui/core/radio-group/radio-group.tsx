import { RadioGroup as KRadioGroup, type RadioGroupRootProps } from "@kobalte/core/radio-group";
import { omit, For, Show } from "solid-js";

import { cn } from "../../utils/cn";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<RadioGroupRootProps, "children" | "class"> {
  label?: string;
  options: RadioOption[];
  class?: string;
  labelClass?: string;
  itemClass?: string;
  controlClass?: string;
  indicatorClass?: string;
  itemLabelClass?: string;
}

/**
 * RadioGroup 高度封装版
 * 自动处理循环渲染、选中指示器以及水平/垂直布局
 */
export const RadioGroup = (props: RadioGroupProps) => {
  const others = omit(
    props,
    "label",
    "options",
    "class",
    "orientation",
    "labelClass",
    "itemClass",
    "controlClass",
    "indicatorClass",
    "itemLabelClass",
  );

  return (
    <KRadioGroup class={cn("flex flex-col gap-3 antialiased", props.class)} {...others}>
      <Show when={props.label}>
        <KRadioGroup.Label class={cn("text-sm font-semibold text-main mb-1", props.labelClass)}>
          {props.label}
        </KRadioGroup.Label>
      </Show>

      <For each={props.options}>
        {(option) => (
          <KRadioGroup.Item
            value={option.value}
            disabled={option.disabled}
            class={cn(
              "group flex items-center gap-3 cursor-pointer disabled:cursor-not-allowed",
              props.itemClass,
            )}
          >
            <KRadioGroup.ItemInput />
            <KRadioGroup.ItemControl
              class={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-app transition-all shadow-sm group-hover:border-light group-data-checked:border-primary group-data-checked:bg-primary group-focus-visible:ring-2 group-focus-visible:ring-blue-500/20",
                props.controlClass,
              )}
            >
              <KRadioGroup.ItemIndicator
                class={cn("h-2 w-2 rounded-full bg-app shadow-sm", props.indicatorClass)}
              />
            </KRadioGroup.ItemControl>
            <KRadioGroup.ItemLabel
              class={cn(
                "text-sm font-medium text-main group-data-disabled:opacity-50",
                props.itemLabelClass,
              )}
            >
              {option.label}
            </KRadioGroup.ItemLabel>
          </KRadioGroup.Item>
        )}
      </For>
    </KRadioGroup>
  );
};
