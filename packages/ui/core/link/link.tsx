import { Link as KLink, type LinkRootProps } from "@kobalte/core/link";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

export interface LinkProps extends LinkRootProps {
  external?: boolean;
  class?: string;
  children?: JSX.Element;
  variant?: string;
  underline?: "always" | "hover" | "none";
}

export const Link = (props: LinkProps) => {
  const others = omit(props, "class", "external", "children", "href", "variant", "underline");

  return (
    <KLink
      href={props.href}
      target={props.external ? "_blank" : undefined}
      rel={props.external ? "noopener noreferrer" : undefined}
      class={cn(
        "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm disabled:pointer-events-none disabled:opacity-50",
        props.class,
      )}
      {...others}
    >
      {props.children}
    </KLink>
  );
};
