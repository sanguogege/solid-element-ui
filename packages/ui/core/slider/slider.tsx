import { Slider as KSlider, type SliderRootProps } from "@kobalte/core/slider";
import { omit, For, Show } from "solid-js";

import { cn } from "cn";

// FIXME 点击轨道时报错

export interface SliderProps extends Omit<SliderRootProps, "class" | "value" | "defaultValue"> {
  label?: string;
  showValue?: boolean;
  class?: string;
  variant?: string;
  size?: string;
  value?: number[];
  defaultValue?: number[];
}

export const Slider = (props: SliderProps) => {
  const others = omit(
    props,
    "label",
    "showValue",
    "class",
    "variant",
    "size",
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
        <div data-slot="slider-label-wrapper" class="flex w-full justify-between items-center">
          <Show when={props.label}>
            <KSlider.Label data-slot="slider-label" class="text-sm font-medium text-muted">
              {props.label}
            </KSlider.Label>
          </Show>
          <Show when={props.showValue}>
            <KSlider.ValueLabel data-slot="slider-value" class="text-sm text-muted font-mono" />
          </Show>
        </div>
      </Show>

      <KSlider.Track
        data-slot="slider-track" class="relative h-2 w-full grow rounded-full bg-foreground"
      >
        <KSlider.Fill data-slot="slider-fill" class="absolute h-full rounded-full" />
        <For each={others.value ?? [others.defaultValue]}>
          {() => (
            <KSlider.Thumb
              data-slot="slider-thumb" class="block h-5 w-5 rounded-full border-2 bg-app ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-95 transition-transform"
            >
              <KSlider.Input />
            </KSlider.Thumb>
          )}
        </For>
      </KSlider.Track>
    </KSlider>
  );
};
