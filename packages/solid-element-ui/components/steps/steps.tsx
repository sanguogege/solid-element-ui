import { splitProps, type Component, For, Show, createMemo } from "solid-js";
import { type StepsProps, type StepStatus } from "./setting";

export const SeSteps: Component<StepsProps> = (props) => {
    const [local, others] = splitProps(props, [
        "current",
        "direction",
        "items",
        "status",
        "size",
        "class",
    ]);

    const direction = () => local.direction || "horizontal";
    const current = () => local.current || 0;

    // 根据当前索引推导状态
    const getStatus = (index: number): StepStatus => {
        if (local.status && index === current()) return local.status;
        if (index < current()) return "finish";
        if (index === current()) return "process";
        return "wait";
    };

    const statusClasses = (index: number) => {
        const s = getStatus(index);
        const maps = {
            finish: {
                icon: "bg-white border-blue-600 text-blue-600",
                line: "bg-blue-600",
                text: "text-gray-900",
                desc: "text-gray-500",
            },
            process: {
                icon: "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100",
                line: "bg-gray-200",
                text: "text-gray-900 font-bold",
                desc: "text-gray-600",
            },
            wait: {
                icon: "bg-white border-gray-300 text-gray-400",
                line: "bg-gray-200",
                text: "text-gray-400",
                desc: "text-gray-400",
            },
            error: {
                icon: "bg-white border-red-500 text-red-500",
                line: "bg-gray-200",
                text: "text-red-500",
                desc: "text-red-500",
            },
        };
        return maps[s];
    };

    return (
        <div
            {...others}
            class={`flex ${
                direction() === "vertical" ? "flex-col" : "flex-row"
            } w-full ${local.class || ""}`}
        >
            <For each={local.items}>
                {(item, index) => {
                    const isLast = () => index() === local.items.length - 1;
                    const styles = createMemo(() => statusClasses(index()));

                    return (
                        <div
                            class={`relative flex ${
                                direction() === "vertical"
                                    ? "flex-row mb-2"
                                    : "flex-1 flex-col pr-4 last:pr-0"
                            }`}
                        >
                            {/* 连接线 - 水平模式 */}
                            <Show
                                when={!isLast() && direction() === "horizontal"}
                            >
                                <div
                                    class={`absolute top-[14px] left-[40px] w-[calc(100%-48px)] h-[1px] transition-colors duration-300 ${
                                        styles().line
                                    }`}
                                />
                            </Show>

                            {/* 连接线 - 垂直模式 */}
                            <Show
                                when={!isLast() && direction() === "vertical"}
                            >
                                <div
                                    class={`absolute left-[14px] top-[32px] w-[1px] h-[calc(100%-24px)] transition-colors duration-300 ${
                                        styles().line
                                    }`}
                                />
                            </Show>

                            {/* 步骤主体内容 */}
                            <div
                                class={`flex ${
                                    direction() === "vertical"
                                        ? "flex-row gap-4"
                                        : "flex-col items-start text-left"
                                }`}
                            >
                                {/* 图标/序号 */}
                                <div
                                    class={`flex-shrink-0 flex items-center justify-center border-2 rounded-full transition-all duration-300 ${
                                        local.size === "small"
                                            ? "w-6 h-6 text-xs"
                                            : "w-8 h-8 text-sm"
                                    } ${styles().icon}`}
                                >
                                    <Show
                                        when={item.icon}
                                        fallback={
                                            getStatus(index()) === "finish" ? (
                                                <svg
                                                    class="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="3"
                                                >
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                index() + 1
                                            )
                                        }
                                    >
                                        {item.icon}
                                    </Show>
                                </div>

                                {/* 文字区 */}
                                <div
                                    class={`${
                                        direction() === "vertical"
                                            ? "pb-6"
                                            : "mt-2"
                                    }`}
                                >
                                    <div
                                        class={`text-sm transition-colors duration-300 ${
                                            styles().text
                                        }`}
                                    >
                                        {item.title}
                                        <Show when={item.subTitle}>
                                            <span class="ml-2 text-xs font-normal text-gray-400">
                                                {item.subTitle}
                                            </span>
                                        </Show>
                                    </div>
                                    <Show when={item.description}>
                                        <div
                                            class={`text-xs mt-1 leading-relaxed transition-colors duration-300 ${
                                                styles().desc
                                            }`}
                                        >
                                            {item.description}
                                        </div>
                                    </Show>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </For>
        </div>
    );
};
