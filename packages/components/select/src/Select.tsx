import {
    splitProps,
    type Component,
    createSignal,
    For,
    Show,
    onCleanup,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type SelectProps, type SelectOption } from "./setting";

export const SeSelect: Component<SelectProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "value",
        "options",
        "placeholder",
        "disabled",
        "error",
        "size",
        "onChange",
    ]);

    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;

    // 获取当前选中项的 Label
    const selectedLabel = () => {
        const found = local.options.find((opt) => opt.value === local.value);
        return found ? found.label : "";
    };

    // 点击外部关闭逻辑
    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef && !containerRef.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };
    window.addEventListener("click", handleClickOutside);
    onCleanup(() => window.removeEventListener("click", handleClickOutside));

    const handleSelect = (option: SelectOption) => {
        if (option.disabled || local.disabled) return;
        local.onChange?.(option.value);
        setIsOpen(false);
    };

    const sizeMap = {
        sm: "h-6 text-sm px-2",
        md: "h-8 text-[14px] px-3",
        lg: "h-10 text-base px-4",
    };

    return (
        <div
            ref={containerRef}
            class={cn("relative inline-block w-full select-none", local.class)}
            {...others}
        >
            {/* 选择器触发区域 */}
            <div
                onClick={() => !local.disabled && setIsOpen(!isOpen())}
                class={cn(
                    "flex items-center justify-between bg-white border border-[#d9d9d9] rounded-[6px] transition-all duration-200 cursor-pointer",
                    "hover:border-[#4096ff]",
                    isOpen() && "border-[#1677ff] ring-[3px] ring-[#1677ff]/10",
                    local.disabled &&
                        "bg-[#f5f5f5] cursor-not-allowed text-[#00000040] hover:border-[#d9d9d9]",
                    local.error &&
                        "border-[#ff4d4f] hover:border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10",
                    sizeMap[local.size ?? "md"]
                )}
            >
                <span
                    class={cn("truncate", !selectedLabel() && "text-[#bfbfbf]")}
                >
                    {selectedLabel() || local.placeholder || "请选择"}
                </span>

                {/* AntD 风格箭头 */}
                <svg
                    class={cn(
                        "w-3 h-3 text-[#00000040] transition-transform duration-200",
                        isOpen() && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {/* 下拉列表面板 */}
            <Show when={isOpen()}>
                <div
                    class={cn(
                        "absolute z-50 mt-1 w-full bg-white border border-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] rounded-lg py-1 animate-in fade-in zoom-in-95 duration-200",
                        "max-h-[256px] overflow-y-auto"
                    )}
                >
                    <For each={local.options}>
                        {(option) => (
                            <div
                                onClick={() => handleSelect(option)}
                                class={cn(
                                    "px-3 py-1.5 text-[14px] cursor-pointer transition-colors",
                                    option.value === local.value
                                        ? "bg-[#e6f4ff] font-semibold text-[#1677ff]"
                                        : "text-[#000000d9] hover:bg-[#f5f5f5]",
                                    option.disabled &&
                                        "text-[#00000040] cursor-not-allowed hover:bg-transparent"
                                )}
                            >
                                {option.label}
                            </div>
                        )}
                    </For>
                    <Show when={local.options.length === 0}>
                        <div class="px-3 py-4 text-center text-gray-400 text-sm">
                            暂无数据
                        </div>
                    </Show>
                </div>
            </Show>
        </div>
    );
};
