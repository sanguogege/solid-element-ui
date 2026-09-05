import { TextField as KTextField, type TextFieldRootProps } from "@kobalte/core/text-field";
import { omit, Show } from "solid-js";

import { cn } from "../../utils/cn";

export interface TextFieldProps extends Omit<TextFieldRootProps, "class"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  type?: string;
  class?: string;
  size?: string;
  labelClass?: string;
  inputClass?: string;
  descriptionClass?: string;
  errorMessageClass?: string;
}

export const TextField = (props: TextFieldProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "errorMessage",
    "placeholder",
    "type",
    "class",
    "size",
    "labelClass",
    "inputClass",
    "descriptionClass",
    "errorMessageClass",
  );

  return (
    <KTextField
      class={cn("flex flex-col gap-1.5 w-full", props.class)}
      validationState={props.errorMessage ? "invalid" : "valid"}
      {...others}
    >
      <Show when={props.label}>
        <KTextField.Label
          class={cn(
            "text-sm font-medium text-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            props.labelClass,
          )}
        >
          {props.label}
        </KTextField.Label>
      </Show>

      <KTextField.Input
        class={cn(
          "flex h-10 w-full rounded-md border border-light bg-app px-3 py-2 text-sm transition-shadow text-main ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 data-invalid:border-danger data-invalid:focus-visible:ring-danger",
          props.inputClass,
        )}
        type={props.type}
        placeholder={props.placeholder}
      />

      <Show when={props.description}>
        <KTextField.Description class={cn("text-xs text-muted", props.descriptionClass)}>
          {props.description}
        </KTextField.Description>
      </Show>

      <Show when={props.errorMessage}>
        <KTextField.ErrorMessage
          class={cn(
            "text-xs text-danger animate-in fade-in-50 slide-in-from-top-1",
            props.errorMessageClass,
          )}
        >
          {props.errorMessage}
        </KTextField.ErrorMessage>
      </Show>
    </KTextField>
  );
};
