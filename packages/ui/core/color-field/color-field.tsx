import { ColorField as KColorField, type ColorFieldRootProps } from "@kobalte/core/color-field";
import { omit } from "solid-js";

import { cn } from "cn";

export interface ColorFieldProps extends ColorFieldRootProps {
  label?: string;
  desc?: string;
  error?: string;
  class?: string;
}

export const ColorField = (props: ColorFieldProps) => {
  const others = omit(
    props,
    "label",
    "desc",
    "error",
    "class",
  );

  return (
    <KColorField
      class={cn("flex flex-col gap-1.5 w-full", props.class)}
      validationState={props.error ? "invalid" : "valid"}
      {...others}
    >
      {props.label && (
        <KColorField.Label
          data-slot="color-field-label" class="text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none disabled:opacity-50"
        >
          {props.label}
        </KColorField.Label>
      )}
      <KColorField.Input
        data-slot="color-field-input" class="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-all placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300"
        placeholder="#FFFFFF"
      />
      {props.desc && !props.error && (
        <KColorField.Description
          data-slot="color-field-description" class="text-[0.8rem] text-zinc-500 dark:text-zinc-400"
        >
          {props.desc}
        </KColorField.Description>
      )}
      <KColorField.ErrorMessage
        data-slot="color-field-error-message" class="text-[0.8rem] font-medium text-red-500"
      >
        {props.error}
      </KColorField.ErrorMessage>
    </KColorField>
  );
};
