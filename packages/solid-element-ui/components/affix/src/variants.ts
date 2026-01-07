import { cva, type VariantProps } from "class-variance-authority";

export const affixVariants = cva(
    // 基础类名：2026年推荐使用更现代的 CSS 属性过渡
    "w-full transition-[position,top,bottom,left,right,box-shadow] duration-300",
    {
        variants: {
            // 预设几种阴影或外观效果，供用户自定义
            shadow: {
                none: "",
                sm: "shadow-sm",
                md: "shadow-md",
                lg: "shadow-lg",
            },
            // 也可以预设一些动画速度
            speed: {
                fast: "duration-150",
                normal: "duration-300",
                slow: "duration-500",
            },
        },
        defaultVariants: {
            shadow: "none",
            speed: "normal",
        },
    }
);

export type AffixVariants = VariantProps<typeof affixVariants>;
