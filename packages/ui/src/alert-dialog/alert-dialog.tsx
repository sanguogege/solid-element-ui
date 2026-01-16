import { AlertDialog as KAlertDialog } from "@kobalte/core/alert-dialog";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";
import { X } from "lucide-solid";

// TOTO 修改点击确定时的行为，目前是关闭对话框

const alertDialogStyles = tv({
    slots: {
        overlay:
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out",
        content:
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white p-6 shadow-xl dark:bg-zinc-900 dark:border-zinc-800",
        header: "flex flex-col gap-2 text-center sm:text-left",
        title: "text-lg font-semibold text-zinc-900 dark:text-zinc-100",
        description: "text-sm text-zinc-500 dark:text-zinc-400",
        footer: "mt-6 flex flex-row justify-end gap-3",
        closeButton:
            "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none",
    },
});

const { overlay, content, header, title, description, footer, closeButton } =
    alertDialogStyles();

interface AlertDialogProps extends ComponentProps<typeof KAlertDialog> {
    trigger: JSX.Element;
    title: string;
    description?: string;
    action: JSX.Element;
    cancel?: JSX.Element;
}

export const AlertDialog = (props: AlertDialogProps) => {
    const [local, others] = splitProps(props, [
        "trigger",
        "title",
        "description",
        "action",
        "cancel",
    ]);

    return (
        <KAlertDialog {...others}>
            <KAlertDialog.Trigger>{local.trigger}</KAlertDialog.Trigger>

            <KAlertDialog.Portal>
                <KAlertDialog.Overlay class={overlay()} />
                <div class="fixed inset-0 z-50 flex items-center justify-center">
                    <KAlertDialog.Content class={content()}>
                        <KAlertDialog.CloseButton class={closeButton()}>
                            <X size={18} />
                        </KAlertDialog.CloseButton>

                        <div class={header()}>
                            <KAlertDialog.Title class={title()}>
                                {local.title}
                            </KAlertDialog.Title>
                            {local.description && (
                                <KAlertDialog.Description class={description()}>
                                    {local.description}
                                </KAlertDialog.Description>
                            )}
                        </div>

                        <div class={footer()}>
                            {/* 取消按钮 */}
                            <KAlertDialog.CloseButton>
                                {local.cancel || (
                                    <button
                                        type="button"
                                        class="inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    >
                                        取消
                                    </button>
                                )}
                            </KAlertDialog.CloseButton>

                            <KAlertDialog.CloseButton>
                                {local.action || (
                                    <button
                                        type="button"
                                        class="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
                                    >
                                        确认
                                    </button>
                                )}
                            </KAlertDialog.CloseButton>
                        </div>
                    </KAlertDialog.Content>
                </div>
            </KAlertDialog.Portal>
        </KAlertDialog>
    );
};
