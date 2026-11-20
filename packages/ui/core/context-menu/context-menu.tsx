import { ContextMenu as KContextMenu, type ContextMenuRootProps } from "@kobalte/core/context-menu";
import { For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { ChevronRight } from "@lucide/solid";

// TODO 样式修改

// 定义配置项类型
export type ContextMenuItemConfig = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  children?: ContextMenuItemConfig[]; // 支持嵌套子菜单
};

interface UnifiedContextMenuProps extends ContextMenuRootProps {
  items: ContextMenuItemConfig[];
  children: JSX.Element; // 触发区域
  class?: string;
}

// 递归渲染函数
const RenderMenuItems = (props: {
  items: ContextMenuItemConfig[];
}) => {
  return (
    <For each={props.items}>
      {(itemConfig) => (
        <Show
          when={!itemConfig.separator}
          fallback={
            <KContextMenu.Separator
              data-slot="context-menu-separator" class="-mx-1 my-1 h-px border-light"
            />
          }
        >
          <Show
            when={itemConfig.children && itemConfig.children.length > 0}
            fallback={
              <KContextMenu.Item
                data-slot="context-menu-item" class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                disabled={itemConfig.disabled}
                onSelect={() => itemConfig.onClick?.()}
              >
                {itemConfig.label}
              </KContextMenu.Item>
            }
          >
            {/* 渲染子菜单 */}
            <KContextMenu.Sub>
              <KContextMenu.SubTrigger
                data-slot="context-menu-item" class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
              >
                {itemConfig.label}
                <ChevronRight data-slot="context-menu-sub-icon" class="ml-auto h-4 w-4" />
              </KContextMenu.SubTrigger>
              <KContextMenu.Portal>
                <KContextMenu.SubContent
                  data-slot="context-menu-content" class="z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app p-1 text-main shadow-md data-expanded:animate-in data-closed:animate-out"
                >
                  <RenderMenuItems
                    items={itemConfig.children!}
                  />
                </KContextMenu.SubContent>
              </KContextMenu.Portal>
            </KContextMenu.Sub>
          </Show>
        </Show>
      )}
    </For>
  );
};

export const ContextMenu = (props: UnifiedContextMenuProps) => {
  return (
    <KContextMenu>
      <KContextMenu.Trigger class={props.class}>{props.children}</KContextMenu.Trigger>
      <KContextMenu.Portal>
        <KContextMenu.Content
          data-slot="context-menu-content" class="z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app p-1 text-main shadow-md data-expanded:animate-in data-closed:animate-out"
        >
          <RenderMenuItems
            items={props.items}
          />
        </KContextMenu.Content>
      </KContextMenu.Portal>
    </KContextMenu>
  );
};
