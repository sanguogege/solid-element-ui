import { Select as KSelect } from "@kobalte/core/select";
import { splitProps, Show, createMemo } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { ChevronDown, Check } from "lucide-solid";

const selectStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full",
            label: "text-sm font-medium text-slate-700 dark:text-slate-300",
            trigger: [
                "flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm",
                "ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
                "disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950",
            ],
            content: [
                "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md",
                "data-[expanded]:animate-in data-[closed]:animate-out dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
            ],
            listbox: "p-1",
            item: [
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                "focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                "dark:focus:bg-slate-800 dark:focus:text-slate-50",
            ],
            itemIndicator:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
            description: "text-xs text-slate-500 dark:text-slate-400",
        },
        variants: {
            size: {
                sm: { trigger: "h-8 text-xs", item: "py-1 text-xs" },
                md: { trigger: "h-10 text-sm", item: "py-1.5 text-sm" },
                lg: { trigger: "h-12 text-base", item: "py-2 text-base" },
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

type SelectVariants = VariantProps<typeof selectStyles>;

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

// 重新定义接口，使 value 和 onChange 处理的是 string 类型
export interface SelectProps extends SelectVariants {
    options: Option[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    label?: string;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    class?: string;
}

export const Select = (props: SelectProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        [
            "options",
            "label",
            "description",
            "placeholder",
            "class",
            "value",
            "defaultValue",
            "onChange",
        ],
        ["size"],
    );

    const styles = selectStyles(variantProps);

    const selectedOption = createMemo(() => {
        if (local.value === undefined) return undefined;
        return local.options.find((opt) => opt.value === local.value);
    });

    const defaultOption = createMemo(() => {
        if (local.defaultValue === undefined) return undefined;
        return local.options.find((opt) => opt.value === local.defaultValue);
    });

    const handleValueChange = (opt: Option | null) => {
        if (opt === null) {
           
            local.onChange?.("");
            return;
        }
        local.onChange?.(opt.value);
    };

    return (
        <KSelect<Option>
            multiple={false}
            options={local.options}
            optionValue="value"
            optionTextValue="label"
            optionDisabled="disabled"
            placeholder={local.placeholder}
            value={selectedOption()}
            defaultValue={defaultOption()}
            onChange={handleValueChange}
            class={styles.root({ class: local.class })}
            {...others}
            itemComponent={(itemProps) => (
                <KSelect.Item item={itemProps.item} class={styles.item()}>
                    <KSelect.ItemIndicator class={styles.itemIndicator()}>
                        <Check size={14} />
                    </KSelect.ItemIndicator>
                    <KSelect.ItemLabel>
                        {itemProps.item.textValue}
                    </KSelect.ItemLabel>
                </KSelect.Item>
            )}
        >
            <Show when={local.label}>
                <KSelect.Label class={styles.label()}>
                    {local.label}
                </KSelect.Label>
            </Show>

            <KSelect.Trigger class={styles.trigger()}>
                <KSelect.Value<Option>>
                    {(state) => (
                        <Show
                            when={state.selectedOption()}
                            fallback={local.placeholder}
                        >
                            {state.selectedOption()?.label}
                        </Show>
                    )}
                </KSelect.Value>
                <KSelect.Icon>
                    <ChevronDown size={16} class="opacity-50" />
                </KSelect.Icon>
            </KSelect.Trigger>

            <KSelect.Portal>
                <KSelect.Content class={styles.content()}>
                    <KSelect.Listbox class={styles.listbox()} />
                </KSelect.Content>
            </KSelect.Portal>

            <Show when={local.description}>
                <KSelect.Description class={styles.description()}>
                    {local.description}
                </KSelect.Description>
            </Show>
        </KSelect>
    );
};
