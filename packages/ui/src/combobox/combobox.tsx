import { Combobox as KCombobox } from "@kobalte/core/combobox";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";
import { Check, ChevronDown } from "lucide-solid";

// FIXME 缺少Description，ErrorMessage，验证

const comboboxStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full",
            label: "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none",
            control:
                "relative flex items-center rounded-md border border-zinc-200 bg-white shadow-sm transition-colors focus-within:ring-1 focus-within:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:ring-zinc-300",
            input: "h-9 w-full bg-transparent px-3 py-1 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed",
            trigger: "flex h-9 w-9 items-center justify-center text-zinc-500",
            content: [
                "z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            listbox: "p-1",
            item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
            itemIndicator:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
            icon: "h-4 w-4 transition-transform duration-200 origin-center data-[expanded]:rotate-180",
        },
    },
    {
        twMerge: true,
    },
);

const {
    root,
    label,
    control,
    input,
    trigger,
    content,
    listbox,
    item,
    itemIndicator,
    icon,
} = comboboxStyles();

export type ComboboxProps<T> = ComponentProps<typeof KCombobox<T>> & {
    label?: string;
    placeholder?: string;
    class?: string;
};

export const Combobox = <T extends string | object>(
    props: ComboboxProps<T>,
) => {
    const [local, others] = splitProps(props as ComboboxProps<T>, [
        "label",
        "placeholder",
        "class",
    ]);

    return (
        <KCombobox<T> class={root({ class: local.class })} {...others}>
            {local.label && (
                <KCombobox.Label class={label()}>{local.label}</KCombobox.Label>
            )}

            <KCombobox.Control class={control()}>
                <KCombobox.Input
                    class={input()}
                    placeholder={local.placeholder}
                />
                <KCombobox.Trigger class={trigger()}>
                    <KCombobox.Icon class={icon()}>
                        <ChevronDown class="h-4 w-4" />
                    </KCombobox.Icon>
                </KCombobox.Trigger>
            </KCombobox.Control>

            <KCombobox.Portal>
                <KCombobox.Content class={content()}>
                    <KCombobox.Listbox class={listbox()} />
                </KCombobox.Content>
            </KCombobox.Portal>
        </KCombobox>
    );
};

export const ComboboxItem = (props: { item: any }) => {
    return (
        <KCombobox.Item item={props.item} class={item()}>
            <KCombobox.ItemIndicator class={itemIndicator()}>
                <Check size={14} />
            </KCombobox.ItemIndicator>
            <KCombobox.ItemLabel>{props.item.rawValue}</KCombobox.ItemLabel>
        </KCombobox.Item>
    );
};
