import { Dialog as KDialog } from "@kobalte/core/dialog";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { dialogVariants } from "./setting";
import { X } from "lucide-solid";

const styles = dialogVariants();

// --- 扁平化组件定义 ---

export const DialogOverlay = (
    props: ComponentProps<typeof KDialog.Overlay>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KDialog.Overlay
            class={styles.overlay({ class: local.class })}
            {...others}
        />
    );
};

export const DialogContent = (
    props: ComponentProps<typeof KDialog.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KDialog.Portal>
            <DialogOverlay />
            <KDialog.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                {local.children}
                <KDialog.CloseButton class={styles.closeButton()}>
                    <X class="h-4 w-4" />
                </KDialog.CloseButton>
            </KDialog.Content>
        </KDialog.Portal>
    );
};

export const DialogHeader = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <div class={styles.header({ class: local.class })} {...others} />;
};

export const DialogFooter = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <div class={styles.footer({ class: local.class })} {...others} />;
};

export const DialogTitle = (props: ComponentProps<typeof KDialog.Title>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KDialog.Title
            class={styles.title({ class: local.class })}
            {...others}
        />
    );
};

export const DialogDescription = (
    props: ComponentProps<typeof KDialog.Description>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KDialog.Description
            class={styles.description({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Dialog = Object.assign(KDialog, {
    Content: DialogContent,
    Header: DialogHeader,
    Footer: DialogFooter,
    Title: DialogTitle,
    Description: DialogDescription,
    Overlay: DialogOverlay,
    Trigger: KDialog.Trigger,
    Close: KDialog.CloseButton,
});
