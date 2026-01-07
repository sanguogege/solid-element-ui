import {
    splitProps,
    type ParentComponent,
    Show,
    createEffect,
    onCleanup,
} from "solid-js";
import { Portal } from "solid-js/web";
import { SeButton } from "../../button/src/button"; // 假设已存在 Button 组件
import { type ModalProps } from "./setting";

export const SeModal: ParentComponent<ModalProps> = (props) => {
    const [local, others] = splitProps(props, [
        "open",
        "title",
        "width",
        "okText",
        "cancelText",
        "onOk",
        "onCancel",
        "footer",
        "centered",
        "mask",
        "maskClosable",
        "closable",
        "class",
        "children",
    ]);

    const modalWidth = () =>
        typeof local.width === "number"
            ? `${local.width}px`
            : local.width || "520px";

    // 1. 锁定背景滚动
    createEffect(() => {
        if (local.open) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            onCleanup(() => (document.body.style.overflow = originalOverflow));
        }
    });

    const handleMaskClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget && local.maskClosable !== false) {
            local.onCancel?.();
        }
    };

    return (
        <Portal>
            <Show when={local.open}>
                <div class="fixed inset-0 z-[1000] overflow-y-auto">
                    {/* 遮罩层 */}
                    <Show when={local.mask !== false}>
                        <div
                            class="fixed inset-0 bg-black/45 transition-opacity animate-in fade-in duration-300"
                            onClick={handleMaskClick}
                        />
                    </Show>

                    {/* Modal 容器：处理对齐方式 */}
                    <div
                        class={`flex min-h-full justify-center p-4 transition-all ${
                            local.centered
                                ? "items-center"
                                : "items-start pt-[100px]"
                        }`}
                    >
                        {/* Modal 内容面板 */}
                        <div
                            {...others}
                            role="dialog"
                            aria-modal="true"
                            style={{ width: modalWidth() }}
                            class={`relative bg-white rounded-xl shadow-2xl transition-all animate-in zoom-in-95 duration-300 ${
                                local.class || ""
                            }`}
                        >
                            {/* 头部 */}
                            <Show
                                when={local.title || local.closable !== false}
                            >
                                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                    <div class="text-lg font-semibold text-gray-900">
                                        {local.title}
                                    </div>
                                    <Show when={local.closable !== false}>
                                        <button
                                            onClick={() => local.onCancel?.()}
                                            class="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                                        >
                                            <svg
                                                class="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </Show>
                                </div>
                            </Show>

                            {/* 内容区 */}
                            <div class="px-6 py-5 text-sm text-gray-600">
                                {local.children}
                            </div>

                            {/* 底部按钮区 */}
                            <Show when={local.footer !== null} fallback={null}>
                                <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                                    <Show
                                        when={local.footer}
                                        fallback={
                                            <>
                                                <SeButton
                                                    onClick={() =>
                                                        local.onCancel?.()
                                                    }
                                                >
                                                    {local.cancelText || "取消"}
                                                </SeButton>
                                                <SeButton
                                                    variant="primary"
                                                    onClick={() =>
                                                        local.onOk?.()
                                                    }
                                                >
                                                    {local.okText || "确定"}
                                                </SeButton>
                                            </>
                                        }
                                    >
                                        {local.footer}
                                    </Show>
                                </div>
                            </Show>
                        </div>
                    </div>
                </div>
            </Show>
        </Portal>
    );
};
