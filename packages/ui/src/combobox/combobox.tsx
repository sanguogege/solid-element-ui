import { Combobox as KCombobox } from "@kobalte/core/combobox";
import { splitProps, type ComponentProps } from "solid-js";
import { comboboxVariants } from "./setting";
import { Check, ChevronDown } from "lucide-solid";

const styles = comboboxVariants();

// --- 扁平化组件定义 ---

export const ComboboxControl = (
    props: ComponentProps<typeof KCombobox.Control>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KCombobox.Control
            class={styles.control({ class: local.class })}
            {...others}
        >
            {local.children as any}
            <KCombobox.Trigger class={styles.trigger()}>
                <ChevronDown />
            </KCombobox.Trigger>
        </KCombobox.Control>
    );
};

export const ComboboxInput = (
    props: ComponentProps<typeof KCombobox.Input>
) => {
    return <KCombobox.Input class={styles.input({ class: props.class })} />;
};

export const ComboboxContent = (
    props: ComponentProps<typeof KCombobox.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KCombobox.Portal>
            <KCombobox.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                <KCombobox.Listbox class={styles.listbox()}>
                    {local.children as any}
                </KCombobox.Listbox>
            </KCombobox.Content>
        </KCombobox.Portal>
    );
};

export const ComboboxItem = (props: ComponentProps<typeof KCombobox.Item>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KCombobox.Item class={styles.item({ class: local.class })} {...others}>
            <KCombobox.ItemIndicator class={styles.itemIndicator()}>
                <Check class="h-4 w-4" />
            </KCombobox.ItemIndicator>
            <KCombobox.ItemLabel>{local.children}</KCombobox.ItemLabel>
        </KCombobox.Item>
    );
};

// --- 聚合导出 (Namespace) ---

export const Combobox = Object.assign(KCombobox, {
    Control: ComboboxControl,
    Input: ComboboxInput,
    Content: ComboboxContent,
    Item: ComboboxItem,
    // 补充其他不需要特殊样式的子组件
    Label: KCombobox.Label,
    Description: KCombobox.Description,
    ErrorMessage: KCombobox.ErrorMessage,
    Section: KCombobox.Section,
});
