import { Menubar as KMenubar, type MenubarRootProps } from "@kobalte/core/menubar";
import { omit, type ComponentProps } from "solid-js";

import { cn } from "../../utils/cn";

// TODO 1. 格式

export interface MenubarProps extends MenubarRootProps {
  class?: string;
}

export const Menubar = Object.assign(
  (props: MenubarProps) => {
    const others = omit(props, "class");
    return (
      <KMenubar
        class={cn(
          "flex h-10 items-center space-x-1 rounded-md border bg-app p-1 shadow-sm",
          props.class,
        )}
        {...others}
      />
    );
  },
  {
    Menu: KMenubar.Menu,
    Trigger: (props: ComponentProps<typeof KMenubar.Trigger>) => {
      const others = omit(props, "class");
      return (
        <KMenubar.Trigger
          class={cn(
            "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:foreground data-[state=open]:foreground",
            props.class,
          )}
          {...others}
        />
      );
    },
    Content: (props: ComponentProps<typeof KMenubar.Content>) => {
      const others = omit(props, "class");
      return (
        <KMenubar.Portal>
          <KMenubar.Content
            class={cn(
              "z-50 min-w-48 overflow-hidden rounded-md border bg-app p-1 shadow-md border-light animate-in fade-in zoom-in-95 data-expanded:animate-in data-closed:animate-out",
              props.class,
            )}
            {...others}
          />
        </KMenubar.Portal>
      );
    },
    Item: (props: ComponentProps<typeof KMenubar.Item>) => {
      const others = omit(props, "class");
      return (
        <KMenubar.Item
          class={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-foreground data-disabled:opacity-50",
            props.class,
          )}
          {...others}
        />
      );
    },
    Separator: (props: ComponentProps<typeof KMenubar.Separator>) => {
      const others = omit(props, "class");
      return (
        <KMenubar.Separator class={cn("-mx-1 my-1 h-px border-light", props.class)} {...others} />
      );
    },
  },
);
