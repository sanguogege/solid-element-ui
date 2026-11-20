import { NumberField as KNumberField, type NumberFieldRootProps } from "@kobalte/core/number-field";
import { omit, Show } from "solid-js";

import { ChevronUp, ChevronDown } from "@lucide/solid";
import { cn } from "cn";

export interface NumberFieldProps extends Omit<NumberFieldRootProps, "class"> {
  label?: string;
  description?: string;
  class?: string;
  size?: string;
}

export const NumberField = (props: NumberFieldProps) => {
  // 严格处理属性，防止 TS 报错“已声明但未使用”
  const others = omit(
    props,
    "label",
    "description",
    "class",
  );

  return (
    <KNumberField class={cn("flex flex-col gap-1.5 w-full antialiased", props.class)} {...others}>
      <Show when={props.label}>
        <KNumberField.Label data-slot="number-field-label" class="text-sm font-medium text-main ml-1">
          {props.label}
        </KNumberField.Label>
      </Show>

      <div
        data-slot="number-field-container" class="relative flex items-center rounded-md border border-slate-200 bg-app transition-shadow shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500"
      >
        <KNumberField.Input
          data-slot="number-field-input" class="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
        />
        <div
          data-slot="number-field-controls" class="flex flex-col border-l border-slate-200 dark:border-slate-800"
        >
          <KNumberField.IncrementTrigger
            data-slot="number-field-stepper" class="flex h-1/2 w-8 items-center justify-center transition-colors hover:bg-foreground active:bg-foreground disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronUp size={14} />
          </KNumberField.IncrementTrigger>
          <KNumberField.DecrementTrigger
            data-slot="number-field-stepper" class={cn(
              "flex h-1/2 w-8 items-center justify-center transition-colors hover:bg-foreground active:bg-foreground disabled:opacity-30 disabled:pointer-events-none",
              "border-t border-slate-200 dark:border-slate-800",
            )}
          >
            <ChevronDown size={14} />
          </KNumberField.DecrementTrigger>
        </div>
      </div>

      <Show when={props.description}>
        <KNumberField.Description class="text-xs text-slate-500 ml-1 mt-1" />
      </Show>
      <KNumberField.ErrorMessage
        data-slot="number-field-error-message" class="text-xs text-danger font-medium ml-1 mt-1"
      />
    </KNumberField>
  );
};
