import { Dialog as KDialog } from "@kobalte/core/dialog";
import { splitProps, type JSX, Show } from "solid-js";
import { tv } from "tailwind-variants";
import { X } from "lucide-solid";

//TODO 修改footer，可自定义或是自带，方法传入等等
// FIXME title 和close icon 平行。

const dialogStyles = tv(
    {
        slots: {
            overlay: [
                "fixed inset-0 z-50 backdrop-blur-sm animate-in fade-in-0 duration-200",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            content: [
                [
                    "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-base bg-app text-main p-4 shadow-lg rounded-xl",
                    // "animate-in fade-in-0 zoom-in-95 duration-200 ",
                    "data-[expanded]:animate-in data-[closed]:animate-out",
                ],
            ],
            title: "text-lg font-semibold leading-none text-zinc-950 dark:text-zinc-50",
            description: "text-sm text-zinc-500 dark:text-zinc-400 mt-2",
            closeButton:
                "rounded-sm opacity-70 transition-opacity hover:opacity-100 dark:text-zinc-400"
        },
    },
    {
        twMerge: true,
    },
);

const { overlay, content, title, description, closeButton } =
    dialogStyles();

interface DialogProps {
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
}

export const Dialog = (props: DialogProps) => {
    const [local] = splitProps(props, [
        "trigger",
        "title",
        "description",
        "footer",
        "children",
        "class",
    ]);

    return (
        <KDialog open={props.open} onOpenChange={props.onOpenChange}>
            <Show when={local.trigger}>
                <KDialog.Trigger class="inline-block">
                    {local.trigger}
                </KDialog.Trigger>
            </Show>

            <KDialog.Portal>
                <KDialog.Overlay class={overlay()} />
                <KDialog.Content
                    class={content({ class: local.class })}
                    style={{ "pointer-events": "auto" }}
                >
                    <div class="flex justify-between items-center">
                        <KDialog.Title class={title()}>
                            {local.title}
                        </KDialog.Title>
                        <KDialog.CloseButton class={closeButton()}>
                            <X size={18} />
                            <span class="sr-only">关闭</span>
                        </KDialog.CloseButton>
                    </div>
                    <Show when={local.description}>
                        <KDialog.Description class={description()}>
                            {local.description}
                        </KDialog.Description>
                    </Show>

                    <div class="mt-6">{local.children}</div>
                   
                </KDialog.Content>
            </KDialog.Portal>
        </KDialog>
    );
};
