import { Menubar as KMenubar } from "@kobalte/core/menubar";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { menubarVariants } from "./setting";
import { Check, ChevronRight, Circle } from "lucide-solid";

const styles = menubarVariants();

// --- 扁平化组件定义 ---

export const MenubarRoot = (props: ComponentProps<typeof KMenubar>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <KMenubar class={styles.root({ class: local.class })} {...others} />;
};

export const MenubarMenu = KMenubar.Menu;

export const MenubarTrigger = (
    props: ComponentProps<typeof KMenubar.Trigger>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KMenubar.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        />
    );
};

export const MenubarContent = (
    props: ComponentProps<typeof KMenubar.Content>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KMenubar.Portal>
            <KMenubar.Content
                class={styles.content({ class: local.class })}
                {...others}
            />
        </KMenubar.Portal>
    );
};

export const MenubarItem = (props: ComponentProps<typeof KMenubar.Item>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KMenubar.Item
            class={styles.item({ class: local.class })}
            {...others}
        />
    );
};

export const MenubarShortcut = (props: JSX.HTMLAttributes<HTMLSpanElement>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <span class={styles.shortcut({ class: local.class })} {...others} />;
};

export const MenubarSeparator = (
    props: ComponentProps<typeof KMenubar.Separator>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KMenubar.Separator
            class={styles.separator({ class: local.class })}
            {...others}
        />
    );
};

export const MenubarCheckboxItem = (
    props: ComponentProps<typeof KMenubar.CheckboxItem>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KMenubar.CheckboxItem
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KMenubar.ItemIndicator class={styles.itemIndicator()}>
                <Check class="h-4 w-4" />
            </KMenubar.ItemIndicator>
            {local.children}
        </KMenubar.CheckboxItem>
    );
};

export const MenubarRadioItem = (
    props: ComponentProps<typeof KMenubar.RadioItem>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KMenubar.RadioItem
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KMenubar.ItemIndicator class={styles.itemIndicator()}>
                <Circle class="h-2 w-2 fill-current" />
            </KMenubar.ItemIndicator>
            {local.children}
        </KMenubar.RadioItem>
    );
};

export const MenubarSubTrigger = (
    props: ComponentProps<typeof KMenubar.SubTrigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KMenubar.SubTrigger
            class={styles.subTrigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <ChevronRight class="ml-auto h-4 w-4 opacity-50" />
        </KMenubar.SubTrigger>
    );
};

// --- 聚合导出 (Namespace) ---

export const Menubar = Object.assign(MenubarRoot, {
    Menu: MenubarMenu,
    Trigger: MenubarTrigger,
    Content: MenubarContent,
    Item: MenubarItem,
    Shortcut: MenubarShortcut,
    Separator: MenubarSeparator,
    CheckboxItem: MenubarCheckboxItem,
    RadioItem: MenubarRadioItem,
    SubTrigger: MenubarSubTrigger,
    // 基础组件
    Group: KMenubar.Group,
    Sub: KMenubar.Sub,
    SubContent: MenubarContent,
});
