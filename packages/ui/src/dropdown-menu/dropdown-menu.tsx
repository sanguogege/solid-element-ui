import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { splitProps, type ComponentProps } from "solid-js";
import { dropdownMenuVariants } from "./setting";
import { Check, ChevronRight, Circle } from "lucide-solid";

const styles = dropdownMenuVariants();

// --- 扁平化组件定义 ---

export const DropdownMenuContent = (
    props: ComponentProps<typeof KDropdownMenu.Content>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KDropdownMenu.Portal>
            <KDropdownMenu.Content
                class={styles.content({ class: local.class })}
                {...others}
            />
        </KDropdownMenu.Portal>
    );
};

export const DropdownMenuItem = (
    props: ComponentProps<typeof KDropdownMenu.Item>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KDropdownMenu.Item
            class={styles.item({ class: local.class })}
            {...others}
        />
    );
};

export const DropdownMenuSeparator = (
    props: ComponentProps<typeof KDropdownMenu.Separator>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KDropdownMenu.Separator
            class={styles.separator({ class: local.class })}
            {...others}
        />
    );
};

export const DropdownMenuCheckboxItem = (
    props: ComponentProps<typeof KDropdownMenu.CheckboxItem>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KDropdownMenu.CheckboxItem
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KDropdownMenu.ItemIndicator class={styles.itemIndicator()}>
                <Check class="h-4 w-4" />
            </KDropdownMenu.ItemIndicator>
            {local.children}
        </KDropdownMenu.CheckboxItem>
    );
};

export const DropdownMenuRadioItem = (
    props: ComponentProps<typeof KDropdownMenu.RadioItem>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KDropdownMenu.RadioItem
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KDropdownMenu.ItemIndicator class={styles.itemIndicator()}>
                <Circle class="h-2 w-2 fill-current" />
            </KDropdownMenu.ItemIndicator>
            {local.children}
        </KDropdownMenu.RadioItem>
    );
};

export const DropdownMenuSubTrigger = (
    props: ComponentProps<typeof KDropdownMenu.SubTrigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KDropdownMenu.SubTrigger
            class={styles.subTrigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <ChevronRight class={styles.subTriggerIcon()} />
        </KDropdownMenu.SubTrigger>
    );
};

// --- 聚合导出 (Namespace) ---

export const DropdownMenu = Object.assign(KDropdownMenu, {
    Content: DropdownMenuContent,
    Item: DropdownMenuItem,
    Separator: DropdownMenuSeparator,
    CheckboxItem: DropdownMenuCheckboxItem,
    RadioItem: DropdownMenuRadioItem,
    SubTrigger: DropdownMenuSubTrigger,
    // 直接引用原生组件
    Trigger: KDropdownMenu.Trigger,
    Group: KDropdownMenu.Group,
    Sub: KDropdownMenu.Sub,
    SubContent: DropdownMenuContent,
});
