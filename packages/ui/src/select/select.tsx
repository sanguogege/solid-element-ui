import { Select as KSelect } from "@kobalte/core/select";
import { splitProps, type ComponentProps } from "solid-js";
import { selectVariants } from "./setting";
import { Check, ChevronDown } from "lucide-solid";

const styles = selectVariants();

// --- 扁平化组件定义 ---

export const SelectRoot = KSelect;

export const SelectLabel = (props: ComponentProps<typeof KSelect.Label>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KSelect.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const SelectTrigger = (
    props: ComponentProps<typeof KSelect.Trigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KSelect.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <KSelect.Icon class={styles.icon()}>
                <ChevronDown class="h-4 w-4" />
            </KSelect.Icon>
        </KSelect.Trigger>
    );
};

export const SelectContent = (
    props: ComponentProps<typeof KSelect.Content>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KSelect.Portal>
            <KSelect.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                <KSelect.Listbox class={styles.listbox()} />
            </KSelect.Content>
        </KSelect.Portal>
    );
};

export const SelectItem = (props: ComponentProps<typeof KSelect.Item>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KSelect.Item class={styles.item({ class: local.class })} {...others}>
            <KSelect.ItemIndicator class={styles.itemIndicator()}>
                <Check class="h-4 w-4" />
            </KSelect.ItemIndicator>
            <KSelect.ItemLabel>{local.children}</KSelect.ItemLabel>
        </KSelect.Item>
    );
};

// 修正 SectionTitle：Kobalte 的 Select 实际上是基于 Listbox 的
// 使用组件库提供的类型安全的子组件
export const SelectSection = KSelect.Section;

// --- 聚合导出 (Namespace) ---

export const Select = Object.assign(SelectRoot, {
    Label: SelectLabel,
    Trigger: SelectTrigger,
    Value: KSelect.Value,
    Content: SelectContent,
    Item: SelectItem,
    Section: SelectSection,
    // 修正：如果需要标题，通常是作为 Section 的子组件
    // 如果 KSelect.SectionTitle 不存在，可以使用 Listbox 命名空间下的
    Description: KSelect.Description,
    ErrorMessage: KSelect.ErrorMessage,
});
