import { splitProps, type Component, createSignal } from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type InputNumberProps } from "./setting";

export const SeInputNumber: Component<InputNumberProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "size",
        "error",
        "min",
        "max",
        "step",
        "precision",
        "value",
        "onChange",
        "disabled",
    ]);

    // 内部维护显示值
    const [inputValue, setInputValue] = createSignal<string>(
        local.value?.toString() ?? ""
    );
    const step = () => local.step ?? 1;

    // 格式化数字：处理精度控制
    const formatValue = (num: number): number => {
        const p = local.precision ?? 0;
        const fixedNum = parseFloat(num.toFixed(p));
        if (local.min !== undefined && fixedNum < local.min) return local.min;
        if (local.max !== undefined && fixedNum > local.max) return local.max;
        return fixedNum;
    };

    // 核心更新函数
    const updateValue = (next: number) => {
        if (local.disabled) return;
        const val = formatValue(next);
        setInputValue(val.toString());
        local.onChange?.(val);
    };

    // 处理输入框手动修改
    const handleInputChange = (
        e: InputEvent & { currentTarget: HTMLInputElement }
    ) => {
        const val = e.currentTarget.value;
        if (val === "" || val === "-") {
            setInputValue(val);
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num)) {
            setInputValue(val);
            local.onChange?.(formatValue(num));
        }
    };

    // 失焦时修正格式
    const handleBlur = () => {
        const num = parseFloat(inputValue());
        if (isNaN(num)) {
            setInputValue(local.value?.toString() ?? "");
        } else {
            updateValue(num);
        }
    };

    // 尺寸样式映射
    const sizeMap = {
        sm: "h-6 text-sm",
        md: "h-8 text-[14px]",
        lg: "h-10 text-base",
    };

    return (
        <div
            class={cn(
                "group relative inline-flex items-center w-full bg-white border border-[#d9d9d9] rounded-[6px] transition-all duration-200 overflow-hidden",
                "hover:border-[#4096ff]",
                "focus-within:border-[#1677ff] focus-within:ring-[3px] focus-within:ring-[#1677ff]/10",
                local.error &&
                    "border-[#ff4d4f] focus-within:border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10",
                local.disabled && "bg-[#f5f5f5] cursor-not-allowed opacity-60",
                local.class
            )}
        >
            {/* 数字输入区域 */}
            <input
                {...others}
                type="text"
                role="spinbutton"
                value={inputValue()}
                onInput={handleInputChange}
                onBlur={handleBlur}
                disabled={local.disabled}
                class={cn(
                    "flex-1 bg-transparent border-none outline-none px-3 text-[#000000d9] placeholder:text-[#bfbfbf]",
                    sizeMap[local.size ?? "md"]
                )}
            />

            {/* 右侧控制按钮组 - AntD 风格 */}
            <div
                class={cn(
                    "flex flex-col border-l border-[#d9d9d9] opacity-0 group-hover:opacity-100 transition-opacity divide-y divide-[#d9d9d9]",
                    local.disabled && "hidden"
                )}
            >
                <button
                    tabIndex={-1}
                    onClick={() =>
                        updateValue(parseFloat(inputValue() || "0") + step())
                    }
                    class="flex items-center justify-center w-7 flex-1 hover:bg-gray-50 hover:text-[#1677ff] active:bg-gray-100 transition-colors"
                >
                    <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-width="3" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <button
                    tabIndex={-1}
                    onClick={() =>
                        updateValue(parseFloat(inputValue() || "0") - step())
                    }
                    class="flex items-center justify-center w-7 flex-1 hover:bg-gray-50 hover:text-[#1677ff] active:bg-gray-100 transition-colors"
                >
                    <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-width="3" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
