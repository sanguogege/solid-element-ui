import { ContextMenu as KContextMenu } from "@kobalte/core/context-menu";
import { splitProps, For, Show,type JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-solid";

// TODO 样式修改

const menuStyles = tv(
    {
        slots: {
            content: [
                "z-50 min-w-[10rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
            separator: "-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800",
            subIcon: "ml-auto h-4 w-4",
        },
    },
    {
        twMerge: true,
    },
);

const { content, item, separator, subIcon } = menuStyles();

// 定义配置项类型
export type ContextMenuItemConfig = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    separator?: boolean;
    children?: ContextMenuItemConfig[]; // 支持嵌套子菜单
};

interface UnifiedContextMenuProps {
    items: ContextMenuItemConfig[];
    children: JSX.Element; // 触发区域
    class?: string;
}

// 递归渲染函数
const RenderMenuItems = (props: { items: ContextMenuItemConfig[] }) => {
    return (
        <For each={props.items}>
            {(itemConfig) => (
                <Show
                    when={!itemConfig.separator}
                    fallback={<KContextMenu.Separator class={separator()} />}
                >
                    <Show
                        when={
                            itemConfig.children &&
                            itemConfig.children.length > 0
                        }
                        fallback={
                            <KContextMenu.Item
                                class={item()}
                                disabled={itemConfig.disabled}
                                onSelect={() => itemConfig.onClick?.()}
                            >
                                {itemConfig.label}
                            </KContextMenu.Item>
                        }
                    >
                        {/* 渲染子菜单 */}
                        <KContextMenu.Sub>
                            <KContextMenu.SubTrigger class={item()}>
                                {itemConfig.label}
                                <ChevronRight class={subIcon()} />
                            </KContextMenu.SubTrigger>
                            <KContextMenu.Portal>
                                <KContextMenu.SubContent class={content()}>
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
    const [local] = splitProps(props, ["items", "children", "class"]);

    return (
        <KContextMenu>
            <KContextMenu.Trigger class={local.class}>
                {local.children}
            </KContextMenu.Trigger>
            <KContextMenu.Portal>
                <KContextMenu.Content class={content()}>
                    <RenderMenuItems items={local.items} />
                </KContextMenu.Content>
            </KContextMenu.Portal>
        </KContextMenu>
    );
};
