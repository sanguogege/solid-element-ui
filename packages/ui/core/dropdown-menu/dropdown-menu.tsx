import {
  DropdownMenu as KDropdownMenu,
  type DropdownMenuRootProps,
} from "@kobalte/core/dropdown-menu";
import { For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { ChevronRight } from "@lucide/solid";

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
}

// 递归渲染函数：处理无限级嵌套
const RenderMenuItems = (props: {
  items: DropdownItemConfig[];
}) => {
  return (
    <For each={props.items}>
      {(config) => (
        <Show
          when={!config.separator}
          fallback={
            <KDropdownMenu.Separator
              data-slot="dropdown-menu-separator" class="-mx-1 my-1 h-px border-light"
            />
          }
        >
          <Show
            when={config.children && config.children.length > 0}
            fallback={
              <KDropdownMenu.Item
                data-slot="dropdown-menu-item" class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-highlighted:bg-foreground data-highlighted:text-main data-disabled:pointer-events-none data-disabled:opacity-50"
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
                data-slot="dropdown-menu-item" class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-highlighted:bg-foreground data-highlighted:text-main data-disabled:pointer-events-none data-disabled:opacity-50"
              >
                {config.label}
                <ChevronRight data-slot="dropdown-menu-sub-icon" class="ml-auto h-4 w-4" />
              </KDropdownMenu.SubTrigger>
              <KDropdownMenu.Portal>
                <KDropdownMenu.SubContent
                  data-slot="dropdown-menu-content" class="z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app p-1 text-main shadow-md animate-in zoom-in-95data-expanded:animate-in data-closed:animate-out"
                >
                  <RenderMenuItems
                    items={config.children!}
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
      <KDropdownMenu.Trigger as="div" data-slot="dropdown-menu-trigger" class="inline-block cursor-pointer">
        {props.trigger}
      </KDropdownMenu.Trigger>

      <KDropdownMenu.Portal>
        <KDropdownMenu.Content
          data-slot="dropdown-menu-content" class="z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app p-1 text-main shadow-md animate-in zoom-in-95data-expanded:animate-in data-closed:animate-out"
        >
          <RenderMenuItems
            items={props.items}
          />
        </KDropdownMenu.Content>
      </KDropdownMenu.Portal>
    </KDropdownMenu>
  );
};
