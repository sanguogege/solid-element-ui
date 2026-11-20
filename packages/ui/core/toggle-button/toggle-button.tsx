import { ToggleButton as KToggle, type ToggleButtonRootProps } from "@kobalte/core/toggle-button";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

// TODO 切换样式问题

export interface ToggleButtonProps extends Omit<ToggleButtonRootProps, "class"> {
  class?: string;
  children?: JSX.Element;
  variant?: string;
  size?: string;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const others = omit(props, "class", "children", "variant", "size");

  return (
    <KToggle
      class={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
        props.class,
      )}
      {...others}
    >
      {(state: any) =>
        typeof props.children === "function" ? (props.children as any)(state) : props.children
      }
    </KToggle>
  );
};
