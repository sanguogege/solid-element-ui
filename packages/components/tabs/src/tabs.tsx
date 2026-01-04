import {
    splitProps,
    createSignal,
    For,
    Show,
    type Component,
    createMemo,
} from "solid-js";
import { type TabsProps, type TabItem } from "./setting";

export const SeTabs: Component<TabsProps> = (props) => {
    const [local, others] = splitProps(props, [
        "activeKey",
        "defaultActiveKey",
        "items",
        "onChange",
        "size",
        "type",
        "centered",
        "class",
    ]);

    // 内部状态管理
    const [internalKey, setInternalKey] = createSignal(
        local.activeKey || local.defaultActiveKey || local.items[0]?.key
    );

    // 最终激活的 key (受控或非受控)
    const currentKey = () => local.activeKey || internalKey();

    const handleTabClick = (item: TabItem) => {
        if (item.disabled) return;
        setInternalKey(item.key);
        local.onChange?.(item.key);
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <div {...others} class={`w-full ${local.class || ""}`}>
            {/* Tab 头部导航区 */}
            <div
                class={`relative flex border-b border-gray-100 mb-4 ${
                    local.centered ? "justify-center" : "justify-start"
                } ${local.type === "card" ? "gap-1" : ""}`}
            >
                <For each={local.items}>
                    {(item) => {
                        const isActive = () => currentKey() === item.key;

                        return (
                            <div
                                onClick={() => handleTabClick(item)}
                                class={`relative flex items-center gap-2 cursor-pointer transition-all duration-300 select-none whitespace-nowrap
                  ${sizeClasses[local.size || "md"]}
                  ${
                      item.disabled
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:text-blue-500"
                  }
                  ${
                      isActive()
                          ? "text-blue-600 font-semibold"
                          : "text-gray-500"
                  }
                  ${
                      local.type === "card" && isActive()
                          ? "bg-white border border-b-transparent rounded-t-lg -mb-[1px]"
                          : ""
                  }
                  ${
                      local.type === "card" && !isActive()
                          ? "bg-gray-50 border border-transparent rounded-t-lg"
                          : ""
                  }
                `}
                            >
                                <Show when={item.icon}>
                                    <span class="shrink-0">{item.icon}</span>
                                </Show>
                                {item.label}

                                {/* Line 模式下的底部活动条 (简单实现) */}
                                <Show
                                    when={local.type !== "card" && isActive()}
                                >
                                    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in fade-in slide-in-from-bottom-1 duration-300" />
                                </Show>
                            </div>
                        );
                    }}
                </For>
            </div>

            {/* Tab 内容区 */}
            <div class="relative">
                <For each={local.items}>
                    {(item) => (
                        <Show when={currentKey() === item.key}>
                            <div class="animate-in fade-in slide-in-from-right-4 duration-300">
                                {item.children}
                            </div>
                        </Show>
                    )}
                </For>
            </div>
        </div>
    );
};
