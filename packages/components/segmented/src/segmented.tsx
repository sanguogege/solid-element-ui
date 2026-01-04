import {
    splitProps,
    type Component,
    For,
    createSignal,
    createMemo,
    onMount,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type SegmentedProps, type SegmentedOption } from "./setting";

export const SeSegmented: Component<SegmentedProps> = (props) => {
    const [local, others] = splitProps(props, [
        "options",
        "value",
        "onChange",
        "size",
        "block",
        "class",
    ]);

    // 1. 统一格式化选项
    const normalizedOptions = createMemo(() =>
        local.options.map((opt) =>
            typeof opt === "object" ? opt : { label: opt, value: opt }
        )
    );

    // 2. 内部状态（如果未受控）
    const [internalValue, setInternalValue] = createSignal(
        normalizedOptions()[0].value
    );
    const currentValue = () => local.value ?? internalValue();

    // 3. 尺寸映射
    const sizeClasses = {
        sm: "p-[2px] text-sm",
        md: "p-[2px] text-base",
        lg: "p-[3px] text-lg",
    };

    const itemPadding = {
        sm: "px-2 py-0.5",
        md: "px-3 py-1",
        lg: "px-5 py-1.5",
    };

    const handleSelect = (val: string | number, disabled?: boolean) => {
        if (disabled) return;
        setInternalValue(val);
        local.onChange?.(val);
    };

    return (
        <div
            {...others}
            class={cn(
                "inline-flex items-center bg-gray-100 rounded-lg p-1 transition-all",
                local.block ? "w-full" : "w-max",
                sizeClasses[local.size || "md"],
                local.class
            )}
        >
            <For each={normalizedOptions()}>
                {(item) => {
                    const isActive = () => currentValue() === item.value;

                    return (
                        <div
                            onClick={() =>
                                handleSelect(item.value, item.disabled)
                            }
                            class={cn(
                                "relative flex-1 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-[6px] select-none z-[1]",
                                itemPadding[local.size || "md"],
                                item.disabled
                                    ? "cursor-not-allowed opacity-40"
                                    : "hover:text-gray-900",
                                isActive()
                                    ? "text-gray-900 shadow-sm"
                                    : "text-gray-500"
                            )}
                        >
                            {/* 滑块层：只有激活态显示背景 */}
                            {isActive() && (
                                <div
                                    class="absolute inset-0 bg-white rounded-[6px] shadow-sm z-[-1] transition-all"
                                    // 如果需要跨越动画，通常配合 Solid 的 <Transition> 或 Framer Motion 风格逻辑
                                    // 这里使用简单的绝对定位背景覆盖
                                />
                            )}

                            <span class="relative truncate">{item.label}</span>
                        </div>
                    );
                }}
            </For>
        </div>
    );
};
