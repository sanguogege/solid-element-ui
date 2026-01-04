import { splitProps, type Component, Show, createMemo } from "solid-js";
import { type ProgressProps } from "./setting";

export const SeProgress: Component<ProgressProps> = (props) => {
    const [local, others] = splitProps(props, [
        "percent",
        "status",
        "showInfo",
        "strokeWidth",
        "strokeColor",
        "trailColor",
        "size",
        "format",
        "class",
    ]);

    const percent = () => Math.min(Math.max(local.percent || 0, 0), 100);

    // 自动判断状态：100% 时默认为 success
    const currentStatus = createMemo(() => {
        if (percent() >= 100 && !local.status) return "success";
        return local.status || "normal";
    });

    // 状态颜色映射
    const statusClasses = {
        normal: "bg-blue-500",
        success: "bg-green-500",
        error: "bg-red-500",
        active: "bg-blue-500",
    };

    // 进度文本或图标
    const renderInfo = () => {
        if (local.format) return local.format(percent());
        if (currentStatus() === "success") {
            return (
                <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>
            );
        }
        if (currentStatus() === "error") {
            return (
                <svg
                    class="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>
            );
        }
        return (
            <span class="text-sm text-gray-600 tabular-nums">{percent()}%</span>
        );
    };

    return (
        <div
            {...others}
            class={`flex items-center gap-2 w-full ${local.class || ""}`}
        >
            {/* 轨道 */}
            <div
                class="relative flex-1 overflow-hidden rounded-full"
                style={{
                    "background-color": local.trailColor || "#f5f5f5",
                    height: `${
                        local.strokeWidth || (local.size === "sm" ? 6 : 8)
                    }px`,
                }}
            >
                {/* 填充层 */}
                <div
                    class={`relative h-full transition-all duration-300 ease-out rounded-full ${
                        statusClasses[currentStatus()]
                    } ${
                        currentStatus() === "active"
                            ? "after:absolute after:inset-0 after:bg-white/30 after:animate-[progress-active_2s_ease-in-out_infinite]"
                            : ""
                    }`}
                    style={{
                        width: `${percent()}%`,
                        "background-color": local.strokeColor,
                    }}
                />
            </div>

            {/* 进度信息 */}
            <Show when={local.showInfo !== false}>
                <div class="shrink-0 min-w-[32px] flex justify-end">
                    {renderInfo()}
                </div>
            </Show>

            {/* 注入动画样式 - 也可以放在全局 CSS 中 */}
            <style>{`
        @keyframes progress-active {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0.1; }
          50% { opacity: 0.5; }
          100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
};
