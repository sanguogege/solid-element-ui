import { TimeField as KTimeField, type TimeFieldRootProps } from "@kobalte/core/time-field";
import { omit, Show } from "solid-js";

import { cn } from "../../utils/cn";

export interface TimeFieldProps extends Omit<TimeFieldRootProps, "class"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  class?: string;
  size?: string;
  labelClass?: string;
  controlClass?: string;
  segmentClass?: string;
  descriptionClass?: string;
  errorMessageClass?: string;
}

export const TimeField = (props: TimeFieldProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "errorMessage",
    "class",
    "size",
    "labelClass",
    "controlClass",
    "segmentClass",
    "descriptionClass",
    "errorMessageClass",
  );

  return (
    <KTimeField
      class={cn("flex flex-col gap-1.5 w-full", props.class)}
      validationState={props.errorMessage ? "invalid" : "valid"}
      {...others}
    >
      <Show when={props.label}>
        <KTimeField.Label
          class={cn(
            "text-sm font-medium text-slate-700 dark:text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            props.labelClass,
          )}
        >
          {props.label}
        </KTimeField.Label>
      </Show>

      <KTimeField.Input>
        {(segment) => (
          <KTimeField.Segment
            segment={segment()}
            class={cn(
              "inline rounded-sm px-0.5 tabular-nums outline-none transition-colors focus:bg-blue-600 focus:text-white dark:focus:bg-blue-500 data-placeholder:text-slate-400 data-type=literal:px-0",
              props.segmentClass,
            )}
          />
        )}
      </KTimeField.Input>

      <Show when={props.description}>
        <KTimeField.Description
          class={cn("text-xs text-slate-500 dark:text-slate-400", props.descriptionClass)}
        >
          {props.description}
        </KTimeField.Description>
      </Show>

      <Show when={props.errorMessage}>
        <KTimeField.ErrorMessage class={cn("text-xs text-red-500", props.errorMessageClass)}>
          {props.errorMessage}
        </KTimeField.ErrorMessage>
      </Show>
    </KTimeField>
  );
};
