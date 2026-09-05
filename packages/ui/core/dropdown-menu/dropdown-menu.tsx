import {
  DropdownMenu as KDropdownMenu,
  type DropdownMenuRootProps,
} from "@kobalte/core/dropdown-menu";
import { For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { ChevronRight } from "../icons";

import { cn } from "../../utils/cn";

// TODO  Dropdown Menu 样式

// 定义菜单项配置类型
export type DropdownItemConfig = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean; // 是否作为分隔线
  children?: DropdownItemConfig[]; // 子菜单
};

interface DropdownMenuProps extends DropdownMenuRootProps {
  trigger: JSX.Element;
  items: DropdownItemConfig[];
  placement?: "bottom" | "bottom-start" | "bottom-end" | "top" | "left" | "right";
  class?: string;
  triggerClass?: string;
  contentClass?: string;
  itemClass?: string;
  separatorClass?: string;
  subIconClass?: string;
}

// 递归渲染函数：处理无限级嵌套
const RenderMenuItems = (props: {
  items: DropdownItemConfig[];
  itemClass?: string;
  separatorClass?: string;
  subIconClass?: string;
  contentClass?: string;
}) => {
  return (
    <For each={props.items}>
      {(config) => (
        <Show
          when={!config.separator}
          fallback={
            <KDropdownMenu.Separator
              class={cn("-mx-1 my-1 h-px border-light", props.separatorClass)}
            />
          }
        >
          <Show
            when={config.children && config.children.length > 0}
            fallback={
              <KDropdownMenu.Item
                class={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-50",
                  props.itemClass,
                )}
                disabled={config.disabled}
                onSelect={() => config.onClick?.()}
              >
                {config.label}
              </KDropdownMenu.Item>
            }
          >
            {/* 子菜单渲染逻辑 */}
            <KDropdownMenu.Sub>
              <KDropdownMenu.SubTrigger
                class={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-50",
                  props.itemClass,
                )}
              >
                {config.label}
                <ChevronRight class={cn("ml-auto h-4 w-4", props.subIconClass)} />
              </KDropdownMenu.SubTrigger>
              <KDropdownMenu.Portal>
                <KDropdownMenu.SubContent
                  class={cn(
                    "z-50 min-w-32 overflow-hidden rounded-md border border-light bg-white p-1 text-zinc-950 shadow-md animate-in zoom-in-95 dark:bg-zinc-950 dark:text-zinc-50 data-expanded:animate-in data-closed:animate-out",
                    props.contentClass,
                  )}
                >
                  <RenderMenuItems
                    items={config.children!}
                    itemClass={props.itemClass}
                    separatorClass={props.separatorClass}
                    subIconClass={props.subIconClass}
                    contentClass={props.contentClass}
                  />
                </KDropdownMenu.SubContent>
              </KDropdownMenu.Portal>
            </KDropdownMenu.Sub>
          </Show>
        </Show>
      )}
    </For>
  );
};

export const DropdownMenu = (props: DropdownMenuProps) => {
  return (
    <KDropdownMenu placement={props.placement ?? "bottom-start"}>
      <KDropdownMenu.Trigger as="div" class={cn("inline-block cursor-pointer", props.triggerClass)}>
        {props.trigger}
      </KDropdownMenu.Trigger>

      <KDropdownMenu.Portal>
        <KDropdownMenu.Content
          class={cn(
            "z-50 min-w-32 overflow-hidden rounded-md border border-light bg-white p-1 text-zinc-950 shadow-md animate-in zoom-in-95 dark:bg-zinc-950 dark:text-zinc-50 data-expanded:animate-in data-closed:animate-out",
            props.contentClass,
          )}
        >
          <RenderMenuItems
            items={props.items}
            itemClass={props.itemClass}
            separatorClass={props.separatorClass}
            subIconClass={props.subIconClass}
            contentClass={props.contentClass}
          />
        </KDropdownMenu.Content>
      </KDropdownMenu.Portal>
    </KDropdownMenu>
  );
};
