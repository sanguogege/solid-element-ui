import { Skeleton as KSkeleton } from "@kobalte/core/skeleton";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const skeletonStyles = tv(
    {
        base: "bg-slate-200 dark:bg-slate-800",
        variants: {
            variant: {
                rect: "rounded-md",
                circle: "rounded-full",
                text: "rounded h-3 w-full",
            },
            animation: {
                pulse: "animate-pulse",
                wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[wave_2s_linear_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                none: "",
            },
        },
        defaultVariants: {
            variant: "rect",
            animation: "pulse",
        },
    },
    {
        twMerge: true,
    },
);

type SkeletonVariants = VariantProps<typeof skeletonStyles>;

// 核心修正：使用 Omit 排除掉冲突的 width 和 height
export interface SkeletonProps
    extends Omit<
            ComponentProps<typeof KSkeleton>,
            "class" | "width" | "height"
        >,
        SkeletonVariants {
    width?: string | number;
    height?: string | number;
    class?: string;
}

export const Skeleton = (props: SkeletonProps) => {
    // 显式提取这些属性，避免传给 KSkeleton 引起类型或运行时错误
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "width", "height", "style"],
        ["variant", "animation"]
    );

    const mergedStyle = () => ({
        width:
            typeof local.width === "number" ? `${local.width}px` : local.width,
        height:
            typeof local.height === "number"
                ? `${local.height}px`
                : local.height,
        ...(typeof local.style === "object" ? local.style : {}),
    });

    return (
        <KSkeleton
            class={skeletonStyles({
                variant: variantProps.variant,
                animation: variantProps.animation,
                class: local.class,
            })}
            style={mergedStyle()}
            {...others}
        />
    );
};
