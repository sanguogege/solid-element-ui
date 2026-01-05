import { splitProps, type ParentComponent, useContext, Show } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { CollapseContext, type CollapsePanelProps } from "./setting";

export const SeCollapsePanel: ParentComponent<CollapsePanelProps> = (props) => {
    const ctx = useContext(CollapseContext);
    if (!ctx) throw new Error("SeCollapsePanel 必须在 SeCollapse 内部使用");

    const [local, others] = splitProps(props, [
        "key",
        "header",
        "extra",
        "disabled",
        "showArrow",
        "children",
        "class",
    ]);

    const isActive = () => ctx.activeKeys().includes(local.key);
    const isRightIcon = () => ctx.expandIconPosition() === "right";

    return (
        <div
            class={cn("border-b border-[#f0f0f0] last:border-b-0", local.class)}
        >
            {/* 头部：可点击区域 */}
            <div
                onClick={() => !local.disabled && ctx.toggleKey(local.key)}
                class={cn(
                    "flex items-center px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50/50",
                    local.disabled && "cursor-not-allowed opacity-50",
                    ctx.ghost() && "px-0 hover:bg-transparent"
                )}
            >
                <Show when={local.showArrow !== false}>
                    <svg
                        class={cn(
                            "w-3 h-3 text-[#00000073] transition-transform duration-300",
                            isActive() ? "rotate-90" : "rotate-0",
                            isRightIcon() ? "order-last ml-auto" : "mr-3"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Show>

                <div class="flex-1 text-[14px] text-[#000000d9] font-medium leading-6">
                    {local.header}
                </div>

                <Show when={local.extra}>
                    <div class="ml-2 text-[14px] text-[#00000073]">
                        {local.extra}
                    </div>
                </Show>
            </div>

            {/* 核心修复：折叠动画容器 */}
            <div
                class={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isActive()
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                )}
            >
                <div
                    class={cn(
                        "p-4 pt-0 text-[14px] text-[#000000a6] leading-6",
                        ctx.ghost() && "px-0"
                    )}
                >
                    {local.children}
                </div>
            </div>
        </div>
    );
};
