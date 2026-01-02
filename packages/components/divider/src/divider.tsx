import { splitProps, Show, type ParentComponent, createMemo } from "solid-js";
import { type DividerProps } from "./setting";
import { cn } from "@/utils/cn";

// 1. 定义预设颜色映射（对应你 Tailwind v4 的主题配置）
const COLOR_MAP: Record<string, string> = {
    primary: "border-primary text-primary",
    success: "border-green-500 text-green-500",
    warning: "border-yellow-500 text-yellow-500",
    danger: "border-red-500 text-red-500",
    info: "border-gray-400 text-gray-400",
};

const customAttributes = [
    "direction",
    "contentPosition",
    "dashed",
    "color",
    "class",
    "children",
] as const;

export const SeDivider = (
    props: DividerProps
) => {
    const [local, others] = splitProps(props, customAttributes);

    const isVertical = () => local.direction === "vertical";
    const contentPos = () => local.contentPosition || "center";

    // 2. 核心判断逻辑
    const isCustomColor = createMemo(() => local.color && !COLOR_MAP[local.color]);
    const presetColorClass = createMemo(() => (local.color ? COLOR_MAP[local.color] : ""));

    // 3. 动态样式处理
    const resolveStyles = createMemo(() => {
        if (!isCustomColor()) return others.style || {};
        return {
            "border-color": local.color,
            "color": local.color,
            ...(others.style as any)
        };
    });
    
    return (
        <div
            {...others}
            role="separator"
            style={resolveStyles()}
            class={cn(
                "relative transition-colors duration-200",
                // 如果没有颜色且没有文字，给一个默认边框色
                !local.color && !local.children && "border-gray-200",
                // 应用预设类名
                presetColorClass(),
                
                !isVertical() ? [
                    "flex items-center w-full my-6",
                    // 关键：带文字时父容器不能有 border，否则会穿透文字
                    local.children ? "border-none" : "border-t"
                ] : "inline-block mx-2 h-[0.9em] align-middle border-l",

                local.dashed && "border-dashed",
                local.class
            )}
        >
            <Show when={!isVertical() && local.children}>
                <div
                    class={cn(
                        "flex items-center w-full text-sm font-medium",
                        // 必须包含 border-inherit，让 before/after 线条继承父级的预设类名颜色或内联样式颜色
                        "before:content-[''] before:border-t before:border-inherit",
                        "after:content-[''] after:border-t after:border-inherit",
                        local.dashed && "before:border-dashed after:border-dashed",
                        // 位置逻辑
                        contentPos() === "center" && "before:flex-1 after:flex-1",
                        contentPos() === "left" && "before:w-6 after:flex-1",
                        contentPos() === "right" && "before:flex-1 after:w-6"
                    )}
                >
                    <span class="px-4 whitespace-nowrap text-inherit">
                        {local.children}
                    </span>
                </div>
            </Show>
        </div>
    )
};
