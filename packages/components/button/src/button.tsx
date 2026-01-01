import { splitProps, createMemo } from "solid-js";

import { cn } from "@/utils/cn";
// 定义组件的 Props 类型
import {type ButtonProps } from "./setting";

const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer outline-none border";

// TODO 增加variants的样式
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 border-blue-600 text-white hover:bg-blue-500",
    success: "bg-green-600 border-green-600 text-white hover:bg-green-500",
    danger: "bg-red-600 border-red-600 text-white hover:bg-red-500",
    warning:
        "bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-400",
    info: "bg-cyan-500 border-cyan-500 text-white hover:bg-cyan-400",
    text: "bg-transparent border-transparent text-blue-600 hover:bg-gray-100",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-3 text-lg",
};

const customAttributes = [
    "variant",
    "size",
    "round",
    "outline",
    "loading",
    "disabled",
    "class",
    "children",
] as const;

const loadingStyle = "opacity-50 cursor-not-allowed pointer-events-none";

export const SeButton =(props: ButtonProps)=> {
    // 1. 分离自定义属性和原生 HTML 属性
    const [local, others] = splitProps(props, customAttributes);

    // 2. 逻辑：计算基础样式类名 (记得带上  前缀)
    const buttonClasses = createMemo(() => {
        const variant = local.variant || "primary";
        const size = local.size || "md";
        return cn(
            // 基础样式
            baseStyle,
            // 尺寸样式
            sizeStyles[size],
            // 圆角样式 (使用 CSS 变量确保用户可全局修改)
            local.round ? "rounded-full" : "rounded-[var(--radius,4px)]",
            // 变体样式 (这里仅演示 Primary)
            variants[variant],
            // 禁用与加载状态
            (local.disabled || local.loading) && loadingStyle,
            // TODO  outline
            local.outline,
            // 合并用户自定义 class
            local.class
        );
    });

    return (
        <button
            {...others}
            disabled={local.disabled || local.loading}
            class={buttonClasses()}
            aria-busy={local.loading}
        >
            {local.loading && <span class="mr-2 animate-spin">🌀</span>}
            {local.children}
        </button>
    );
};
