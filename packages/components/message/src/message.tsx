import { render } from "solid-js/web";
import { For, type JSX, createSignal, type Component } from "solid-js";
import { type MessageItem, type MessageType } from "./setting";

// 内部消息项组件
const SeMessageItem: Component<{
    item: MessageItem;
    onExited: (id: string) => void;
}> = (props) => {
    const iconMap = {
        info: <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
        success: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
        warning: (
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        ),
        error: (
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
        loading: (
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke-dasharray="164.93361431346415 56.97787143782138"
            />
        ),
    };

    const typeClass = {
        info: "text-blue-500",
        success: "text-green-500",
        warning: "text-amber-500",
        error: "text-red-500",
        loading: "text-blue-500 animate-spin",
    };

    return (
        <div class="flex justify-center mb-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <div class="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[120px]">
                <svg
                    class={`w-5 h-5 mr-2 ${typeClass[props.item.type]}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                >
                    {iconMap[props.item.type]}
                </svg>
                <span class="text-sm font-medium text-gray-700">
                    {props.item.content}
                </span>
            </div>
        </div>
    );
};

// 状态管理
const [messages, setMessages] = createSignal<MessageItem[]>([]);

// 容器渲染
const MessageContainer = () => (
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none flex flex-col items-center">
        <For each={messages()}>
            {(msg) => <SeMessageItem item={msg} onExited={(id) => {}} />}
        </For>
    </div>
);

// 确保在浏览器环境下挂载容器
let containerCreated = false;
const ensureContainer = () => {
    if (typeof window !== "undefined" && !containerCreated) {
        const div = document.createElement("div");
        div.id = "se-message-container";
        document.body.appendChild(div);
        render(() => <MessageContainer />, div);
        containerCreated = true;
    }
};

// 暴露 API
export const SeMessage = {
    add: (
        type: MessageType,
        content: string | JSX.Element,
        duration = 3000
    ) => {
        ensureContainer();
        const id = Math.random().toString(36).slice(2);
        setMessages((prev) => [...prev, { id, type, content, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                setMessages((prev) => prev.filter((m) => m.id !== id));
            }, duration);
        }
        return id;
    },
    info: (content: string | JSX.Element, duration?: number) =>
        SeMessage.add("info", content, duration),
    success: (content: string | JSX.Element, duration?: number) =>
        SeMessage.add("success", content, duration),
    warning: (content: string | JSX.Element, duration?: number) =>
        SeMessage.add("warning", content, duration),
    error: (content: string | JSX.Element, duration?: number) =>
        SeMessage.add("error", content, duration),
    loading: (content: string | JSX.Element, duration?: number) =>
        SeMessage.add("loading", content, duration),
};
