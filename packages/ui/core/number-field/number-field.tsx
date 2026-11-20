import { NumberField as KNumberField, type NumberFieldRootProps } from "@kobalte/core/number-field";
import { omit, Show } from "solid-js";
import ChevronUp from "@lucide/solid/icons/chevron-up";
import ChevronDown from "@lucide/solid/icons/chevron-down";

import { cn } from "cn";

export interface NumberFieldProps extends Omit<NumberFieldRootProps, "class"> {
  label?: string;
  description?: string;
  class?: string;
  size?: string;
  labelClass?: string;
  containerClass?: string;
  inputClass?: string;
  controlsClass?: string;
  stepperClass?: string;
  errorMessageClass?: string;
}

export const NumberField = (props: NumberFieldProps) => {
  // 严格处理属性，防止 TS 报错“已声明但未使用”
  const others = omit(
    props,
    "label",
    "description",
    "class",
    "labelClass",
    "containerClass",
    "inputClass",
    "controlsClass",
    "stepperClass",
    "errorMessageClass",
  );

  return (
    <KNumberField class={cn("flex flex-col gap-1.5 w-full antialiased", props.class)} {...others}>
      <Show when={props.label}>
        <KNumberField.Label class={cn("text-sm font-medium text-main ml-1", props.labelClass)}>
          {props.label}
        </KNumberField.Label>
      </Show>

      <div
        class={cn(
          "relative flex items-center rounded-md border border-slate-200 bg-app transition-shadow shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
          props.containerClass,
        )}
      >
        <KNumberField.Input
          class={cn(
            "flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed",
            props.inputClass,
          )}
        />
        <div
          class={cn(
            "flex flex-col border-l border-slate-200 dark:border-slate-800",
            props.controlsClass,
          )}
        >
          <KNumberField.IncrementTrigger
            class={cn(
              "flex h-1/2 w-8 items-center justify-center transition-colors hover:bg-foreground active:bg-foreground disabled:opacity-30 disabled:pointer-events-none",
              props.stepperClass,
            )}
          >
            <ChevronUp size={14} />
          </KNumberField.IncrementTrigger>
          <KNumberField.DecrementTrigger
            class={cn(
              "flex h-1/2 w-8 items-center justify-center transition-colors hover:bg-foreground active:bg-foreground disabled:opacity-30 disabled:pointer-events-none",
              props.stepperClass,
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
        class={cn("text-xs text-danger font-medium ml-1 mt-1", props.errorMessageClass)}
      />
    </KNumberField>
  );
};
