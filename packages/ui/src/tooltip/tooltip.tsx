import { Tooltip as KTooltip } from "@kobalte/core/tooltip";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const tooltipStyles = tv(
    {
        slots: {
            content: [
                "z-50 rounded-md px-4 py-1.5 text-xs shadow-md",
                "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            ],
            arrow: "",
        },
        variants: {
            variant: {
                default: {
                    content:
                        "bg-reversal-bg text-reversal ",
                    arrow: "fill-muted",
                },
                danger: {
                    content: "bg-danger text-white",
                    arrow: "fill-danger",
                },
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

type TooltipVariants = VariantProps<typeof tooltipStyles>;

export interface TooltipProps
    extends Omit<ComponentProps<typeof KTooltip>, "class">, TooltipVariants {
    content: JSX.Element;
    children: JSX.Element;
}

export const Tooltip = (props: TooltipProps) => {
    // 1. 分离属性
    const [local, variantProps, others] = splitProps(
        props,
        ["children", "content"],
        ["variant"]
    );

    // 2. 生成样式
    const styles = tooltipStyles(variantProps);

    return (
        <KTooltip
            gutter={4} 
            openDelay={200}
            {...others}
        >
            <KTooltip.Trigger class="block">
                {local.children}
            </KTooltip.Trigger>

            <KTooltip.Portal>
                <KTooltip.Content class={styles.content()}>
                    <KTooltip.Arrow class={styles.arrow()}  />
                    {local.content}
                </KTooltip.Content>
            </KTooltip.Portal>
        </KTooltip>
    );
};
