import { splitProps, type Component, Show } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type SwitchProps } from "./setting";

export const SeSwitch: Component<SwitchProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "size",
        "loading",
        "checked",
        "onChange",
        "disabled",
    ]);

    // 尺寸映射 (AntD 标准尺寸)
    const sizeMap = {
        sm: {
            track: "w-8 h-4",
            dot: "w-3 h-3 left-0.5",
            translate: "peer-checked:translate-x-4",
        },
        md: {
            track: "w-11 h-6",
            dot: "w-4 h-4 left-1",
            translate: "peer-checked:translate-x-5",
        },
    };

    const currentSize = () => sizeMap[local.size ?? "md"];

    // 处理 onChange 事件，返回布尔值
    const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
        local.onChange?.(e.currentTarget.checked);
    };

    return (
        <label
            class={cn(
                "relative inline-flex items-center cursor-pointer select-none group",
                (local.disabled || local.loading) &&
                    "cursor-not-allowed opacity-60",
                local.class
            )}
        >
            {/* 隐藏的原生 Input */}
            <input
                type="checkbox"
                // 使用受控属性
                checked={local.checked}
                onChange={handleChange}
                disabled={local.disabled || local.loading}
                class="sr-only peer"
                {...others}
            />

            {/* 背景轨道 (Track) */}
            <div
                class={cn(
                    "rounded-full bg-[#00000040] transition-colors duration-200 ease-in-out shadow-inner",
                    // 选中状态变为 AntD 蓝
                    "peer-checked:bg-[#1677ff]",
                    // 键盘聚焦时的光晕效果 (AntD 风格)
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-[#1677ff]/30 peer-focus-visible:ring-offset-2",
                    currentSize().track
                )}
            />

            {/* 滑动圆点 (Dot/Handle) */}
            <div
                class={cn(
                    "absolute bg-white rounded-full transition-all duration-200 ease-in-out shadow-md flex items-center justify-center",
                    currentSize().dot,
                    currentSize().translate,
                    // 加载状态时，图标转动且颜色变蓝
                    local.loading && "text-[#1677ff] bg-gray-100"
                )}
            >
                {/* Loading 状态图标 (SVG) */}
                <Show when={local.loading}>
                    <svg
                        class="animate-spin h-2/3 w-2/3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                        />
                        <path
                            class="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </Show>
            </div>
        </label>
    );
};
