import { splitProps, type ParentComponent, Show, For } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type CardProps } from "./setting";

export const SeCard: ParentComponent<CardProps> = (props) => {
    // 分离属性，local 包含我们自定义的 JSX.Element 类型的 title
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "title",
        "extra",
        "cover",
        "hoverable",
        "bordered",
        "loading",
        "actions",
        "size",
    ]);

    const isSmall = () => local.size === "small";
    const hasBorder = () => local.bordered !== false;

    return (
        <div
            {...others}
            class={cn(
                "bg-white rounded-lg transition-all duration-300 flex flex-col overflow-hidden",
                hasBorder() ? "border border-[#f0f0f0]" : "border-none",
                // 2026 风格阴影：更细腻的多层扩散
                local.hoverable &&
                    "hover:shadow-[0_1px_2px_-2px_rgba(0,0,0,0.16),0_3px_6px_0_rgba(0,0,0,0.12),0_5px_12px_4px_rgba(0,0,0,0.09)] hover:border-transparent",
                local.class
            )}
        >
            {/* 1. Header: 支持自定义 JSX */}
            <Show when={local.title || local.extra}>
                <div
                    class={cn(
                        "flex items-center justify-between border-b border-[#f0f0f0] font-semibold text-[#000000d9]",
                        isSmall()
                            ? "px-3 py-2 text-[14px]"
                            : "px-6 py-4 text-[16px]"
                    )}
                >
                    <div class="flex-1 truncate">{local.title}</div>
                    <Show when={local.extra}>
                        <div class="ml-2 font-normal text-[14px] text-[#1677ff] shrink-0">
                            {local.extra}
                        </div>
                    </Show>
                </div>
            </Show>

            {/* 2. Cover: 图片区域 */}
            <Show when={local.cover}>
                <div class="w-full overflow-hidden [&_img]:w-full [&_img]:block [&_img]:object-cover">
                    {local.cover}
                </div>
            </Show>

            {/* 3. Body: 内容区域带 Skeleton 效果 */}
            <div
                class={cn(
                    "flex-1 text-[#000000a6] text-[14px] leading-relaxed",
                    isSmall() ? "p-3" : "p-6"
                )}
            >
                <Show
                    when={!local.loading}
                    fallback={
                        <div class="animate-pulse space-y-3 py-2">
                            <div class="h-4 bg-gray-100 rounded w-3/4"></div>
                            <div class="h-4 bg-gray-100 rounded w-full"></div>
                            <div class="h-4 bg-gray-100 rounded w-5/6"></div>
                        </div>
                    }
                >
                    {local.children}
                </Show>
            </div>

            {/* 4. Actions: 底部工具栏 */}
            <Show when={local.actions && local.actions.length > 0}>
                <div class="bg-[#fafafa] border-t border-[#f0f0f0] flex items-center">
                    <For each={local.actions}>
                        {(action, index) => (
                            <div
                                class={cn(
                                    "flex-1 flex items-center justify-center py-3 cursor-pointer text-[#00000073] hover:text-[#1677ff] transition-colors relative",
                                    // 伪元素绘制垂直分割线
                                    index() !== 0 &&
                                        "before:content-[''] before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-[1px] before:bg-[#f0f0f0]"
                                )}
                            >
                                {action}
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};
