import { Popover as KPopover, type PopoverRootProps } from "@kobalte/core/popover";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { Cross } from "@lucide/solid";

// FIXME 与其他的气泡样式不统一的问题
// Description，而不是内敛。
// trigger用内部，而其他放在标签属性

export interface PopoverProps extends PopoverRootProps {
  trigger: JSX.Element;
  title: string;
  class?: string;
}

export const Popover = (props: PopoverProps) => {
  const others = omit(props, "trigger", "children", "title", "class");

  return (
    <KPopover {...others}>
      <KPopover.Trigger class="inline-flex">{props.trigger}</KPopover.Trigger>

      <KPopover.Portal>
        <KPopover.Content
          data-slot="popover-content" class="z-50 w-72 rounded-md border border-light bg-app p-4 shadow-md outline-none antialiased text-main data-expanded:animate-in data-closed:animate-out"
        >
          <KPopover.Arrow
            data-slot="popover-arrow" class="fill-app stroke-light"
          />

          <div class="flex">
            <KPopover.Title>{props.title}</KPopover.Title>
            <KPopover.CloseButton>
              <Cross />
            </KPopover.CloseButton>
          </div>
          <KPopover.Description>{props.children}</KPopover.Description>
        </KPopover.Content>
      </KPopover.Portal>
    </KPopover>
  );
};
