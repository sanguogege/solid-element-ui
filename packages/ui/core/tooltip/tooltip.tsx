import { Tooltip as KTooltip, type TooltipRootProps } from "@kobalte/core/tooltip";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";


export interface TooltipProps extends Omit<TooltipRootProps, "class"> {
  content: JSX.Element;
  children: JSX.Element;
  class?: string;
  variant?: string;
}

export const Tooltip = (props: TooltipProps) => {
  // 1. 分离属性
  const others = omit(
    props,
    "children",
    "content",
    "variant",
    "class",
  );

  return (
    <KTooltip gutter={4} openDelay={200} {...others}>
      <KTooltip.Trigger class="block">{props.children}</KTooltip.Trigger>

      <KTooltip.Portal>
        <KTooltip.Content
          data-slot="tooltip-content" class="z-50 rounded-md px-4 py-1.5 text-xs shadow-md animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <KTooltip.Arrow data-slot="tooltip-arrow" class="" />
          {props.content}
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip>
  );
};
