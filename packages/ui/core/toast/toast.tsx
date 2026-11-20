import { Toast as KToast, toaster, type ToastRootProps } from "@kobalte/core/toast";

import { isServer } from "@solidjs/web";
import { omit, Show, type ParentProps } from "solid-js";

import { X, CircleCheck, CircleExclamationPoint, Info, TriangleExclamationPoint } from "@lucide/solid";
import { cn } from "cn";

export interface ToastProps extends Omit<ToastRootProps, "class"> {
  title?: string;
  description?: string;
  class?: string;
  variant?: "info" | "success" | "warning" | "error";
}

const iconMap = {
  info: Info,
  success: CircleCheck,
  warning: TriangleExclamationPoint,
  error: CircleExclamationPoint,
} as const; // 使用 const 断言增强类型推导

export const ToastProvider = (props: ParentProps) => {
  return (
    <>
      {props.children}
      <KToast.Region>
        <KToast.List class="fixed bottom-4 right-4 z-100 flex flex-col gap-3 w-full max-w-100 outline-none" />
      </KToast.Region>
    </>
  );
};

const Toast = (props: ToastProps) => {
  const others = omit(
    props,
    "title",
    "description",
    "class",
    "toastId",
    "variant",
  );

  // 显式回退到 info，确保 Icon 组件始终存在
  const Icon = iconMap[props.variant ?? "info"];

  return (
    <KToast
      toastId={props.toastId}
      class={cn(
        "group relative flex w-100 items-start justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all data-opened:animate-slide-in data-closed:animate-hide data-[swipe=move]:translate-x-[--kb-toast-swipe-move-x] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-200 data-[swipe=cancel]:ease-out data-[swipe=end]:animate-swipe-out",
        props.class,
      )}
      {...others}
    >
      <Icon data-slot="toast-icon" class="h-5 w-5 shrink-0 mt-0.5" />
      <div data-slot="toast-content" class="flex flex-col gap-1 flex-1">
        <Show when={props.title}>
          <KToast.Title data-slot="toast-title" class="text-sm font-semibold">
            {props.title}
          </KToast.Title>
        </Show>
        <Show when={props.description}>
          <KToast.Description
            data-slot="toast-description" class="text-xs opacity-90 leading-relaxed"
          >
            {props.description}
          </KToast.Description>
        </Show>
      </div>
      <KToast.CloseButton
        data-slot="toast-close-button" class="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:text-main focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X size={16} />
      </KToast.CloseButton>
    </KToast>
  );
};

export const showToast = (props: Omit<ToastProps, "toastId">) => {
  if (isServer) {
    return { toastId: () => "server-id" }; // 给个假实现，不报错就行
  }
  return toaster.show((data) => <Toast toastId={data.toastId} {...props} />);
};
