import { Button as KButton, type ButtonRootProps } from "@kobalte/core/button";
import { omit, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { LoaderCircle } from "../icons";

import { cn } from "cn";

export interface ButtonProps extends ButtonRootProps {
  loading?: boolean;
  leftIcon?: JSX.Element;
  children?: JSX.Element;
  rightIcon?: JSX.Element;
  class?: string;
  iconClass?: string;
  variant?: "default" | "outline" | "dashed" | "filled" | "text";
  color?: "default" | "primary" | "success" | "warning" | "danger";
  size?: string;
}

export const Button = (props: ButtonProps) => {
  const others = omit(
    props,
    "class",
    "children",
    "loading",
    "leftIcon",
    "rightIcon",
    "disabled",
    "variant",
    "size",
    "color",
    "iconClass",
  );

  return (
    <KButton
      class={cn(
        [
          "group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
          "",
        ],
        props.class,
      )}
      disabled={props.disabled || props.loading}
      {...others}
    >
      {/* Loading 状态显示 */}
      <Show when={props.loading}>
        <LoaderCircle class={cn("animate-spin -ml-1 mr-2 h-4 w-4 text-current", props.iconClass)} />
      </Show>

      {/* 非 Loading 状态下的 Left Icon */}
      <Show when={!props.loading && props.leftIcon}>
        <span class="mr-2 inline-flex">{props.leftIcon}</span>
      </Show>

      {props.children}

      {/* Right Icon */}
      <Show when={props.rightIcon}>
        <span class="ml-2 inline-flex">{props.rightIcon}</span>
      </Show>
    </KButton>
  );
};
