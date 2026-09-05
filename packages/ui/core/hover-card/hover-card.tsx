import { HoverCard as KHoverCard, type HoverCardRootProps } from "@kobalte/core/hover-card";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "../../utils/cn";

export interface HoverCardProps extends HoverCardRootProps {
  trigger: JSX.Element;
  showArrow?: boolean;
  class?: string;
  size?: string;
  contentClass?: string;
  arrowClass?: string;
}

export const HoverCard = (props: HoverCardProps) => {
  const others = omit(
    props,
    "trigger",
    "children",
    "showArrow",
    "size",
    "class",
    "contentClass",
    "arrowClass",
  );

  return (
    <KHoverCard openDelay={200} closeDelay={300} {...others}>
      <KHoverCard.Trigger>{props.trigger}</KHoverCard.Trigger>

      <KHoverCard.Portal>
        <KHoverCard.Content
          class={cn(
            "z-50 w-64 rounded-xl border border-light bg-app p-4 shadow-lg outline-none data-expanded:animate-in data-closed:animate-out",
            props.contentClass,
          )}
        >
          {props.showArrow && (
            <KHoverCard.Arrow
              class={cn(
                "fill-white stroke-slate-200 dark:fill-slate-900 dark:stroke-slate-800",
                props.arrowClass,
              )}
            />
          )}
          {props.children}
        </KHoverCard.Content>
      </KHoverCard.Portal>
    </KHoverCard>
  );
};
