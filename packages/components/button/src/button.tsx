import { splitProps, createMemo, type ParentComponent } from "solid-js";

import { cn } from "solid-element-ui/utils/cn";
// 定义组件的 Props 类型
import {type ButtonProps } from "./setting";

import {  useButtonGroup } from "./setting";



const BASE_CLASS =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer outline-none border";

// TODO 增加variants的样式
const VARIANT_MAP: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
        "bg-blue-600 border-blue-600 text-white hover:bg-blue-500 active:scale-98 active:bg-blue-700 active:border-blue-700",
    success:
        "bg-green-600 border-green-600 text-white hover:bg-green-500 active:scale-98 active:bg-green-700 active:border-green-700",
    danger: "bg-red-600 border-red-600 text-white hover:bg-red-500 active:scale-98 active:bg-red-700 active:border-red-700",
    warning:
        "bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-400 active:scale-98 active:bg-yellow-700 active:border-yellow-700",
    info: "bg-cyan-500 border-cyan-500 text-white hover:bg-cyan-400 active:scale-98 active:bg-cyan-700 active:border-cyan-700",
    text: "bg-transparent border-transparent text-blue-600 hover:bg-gray-100 active:scale-98",
};

const VARIANT_OUTLINE_MAP: Record<
    NonNullable<ButtonProps["variant"]>,
    string
> = {
    primary:
        "bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-98 active:bg-blue-100",
    success:
        "bg-transparent border-green-600 text-green-600 hover:bg-green-50 active:scale-98 active:bg-green-100",
    danger: "bg-transparent border-red-600 text-red-600 hover:bg-red-50 active:scale-98 active:bg-red-100",
    warning:
        "bg-transparent border-yellow-500 text-yellow-600 hover:bg-yellow-50 active:scale-98 active:bg-yellow-100",
    info: "bg-transparent border-cyan-500 text-cyan-600 hover:bg-cyan-50 active:scale-98 active:bg-cyan-100",
    text: "bg-transparent border-gray-600 text-gray-600 hover:bg-gray-100 active:scale-98",
};

const SIZE_MAP: Record<NonNullable<ButtonProps["size"]>, string> = {
    // 对应约 24px 高度
    sm: "px-2.5 py-0.5 text-xs leading-4",
    // 对应约 32px 高度 (Element/Ant 标准中等高度)
    md: "px-4 py-1.5 text-sm leading-5",
    // 对应约 40px 高度
    lg: "px-5 py-2.5 text-base leading-6",
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

export const SeButton: ParentComponent<ButtonProps> = (props: ButtonProps) => {
    // 读取可能存在的父级配置
    const groupConfig = useButtonGroup();
    // 1. 分离自定义属性和原生 HTML 属性
    const [local, others] = splitProps(props, customAttributes);
    // 2. 逻辑：计算基础样式类名 (记得带上  前缀)
    const buttonClasses = createMemo(() => {
        const variant = local.variant || groupConfig?.variant || "text";
        const size = local.size || groupConfig?.size || "md";
        return cn(
            // 基础样式
            BASE_CLASS,
            // 尺寸样式
            SIZE_MAP[size],
            // 圆角样式 (使用 CSS 变量确保用户可全局修改)
            local.round ? "rounded-full" : "rounded-[var(--radius,4px)]",
            // 变体样式
            local.outline ? VARIANT_OUTLINE_MAP[variant] : VARIANT_MAP[variant],
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
