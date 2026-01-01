import { splitProps, type JSX, createMemo } from "solid-js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"; // 建议保留以处理样式冲突

// 定义组件的 Props 类型
export interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "success" | "warning" | "danger" | "info" | "text";
    size?: "sm" | "md" | "lg";
    round?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

export default(props: ButtonProps) => {
    // 1. 分离自定义属性和原生 HTML 属性
    const [local, others] = splitProps(props, [
        "variant",
        "size",
        "round",
        "outline",
        "loading",
        "disabled",
        "class",
        "children",
    ]);

    // 2. 逻辑：计算基础样式类名 (记得带上  前缀)
    const buttonClasses = createMemo(() => {
        const variant = local.variant || "primary";
        const size = local.size || "md";

        return twMerge(
            clsx(
                // 基础样式
                "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer outline-none border",

                // 尺寸样式
                {
                    "px-3 py-1.5 text-sm": size === "sm",
                    "px-5 py-2 text-base": size === "md",
                    "px-7 py-3 text-lg": size === "lg",
                },

                // 圆角样式 (使用 CSS 变量确保用户可全局修改)
                local.round
                    ? "rounded-full"
                    : "rounded-[var(--radius,4px)]",

                // 变体样式 (这里仅演示 Primary)
                variant === "primary" &&
                    !local.outline &&
                    "bg-blue-600 border-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
                variant === "primary" &&
                    local.outline &&
                    "bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50",

                // 禁用与加载状态
                (local.disabled || local.loading) &&
                    "opacity-50 cursor-not-allowed pointer-events-none",

                // 合并用户自定义 class
                local.class
            )
        );
    });

    return (
        <button
            {...others}
            disabled={local.disabled || local.loading}
            class={buttonClasses()}
            aria-busy={local.loading}
        >
            {local.loading && (
                <span class="mr-2 animate-spin">🌀</span>
            )}
            {local.children}
        </button>
    );
};
