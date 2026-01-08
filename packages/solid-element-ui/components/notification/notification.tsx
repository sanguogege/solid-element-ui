import { render } from "solid-js/web";
import { For, createSignal, type Component, Show, splitProps } from "solid-js";
import {
    type NotificationItem,
    type NotificationPlacement,
    type NotificationProps,
    type NotificationType,
} from "./setting";

// 内部通知卡片组件
const SeNotificationItem: Component<{
    item: NotificationItem;
    onExited: (id: string) => void;
}> = (props) => {
    const [visible, setVisible] = createSignal(true);

    const close = () => {
        setVisible(false);
        setTimeout(() => props.onExited(props.item.id), 300);
        props.item.onClose?.();
    };

    const typeIcon = {
        success: (
            <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#22c55e"
            />
        ),
        info: (
            <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#3b82f6"
            />
        ),
        warning: (
            <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                stroke="#f59e0b"
            />
        ),
        error: (
            <path
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#ef4444"
            />
        ),
    };

    return (
        <Show when={visible()}>
            <div class="relative w-[380px] mb-4 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 flex items-start animate-in slide-in-from-right-8 fade-in duration-300 pointer-events-auto">
                {/* 图标区 */}
                <Show when={props.item.type || props.item.icon}>
                    <div class="mr-3 mt-0.5 shrink-0">
                        <Show
                            when={props.item.icon}
                            fallback={
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                >
                                    {typeIcon[props.item.type!]}
                                </svg>
                            }
                        >
                            {props.item.icon}
                        </Show>
                    </div>
                </Show>

                {/* 内容区 */}
                <div class="flex-1 pr-4">
                    <div class="text-sm font-bold text-gray-900 mb-1 leading-tight">
                        {props.item.title}
                    </div>
                    <div class="text-sm text-gray-500 leading-relaxed">
                        {props.item.description}
                    </div>
                </div>

                {/* 关闭按钮 */}
                <button
                    onClick={close}
                    class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </Show>
    );
};

// 状态管理
const [notifs, setNotifs] = createSignal<NotificationItem[]>([]);

// 容器渲染 (支持四个角落)
const NotificationContainer = () => {
    const placements: NotificationPlacement[] = [
        "topRight",
        "topLeft",
        "bottomRight",
        "bottomLeft",
    ];
    const getPositionClass = (p: NotificationPlacement) => {
        const base = "fixed z-50 p-6 flex flex-col pointer-events-none";
        const pos = {
            topRight: "top-0 right-0 items-end",
            topLeft: "top-0 left-0 items-start",
            bottomRight: "bottom-0 right-0 flex-col-reverse items-end",
            bottomLeft: "bottom-0 left-0 flex-col-reverse items-start",
        };
        return `${base} ${pos[p]}`;
    };

    return (
        <For each={placements}>
            {(p) => (
                <div class={getPositionClass(p)}>
                    <For each={notifs().filter((n) => n.placement === p)}>
                        {(item) => (
                            <SeNotificationItem
                                item={item}
                                onExited={(id) =>
                                    setNotifs((prev) =>
                                        prev.filter((n) => n.id !== id)
                                    )
                                }
                            />
                        )}
                    </For>
                </div>
            )}
        </For>
    );
};

// 单例挂载
let mounted = false;
const ensureContainer = () => {
    if (typeof window !== "undefined" && !mounted) {
        const div = document.createElement("div");
        document.body.appendChild(div);
        render(() => <NotificationContainer />, div);
        mounted = true;
    }
};

// 导出方法
export const SeNotification = {
    open: (config: NotificationProps) => {
        ensureContainer();
        const id = Math.random().toString(36).slice(2);
        const placement = config.placement || "topRight";
        const duration = config.duration ?? 4500;

        const newItem = { ...config, id, placement };
        setNotifs((prev) => [...prev, newItem]);

        if (duration > 0) {
            setTimeout(() => {
                setNotifs((prev) => prev.filter((n) => n.id !== id));
            }, duration);
        }
    },
    success: (title: string, desc?: string) =>
        SeNotification.open({ type: "success", title, description: desc }),
    info: (title: string, desc?: string) =>
        SeNotification.open({ type: "info", title, description: desc }),
    warning: (title: string, desc?: string) =>
        SeNotification.open({ type: "warning", title, description: desc }),
    error: (title: string, desc?: string) =>
        SeNotification.open({ type: "error", title, description: desc }),
};
