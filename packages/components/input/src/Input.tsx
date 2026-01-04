import { splitProps, type Component, Show } from "solid-js";
import { cn } from "@/utils/cn";
import { type InputProps } from "./setting";

export const SeInput: Component<InputProps> = (props) => {
    // 1. 分离自定义属性与原生属性
    const [local, others] = splitProps(props, [
        "class",
        "size",
        "error",
        "prefix",
        "suffix",
        "disabled",
    ]);

    // 2. 映射不同尺寸的高度和文字大小 (AntD 标准)
    const sizeClasses = {
        sm: "h-6 px-1.5 text-sm",
        md: "h-8 px-3 text-[14px]",
        lg: "h-10 px-4 text-base",
    };

    // 3. 图标边距控制
    const iconSpacing = () => (local.size === "sm" ? "mx-1" : "mx-2");

    return (
        <div
            class={cn(
                // 容器外观：模拟 Ant Design 5.0 质感
                "flex items-center w-full bg-white border border-[#d9d9d9] rounded-md transition-all duration-200",
                "hover:border-[#4096ff]",
                // 利用 focus-within 让整个容器在 Input 聚焦时产生光晕
                "focus-within:border-[#1677ff] focus-within:ring-[3px] focus-within:ring-[#1677ff]/10",
                // 错误状态权重最高
                local.error &&
                    "border-[#ff4d4f] focus-within:border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10 hover:border-[#ff7875]",
                // 禁用状态
                local.disabled &&
                    "bg-[#f5f5f5] border-[#d9d9d9] cursor-not-allowed hover:border-[#d9d9d9]",
                local.class
            )}
        >
            {/* 前缀图标展示 */}
            <Show when={local.prefix}>
                <div
                    class={cn(
                        "flex items-center justify-center text-[#00000073] shrink-0",
                        iconSpacing()
                    )}
                >
                    {local.prefix}
                </div>
            </Show>

            {/* 真正的原生 Input */}
            <input
                {...others}
                disabled={local.disabled}
                class={cn(
                    // 移除原生 input 的所有默认边框和焦点样式
                    "flex-1 bg-transparent border-none outline-none text-[#000000d9] placeholder:text-[#bfbfbf] disabled:cursor-not-allowed",
                    // 应用对应尺寸
                    sizeClasses[local.size ?? "md"],
                    // 如果有图标，修正左右 padding 以保证视觉平衡
                    local.prefix && "pl-0",
                    local.suffix && "pr-0"
                )}
            />

            {/* 后缀图标展示 */}
            <Show when={local.suffix}>
                <div
                    class={cn(
                        "flex items-center justify-center text-[#00000073] shrink-0",
                        iconSpacing()
                    )}
                >
                    {local.suffix}
                </div>
            </Show>
        </div>
    );
};
