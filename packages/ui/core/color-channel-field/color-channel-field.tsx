import {
  ColorChannelField as KColorChannelField,
  type ColorChannelFieldRootProps,
} from "@kobalte/core/color-channel-field";
import { omit } from "solid-js";

import { cn } from "cn";

export interface ColorChannelFieldProps extends ColorChannelFieldRootProps {
  label?: string;
  class?: string;
}

// TODO channel 问题

export const ColorChannelField = (props: ColorChannelFieldProps) => {
  const others = omit(props, "label", "class");

  return (
    <KColorChannelField class={cn("flex flex-col gap-1.5 w-full", props.class)} {...others}>
      {props.label && (
        <KColorChannelField.Label
          data-slot="color-channel-field-label" class="text-sm font-medium text-main select-none"
        >
          {props.label}
        </KColorChannelField.Label>
      )}
      <KColorChannelField.Input
        data-slot="color-channel-field-input" class="h-9 w-full rounded-md border border-light bg-app px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-strong disabled:cursor-not-allowed disabled:opacity-50"
      />
    </KColorChannelField>
  );
};
