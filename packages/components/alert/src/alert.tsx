import {
    splitProps,
    type Component,
    Show,
    createSignal,
    type JSX,
} from "solid-js";
import { type AlertProps } from "./setting";

export const SeAlert: Component<AlertProps> = (props) => {
    const [local, others] = splitProps(props, [
        "type",
        "title",
        "description",
        "showIcon",
        "icon",
        "closable",
        "onClose",
        "banner",
        "class",
    ]);

    const [visible, setVisible] = createSignal(true);

    // 2026 修复方案：直接定义 Solid 期望的事件对象结构
    const handleClose = (
        e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
    ) => {
        setVisible(false);

        if (!local.onClose) return;

        // 统一透传事件，使用 any 避开复杂的 EventHandlerUnion 内部推导冲突
        const handler = local.onClose;
        if (typeof handler === "function") {
            handler(e as any);
        } else if (Array.isArray(handler)) {
            const [fn, data] = handler;
            fn(data, e as any);
        }
    };

    const typeMap = {
        info: "bg-blue-50 border-blue-200 text-blue-800",
        success: "bg-green-50 border-green-200 text-green-800",
        warning: "bg-amber-50 border-amber-200 text-amber-800",
        error: "bg-red-50 border-red-200 text-red-800",
    };

    return (
        <Show when={visible()}>
            <div
                {...others}
                class={`flex items-start border rounded-lg p-4 transition-all duration-300 ${
                    typeMap[local.type || "info"]
                } ${local.banner ? "rounded-none border-x-0 border-t-0" : ""} ${
                    local.class || ""
                }`}
            >
                {/* 内容区 */}
                <div class="flex-1">
                    <Show when={local.title}>
                        <div class="font-bold">{local.title}</div>
                    </Show>
                    <Show when={local.description}>
                        <div class="text-sm opacity-90 mt-1">
                            {local.description}
                        </div>
                    </Show>
                </div>

                {/* 关闭按钮 */}
                <Show when={local.closable}>
                    <button
                        type="button"
                        // 绑定事件，此时 handleClose 的类型将与 onClick 完美匹配
                        onClick={handleClose}
                        class="ml-3 shrink-0 opacity-50 hover:opacity-100 transition-opacity outline-none cursor-pointer"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2.5"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </Show>
            </div>
        </Show>
    );
};
