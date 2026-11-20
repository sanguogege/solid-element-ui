import { TimeField as KTimeField, type TimeFieldRootProps } from "@kobalte/core/time-field";
import { omit, Show } from "solid-js";

import { cn } from "cn";

export interface TimeFieldProps extends Omit<TimeFieldRootProps, "class"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  class?: string;
  size?: string;
}

export const TimeField = (props: TimeFieldProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "errorMessage",
    "class",
    "size",
  );

  return (
    <KTimeField
      class={cn("flex flex-col gap-1.5 w-full", props.class)}
      validationState={props.errorMessage ? "invalid" : "valid"}
      {...others}
    >
      <Show when={props.label}>
        <KTimeField.Label
          data-slot="time-field-label" class="text-sm font-medium text-slate-700 dark:text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {props.label}
        </KTimeField.Label>
      </Show>

      <KTimeField.Input>
        {(segment) => (
          <KTimeField.Segment
            segment={segment()}
            data-slot="time-field-segment" class="inline rounded-sm px-0.5 tabular-nums outline-none transition-colors focus:bg-blue-600 focus:text-white dark:focus:bg-blue-500 data-placeholder:text-slate-400 data-type=literal:px-0"
          />
        )}
      </KTimeField.Input>

      <Show when={props.description}>
        <KTimeField.Description
          data-slot="time-field-description" class="text-xs text-slate-500 dark:text-slate-400"
        >
          {props.description}
        </KTimeField.Description>
      </Show>

      <Show when={props.errorMessage}>
        <KTimeField.ErrorMessage data-slot="time-field-error-message" class="text-xs text-red-500">
          {props.errorMessage}
        </KTimeField.ErrorMessage>
      </Show>
    </KTimeField>
  );
};
