import { Toast as KToast, toaster } from "@kobalte/core/toast";

import { isServer } from "solid-js/web";
import {
    splitProps,
    type ComponentProps,
    Show,
    type ParentProps,
} from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { X, CircleCheck, CircleAlert, Info, TriangleAlert } from "lucide-solid";

const toastStyles = tv(
    {
        slots: {
            root: [
                "group relative flex w-[400px] items-start justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
                "data-[opened]:animate-slide-in",
                "data-[closed]:animate-hide",

                // 滑动手势处理
                "data-[swipe=move]:translate-x-[--kb-toast-swipe-move-x]",
                "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-200 data-[swipe=cancel]:ease-out",
                "data-[swipe=end]:animate-swipe-out",
            ],
            title: "text-sm font-semibold",
            description: "text-xs opacity-90 leading-relaxed",
            closeButton: [
                "absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:text-main",
                "focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
            ],
            content: "flex flex-col gap-1 flex-1",
            icon: "h-5 w-5 shrink-0 mt-0.5", // 稍微下移一点对齐文字
        },
        variants: {
            variant: {
                info: {
                    root: "bg-app border-light text-main",
                    icon: "text-primary",
                },
                success: {
                    root: "bg-success/50 border-success text-success",
                    icon: "text-success",
                },
                warning: {
                    root: "bg-warning/50 border-warning text-warning",
                    icon: "text-warning",
                },
                error: {
                    root: "bg-danger/50 border-danger text-danger",
                    icon: "text-danger",
                },
            },
        },
        defaultVariants: { variant: "info" },
    },
    {
        twMerge: true,
    },
);

type ToastVariants = VariantProps<typeof toastStyles>;

export interface ToastProps
    extends Omit<ComponentProps<typeof KToast>, "class">, ToastVariants {
    title?: string;
    description?: string;
    class?: string;
}

const iconMap = {
    info: Info,
    success: CircleCheck,
    warning: TriangleAlert,
    error: CircleAlert,
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
    const [local, variantProps, others] = splitProps(
        props,
        ["title", "description", "class", "toastId"],
        ["variant"]
    );

    const { root, icon, content, title, description, closeButton } =
        toastStyles(variantProps);
    // 显式回退到 info，确保 Icon 组件始终存在
    const Icon = iconMap[variantProps.variant ?? "info"];

    return (
        <KToast
            toastId={local.toastId}
            class={root({ class: local.class })}
            {...others}
        >
            <Icon class={icon()} />
            <div class={content()}>
                <Show when={local.title}>
                    <KToast.Title class={title()}>
                        {local.title}
                    </KToast.Title>
                </Show>
                <Show when={local.description}>
                    <KToast.Description class={description()}>
                        {local.description}
                    </KToast.Description>
                </Show>
            </div>
            <KToast.CloseButton class={closeButton()}>
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
