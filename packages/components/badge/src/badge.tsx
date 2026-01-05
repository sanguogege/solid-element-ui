import { splitProps, type ParentComponent, Show, createMemo } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type BadgeProps } from "./setting";

export const SeBadge: ParentComponent<BadgeProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "count",
        "overflowCount",
        "dot",
        "showZero",
        "status",
        "text",
        "color",
        "offset",
    ]);

    const overflowCount = () => local.overflowCount ?? 99;

    // 最终显示的文本内容
    const displayCount = createMemo(() => {
        if (typeof local.count === "number") {
            return local.count > overflowCount()
                ? `${overflowCount()}+`
                : local.count;
        }
        return local.count;
    });

    // 是否隐藏徽标
    const isHidden = () => {
        const isZero = local.count === 0 && !local.showZero;
        const isNil = local.count === null || local.count === undefined;
        return (isZero || isNil) && !local.dot;
    };

    // 状态点颜色映射
    const statusColors = {
        success: "bg-[#52c41a]",
        processing: "bg-[#1677ff] animate-pulse", // 2026 闪烁效果
        default: "bg-[#d9d9d9]",
        error: "bg-[#ff4d4f]",
        warning: "bg-[#faad14]",
    };

    return (
        <span
            class={cn("relative inline-block align-middle", local.class)}
            {...others}
        >
            {local.children}

            <Show when={!isHidden()}>
                <span
                    class={cn(
                        "transition-all duration-300 ease-in-out",
                        // 如果有子元素，则定位在右上角
                        local.children
                            ? "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
                            : "relative",
                        // 样式区分：小红点还是数字
                        local.dot
                            ? "w-1.5 h-1.5 rounded-full bg-[#ff4d4f] ring-1 ring-white"
                            : "min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-[#ff4d4f] text-white text-[12px] font-medium leading-none ring-1 ring-white shadow-sm",
                        // 自定义颜色
                        local.color && `bg-[${local.color}]`
                    )}
                    style={{
                        ...(local.offset
                            ? {
                                  "margin-top": `${local.offset[1]}px`,
                                  "margin-right": `${-local.offset[0]}px`,
                              }
                            : {}),
                    }}
                >
                    {!local.dot && displayCount()}
                </span>
            </Show>

            {/* 状态点模式 (无 children 时的独立展示) */}
            <Show when={!local.children && local.status}>
                <span class="inline-flex items-center gap-2">
                    <span
                        class={cn(
                            "w-1.5 h-1.5 rounded-full",
                            statusColors[local.status!]
                        )}
                        style={
                            local.color
                                ? { "background-color": local.color }
                                : {}
                        }
                    />
                    <Show when={local.text}>
                        <span class="text-[14px] text-[#000000d9]">
                            {local.text}
                        </span>
                    </Show>
                </span>
            </Show>
        </span>
    );
};
