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
          data-slot="color-field-label" class="text-sm font-medium text-main select-none disabled:opacity-50"
        >
          {props.label}
        </KColorField.Label>
      )}
      <KColorField.Input
        data-slot="color-field-input" class="h-9 w-full rounded-md border border-light bg-app px-3 py-1 text-sm shadow-sm transition-all placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-strong data-[invalid]:border-danger data-[invalid]:focus-visible:ring-danger disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="#FFFFFF"
      />
      {props.desc && !props.error && (
        <KColorField.Description
          data-slot="color-field-description" class="text-[0.8rem] text-muted"
        >
          {props.desc}
        </KColorField.Description>
      )}
      <KColorField.ErrorMessage
        data-slot="color-field-error-message" class="text-[0.8rem] font-medium text-danger"
      >
        {props.error}
      </KColorField.ErrorMessage>
    </KColorField>
  );
};
