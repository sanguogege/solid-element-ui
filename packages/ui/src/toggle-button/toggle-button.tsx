import { ToggleButton as KToggle } from "@kobalte/core/toggle-button";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const toggleStyles = tv(
    {
        base: [
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
        ],
        variants: {
            variant: {
                solid: "bg-slate-100 text-slate-900 hover:bg-slate-200 data-[pressed]:bg-blue-600 data-[pressed]:text-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:data-[pressed]:bg-blue-500",
                outline:
                    "border border-slate-200 bg-transparent hover:bg-slate-100 data-[pressed]:bg-slate-900 data-[pressed]:text-white dark:border-slate-800 dark:hover:bg-slate-800 dark:data-[pressed]:bg-slate-50 dark:data-[pressed]:text-slate-900",
                ghost: "bg-transparent hover:bg-slate-100 data-[pressed]:bg-slate-200 dark:hover:bg-slate-800 dark:data-[pressed]:bg-slate-800",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-4 text-sm",
                lg: "h-12 px-6 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "solid",
            size: "md",
        },
    },
    {
        twMerge: true,
    },
);

type ToggleVariants = VariantProps<typeof toggleStyles>;

export interface ToggleButtonProps
    extends Omit<ComponentProps<typeof KToggle>, "class">,
        ToggleVariants {
    class?: string;
    children?: JSX.Element;
}

export const ToggleButton = (props: ToggleButtonProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "children"],
        ["variant", "size"]
    );

    return (
        <KToggle
            class={toggleStyles({
                variant: variantProps.variant,
                size: variantProps.size,
                class: local.class,
            })}
            {...others}
        >
            {(state) =>
                typeof local.children === "function"
                    ? (local.children as any)(state)
                    : local.children
            }
        </KToggle>
    );
};
