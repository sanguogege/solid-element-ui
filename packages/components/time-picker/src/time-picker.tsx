import {
    splitProps,
    type Component,
    createSignal,
    For,
    Show,
    onCleanup,
    createMemo,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type TimePickerProps } from "./setting";

export const SeTimePicker: Component<TimePickerProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "value",
        "format",
        "placeholder",
        "disabled",
        "error",
        "size",
        "onChange",
    ]);

    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;

    // 解析当前值
    const timeParts = createMemo(() => {
        const val = local.value || "00:00:00";
        const [h, m, s] = val.split(":").map(Number);
        return { h: h || 0, m: m || 0, s: s || 0 };
    });

    const updateTime = (type: "h" | "m" | "s", val: number) => {
        const current = timeParts();
        const newTime = { ...current, [type]: val };
        const timeStr = `${String(newTime.h).padStart(2, "0")}:${String(
            newTime.m
        ).padStart(2, "0")}:${String(newTime.s).padStart(2, "0")}`;
        local.onChange?.(timeStr);
    };

    // 点击外部关闭
    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef && !containerRef.contains(e.target as Node))
            setIsOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    onCleanup(() => window.removeEventListener("click", handleClickOutside));

    const sizeMap = {
        sm: "h-6 text-sm px-2",
        md: "h-8 text-[14px] px-3",
        lg: "h-10 text-base px-4",
    };

    // 渲染滚动列的辅助组件
    const TimeColumn = (p: {
        max: number;
        current: number;
        type: "h" | "m" | "s";
    }) => (
        <div class="flex-1 h-56 overflow-y-auto scrollbar-hide hover:scrollbar-default border-r border-[#f0f0f0] last:border-r-0 py-24">
            <For each={Array.from({ length: p.max })}>
                {(_, i) => (
                    <div
                        onClick={() => updateTime(p.type, i())}
                        class={cn(
                            "h-8 flex items-center justify-center cursor-pointer transition-colors text-[14px]",
                            p.current === i()
                                ? "bg-[#e6f4ff] font-semibold text-[#1677ff]"
                                : "hover:bg-[#f5f5f5] text-[#000000d9]"
                        )}
                    >
                        {String(i()).padStart(2, "0")}
                    </div>
                )}
            </For>
        </div>
    );

    return (
        <div
            ref={containerRef}
            class={cn("relative inline-block w-full select-none", local.class)}
            {...others}
        >
            {/* 触发输入框 */}
            <div
                onClick={() => !local.disabled && setIsOpen(!isOpen())}
                class={cn(
                    "flex items-center justify-between bg-white border border-[#d9d9d9] rounded-[6px] transition-all duration-200 cursor-pointer",
                    "hover:border-[#4096ff]",
                    isOpen() &&
                        "border-[#1677ff] ring-[3px] ring-[#1677ff]/10 shadow-sm",
                    local.disabled &&
                        "bg-[#f5f5f5] cursor-not-allowed opacity-60",
                    local.error &&
                        "border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10",
                    sizeMap[local.size ?? "md"]
                )}
            >
                <span class={cn("truncate", !local.value && "text-[#bfbfbf]")}>
                    {local.value || local.placeholder || "请选择时间"}
                </span>
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            {/* 时间选择面板 */}
            <Show when={isOpen()}>
                <div class="absolute z-50 mt-1 flex w-56 bg-white border border-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <TimeColumn max={24} current={timeParts().h} type="h" />
                    <TimeColumn max={60} current={timeParts().m} type="m" />
                    <TimeColumn max={60} current={timeParts().s} type="s" />
                </div>
            </Show>
        </div>
    );
};
