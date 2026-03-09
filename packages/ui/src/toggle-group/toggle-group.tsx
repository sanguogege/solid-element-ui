import { ToggleGroup as KToggleGroup } from "@kobalte/core/toggle-group";
import { splitProps, For, type ComponentProps, type JSX } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";


// TODO 单选，多选出现问题

const toggleGroupStyles = tv(
    {
        slots: {
            root: "inline-flex items-center justify-center rounded-md border border-light bg-transparent p-1",
            item: [
                "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
                "outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "hover:bg-foreground/80 hover:text-muted/80",
            ],
        }, 
        variants: {
            variant: {
                default: {
                    root: "bg-transparent",
                    item: "data-[pressed]:bg-foreground data-[pressed]:text-main",
                },
                outline: {
                    root: "border border-light",
                    item: "border-r last:border-r-0 border-light rounded-none first:rounded-l-md last:rounded-r-md",
                },
            },
            size: {
                sm: { item: "h-8 px-2.5 text-xs" },
                md: { item: "h-10 px-3 text-sm" },
                lg: { item: "h-12 px-5 text-base" },
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    },
    {
        twMerge: true,
    },
);

type ToggleGroupVariants = VariantProps<typeof toggleGroupStyles>;

interface Option {
    label: string | JSX.Element;
    value: string;
    disabled?: boolean;
}

export interface ToggleGroupProps
    extends Omit<ComponentProps<typeof KToggleGroup>, "class">,
        ToggleGroupVariants {
    options: Option[];
    class?: string;
}

export const ToggleGroup = (props: ToggleGroupProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["options", "class"],
        ["size", "variant"]
    );

    const styles = toggleGroupStyles(variantProps);

    return (
        <KToggleGroup class={styles.root({ class: local.class })} {...others}>
            <For each={local.options}>
                {(option) => (
                    <KToggleGroup.Item
                        value={option.value}
                        disabled={option.disabled}
                        class={styles.item()}
                    >
                        {option.label}
                    </KToggleGroup.Item>
                )}
            </For>
        </KToggleGroup>
    );
};
