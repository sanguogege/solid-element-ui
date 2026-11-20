import { Badge as KBadge, type BadgeRootProps } from "@kobalte/core/badge";
import { omit } from "solid-js";

import { cn } from "cn";

export interface BadgeProps extends BadgeRootProps {
  class?: string;
}

export const Badge = (props: BadgeProps) => {
  const others = omit(props, "class");

  return (
    <KBadge
      class={cn(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        props.class,
      )}
      {...others}
    />
  );
};
