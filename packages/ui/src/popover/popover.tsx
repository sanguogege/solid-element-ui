import { Popover as KPopover } from "@kobalte/core/popover";
import { splitProps, type ComponentProps } from "solid-js";
import { popoverVariants } from "./setting";
import { X } from "lucide-solid";

const styles = popoverVariants();

// --- 扁平化组件定义 ---

export const PopoverRoot = KPopover;

export const PopoverTrigger = KPopover.Trigger;

export const PopoverContent = (
    props: ComponentProps<typeof KPopover.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KPopover.Portal>
            <KPopover.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                {local.children}
                <KPopover.CloseButton class={styles.close()}>
                    <X class="h-4 w-4" />
                    <span class="sr-only">Close</span>
                </KPopover.CloseButton>
            </KPopover.Content>
        </KPopover.Portal>
    );
};

export const PopoverTitle = (props: ComponentProps<typeof KPopover.Title>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KPopover.Title
            class={styles.title({ class: local.class })}
            {...others}
        />
    );
};

export const PopoverDescription = (
    props: ComponentProps<typeof KPopover.Description>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KPopover.Description
            class={styles.description({ class: local.class })}
            {...others}
        />
    );
};

export const PopoverArrow = (props: ComponentProps<typeof KPopover.Arrow>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KPopover.Arrow
            class={styles.arrow({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Popover = Object.assign(PopoverRoot, {
    Trigger: PopoverTrigger,
    Content: PopoverContent,
    Title: PopoverTitle,
    Description: PopoverDescription,
    Arrow: PopoverArrow,
    Anchor: KPopover.Anchor,
    Close: KPopover.CloseButton,
});
