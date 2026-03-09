import { Badge as KBadge } from "@kobalte/core/badge";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const badgeStyles = tv(
    {
        base: "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        variants: {
            variant: {
                default: " bg-reversal-bg text-reversal",
                secondary:
                    "bg-foreground text-muted",
                outline: "text-main border-light",
                success:
                    "bg-success/20 text-success ",
                danger: "bg-danger/20 text-danger",
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
    extends ComponentProps<typeof KBadge>, BadgeVariants {}

export const Badge = (props: BadgeProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class"],
        ["variant"],
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
