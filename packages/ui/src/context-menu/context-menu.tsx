import { ContextMenu as KContextMenu } from "@kobalte/core/context-menu";
import { splitProps, type ComponentProps } from "solid-js";
import { contextMenuVariants } from "./setting";
import { Check, ChevronRight, Circle } from "lucide-solid";

const styles = contextMenuVariants();

// --- 扁平化组件定义 ---

export const ContextMenuContent = (
    props: ComponentProps<typeof KContextMenu.Content>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KContextMenu.Portal>
            <KContextMenu.Content
                class={styles.content({ class: local.class })}
                {...others}
            />
        </KContextMenu.Portal>
    );
};

export const ContextMenuItem = (
    props: ComponentProps<typeof KContextMenu.Item>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KContextMenu.Item
            class={styles.item({ class: local.class })}
            {...others}
        />
    );
};

export const ContextMenuSeparator = (
    props: ComponentProps<typeof KContextMenu.Separator>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KContextMenu.Separator
            class={styles.separator({ class: local.class })}
            {...others}
        />
    );
};

export const ContextMenuCheckboxItem = (
    props: ComponentProps<typeof KContextMenu.CheckboxItem>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KContextMenu.CheckboxItem
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KContextMenu.ItemIndicator class={styles.itemIndicator()}>
                <Check class="h-4 w-4" />
            </KContextMenu.ItemIndicator>
            {local.children}
        </KContextMenu.CheckboxItem>
    );
};

export const ContextMenuRadioItem = (
    props: ComponentProps<typeof KContextMenu.RadioItem>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KContextMenu.RadioItem
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KContextMenu.ItemIndicator class={styles.itemIndicator()}>
                <Circle class="h-2 w-2 fill-current" />
            </KContextMenu.ItemIndicator>
            {local.children}
        </KContextMenu.RadioItem>
    );
};

export const ContextMenuSubTrigger = (
    props: ComponentProps<typeof KContextMenu.SubTrigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KContextMenu.SubTrigger
            class={styles.subTrigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <ChevronRight class={styles.subTriggerIcon()} />
        </KContextMenu.SubTrigger>
    );
};

// --- 聚合导出 (Namespace) ---

export const ContextMenu = Object.assign(KContextMenu, {
    Content: ContextMenuContent,
    Item: ContextMenuItem,
    Separator: ContextMenuSeparator,
    CheckboxItem: ContextMenuCheckboxItem,
    RadioItem: ContextMenuRadioItem,
    SubTrigger: ContextMenuSubTrigger,
    // 直接引用原生的
    Trigger: KContextMenu.Trigger,
    Group: KContextMenu.Group,
    Sub: KContextMenu.Sub,
    SubContent: ContextMenuContent, // SubContent 样式通常与 Content 一致
});
