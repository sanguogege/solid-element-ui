import { splitProps, type Component, Show } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type CheckboxProps } from "./setting";


// TODO 解决 没有勾的问题
export const SeCheckbox: Component<CheckboxProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "label",
        "error",
        "size",
        "children",
    ]);

    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    };

    return (
        <label
            class={cn(
                "inline-flex items-center cursor-pointer group select-none",
                others.disabled && "cursor-not-allowed opacity-50",
                local.class
            )}
        >
            {/* 1. 核心：必须先放 input 并标记 peer */}
            <input type="checkbox" class="peer sr-only" {...others} />

            {/* 2. 视觉容器：利用 peer-checked 控制背景和边框 */}
            <div
                class={cn(
                    "flex items-center justify-center border-2 rounded transition-all duration-200 bg-white shrink-0",
                    sizeClasses[local.size ?? "md"],
                    "border-gray-300",
                    // 选中状态：背景变蓝，边框变蓝
                    "peer-checked:bg-blue-600 peer-checked:border-blue-600",
                    // 聚焦状态
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50",
                    // 错误状态
                    local.error && "border-red-500"
                )}
            >
                {/* 3. 勾选图标：利用 peer-checked 控制图标出现 */}
                {/* 注意：图标必须是 input 的后续兄弟节点的子元素 */}
                <svg
                    class={cn(
                        "text-white transition-all duration-200 transform scale-0 opacity-0",
                        "peer-checked:scale-110 peer-checked:opacity-100" // 勾选时放大并显示
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style={{ width: "80%", height: "80%" }}
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>

            <Show when={local.label || local.children}>
                <span
                    class={cn(
                        "ml-2 text-gray-700",
                        local.size === "sm" ? "text-sm" : "text-base"
                    )}
                >
                    {local.label ?? local.children}
                </span>
            </Show>
        </label>
    );
};
