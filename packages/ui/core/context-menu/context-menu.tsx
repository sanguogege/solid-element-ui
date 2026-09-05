import { ContextMenu as KContextMenu, type ContextMenuRootProps } from "@kobalte/core/context-menu";
import { For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { ChevronRight } from "../icons";

import { cn } from "../../utils/cn";

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
  contentClass?: string;
  itemClass?: string;
  separatorClass?: string;
  subIconClass?: string;
}

// 递归渲染函数
const RenderMenuItems = (props: {
  items: ContextMenuItemConfig[];
  itemClass?: string;
  separatorClass?: string;
  subIconClass?: string;
  contentClass?: string;
}) => {
  return (
    <For each={props.items}>
      {(itemConfig) => (
        <Show
          when={!itemConfig.separator}
          fallback={
            <KContextMenu.Separator
              class={cn("-mx-1 my-1 h-px border-light", props.separatorClass)}
            />
          }
        >
          <Show
            when={itemConfig.children && itemConfig.children.length > 0}
            fallback={
              <KContextMenu.Item
                class={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
                  props.itemClass,
                )}
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
                class={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
                  props.itemClass,
                )}
              >
                {itemConfig.label}
                <ChevronRight class={cn("ml-auto h-4 w-4", props.subIconClass)} />
              </KContextMenu.SubTrigger>
              <KContextMenu.Portal>
                <KContextMenu.SubContent
                  class={cn(
                    "z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app p-1 text-main shadow-md dark:text-zinc-50 data-expanded:animate-in data-closed:animate-out",
                    props.contentClass,
                  )}
                >
                  <RenderMenuItems
                    items={itemConfig.children!}
                    itemClass={props.itemClass}
                    separatorClass={props.separatorClass}
                    subIconClass={props.subIconClass}
                    contentClass={props.contentClass}
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
      <KContextMenu.Trigger class={cn(props.class)}>{props.children}</KContextMenu.Trigger>
      <KContextMenu.Portal>
        <KContextMenu.Content
          class={cn(
            "z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app p-1 text-main shadow-md dark:text-zinc-50 data-expanded:animate-in data-closed:animate-out",
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
        </KContextMenu.Content>
      </KContextMenu.Portal>
    </KContextMenu>
  );
};
