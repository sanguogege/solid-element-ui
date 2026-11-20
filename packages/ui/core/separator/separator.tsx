import { Separator as KSeparator, type SeparatorRootProps } from "@kobalte/core/separator";
import { omit } from "solid-js";

import { cn } from "cn";

export interface SeparatorProps extends SeparatorRootProps {
  orientation?: "horizontal" | "vertical";
  class?: string;
  thickness?: string;
  variant?: string;
}

export const Separator = (props: SeparatorProps) => {
  const others = omit(props, "class", "orientation", "thickness", "variant");

  return (
    <KSeparator
      class={cn("bg-foreground shrink-0 transition-colors", props.class)}
      orientation={props.orientation}
      {...others}
    />
  );
};
