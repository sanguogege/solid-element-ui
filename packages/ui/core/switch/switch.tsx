import { Switch as KSwitch, type SwitchRootProps } from "@kobalte/core/switch";
import { omit, Show } from "solid-js";

import { cn } from "../../utils/cn";

export interface SwitchProps extends Omit<SwitchRootProps, "class"> {
  label?: string;
  description?: string;
  class?: string;
  size?: string;
  variant?: string;
  controlClass?: string;
  thumbClass?: string;
  labelClass?: string;
  descriptionClass?: string;
}

export const Switch = (props: SwitchProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "class",
    "size",
    "variant",
    "controlClass",
    "thumbClass",
    "labelClass",
    "descriptionClass",
  );

  return (
    <KSwitch class={cn("inline-flex items-center gap-2 group", props.class)} {...others}>
      <KSwitch.Input />
      <KSwitch.Control
        class={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-foreground data-checked:bg-primary",
          props.controlClass,
        )}
      >
        <KSwitch.Thumb
          class={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-app shadow-lg ring-0 transition-transform data-checked:translate-x-5 translate-x-0",
            props.thumbClass,
          )}
        />
      </KSwitch.Control>

      <Show when={props.label || props.description}>
        <div class="flex flex-col gap-0.5">
          <Show when={props.label}>
            <KSwitch.Label
              class={cn(
                "text-sm font-medium leading-none group-data-disabled:opacity-70",
                props.labelClass,
              )}
            >
              {props.label}
            </KSwitch.Label>
          </Show>
          <Show when={props.description}>
            <KSwitch.Description class={cn("text-xs text-muted", props.descriptionClass)}>
              {props.description}
            </KSwitch.Description>
          </Show>
        </div>
      </Show>
    </KSwitch>
  );
};
