import { ColorSwatch as KColorSwatch, type ColorSwatchRootProps } from "@kobalte/core/color-swatch";
import { omit } from "solid-js";

import { cn } from "cn";

// TODO 源代码问题

// FIXME 源代码问题

export interface ColorSwatchProps extends ColorSwatchRootProps {
  class?: string;
}

export const ColorSwatch = (props: ColorSwatchProps) => {
  const others = omit(props, "class", "style");

  return (
    <KColorSwatch
      class={cn(
        "h-8 w-8 rounded-md border border-black/10 shadow-sm transition-transform hover:scale-105 select-none dark:border-white/20",
        props.class,
      )}
      {...others}
    />
  );
};
