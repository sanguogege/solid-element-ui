import { ColorWheel as KColorWheel, type ColorWheelRootProps } from "@kobalte/core/color-wheel";
import { omit } from "solid-js";

import { cn } from "cn";

// FIXME 颜色选项都有源代码问题，注意查看原始kobalte的问题。

export interface ColorWheelProps extends ColorWheelRootProps {
  size?: number;
  class?: string;
}

export const ColorWheel = (props: ColorWheelProps) => {
  const others = omit(props, "size", "class");

  return (
    <KColorWheel
      class={cn(
        "relative flex flex-col items-center justify-center select-none touch-none",
        props.class,
      )}
      {...others}
    >
      <KColorWheel.Track
        data-slot="color-wheel-track" class="relative rounded-full border border-hairline"
        style={{
          width: `${props.size || 160}px`,
          height: `${props.size || 160}px`,
          background: "var(--kb-color-wheel-track-background)",
        }}
      >
        <KColorWheel.Thumb
          data-slot="color-wheel-thumb" class="z-10 h-5 w-5 rounded-full border-2 border-contrast bg-transparent shadow-md transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong focus-visible:ring-offset-2 hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing"
        >
          <KColorWheel.Input />
        </KColorWheel.Thumb>
      </KColorWheel.Track>
    </KColorWheel>
  );
};
