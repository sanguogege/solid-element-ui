import { AlertDialog as KAlertDialog } from "@kobalte/core/alert-dialog";
import { splitProps, type ComponentProps } from "solid-js";
import { alertDialogVariants } from "./setting";

const styles = alertDialogVariants();

// --- 扁平化组件定义 ---

export const AlertDialogRoot = KAlertDialog;
export const AlertDialogTrigger = KAlertDialog.Trigger;

export const AlertDialogContent = (
    props: ComponentProps<typeof KAlertDialog.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KAlertDialog.Portal>
            <KAlertDialog.Overlay class={styles.overlay()} />
            <KAlertDialog.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                {local.children}
            </KAlertDialog.Content>
        </KAlertDialog.Portal>
    );
};

export const AlertDialogHeader = (props: ComponentProps<"div">) => {
    const [local, others] = splitProps(props, ["class"]);
    return <div class={styles.header({ class: local.class })} {...others} />;
};

export const AlertDialogFooter = (props: ComponentProps<"div">) => {
    const [local, others] = splitProps(props, ["class"]);
    return <div class={styles.footer({ class: local.class })} {...others} />;
};

export const AlertDialogTitle = (
    props: ComponentProps<typeof KAlertDialog.Title>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KAlertDialog.Title
            class={styles.title({ class: local.class })}
            {...others}
        />
    );
};

export const AlertDialogDescription = (
    props: ComponentProps<typeof KAlertDialog.Description>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KAlertDialog.Description
            class={styles.description({ class: local.class })}
            {...others}
        />
    );
};

/**
 * 修正：Kobalte 内部没有 Action 和 Cancel
 * 我们将 Cancel 映射到 CloseButton，Action 保持为普通组件（或自定义逻辑）
 */
export const AlertDialogCancel = (
    props: ComponentProps<typeof KAlertDialog.CloseButton>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KAlertDialog.CloseButton
            class={styles.cancel({ class: local.class })}
            {...others}
        />
    );
};

// Action 通常是一个执行逻辑并关闭弹窗的按钮，这里直接导出 CloseButton 的变体或让用户自定义
export const AlertDialogAction = (
    props: ComponentProps<typeof KAlertDialog.CloseButton>
) => {
    const [local, others] = splitProps(props, ["class"]);
    // 注意：如果 Action 只是关闭弹窗，可以用 CloseButton；如果要发请求，建议用普通 Button
    return (
        <KAlertDialog.CloseButton
            class={styles.action({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const AlertDialog = Object.assign(AlertDialogRoot, {
    Trigger: AlertDialogTrigger,
    Content: AlertDialogContent,
    Header: AlertDialogHeader,
    Footer: AlertDialogFooter,
    Title: AlertDialogTitle,
    Description: AlertDialogDescription,
    Action: AlertDialogAction,
    Cancel: AlertDialogCancel,
});
