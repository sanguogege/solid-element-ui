import { RadioGroup as KRadioGroup } from "@kobalte/core/radio-group";
import { splitProps, type ComponentProps, For, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const radioStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-3 antialiased",
            label: "text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1",
            item: "group flex items-center gap-3 cursor-pointer disabled:cursor-not-allowed",
            control: [
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white transition-all shadow-sm",
                "group-hover:border-slate-400 group-data-[checked]:border-blue-600 group-data-[checked]:bg-blue-600",
                "group-focus-visible:ring-2 group-focus-visible:ring-blue-500/20",
                "dark:bg-slate-950 dark:border-slate-700 dark:group-data-[checked]:bg-blue-600 dark:group-data-[checked]:border-blue-600",
            ],
            indicator: "h-2 w-2 rounded-full bg-white shadow-sm",
            itemLabel:
                "text-sm font-medium text-slate-700 dark:text-slate-300 group-data-[disabled]:opacity-50",
        },
        variants: {
            orientation: {
                horizontal: { root: "flex-row flex-wrap gap-6" },
                vertical: { root: "flex-col" },
            },
        },
        defaultVariants: {
            orientation: "vertical",
        },
    },
    {
        twMerge: true,
    },
);

type RadioVariants = VariantProps<typeof radioStyles>;

export interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface RadioGroupProps
    extends Omit<ComponentProps<typeof KRadioGroup>, "children" | "class">,
        RadioVariants {
    label?: string;
    options: RadioOption[];
    class?: string;
}

/**
 * RadioGroup 高度封装版
 * 自动处理循环渲染、选中指示器以及水平/垂直布局
 */
export const RadioGroup = (props: RadioGroupProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["label", "options", "class"],
        ["orientation"]
    );

    const s = () => radioStyles({ orientation: variantProps.orientation });

    return (
        <KRadioGroup class={s().root({ class: local.class })} {...others}>
            <Show when={local.label}>
                <KRadioGroup.Label class={s().label()}>
                    {local.label}
                </KRadioGroup.Label>
            </Show>

            <For each={local.options}>
                {(option) => (
                    <KRadioGroup.Item
                        value={option.value}
                        disabled={option.disabled}
                        class={s().item()}
                    >
                        <KRadioGroup.ItemInput />
                        <KRadioGroup.ItemControl class={s().control()}>
                            <KRadioGroup.ItemIndicator
                                class={s().indicator()}
                            />
                        </KRadioGroup.ItemControl>
                        <KRadioGroup.ItemLabel class={s().itemLabel()}>
                            {option.label}
                        </KRadioGroup.ItemLabel>
                    </KRadioGroup.Item>
                )}
            </For>
        </KRadioGroup>
    );
};
