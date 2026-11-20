import { ColorSlider as KColorSlider, type ColorSliderRootProps } from "@kobalte/core/color-slider";
import { omit } from "solid-js";

import { cn } from "cn";

// TODO defaultValue,还有channel 的问题

export interface ColorSliderProps extends ColorSliderRootProps {
  label?: string;
  showValue?: boolean;
  class?: string;
}

export const ColorSlider = (props: ColorSliderProps) => {
  const others = omit(
    props,
    "label",
    "showValue",
    "class",
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
            data-slot="color-slider-label" class="text-sm font-medium text-main self-start"
          >
            {props.label}
          </KColorSlider.Label>
        )}
        {props.showValue && (
          <KColorSlider.ValueLabel
            data-slot="color-slider-value-label" class="text-xs text-muted tabular-nums"
          />
        )}
      </div>
      <KColorSlider.Track
        data-slot="color-slider-track" class="relative h-3 w-full rounded-full border border-hairline"
        style={{
          background: "var(--kb-color-slider-track-background)",
        }}
      >
        <KColorSlider.Thumb
          data-slot="color-slider-thumb" class="z-10 h-5 w-5 rounded-full border-2 border-contrast bg-transparent shadow-md transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong focus-visible:ring-offset-2 hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing"
        >
          <KColorSlider.Input />
        </KColorSlider.Thumb>
      </KColorSlider.Track>
    </KColorSlider>
  );
};
