import { Dialog as KDialog, type DialogRootProps } from "@kobalte/core/dialog";
import { Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { X } from "../icons";

import { cn } from "../../utils/cn";

//TODO 修改footer，可自定义或是自带，方法传入等等
// FIXME title 和close icon 平行。

interface DialogProps extends DialogRootProps {
  // 状态控制
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // 触发器
  trigger?: JSX.Element;

  // 内容配置
  title: string;
  description?: string;
  children: JSX.Element; // 弹窗主体

  // 底部按钮配置
  footer?: JSX.Element;

  // 样式
  class?: string;
  overlayClass?: string;
  contentClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeButtonClass?: string;
}

export const Dialog = (props: DialogProps) => {
  return (
    <KDialog open={props.open} onOpenChange={props.onOpenChange}>
      <Show when={props.trigger}>
        <KDialog.Trigger class="inline-block">{props.trigger}</KDialog.Trigger>
      </Show>

      <KDialog.Portal>
        <KDialog.Overlay
          class={cn(
            "fixed inset-0 z-50 backdrop-blur-sm animate-in duration-200 data-expanded:animate-in data-closed:animate-out",
            props.overlayClass,
          )}
        />
        <KDialog.Content
          class={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-base bg-app text-main p-4 shadow-lg rounded-xl data-expanded:animate-in data-closed:animate-out",
            props.contentClass,
          )}
          style={{ "pointer-events": "auto" }}
        >
          <div class="flex justify-between items-center">
            <KDialog.Title
              class={cn(
                "text-lg font-semibold leading-none text-zinc-950 dark:text-zinc-50",
                props.titleClass,
              )}
            >
              {props.title}
            </KDialog.Title>
            <KDialog.CloseButton
              class={cn(
                "rounded-sm opacity-70 transition-opacity hover:opacity-100 dark:text-zinc-400",
                props.closeButtonClass,
              )}
            >
              <X size={18} />
              <span class="sr-only">关闭</span>
            </KDialog.CloseButton>
          </div>
          <Show when={props.description}>
            <KDialog.Description
              class={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-2", props.descriptionClass)}
            >
              {props.description}
            </KDialog.Description>
          </Show>

          <div class="mt-6">{props.children}</div>
        </KDialog.Content>
      </KDialog.Portal>
    </KDialog>
  );
};
