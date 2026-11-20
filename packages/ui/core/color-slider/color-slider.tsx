import { ColorSlider as KColorSlider, type ColorSliderRootProps } from "@kobalte/core/color-slider";
import { omit } from "solid-js";

import { cn } from "cn";

// TODO defaultValue,还有channel 的问题

export interface ColorSliderProps extends ColorSliderRootProps {
  label?: string;
  showValue?: boolean;
  class?: string;
  labelClass?: string;
  trackClass?: string;
  thumbClass?: string;
  valueLabelClass?: string;
}

export const ColorSlider = (props: ColorSliderProps) => {
  const others = omit(
    props,
    "label",
    "showValue",
    "class",
    "labelClass",
    "trackClass",
    "thumbClass",
    "valueLabelClass",
  );

  return (
    <KColorSlider
      class={cn(
        "relative flex flex-col items-center select-none touch-none w-full gap-2",
        props.class,
      )}
      {...others}
    >
      <div class="flex w-full justify-between items-center">
        {props.label && (
          <KColorSlider.Label
            class={cn(
              "text-sm font-medium text-zinc-900 dark:text-zinc-100 self-start",
              props.labelClass,
            )}
          >
            {props.label}
          </KColorSlider.Label>
        )}
        {props.showValue && (
          <KColorSlider.ValueLabel
            class={cn(
              "text-xs text-zinc-500 dark:text-zinc-400 tabular-nums",
              props.valueLabelClass,
            )}
          />
        )}
      </div>
      <KColorSlider.Track
        class={cn(
          "relative h-3 w-full rounded-full border border-black/5 dark:border-white/10",
          props.trackClass,
        )}
        style={{
          background: "var(--kb-color-slider-track-background)",
        }}
      >
        <KColorSlider.Thumb
          class={cn(
            "z-10 h-5 w-5 rounded-full border-2 border-white bg-transparent shadow-md transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing",
            props.thumbClass,
          )}
        >
          <KColorSlider.Input />
        </KColorSlider.Thumb>
      </KColorSlider.Track>
    </KColorSlider>
  );
};
