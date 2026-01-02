import { splitProps, Show, type ParentComponent, createMemo } from "solid-js";
import { type DividerProps } from "./setting";
import { cn } from "@/utils/cn";

// 1. 定义预设颜色映射（对应你 Tailwind v4 的主题配置）
const COLOR_MAP: Record<string, string> = {
    primary: "se-border-se-primary",
    success: "se-border-green-500",
    warning: "se-border-yellow-500",
    danger: "se-border-red-500",
    info: "se-border-gray-400",
};

export const SeDivider: ParentComponent<DividerProps> = (
    props: DividerProps
) => {
    const [local, others] = splitProps(props, [
        "direction",
        "contentPosition",
        "dashed",
        "color",
        "class",
        "children",
    ]);

    // 2. 智能颜色判断
    const colorClass = createMemo(() => {
        if (!local.color) return "se-border-gray-200"; // 默认颜色
        return COLOR_MAP[local.color] || ""; // 如果不在映射表里，说明可能是用户传的自定义 Class 或需要内联样式
    });

    // 3. 处理十六进制颜色（如果用户传了 #ffffff）
    const customStyle = () => {
        if (local.color && !COLOR_MAP[local.color]) {
            return { "border-color": local.color };
        }
        return {};
    };
    const direction = () => local.direction || "horizontal";
    const contentPosition = () => local.contentPosition || "center";
    return (
        <div
            {...others}
            role="separator"
            style={{ ...customStyle(), ...(others.style as any) }}
            class={cn(
                "se-relative",
                // 应用动态颜色类名
                colorClass(),

                direction() === "horizontal" && [
                    "se-flex se-items-center se-w-full se-my-6",
                    local.children ? "se-border-0" : "se-border-t",
                ],
                direction() === "vertical" &&
                    "se-inline-block se-mx-2 se-h-[0.9em] se-align-middle se-border-l",
                local.dashed && "se-border-dashed",
                local.class
            )}
        >
            <Show when={direction() === "horizontal" && local.children}>
                <div
                    class={cn(
                        "se-flex se-items-center se-w-full",
                        // 关键：通过 se-border-inherit 让伪元素线条继承父级的颜色
                        "before:se-content-[''] before:se-flex-1 before:se-border-t before:se-border-inherit",
                        "after:se-content-[''] after:se-flex-1 after:se-border-t after:se-border-inherit",
                        local.dashed &&
                            "before:se-border-dashed after:se-border-dashed",
                        contentPosition() === "left" &&
                            "before:se-max-w-[24px]",
                        contentPosition() === "right" && "after:se-max-w-[24px]"
                    )}
                >
                    <span
                        class="se-px-4 se-text-sm"
                        style={{
                            color:
                                local.color && !COLOR_MAP[local.color]
                                    ? local.color
                                    : "",
                        }}
                    >
                        {local.children}
                    </span>
                </div>
            </Show>
        </div>
    );
};
