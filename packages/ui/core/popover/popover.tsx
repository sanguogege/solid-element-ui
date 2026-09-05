import { Popover as KPopover, type PopoverRootProps } from "@kobalte/core/popover";
import { CrossIcon } from "../icons";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "../../utils/cn";

// FIXME 与其他的气泡样式不统一的问题
// Description，而不是内敛。
// trigger用内部，而其他放在标签属性

export interface PopoverProps extends PopoverRootProps {
  trigger: JSX.Element;
  title: string;
  class?: string;
  contentClass?: string;
  arrowClass?: string;
}

export const Popover = (props: PopoverProps) => {
  const others = omit(props, "trigger", "children", "title", "class", "contentClass", "arrowClass");

  return (
    <KPopover {...others}>
      <KPopover.Trigger class="inline-flex">{props.trigger}</KPopover.Trigger>

      <KPopover.Portal>
        <KPopover.Content
          class={cn(
            "z-50 w-72 rounded-md border border-light bg-app p-4 shadow-md outline-none antialiased text-main data-expanded:animate-in data-closed:animate-out",
            props.contentClass,
          )}
        >
          <KPopover.Arrow
            class={cn("fill-app stroke-slate-200 dark:stroke-slate-800", props.arrowClass)}
          />

          <div class="flex">
            <KPopover.Title>{props.title}</KPopover.Title>
            <KPopover.CloseButton>
              <CrossIcon />
            </KPopover.CloseButton>
          </div>
          <KPopover.Description>{props.children}</KPopover.Description>
        </KPopover.Content>
      </KPopover.Portal>
    </KPopover>
  );
};
