// src/components/button/settings.ts
import { cva, type VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";

/**
 * 使用 CVA 定义 Ant Design 风格的变体
 */
export const buttonVariants = cva(
    // 基础样式：对标 AntD 的 transition 和布局
    "inline-flex items-center cursor-pointer justify-center rounded-sm text-sm font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            // 对应 AntD 的 type 属性
            variant: {
                primary:
                    "bg-blue-600 text-white border border-blue-600 hover:bg-blue-500 hover:border-blue-500 shadow-sm",
                default:
                    "bg-white border border-[#d9d9d9] hover:text-[#4096ff] hover:border-[#4096ff]",
                dashed: "bg-white border border-[#d9d9d9] border-dashed hover:text-[#4096ff] hover:border-[#4096ff]",
                text: "bg-transparent hover:bg-[rgba(0,0,0,0.06)]",
                link: "bg-transparent text-blue-600 hover:text-[#4096ff]",
            },
            size: {
                sm: "h-6 px-2 text-xs",
                md: "h-8 px-4 text-sm",
                lg: "h-10 px-6 text-base",
            },
            danger: {
                true: "",
            },
            outline: {
                true: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

// 提取 CVA 属性类型
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// 定义组件接收的所有 Props
export interface ButtonProps
    extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
        ButtonVariantProps {
    class?: string;
    style?: JSX.CSSProperties;
    loading?: boolean;
}
