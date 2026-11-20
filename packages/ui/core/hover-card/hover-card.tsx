import { HoverCard as KHoverCard, type HoverCardRootProps } from "@kobalte/core/hover-card";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";


export interface HoverCardProps extends HoverCardRootProps {
  trigger: JSX.Element;
  showArrow?: boolean;
  class?: string;
  size?: string;
}

export const HoverCard = (props: HoverCardProps) => {
  const others = omit(
    props,
    "trigger",
    "children",
    "showArrow",
    "size",
    "class",
  );

  return (
    <KHoverCard openDelay={200} closeDelay={300} {...others}>
      <KHoverCard.Trigger>{props.trigger}</KHoverCard.Trigger>

      <KHoverCard.Portal>
        <KHoverCard.Content
          data-slot="hover-card-content" class="z-50 w-64 rounded-xl border border-light bg-app p-4 shadow-lg outline-none data-expanded:animate-in data-closed:animate-out"
        >
          {props.showArrow && (
            <KHoverCard.Arrow
              data-slot="hover-card-arrow" class="fill-app stroke-light"
            />
          )}
          {props.children}
        </KHoverCard.Content>
      </KHoverCard.Portal>
    </KHoverCard>
  );
};
