import { HoverCard as KHoverCard } from "@kobalte/core/hover-card";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const hoverCardStyles = tv(
    {
        slots: {
            content: [
                "z-50 w-64 rounded-xl border bg-white p-4 shadow-lg outline-none",
                "dark:bg-slate-900 dark:border-slate-800 antialiased",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            arrow: "fill-white stroke-slate-200 dark:fill-slate-900 dark:stroke-slate-800",
        },
        variants: {
            size: {
                sm: { content: "w-48 p-3" },
                md: { content: "w-64 p-4" },
                lg: { content: "w-80 p-6" },
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
    {
        twMerge: true,
    },
);

type HoverCardVariants = VariantProps<typeof hoverCardStyles>;

export interface HoverCardProps
    extends ComponentProps<typeof KHoverCard>, HoverCardVariants {
    trigger: JSX.Element;
    showArrow?: boolean;
}

export const HoverCard = (props: HoverCardProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["trigger", "children", "showArrow"],
        ["size"],
    );

    const styles = hoverCardStyles({ size: variantProps.size });

    return (
        <KHoverCard openDelay={200} closeDelay={300} {...others}>
            <KHoverCard.Trigger>{local.trigger}</KHoverCard.Trigger>

            <KHoverCard.Portal>
                <KHoverCard.Content class={styles.content()}>
                    {local.showArrow && (
                        <KHoverCard.Arrow class={styles.arrow()} />
                    )}
                    {local.children}
                </KHoverCard.Content>
            </KHoverCard.Portal>
        </KHoverCard>
    );
};
