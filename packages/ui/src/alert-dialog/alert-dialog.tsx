import { AlertDialog as KAlertDialog } from "@kobalte/core/alert-dialog";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";
import { X } from "lucide-solid";
import { Button } from "../button/button";

// TODO 修改点击确定时的行为，目前是关闭对话框

const alertDialogStyles = tv({
    slots: {
        overlay:
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out",
        content:
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-app p-4 shadow-xl",
        header: "flex align-center justify-between",
        title: "text-lg font-semibold text-main ",
        description: "text-sm py-2 text-main",
        footer: "mt-6 flex flex-row justify-end gap-3",
        closeButton:
            "rounded-sm opacity-70 text-main transition-opacity hover:opacity-100 focus:outline-none",
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
                <KAlertDialog.Content class={content()}>
                    <div class={header()}>
                        <KAlertDialog.Title class={title()}>
                            {local.title}
                        </KAlertDialog.Title>
                        <KAlertDialog.CloseButton class={closeButton()}>
                            <X size={18} />
                        </KAlertDialog.CloseButton>
                    </div>
                    <div>
                        {local.description && (
                            <KAlertDialog.Description class={description()}>
                                {local.description}
                            </KAlertDialog.Description>
                        )}
                    </div>

                    <div class={footer()}>
                        <KAlertDialog.CloseButton>
                            {local.cancel || (
                                <Button variant="outline">取消</Button>
                            )}
                        </KAlertDialog.CloseButton>

                        <KAlertDialog.CloseButton>
                            {local.action || (
                                <Button color="primary">确认</Button>
                            )}
                        </KAlertDialog.CloseButton>
                    </div>
                </KAlertDialog.Content>
            </KAlertDialog.Portal>
        </KAlertDialog>
    );
};
