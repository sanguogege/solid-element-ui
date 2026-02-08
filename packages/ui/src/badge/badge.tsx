import { Badge as KBadge } from "@kobalte/core/badge";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const badgeStyles = tv(
    {
        base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        variants: {
            variant: {
                default:
                    "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900",
                secondary:
                    "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50",
                outline:
                    "text-zinc-950 border-zinc-200 dark:text-zinc-50 dark:border-zinc-800",
                success:
                    "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
                danger: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
    {
        twMerge: true,
    },
);

type BadgeVariants = VariantProps<typeof badgeStyles>;

export interface BadgeProps
    extends ComponentProps<typeof KBadge>,
        BadgeVariants {}

export const Badge = (props: BadgeProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class"],
        ["variant"]
    );

    return (
        <KBadge
            class={badgeStyles({
                variant: variantProps.variant,
                class: local.class,
            })}
            {...others}
        />
    );
};
