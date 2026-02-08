import { SegmentedControl as KSegmented } from "@kobalte/core/segmented-control";
import { splitProps, For, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

// FIXME 样式问题

const segmentedStyles = tv(
    {
        slots: {
            root: "relative flex flex-col",
            container:
                "relative flex items-center w-full rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
            item: [
                " z-10 inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
                "outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                "data-[checked]:text-slate-950 dark:data-[checked]:text-slate-50 transition-colors duration-200",
            ],
            indicator:
                "absolute z-0 bg-white shadow-sm rounded-md transition-all duration-200 ease-in-out dark:bg-slate-950",
            label: "mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            itemLabel: "flex w-full cursor-pointer items-center justify-center",
        },
        variants: {
            size: {
                sm: { root: "p-0.5", item: "px-2 py-1 text-xs" },
                md: { root: "p-1", item: "px-3 py-1.5 text-sm" },
                lg: { root: "p-1.5", item: "px-6 py-2 text-base" },
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

type SegmentedVariants = VariantProps<typeof segmentedStyles>;

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SegmentedControlProps
    extends
        Omit<ComponentProps<typeof KSegmented>, "class">,
        SegmentedVariants {
    options: Option[];
    label?: string;
    class?: string;
}

export const SegmentedControl = (props: SegmentedControlProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["options", "class", "label"],
        ["size"],
    );

    const styles = segmentedStyles(variantProps);

    return (
        <KSegmented class={styles.root({ class: local.class })} {...others}>
            {local.label && (
                <KSegmented.Label class={styles.label()}>
                    {local.label}
                </KSegmented.Label>
            )}
            <div class={styles.container()}>
                <For each={local.options}>
                    {(option) => (
                        <KSegmented.Item
                            value={option.value}
                            disabled={option.disabled}
                            class={styles.item()}
                        >
                            <KSegmented.ItemInput />
                            <KSegmented.ItemLabel class={styles.itemLabel()}>
                                {option.label}
                            </KSegmented.ItemLabel>
                        </KSegmented.Item>
                    )}
                </For>
                <KSegmented.Indicator class={styles.indicator()} />
            </div>
        </KSegmented>
    );
};
