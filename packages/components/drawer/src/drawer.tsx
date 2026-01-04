import {
    splitProps,
    type ParentComponent,
    Show,
    createEffect,
    onCleanup,
} from "solid-js";
import { type DrawerProps } from "./setting";

export const SeDrawer: ParentComponent<DrawerProps> = (props) => {
    const [local, others] = splitProps(props, [
        "open",
        "onClose",
        "title",
        "placement",
        "size",
        "mask",
        "maskClosable",
        "closable",
        "class",
        "children",
    ]);

    const placement = () => local.placement || "right";
    const drawerSize = () => {
        // 默认宽度 400px 或高度 256px
        if (local.size)
            return typeof local.size === "number"
                ? `${local.size}px`
                : local.size;
        return placement() === "left" || placement() === "right"
            ? "400px"
            : "256px";
    };

    // 根据方向计算进入/退出时的 transform 偏移
    const transformClasses = () => {
        switch (placement()) {
            case "left":
                return local.open ? "translate-x-0" : "-translate-x-full";
            case "right":
                return local.open ? "translate-x-0" : "translate-x-full";
            case "top":
                return local.open ? "translate-y-0" : "-translate-y-full";
            case "bottom":
                return local.open ? "translate-y-0" : "translate-y-full";
        }
    };

    // 根据方向计算宽高
    const sizeClasses = () => {
        switch (placement()) {
            case "left":
            case "right":
                return `w-[${drawerSize()}] h-full top-0 ${placement()}-0`;
            case "top":
            case "bottom":
                return `h-[${drawerSize()}] w-full left-0 ${placement()}-0`;
        }
    };

    const handleMaskClick = () => {
        if (local.maskClosable !== false) {
            local.onClose?.();
        }
    };

    // 阻止背景滚动
    createEffect(() => {
        if (local.open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    onCleanup(() => {
        document.body.style.overflow = "";
    });

    return (
        // 使用一个 Show when 确保在关闭时不渲染整个 DOM，实现完全销毁
        <Show when={local.open}>
            <div class="fixed inset-0 z-50">
                {/* 遮罩层 */}
                <Show when={local.mask !== false}>
                    <div
                        class="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300"
                        onClick={handleMaskClick}
                        // 使用 Show 控制动画入场出场
                        classList={{
                            "opacity-100": local.open,
                            "opacity-0": !local.open,
                        }}
                    />
                </Show>

                {/* 抽屉面板 */}
                <div
                    {...others}
                    role="dialog"
                    aria-modal="true"
                    class={`fixed bg-white shadow-2xl transition-transform duration-300 ease-in-out ${sizeClasses()} ${transformClasses()} ${
                        local.class || ""
                    }`}
                >
                    {/* Header */}
                    <Show when={local.title || local.closable !== false}>
                        <div class="flex items-center justify-between p-4 border-b border-gray-200">
                            <div class="text-lg font-semibold text-gray-900">
                                {local.title}
                            </div>
                            <Show when={local.closable !== false}>
                                <button
                                    onClick={local.onClose}
                                    class="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg
                                        class="w-6 h-6"
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

                    {/* Body */}
                    <div class="p-4 overflow-y-auto h-[calc(100%-65px)]">
                        {" "}
                        {/* 减去 header 高度 */}
                        {local.children}
                    </div>
                </div>
            </div>
        </Show>
    );
};
