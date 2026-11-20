import { Button as KButton, type ButtonRootProps } from "@kobalte/core/button";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import LoaderCircle from "@lucide/solid/icons/loader-circle";
import { omit, Show } from "solid-js";
import type { JSX, ValidComponent } from "@solidjs/web";

import { cn } from "cn";

const buttonClass = [
  "inline-flex items-center justify-center gap-2 rounded-lg border border-light bg-app px-4 py-2",
  "text-sm font-medium text-main shadow-xs transition-colors outline-none select-none",
  "hover:bg-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-app",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
].join(" ");

const spinnerClass = "size-4 animate-spin";

/**
 * A small styled wrapper around `@kobalte/core/button`.
 *
 * Kobalte owns the button semantics (disabled handling, keyboard behaviour,
 * polymorphic `as`). This component only adds:
 *   - the token-based classes above (light/dark come from tokens),
 *   - an accessible loading state,
 *   - optional `leftIcon` / `rightIcon` slots,
 *   - a click guard for non-native roots (`as="a"`), where `disabled` does not
 *     prevent clicks by itself.
 */
export type ButtonProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ButtonRootProps<T>
> & {
  /** Extra classes. Merged last, so consumer utilities win. */
  class?: string;
  children?: JSX.Element;
  /** Shows a spinner, disables the button and marks it busy. */
  loading?: boolean;
  /** Visually hidden text announced while loading (defaults to "Loading"). */
  loadingText?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  iconClass?: string;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
};

export function Button<T extends ValidComponent = "button">(props: ButtonProps<T>) {
  const others = omit(
    props,
    "class",
    "children",
    "loading",
    "loadingText",
    "leftIcon",
    "rightIcon",
    "iconClass",
    "disabled",
    "onClick",
  );

  const isDisabled = () => Boolean(props.disabled || props.loading);

  const handleClick = (event: MouseEvent) => {
    if (isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const onClick = props.onClick as
      | ((event: MouseEvent & { currentTarget: HTMLElement; target: Element }) => void)
      | undefined;
    onClick?.(event as MouseEvent & { currentTarget: HTMLElement; target: Element });
  };

  // Kobalte's polymorphic generics cannot be re-instantiated through a wrapper
  // without losing `as` inference; the exported props type keeps it public.
  const Root = KButton as unknown as (props: ButtonProps) => JSX.Element;

  return (
    <Root
      {...(others as ButtonProps)}
      disabled={isDisabled()}
      aria-busy={props.loading ? "true" : undefined}
      data-slot="button"
      data-loading={props.loading ? "" : undefined}
      onClick={handleClick}
      class={cn(buttonClass, props.class)}
    >
      <Show when={props.loading}>
        <LoaderCircle aria-hidden="true" class={cn(spinnerClass, props.iconClass)} />
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
    </Root>
  );
}
