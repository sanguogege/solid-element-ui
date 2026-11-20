import {
  ColorChannelField as KColorChannelField,
  type ColorChannelFieldRootProps,
} from "@kobalte/core/color-channel-field";
import { omit } from "solid-js";

import { cn } from "cn";

export interface ColorChannelFieldProps extends ColorChannelFieldRootProps {
  label?: string;
  class?: string;
  labelClass?: string;
  inputClass?: string;
}

// TODO channel 问题

export const ColorChannelField = (props: ColorChannelFieldProps) => {
  const others = omit(props, "label", "class", "labelClass", "inputClass");

  return (
    <KColorChannelField class={cn("flex flex-col gap-1.5 w-full", props.class)} {...others}>
      {props.label && (
        <KColorChannelField.Label
          class={cn(
            "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none",
            props.labelClass,
          )}
        >
          {props.label}
        </KColorChannelField.Label>
      )}
      <KColorChannelField.Input
        class={cn(
          "h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300",
          props.inputClass,
        )}
      />
    </KColorChannelField>
  );
};
