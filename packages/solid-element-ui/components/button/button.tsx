// src/components/button/Button.tsx
import { splitProps } from "solid-js";
import { buttonVariants, type ButtonProps } from "./setting";
import { cn } from "@solid-element-ui/utils/cn"; // 引入 twMerge + clsx 的工具函数

export const Button = (props: ButtonProps) => {
    /**
     * splitProps 是 SolidJS 处理自定义组件的关键：
     * 1. local: 包含手动处理的样式、子元素等
     * 2. variant: 包含传给 CVA 的变体属性 (variants, size, danger)
     * 3. others: 包含所有原生的 HTML 属性 (type, onClick, id 等)
     */
    const [local, variant, others] = splitProps(
        props,
        ["class", "style", "children", "loading"],
        ["variant", "size", "danger"]
    );

    return (
        <button
            // 通过 cn 函数将 CVA 生成的类名与用户自定义的 class 合并
            class={cn(buttonVariants(variant), local.class)}
            style={local.style}
            disabled={local.loading}
            {...others}
        >
            {local.loading && (
                <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {local.children}
        </button>
    );
};
