import { Button as KButton, type ButtonRootProps } from "@kobalte/core/button";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { LoaderCircle } from "@lucide/solid";
import { omit, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

/**
 * A small styled wrapper around `@kobalte/core/button`.
 *
 * Kobalte owns the button semantics (disabled handling, keyboard behaviour,
 * polymorphic `as`). This component only adds the token-based classes, an
 * accessible loading state and optional icon slots.
 */
export type ButtonProps = PolymorphicProps<"button", ButtonRootProps<"button">> & {
  /** Extra classes. Merged last, so consumer utilities win. */
  class?: string;
  children?: JSX.Element;
  /** Shows a spinner, disables the button and marks it busy. */
  loading?: boolean;
  /** Visually hidden text announced while loading (defaults to "Loading"). */
  loadingText?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  /** Anchor props for `as="a"`. */
  href?: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonProps) {
  const others = omit(
    props,
    "class",
    "children",
    "loading",
    "loadingText",
    "leftIcon",
    "rightIcon",
    "disabled",
  );

  return (
    <KButton
      {...others}
      disabled={props.disabled || props.loading}
      aria-busy={props.loading ? "true" : undefined}
      data-slot="button"
      data-loading={props.loading ? "" : undefined}
      class={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-light bg-app px-4 py-2 text-sm font-medium text-main shadow-xs transition-colors outline-none select-none hover:bg-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
    >
      <Show when={props.loading}>
        <LoaderCircle aria-hidden="true" data-slot="button-icon" class="size-4 animate-spin" />
        <span class="sr-only">{props.loadingText ?? "Loading"}</span>
      </Show>

      <Show when={!props.loading && props.leftIcon}>
        <span data-icon="inline-start" aria-hidden="true" class="inline-flex shrink-0 items-center">
          {props.leftIcon}
        </span>
      </Show>

      {props.children}

      <Show when={!props.loading && props.rightIcon}>
        <span data-icon="inline-end" aria-hidden="true" class="inline-flex shrink-0 items-center">
          {props.rightIcon}
        </span>
      </Show>
    </KButton>
  );
}
