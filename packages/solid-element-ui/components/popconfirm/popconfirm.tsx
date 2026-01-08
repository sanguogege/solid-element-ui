import { splitProps, type ParentComponent, createSignal, Show } from "solid-js";
import { SePopover } from "../popover/popover";
import { Button } from "../button/button";
import { type PopconfirmProps } from "./setting";

// SePopover没有open 这个属性，需要处理一下，不然无法关闭

export const SePopconfirm: ParentComponent<PopconfirmProps> = (props) => {
    const [local, others] = splitProps(props, [
        "title",
        "description",
        "onConfirm",
        "onCancel",
        "okText",
        "cancelText",
        "placement",
        "icon",
        "children",
    ]);

    const [visible, setVisible] = createSignal(false);

    // 内部处理函数：因为 Button 的 onClick 传递的是 MouseEvent
    const handleConfirm = (e: MouseEvent) => {
        local.onConfirm?.(e);
        setVisible(false);
    };

    const handleCancel = (e: MouseEvent) => {
        local.onCancel?.(e);
        setVisible(false);
    };

    const renderContent = () => (
        <div class="w-full min-w-[160px] max-w-[280px]">
            <div class="flex items-start gap-2.5">
                <div class="mt-0.5 shrink-0 text-amber-500">
                    <Show
                        when={local.icon}
                        fallback={
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a1 1 0 110 2 1 1 0 010-2zm0 4a1 1 0 00-1 1v4a1 1 0 102 0V10a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        }
                    >
                        {local.icon}
                    </Show>
                </div>
                <div class="flex-1">
                    <div class="text-sm font-semibold text-gray-900 leading-tight">
                        {local.title}
                    </div>
                    <Show when={local.description}>
                        <div class="mt-1.5 text-xs text-gray-500 leading-normal">
                            {local.description}
                        </div>
                    </Show>
                </div>
            </div>

            <div class="mt-4 flex justify-end gap-2">
                <Button size="sm" onClick={handleCancel}>
                    {local.cancelText || "取消"}
                </Button>
                <Button size="sm" variant="primary" onClick={handleConfirm}>
                    {local.okText || "确定"}
                </Button>
            </div>
        </div>
    );

    return (
        <SePopover
            {...others}
            trigger="click"
            placement={local.placement || "top"}
            content={renderContent()}
        >
            {local.children}
        </SePopover>
    );
};
