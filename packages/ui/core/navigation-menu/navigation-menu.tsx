import {
  NavigationMenu as KNavigationMenu,
  type NavigationMenuRootProps,
} from "@kobalte/core/navigation-menu";
import { omit, For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

// TODO 不显示问题

interface NavItem {
  title: string;
  href?: string;
  content?: JSX.Element;
}

export interface NavigationMenuProps extends NavigationMenuRootProps {
  items: NavItem[];
  class?: string;
  triggerClass?: string;
  contentClass?: string;
  viewportClass?: string;
}

export const NavigationMenu = (props: NavigationMenuProps) => {
  const others = omit(props, "items", "class", "triggerClass", "contentClass", "viewportClass");

  return (
    <KNavigationMenu
      class={cn("relative z-10 flex w-full justify-center antialiased", props.class)}
      {...others}
    >
      <For each={props.items}>
        {(item) => (
          <KNavigationMenu.Menu>
            <Show
              when={item.content}
              fallback={
                <KNavigationMenu.Trigger
                  as="a"
                  href={item.href}
                  class={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-slate-100 hover:text-slate-900 data-[state=open]:bg-slate-100/50 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                    props.triggerClass,
                  )}
                >
                  {item.title}
                </KNavigationMenu.Trigger>
              }
            >
              <KNavigationMenu.Trigger
                class={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-slate-100 hover:text-slate-900 data-[state=open]:bg-slate-100/50 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                  props.triggerClass,
                )}
              >
                {item.title}
                <svg
                  class="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </KNavigationMenu.Trigger>
              <KNavigationMenu.Portal>
                <KNavigationMenu.Content
                  class={cn(
                    "absolute left-0 top-0 w-full p-2 animate-in fade-in zoom-in-95 duration-200",
                    props.contentClass,
                  )}
                >
                  {item.content}
                </KNavigationMenu.Content>
              </KNavigationMenu.Portal>
            </Show>
          </KNavigationMenu.Menu>
        )}
      </For>
      <KNavigationMenu.Viewport
        class={cn(
          "relative mt-1.5 h-(--kb-navigation-menu-viewport-height) w-(--kb-navigation-menu-viewport-width) origin-[top_center] overflow-hidden rounded-md border bg-white shadow-xl dark:bg-slate-950 dark:border-slate-800 transition-[width,height] duration-300",
          props.viewportClass,
        )}
      >
        <KNavigationMenu.Arrow />
      </KNavigationMenu.Viewport>
    </KNavigationMenu>
  );
};
