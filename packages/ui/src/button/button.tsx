import { Button as KButton } from "@kobalte/core/button";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { LoaderCircle } from "lucide-solid";

const buttonStyles = tv({
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 antialiased cursor-pointer",
    variants: {
        variant: {
            default:
                "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
            destructive:
                "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
            outline:
                "border border-zinc-200 bg-transparent hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
            secondary:
                "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
            ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
            link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

export interface ButtonProps
    extends ComponentProps<typeof KButton>, ButtonVariants {
    loading?: boolean;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
}

export const Button = (props: ButtonProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "children", "loading", "leftIcon", "rightIcon", "disabled"],
        ["variant", "size"],
    );

    return (
        <KButton
            class={buttonStyles({
                variant: variantProps.variant,
                size: variantProps.size,
                class: local.class,
            })}
            disabled={local.disabled || local.loading}
            {...others}
        >
            {local.loading && (
                <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
            )}
            {!local.loading && local.leftIcon && (
                <span class="mr-2">{local.leftIcon}</span>
            )}
            {local.children}
            {!local.loading && local.rightIcon && (
                <span class="ml-2">{local.rightIcon}</span>
            )}
        </KButton>
    );
};
