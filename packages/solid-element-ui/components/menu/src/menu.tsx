import {
    splitProps,
    createSignal,
    For,
    Show,
    type Component,
    createMemo,
    useContext,
    createContext,
} from "solid-js";
import { type MenuProps, type MenuItemType } from "./setting";

// 内部上下文，用于跨级传递状态
const MenuContext = createContext<{
    selectedKey: () => string | undefined;
    onSelect: (key: string, item: MenuItemType) => void;
    collapsed: () => boolean;
}>();

// --- 基础菜单项 ---
const InternalMenuItem: Component<{ item: MenuItemType; level: number }> = (
    props
) => {
    const ctx = useContext(MenuContext)!;
    const isSelected = () => ctx.selectedKey() === props.item.key;

    return (
        <div
            onClick={() =>
                !props.item.disabled && ctx.onSelect(props.item.key, props.item)
            }
            class={`flex items-center px-4 py-2.5 my-1 mx-2 rounded-lg cursor-pointer transition-all duration-200 select-none
        ${
            props.item.disabled
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-[0.98]"
        }
        ${
            isSelected()
                ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                : "text-gray-600"
        }
      `}
            style={{
                "padding-left": ctx.collapsed()
                    ? "16px"
                    : `${props.level * 16 + 16}px`,
            }}
        >
            <Show when={props.item.icon}>
                <span
                    class={`shrink-0 transition-margin ${
                        ctx.collapsed() ? "mr-0" : "mr-3"
                    }`}
                >
                    {props.item.icon}
                </span>
            </Show>
            <Show when={!ctx.collapsed()}>
                <span class="truncate text-sm">{props.item.label}</span>
            </Show>
        </div>
    );
};

// --- 带子菜单的项 ---
const InternalSubMenu: Component<{ item: MenuItemType; level: number }> = (
    props
) => {
    const ctx = useContext(MenuContext)!;
    const [isOpen, setIsOpen] = createSignal(false);

    return (
        <div class="w-full">
            <div
                onClick={() => setIsOpen(!isOpen())}
                class="flex items-center justify-between px-4 py-2.5 my-1 mx-2 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-600 select-none"
                style={{
                    "padding-left": ctx.collapsed()
                        ? "16px"
                        : `${props.level * 16 + 16}px`,
                }}
            >
                <div class="flex items-center overflow-hidden">
                    <Show when={props.item.icon}>
                        <span
                            class={`shrink-0 ${
                                ctx.collapsed() ? "mr-0" : "mr-3"
                            }`}
                        >
                            {props.item.icon}
                        </span>
                    </Show>
                    <Show when={!ctx.collapsed()}>
                        <span class="truncate text-sm">{props.item.label}</span>
                    </Show>
                </div>
                <Show when={!ctx.collapsed()}>
                    <svg
                        class={`w-4 h-4 transition-transform duration-300 ${
                            isOpen() ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </Show>
            </div>

            {/* 递归渲染子项 */}
            <Show when={isOpen() && !ctx.collapsed()}>
                <div class="animate-in slide-in-from-top-1 duration-200">
                    <For each={props.item.children}>
                        {(child) => (
                            <Show
                                when={child.children}
                                fallback={
                                    <InternalMenuItem
                                        item={child}
                                        level={props.level + 1}
                                    />
                                }
                            >
                                <InternalSubMenu
                                    item={child}
                                    level={props.level + 1}
                                />
                            </Show>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

// --- 主组件 ---
export const SeMenu: Component<MenuProps> = (props) => {
    const [local, others] = splitProps(props, [
        "items",
        "selectedKey",
        "onSelect",
        "collapsed",
        "class",
    ]);

    return (
        <MenuContext.Provider
            value={{
                selectedKey: () => local.selectedKey,
                onSelect: (key, item) => local.onSelect?.(key, item),
                collapsed: () => !!local.collapsed,
            }}
        >
            <nav
                {...others}
                class={`flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${
                    local.collapsed ? "w-16" : "w-64"
                } ${local.class || ""}`}
            >
                <div class="flex-1 py-4 overflow-y-auto overflow-x-hidden">
                    <For each={local.items}>
                        {(item) => (
                            <Show
                                when={item.children}
                                fallback={
                                    <InternalMenuItem item={item} level={0} />
                                }
                            >
                                <InternalSubMenu item={item} level={0} />
                            </Show>
                        )}
                    </For>
                </div>
            </nav>
        </MenuContext.Provider>
    );
};
