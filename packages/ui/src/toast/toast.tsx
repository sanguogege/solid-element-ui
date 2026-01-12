import { Toast as KToast, toaster } from "@kobalte/core/toast";
import { splitProps, type ComponentProps } from "solid-js";
import { toastVariants } from "./setting";
import { X } from "lucide-solid";

const styles = toastVariants();

// --- 扁平化组件定义 ---

export const ToastRoot = (props: ComponentProps<typeof KToast>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KToast class={styles.root({ class: local.class })} {...others}>
            <div class={styles.content()}>{local.children}</div>
            <KToast.CloseButton class={styles.close()}>
                <X class="h-4 w-4" />
            </KToast.CloseButton>
        </KToast>
    );
};

export const ToastTitle = (props: ComponentProps<typeof KToast.Title>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KToast.Title
            class={styles.title({ class: local.class })}
            {...others}
        />
    );
};

export const ToastDescription = (
    props: ComponentProps<typeof KToast.Description>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KToast.Description
            class={styles.description({ class: local.class })}
            {...others}
        />
    );
};

export const ToastList = (props: ComponentProps<typeof KToast.List>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KToast.List class={styles.list({ class: local.class })} {...others} />
    );
};

// --- 聚合导出 (Namespace) ---

export const Toast = Object.assign(ToastRoot, {
    Title: ToastTitle,
    Description: ToastDescription,
    Region: KToast.Region,
    List: ToastList,
});

export { toaster };
