import { Checkbox as KCheckbox, type CheckboxRootProps } from "@kobalte/core/checkbox";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { Check } from "../icons";

import { cn } from "../../utils/cn";

// TODO 添加checkbox 的几种形状尺寸,看情况吧
export interface CheckboxProps extends CheckboxRootProps {
  label?: JSX.Element;
  description?: string;
  errorMessage?: string;
  class?: string;
  controlClass?: string;
  labelClass?: string;
  indicatorClass?: string;
  descriptionClass?: string;
  errorMessageClass?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "errorMessage",
    "class",
    "controlClass",
    "labelClass",
    "indicatorClass",
    "descriptionClass",
    "errorMessageClass",
  );

  return (
    <KCheckbox
      class={cn(
        "group flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        props.class,
      )}
      {...others}
    >
      <KCheckbox.Input />
      <KCheckbox.Control
        class={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-base transition-all group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-zinc-950 data-checked:bg-zinc-900 data-checked:border-zinc-900 data-checked:text-zinc-50 data-disabled:bg-zinc-400 data-disabled:border-zinc-400 dark:data-checked:bg-zinc-50 dark:data-checked:text-zinc-900 dark:group-focus-visible:ring-zinc-300",
          props.controlClass,
        )}
      >
        <KCheckbox.Indicator class={cn("h-3.5 w-3.5", props.indicatorClass)}>
          <Check class={cn("h-3.5 w-3.5", props.indicatorClass)} stroke-width={3} />
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      {props.label && (
        <KCheckbox.Label
          class={cn(
            "text-sm font-medium leading-none select-none data-disabled:text-zinc-400",
            props.labelClass,
          )}
        >
          {props.label}
        </KCheckbox.Label>
      )}
      <KCheckbox.Description class={cn("text-sm text-zinc-500", props.descriptionClass)}>
        {props.description}
      </KCheckbox.Description>
      <KCheckbox.ErrorMessage class={cn("text-sm text-red-500", props.errorMessageClass)}>
        {props.errorMessage}
      </KCheckbox.ErrorMessage>
    </KCheckbox>
  );
};
