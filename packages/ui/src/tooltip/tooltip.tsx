import { Tooltip as KTooltip } from "@kobalte/core/tooltip";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

// FIXME 为什么没有箭头

const tooltipStyles = tv(
    {
        slots: {
            content: [
                "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md",
                "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            ],
            arrow: "",
        },
        variants: {
            variant: {
                default: {
                    content:
                        "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900",
                    arrow: "text-slate-900 dark:text-slate-50",
                },
                danger: {
                    content: "bg-red-600 text-white",
                    arrow: "text-red-600",
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
            gutter={4} // 必须：给箭头留出空间
            openDelay={200} // 可选：稍微延迟显示，体验更好
            {...others}
        >
            <KTooltip.Trigger class="block">
                {local.children}
            </KTooltip.Trigger>

            <KTooltip.Portal>
                <KTooltip.Content class={styles.content()}>
                    {/* size={8} 确保箭头有物理尺寸
                        fill="currentColor" 配合 styles.arrow() 里的 text 颜色实现变体同步 
                    */}
                    <KTooltip.Arrow class={styles.arrow()} size={8} />
                    {local.content}
                </KTooltip.Content>
            </KTooltip.Portal>
        </KTooltip>
    );
};
