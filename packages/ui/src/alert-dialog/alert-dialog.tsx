import { AlertDialog as KAlertDialog } from "@kobalte/core/alert-dialog";
import {
    splitProps,
    type JSX,
    type ComponentProps,
    createSignal,
} from "solid-js";
import { tv } from "tailwind-variants";
import { X } from "lucide-solid";
import { Button } from "../button/button";

const alertDialogStyles = tv(
    {
        slots: {
            overlay: [
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
                " data-[expanded]:animate-in data-[closed]:animate-out ",
            ],
            content: [
                "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-app p-4 shadow-xl ",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            header: "flex align-center justify-between",
            title: "text-lg font-semibold text-main ",
            description: "text-sm py-2 text-main",
            footer: "mt-6 flex flex-row justify-end gap-3",
            closeButton:
                "rounded-sm opacity-70 text-main transition-opacity hover:opacity-100 focus:outline-none",
        },
    },
    {
        twMerge: true,
    },
);

const { overlay, content, header, title, description, footer, closeButton } =
    alertDialogStyles();

interface AlertDialogProps extends ComponentProps<typeof KAlertDialog> {
    trigger: JSX.Element;
    title: string;
    description?: string;
    action?: JSX.Element;
    cancel?: JSX.Element;
    onConfirm?: () => void | Promise<void>;
}

export const AlertDialog = (props: AlertDialogProps) => {
    // 使用受控模式
    const [isOpen, setIsOpen] = createSignal(false);
    const [loading, setLoading] = createSignal(false);

    const [local, others] = splitProps(props, [
        "trigger",
        "title",
        "description",
        "action",
        "cancel",
        "onConfirm",
    ]);

    const handleConfirm = async (e: MouseEvent) => {
        // 阻止默认行为和冒泡，确保点击不会误触发 Kobalte 的内部关闭逻辑
        e.preventDefault();
        e.stopPropagation();

        if (local.onConfirm) {
            setLoading(true);
            try {
                await local.onConfirm();
                // 只有逻辑成功执行后，才手动关闭
                setIsOpen(false);
            } catch (error) {
                console.error("确认操作失败:", error);
                // 报错时不关闭，让用户留在页面
            } finally {
                setLoading(false);
            }
        } else {
            setIsOpen(false);
        }
    };

    return (
        <KAlertDialog {...others} open={isOpen()} onOpenChange={setIsOpen}>
            <div onClick={() => setIsOpen(true)} class="inline-block">
                {local.trigger}
            </div>

            <KAlertDialog.Portal>
                <KAlertDialog.Overlay class={overlay()} />
                <KAlertDialog.Content class={content()}>
                    <div class={header()}>
                        <KAlertDialog.Title class={title()}>
                            {local.title}
                        </KAlertDialog.Title>
                        {/* 这里使用 CloseButton 是正确的，因为它专门负责“取消/关闭” */}
                        <KAlertDialog.CloseButton class={closeButton()}>
                            <X size={18} />
                        </KAlertDialog.CloseButton>
                    </div>

                    <div class="mt-2">
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
                        <div onClick={handleConfirm}>
                            {local.action || (
                                <Button color="primary" loading={loading()}>
                                    确认
                                </Button>
                            )}
                        </div>
                    </div>
                </KAlertDialog.Content>
            </KAlertDialog.Portal>
        </KAlertDialog>
    );
};