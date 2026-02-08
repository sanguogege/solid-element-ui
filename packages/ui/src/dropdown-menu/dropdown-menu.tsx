import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { splitProps, type JSX, For, Show } from "solid-js";
import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-solid";

// TODO  样式

const menuStyles = tv(
    {
        slots: {
            trigger: "inline-block cursor-pointer",
            content: [
                "z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
            separator: "-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800",
            subIcon: "ml-auto h-4 w-4",
        },
    },
    {
        twMerge: true,
    },
);

const { content, item, separator, subIcon, trigger } = menuStyles();

// 定义菜单项配置类型
export type DropdownItemConfig = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    separator?: boolean; // 是否作为分隔线
    children?: DropdownItemConfig[]; // 子菜单
};

interface DropdownMenuProps {
    trigger: JSX.Element;
    items: DropdownItemConfig[];
    placement?:
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "top"
        | "left"
        | "right";
    class?: string;
}

// 递归渲染函数：处理无限级嵌套
const RenderMenuItems = (props: { items: DropdownItemConfig[] }) => {
    return (
        <For each={props.items}>
            {(config) => (
                <Show
                    when={!config.separator}
                    fallback={<KDropdownMenu.Separator class={separator()} />}
                >
                    <Show
                        when={config.children && config.children.length > 0}
                        fallback={
                            <KDropdownMenu.Item
                                class={item()}
                                disabled={config.disabled}
                                onSelect={() => config.onClick?.()}
                            >
                                {config.label}
                            </KDropdownMenu.Item>
                        }
                    >
                        {/* 子菜单渲染逻辑 */}
                        <KDropdownMenu.Sub>
                            <KDropdownMenu.SubTrigger class={item()}>
                                {config.label}
                                <ChevronRight class={subIcon()} />
                            </KDropdownMenu.SubTrigger>
                            <KDropdownMenu.Portal>
                                <KDropdownMenu.SubContent class={content()}>
                                    <RenderMenuItems items={config.children!} />
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
    const [local] = splitProps(props, [
        "trigger",
        "items",
        "placement",
        "class",
    ]);

    return (
        <KDropdownMenu placement={local.placement ?? "bottom-start"}>
            <KDropdownMenu.Trigger as="div" class={trigger()}>
                {local.trigger}
            </KDropdownMenu.Trigger>

            <KDropdownMenu.Portal>
                <KDropdownMenu.Content class={content({ class: local.class })}>
                    <RenderMenuItems items={local.items} />
                </KDropdownMenu.Content>
            </KDropdownMenu.Portal>
        </KDropdownMenu>
    );
};
