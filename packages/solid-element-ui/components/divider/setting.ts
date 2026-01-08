import { type JSX } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

export const dividerVariants = tv({
    slots: {
        base: "relative transition-colors duration-200",
        // container 负责文字两侧的线条，通过 border-inherit 继承父级颜色
        container:
            "flex items-center w-full text-sm font-medium before:content-[''] after:content-[''] before:border-t after:border-t before:border-inherit after:border-inherit",
        text: "px-4 whitespace-nowrap text-inherit",
    },
    variants: {
        direction: {
            horizontal: {
                base: "flex items-center w-full my-6",
            },
            vertical: {
                base: "inline-block mx-2 h-[0.9em] align-middle border-l",
            },
        },
        dashed: {
            true: {
                base: "border-dashed",
                container: "before:border-dashed after:border-dashed",
            },
        },
        contentPosition: {
            left: { container: "before:w-6 after:flex-1" },
            center: { container: "before:flex-1 after:flex-1" },
            right: { container: "before:flex-1 after:w-6" },
        },
        color: {
            primary: { base: "border-primary text-primary" },
            success: { base: "border-green-500 text-green-500" },
            warning: { base: "border-yellow-500 text-yellow-500" },
            danger: { base: "border-red-500 text-red-500" },
            info: { base: "border-gray-400 text-gray-400" },
        },
       
        hasChildren: {
            true: {},
            false: {},
        },
    },
    compoundVariants: [
        {
            direction: "horizontal",
            hasChildren: false,
            class: {
                base: "border-t",
            },
        },
    ],
    defaultVariants: {
        direction: "horizontal",
        contentPosition: "center",
    },
});

export type DividerVariantProps = VariantProps<typeof dividerVariants>;

export interface DividerProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "color"> {
    direction?: "horizontal" | "vertical";
    contentPosition?: "left" | "center" | "right";
    dashed?: boolean;
    color?: "primary" | "success" | "warning" | "danger" | "info" | string;
    children?: JSX.Element;
    class?: string;
    style?: JSX.CSSProperties | string;
}
