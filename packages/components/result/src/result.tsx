import { splitProps, type Component, Show, createMemo } from "solid-js";
import { type ResultProps, type ResultStatus } from "./setting";

export const SeResult: Component<ResultProps> = (props) => {
    const [local, others] = splitProps(props, [
        "status",
        "title",
        "subTitle",
        "icon",
        "extra",
        "class",
    ]);

    const status = () => local.status || "info";

    // 内置状态图标映射 (2026 风格：简约线条与品牌色结合)
    const renderIcon = createMemo(() => {
        if (local.icon) return local.icon;

        switch (status()) {
            case "success":
                return (
                    <div class="p-4 bg-green-50 rounded-full text-green-500">
                        <svg
                            class="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                );
            case "error":
                return (
                    <div class="p-4 bg-red-50 rounded-full text-red-500">
                        <svg
                            class="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                );
            case "warning":
                return (
                    <div class="p-4 bg-amber-50 rounded-full text-amber-500">
                        <svg
                            class="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                );
            case "404":
            case "403":
            case "500":
                return (
                    <div class="text-blue-500">
                        {/* 2026 简约插画风格，可以用文字替代大图 */}
                        <div class="text-8xl font-black opacity-20 select-none">
                            {status()}
                        </div>
                    </div>
                );
            default: // info
                return (
                    <div class="p-4 bg-blue-50 rounded-full text-blue-500">
                        <svg
                            class="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                        </svg>
                    </div>
                );
        }
    });

    return (
        <div
            {...others}
            class={`flex flex-col items-center justify-center text-center p-12 ${
                local.class || ""
            }`}
        >
            {/* 图标展示区 */}
            <div class="mb-6 animate-in zoom-in duration-500">
                {renderIcon()}
            </div>

            {/* 标题 */}
            <Show when={local.title}>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    {local.title}
                </h2>
            </Show>

            {/* 副标题 */}
            <Show when={local.subTitle}>
                <p class="text-gray-500 mb-8 max-w-md leading-relaxed">
                    {local.subTitle}
                </p>
            </Show>

            {/* 操作按钮区 */}
            <Show when={local.extra}>
                <div class="flex items-center gap-3">{local.extra}</div>
            </Show>
        </div>
    );
};
