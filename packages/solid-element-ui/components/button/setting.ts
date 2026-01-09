import { createContext, JSX, useContext } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv(
    {
        slots: {
            base: "inline-flex items-center cursor-pointer justify-center rounded-sm text-sm font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
            icon: "animate-spin -ml-1 mr-2 h-4 w-4 text-current",
        },
        variants: {
            size: {
                sm: { base: "h-6 px-2 text-xs" },
                md: { base: "h-8 px-4 text-sm" },
                lg: { base: "h-10 px-6 text-base" },
            },
            loading: {
                true: {
                    base: "pointer-events-none opacity-70",
                },
            },
            variant: {
                default: {
                    base: "bg-defaultBg text-defaultColor",
                },
                outline: {
                    base: " border border-border hover:border-primary hover:text-primary",
                },
                dashed: {
                    base: "border border-dashed border-border hover:border-primary hover:text-primary",
                },
                filled: {
                    base: "bg-black/5 hover:bg-black/10",
                },
                text: {
                    base: "hover:bg-black/10",
                },
                link: {
                    base: "hover:text-primary",
                },
            },

            color: {
                primary: {
                    base: "",
                },
                success: {
                    base: "",
                },
                warning: {
                    base: "",
                },
                error: {
                    base: "",
                },
            },
        },
        compoundVariants: [
            {
                variant: "default",
                color: "primary",
                class: {
                    base: "bg-primary text-white border-primary hover:bg-primary/70 hover:border-primary/70",
                },
            },
            {
                variant: "default",
                color: "success",
                class: {
                    base: "bg-success text-white border-success hover:bg-success/70 hover:border-success/70",
                },
            },
            {
                variant: "default",
                color: "warning",
                class: {
                    base: "bg-warning text-white border-warning hover:bg-warning/70 hover:border-warning/70",
                },
            },
            {
                variant: "default",
                color: "error",
                class: {
                    base: "bg-error text-white border-error hover:bg-error/70 hover:border-error/70",
                },
            },
            // --- outline 和 dashed 类型 ---
            {
                variant: ["outline", "dashed"],
                color: "primary",
                class: {
                    base: "text-primary border-primary hover:border-primary/70  hover:text-primary/70",
                },
            },
            {
                variant: ["outline", "dashed"],
                color: "success",
                class: {
                    base: "text-success border-success hover:border-success/70  hover:text-success/70",
                },
            },
            {
                variant: ["outline", "dashed"],
                color: "warning",
                class: {
                    base: "text-warning border-warning hover:border-warning/70  hover:text-warning/70",
                },
            },
            {
                variant: ["outline", "dashed"],
                color: "error",
                class: {
                    base: "text-error border-error hover:border-error/70  hover:text-error/70",
                },
            },

            // --- filled 类型 ---
            {
                variant: "filled",
                color: "primary",
                class: {
                    base: "text-primary bg-primary/5 hover:bg-primary/10",
                },
            },
            {
                variant: "filled",
                color: "success",
                class: {
                    base: "text-success bg-success/5 hover:bg-success/10",
                },
            },
            {
                variant: "filled",
                color: "warning",
                class: {
                    base: "text-warning bg-warning/5 hover:bg-warning/10",
                },
            },
            {
                variant: "filled",
                color: "error",
                class: {
                    base: "text-error bg-error/5 hover:bg-error/10",
                },
            },
            // --- text 类型 ---
            {
                variant: "text",
                color: "primary",
                class: {
                    base: "text-primary hover:bg-primary/10",
                },
            },
            {
                variant: "text",
                color: "success",
                class: {
                    base: "text-success hover:bg-success/10",
                },
            },
            {
                variant: "text",
                color: "warning",
                class: {
                    base: "text-warning hover:bg-warning/10",
                },
            },
            {
                variant: "text",
                color: "error",
                class: {
                    base: "text-error hover:bg-error/10",
                },
            },
            // --- link 类型 ---
            {
                variant: "link",
                color: "primary",
                class: {
                    base: "text-primary hover:text-primary/70",
                },
            },
            {
                variant: "link",
                color: "success",
                class: {
                    base: "text-success hover:text-success/70",
                },
            },
            {
                variant: "link",
                color: "warning",
                class: {
                    base: "text-warning hover:text-warning/70",
                },
            },
            {
                variant: "link",
                color: "error",
                class: {
                    base: "text-error hover:text-error/70",
                },
            },
        ],
        // 默认值
        defaultVariants: {
            size: "md",
            variant: "default",
        },
    },
    {
        twMerge: true,
    }
);

export const buttonGroupVariants = tv({
    base: [
        "display-flex items-center shadow-sm rounded-sm",
        // 1. 处理圆角：让子按钮在组内正确衔接
        "[&>button:first-child]:rounded-r-none",
        "[&>button:not(:first-child):not(:last-child)]:rounded-none",
        "[&>button:last-child]:rounded-l-none",
        // 2. 边框合并逻辑：非首个按钮左移 1px 覆盖重叠边框
        "[&>button:not(:first-child)]:-ml-px",
        // 3. 层级优化：悬停或获取焦点时边框置顶
        "[&>button]:relative hover:[&>button]:z-10 focus-visible:[&>button]:z-10",
    ],
    variants: {
        // 这里可以定义 Group 级别的整体样式（如是否垂直布局等）
        vertical: {
            true: "flex-col [&>button]:w-full [&>button:not(:first-child)]:-ml-0 [&>button:not(:first-child)]:-mt-px [&>button:first-child]:rounded-b-none [&>button:last-child]:rounded-t-none",
        },
    },
});

// 定义 Context 类型，确保子组件 Button 可以获取
export interface ButtonGroupContextValue {
    size?: "sm" | "md" | "lg";
    variant?: "default" | "outline" | "dashed" | "filled" | "text" | "link";
    color?: "primary" | "success" | "warning" | "error";
}

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
    extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
        ButtonVariantProps {
    class?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue>();
export const useButtonGroup = () => useContext(ButtonGroupContext);

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;
export interface ButtonGroupProps
    extends JSX.HTMLAttributes<HTMLDivElement>,
        ButtonGroupVariantProps {
    size?: ButtonGroupContextValue["size"];
    variant?: ButtonGroupContextValue["variant"];
    color?: ButtonGroupContextValue["color"];
    children?: JSX.Element;
}
