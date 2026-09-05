import { Slider as KSlider, type SliderRootProps } from "@kobalte/core/slider";
import { omit, For, Show } from "solid-js";

import { cn } from "../../utils/cn";

// FIXME 点击轨道时报错

export interface SliderProps extends Omit<SliderRootProps, "class" | "value" | "defaultValue"> {
  label?: string;
  showValue?: boolean;
  class?: string;
  variant?: string;
  size?: string;
  value?: number[];
  defaultValue?: number[];
  labelWrapperClass?: string;
  labelClass?: string;
  valueClass?: string;
  trackClass?: string;
  fillClass?: string;
  thumbClass?: string;
}

export const Slider = (props: SliderProps) => {
  const others = omit(
    props,
    "label",
    "showValue",
    "class",
    "variant",
    "size",
    "labelWrapperClass",
    "labelClass",
    "valueClass",
    "trackClass",
    "fillClass",
    "thumbClass",
  );

  return (
    <KSlider
      class={cn(
        "relative flex flex-col items-center select-none touch-none w-full gap-2",
        props.class,
      )}
      {...others}
    >
      <Show when={props.label || props.showValue}>
        <div class={cn("flex w-full justify-between items-center", props.labelWrapperClass)}>
          <Show when={props.label}>
            <KSlider.Label class={cn("text-sm font-medium text-muted", props.labelClass)}>
              {props.label}
            </KSlider.Label>
          </Show>
          <Show when={props.showValue}>
            <KSlider.ValueLabel class={cn("text-sm text-muted font-mono", props.valueClass)} />
          </Show>
        </div>
      </Show>

      <KSlider.Track
        class={cn("relative h-2 w-full grow rounded-full bg-foreground", props.trackClass)}
      >
        <KSlider.Fill class={cn("absolute h-full rounded-full", props.fillClass)} />
        <For each={others.value ?? [others.defaultValue]}>
          {() => (
            <KSlider.Thumb
              class={cn(
                "block h-5 w-5 rounded-full border-2 bg-app ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-95 transition-transform",
                props.thumbClass,
              )}
            >
              <KSlider.Input />
            </KSlider.Thumb>
          )}
        </For>
      </KSlider.Track>
    </KSlider>
  );
};
