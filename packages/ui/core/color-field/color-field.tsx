import { ColorField as KColorField, type ColorFieldRootProps } from "@kobalte/core/color-field";
import { omit } from "solid-js";

import { cn } from "cn";

export interface ColorFieldProps extends ColorFieldRootProps {
  label?: string;
  desc?: string;
  error?: string;
  class?: string;
  labelClass?: string;
  inputClass?: string;
  descriptionClass?: string;
  errorMessageClass?: string;
}

export const ColorField = (props: ColorFieldProps) => {
  const others = omit(
    props,
    "label",
    "desc",
    "error",
    "class",
    "labelClass",
    "inputClass",
    "descriptionClass",
    "errorMessageClass",
  );

  return (
    <KColorField
      class={cn("flex flex-col gap-1.5 w-full", props.class)}
      validationState={props.error ? "invalid" : "valid"}
      {...others}
    >
      {props.label && (
        <KColorField.Label
          class={cn(
            "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none disabled:opacity-50",
            props.labelClass,
          )}
        >
          {props.label}
        </KColorField.Label>
      )}
      <KColorField.Input
        class={cn(
          "h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-all placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300",
          props.inputClass,
        )}
        placeholder="#FFFFFF"
      />
      {props.desc && !props.error && (
        <KColorField.Description
          class={cn("text-[0.8rem] text-zinc-500 dark:text-zinc-400", props.descriptionClass)}
        >
          {props.desc}
        </KColorField.Description>
      )}
      <KColorField.ErrorMessage
        class={cn("text-[0.8rem] font-medium text-red-500", props.errorMessageClass)}
      >
        {props.error}
      </KColorField.ErrorMessage>
    </KColorField>
  );
};
