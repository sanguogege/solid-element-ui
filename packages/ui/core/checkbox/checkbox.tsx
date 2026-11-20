import { Checkbox as KCheckbox, type CheckboxRootProps } from "@kobalte/core/checkbox";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { Check } from "@lucide/solid";
import { cn } from "cn";

// TODO 添加checkbox 的几种形状尺寸,看情况吧
export interface CheckboxProps extends CheckboxRootProps {
  label?: JSX.Element;
  description?: string;
  errorMessage?: string;
  class?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "errorMessage",
    "class",
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
        data-slot="checkbox-control" class="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-base transition-all group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-zinc-950 data-checked:bg-zinc-900 data-checked:border-zinc-900 data-checked:text-zinc-50 data-disabled:bg-zinc-400 data-disabled:border-zinc-400 dark:data-checked:bg-zinc-50 dark:data-checked:text-zinc-900 dark:group-focus-visible:ring-zinc-300"
      >
        <KCheckbox.Indicator data-slot="checkbox-indicator" class="h-3.5 w-3.5">
          <Check data-slot="checkbox-indicator-icon" class="h-3.5 w-3.5" stroke-width={3} />
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      {props.label && (
        <KCheckbox.Label
          data-slot="checkbox-label" class="text-sm font-medium leading-none select-none data-disabled:text-zinc-400"
        >
          {props.label}
        </KCheckbox.Label>
      )}
      <KCheckbox.Description data-slot="checkbox-description" class="text-sm text-zinc-500">
        {props.description}
      </KCheckbox.Description>
      <KCheckbox.ErrorMessage data-slot="checkbox-error-message" class="text-sm text-red-500">
        {props.errorMessage}
      </KCheckbox.ErrorMessage>
    </KCheckbox>
  );
};
