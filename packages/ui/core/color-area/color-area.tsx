import { ColorArea as KColorArea, type ColorAreaRootProps } from "@kobalte/core/color-area";
import { omit } from "solid-js";

import { cn } from "cn";

export interface ColorAreaProps extends ColorAreaRootProps {
  class?: string;
}

export const ColorArea = (props: ColorAreaProps) => {
  const others = omit(props, "class");

  return (
    <KColorArea
      class={cn(
        "relative h-48 w-full shrink-0 rounded-lg border border-base touch-none",
        props.class,
      )}
      {...others}
    >
      <KColorArea.Background
        data-slot="color-area-background" class="h-full w-full rounded-[inherit]"
        style={{
          background:
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), red",
        }}
      />
      <KColorArea.Thumb
        data-slot="color-area-thumb" class="z-10 h-5 w-5 rounded-full border-2 border-contrast bg-transparent shadow-md transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong focus-visible:ring-offset-2 hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing"
      ></KColorArea.Thumb>
    </KColorArea>
  );
};
