import {
    createSignal,
    Show,
    For,
    type Component,
    onCleanup,
    splitProps,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type DatePickerProps } from "./setting";

// TOTO 美化样式和
export const SeDatePicker: Component<DatePickerProps> = (props) => {
    const [local, others] = splitProps(props, [
        "value",
        "onSelect",
        "placeholder",
        "class",
        "size",
        "error",
    ]);

    // 修复：安全转换 Date 对象的辅助函数
    const ensureDate = (val: any): Date => {
        if (!val) return new Date();
        const d = new Date(val);
        return isNaN(d.getTime()) ? new Date() : d;
    };

    // 内部状态
    const [isOpen, setIsOpen] = createSignal(false);
    // 使用辅助函数初始化，解决 TS 2769 错误
    const [viewDate, setViewDate] = createSignal(ensureDate(local.value));

    // 获取日历矩阵
    const days = () => {
        const year = viewDate().getFullYear();
        const month = viewDate().getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        return Array.from(
            { length: 42 },
            (_, i) => new Date(year, month, i - firstDay + 1)
        );
    };

    // 格式化显示文字
    const displayValue = () => {
        if (!local.value) return "";
        return ensureDate(local.value).toLocaleDateString();
    };

    // 点击外部关闭逻辑
    let containerRef: HTMLDivElement | undefined;
    const clickOutside = (e: MouseEvent) => {
        if (
            isOpen() &&
            containerRef &&
            !containerRef.contains(e.target as Node)
        ) {
            setIsOpen(false);
        }
    };
    window.addEventListener("click", clickOutside);
    onCleanup(() => window.removeEventListener("click", clickOutside));

    return (
        <div
            ref={containerRef}
            class={cn(
                "relative inline-block w-full se-datepicker",
                local.class
            )}
            {...others}
        >
            {/* 触发器 */}
            <div
                onClick={() => setIsOpen(!isOpen())}
                class={cn(
                    "flex items-center border border-[#d9d9d9] rounded-md px-3 transition-all duration-200 bg-white cursor-pointer hover:border-[#4096ff]",
                    isOpen() && "border-[#1677ff] ring-[3px] ring-[#1677ff]/10",
                    local.error &&
                        "border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10",
                    local.size === "sm"
                        ? "h-6"
                        : local.size === "lg"
                        ? "h-10"
                        : "h-8"
                )}
            >
                <input
                    readOnly
                    placeholder={local.placeholder || "选择日期"}
                    value={displayValue()}
                    class="bg-transparent border-none outline-none cursor-pointer text-[14px] w-full placeholder:text-[#bfbfbf] text-[#000000d9]"
                />
                <svg
                    class="w-4 h-4 text-[#00000040]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>

            {/* 弹出面板 */}
            <Show when={isOpen()}>
                <div class="absolute z-1050 mt-1 p-2 bg-white border border-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)] rounded-lg min-w-70">
                    {/* 面板头部 */}
                    <div class="flex items-center justify-between px-2 py-1 mb-2 border-b border-[#f0f0f0] pb-2">
                        <button
                            class="p-1 hover:text-[#1677ff] transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setViewDate(
                                    new Date(
                                        viewDate().getFullYear(),
                                        viewDate().getMonth() - 1
                                    )
                                );
                            }}
                        >
                            &lt;
                        </button>
                        <span class="text-[14px] font-semibold text-[#000000d9]">
                            {viewDate().getFullYear()}年{" "}
                            {viewDate().getMonth() + 1}月
                        </span>
                        <button
                            class="p-1 hover:text-[#1677ff] transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setViewDate(
                                    new Date(
                                        viewDate().getFullYear(),
                                        viewDate().getMonth() + 1
                                    )
                                );
                            }}
                        >
                            &gt;
                        </button>
                    </div>

                    {/* 星期和日期网格 */}
                    <div class="grid grid-cols-7 gap-1 text-center">
                        <For each={["日", "一", "二", "三", "四", "五", "六"]}>
                            {(s) => (
                                <span class="text-[12px] text-[#000000d9] font-medium w-8 h-8 flex items-center justify-center">
                                    {s}
                                </span>
                            )}
                        </For>
                        <For each={days()}>
                            {(date) => {
                                const isCurrentMonth =
                                    date.getMonth() === viewDate().getMonth();
                                const isSelected =
                                    local.value &&
                                    ensureDate(local.value).toDateString() ===
                                        date.toDateString();
                                return (
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            local.onSelect?.(date);
                                            setIsOpen(false);
                                        }}
                                        class={cn(
                                            "w-8 h-8 flex items-center justify-center text-[14px] rounded-md cursor-pointer transition-all",
                                            !isCurrentMonth &&
                                                "text-[#00000040]",
                                            isCurrentMonth &&
                                                !isSelected &&
                                                "hover:bg-[#f5f5f5] text-[#000000d9]",
                                            isSelected &&
                                                "bg-[#1677ff] text-white font-semibold"
                                        )}
                                    >
                                        {date.getDate()}
                                    </div>
                                );
                            }}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
};
