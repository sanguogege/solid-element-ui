import { AlertDialog as KAlertDialog, type AlertDialogRootProps } from "@kobalte/core/alert-dialog";
import { omit, createSignal } from "solid-js";
import type { JSX } from "@solidjs/web";
import { Button } from "../button/button";

import { X } from "@lucide/solid";

interface AlertDialogProps extends AlertDialogRootProps {
  trigger: JSX.Element;
  title: string;
  description?: string;
  action?: JSX.Element;
  cancel?: JSX.Element;
  onConfirm?: () => void | Promise<void>;
  class?: string;
}

export const AlertDialog = (props: AlertDialogProps) => {
  // 使用受控模式
  const [isOpen, setIsOpen] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const others = omit(
    props,
    "trigger",
    "title",
    "description",
    "action",
    "cancel",
    "onConfirm",
    "class",
  );

  const handleConfirm = async (e: MouseEvent) => {
    // 阻止默认行为和冒泡，确保点击不会误触发 Kobalte 的内部关闭逻辑
    e.preventDefault();
    e.stopPropagation();

    if (props.onConfirm) {
      setLoading(true);
      try {
        await props.onConfirm();
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
        {props.trigger}
      </div>

      <KAlertDialog.Portal>
        <KAlertDialog.Overlay
          data-slot="alert-dialog-overlay" class="fixed inset-0 z-50 bg-overlay backdrop-blur-sm data-expanded:animate-in data-closed:animate-out"
        />
        <KAlertDialog.Content
          data-slot="alert-dialog-content" class="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-app p-4 shadow-xl data-expanded:animate-in data-closed:animate-out"
        >
          <div data-slot="alert-dialog-header" class="flex align-center justify-between">
            <KAlertDialog.Title data-slot="alert-dialog-title" class="text-lg font-semibold text-main">
              {props.title}
            </KAlertDialog.Title>
            <KAlertDialog.CloseButton
              data-slot="alert-dialog-close-button" class="rounded-sm opacity-70 text-main transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X size={18} />
            </KAlertDialog.CloseButton>
          </div>

          <div class="mt-2">
            {props.description && (
              <KAlertDialog.Description
                data-slot="alert-dialog-description" class="text-sm py-2 text-main"
              >
                {props.description}
              </KAlertDialog.Description>
            )}
          </div>

          <div data-slot="alert-dialog-footer" class="mt-6 flex flex-row justify-end gap-3">
            <KAlertDialog.CloseButton>
              {props.cancel || <Button>取消</Button>}
            </KAlertDialog.CloseButton>
            <div onClick={handleConfirm}>
              {props.action || (
                <Button loading={loading()}>
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
