import {
    splitProps,
    type Component,
    createSignal,
    For,
    createMemo,
    Show,
} from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type CalendarProps, formatDate } from "./setting";

// TODO 卡片模式

export const SeCalendar: Component<CalendarProps> = (props) => {
    // 分离自定义属性
    const [local, others] = splitProps(props, [
        "class",
        "value",
        "onChange",
        "mode",
        "dateCellRender",
    ]);

    // 内部视图日期状态
    const [viewDate, setViewDate] = createSignal(local.value || new Date());
    const mode = () => local.mode || "month";

    /**
     * 核心逻辑：计算 6x7 日历网格
     */
    const calendarDays = createMemo(() => {
        const date = viewDate();
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days: Date[] = [];
        // 填充上个月余量
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(new Date(year, month, 1 - i - 1));
        }
        // 填充当月
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        // 填充下个月余量，补齐 42 格
        while (days.length < 42) {
            days.push(
                new Date(
                    year,
                    month + 1,
                    days.length - firstDayOfMonth - daysInMonth + 1
                )
            );
        }
        return days;
    });

    /**
     * 选择处理：解决双击/重复点击问题
     */
    const handleDateSelect = (date: Date) => {
        // 1. 如果点击的是当前已选日期，不执行 onChange (防止重复触发逻辑)
        if (local.value && formatDate(date) === formatDate(local.value)) {
            return;
        }

        // 2. 如果点击的是非当月日期，自动切换月份视图
        if (date.getMonth() !== viewDate().getMonth()) {
            setViewDate(date);
        }

        local.onChange?.(date);
    };

    const changeMonth = (delta: number) => {
        setViewDate(
            new Date(viewDate().getFullYear(), viewDate().getMonth() + delta, 1)
        );
    };

    return (
        <div
            {...others}
            class={cn(
                // select-none 是解决双击“有问题”的关键，防止选中数字
                "bg-white border border-[#d9d9d9] rounded-lg shadow-sm p-4 w-full select-none",
                local.class
            )}
        >
            {/* 头部导航 */}
            <div class="flex items-center justify-between mb-4 px-2">
                <h3 class="text-[16px] font-semibold text-[#000000d9]">
                    {viewDate().getFullYear()}年 {viewDate().getMonth() + 1}月
                </h3>
                <div class="flex gap-1">
                    <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        class="p-1.5 hover:bg-gray-100 rounded text-[#00000073] transition-colors active:bg-gray-200"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        class="p-1.5 hover:bg-gray-100 rounded text-[#00000073] transition-colors active:bg-gray-200"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 日历主体 */}
            <div class="grid grid-cols-7 border-t border-l border-[#f0f0f0] rounded-sm overflow-hidden">
                {/* 星期表头 */}
                <For each={["日", "一", "二", "三", "四", "五", "六"]}>
                    {(weekDay) => (
                        <div class="bg-[#fafafa] border-r border-b border-[#f0f0f0] py-2.5 text-center text-[13px] text-[#00000073] font-normal">
                            {weekDay}
                        </div>
                    )}
                </For>

                {/* 日期单元格 */}
                <For each={calendarDays()}>
                    {(date) => {
                        const isSelected =
                            local.value &&
                            formatDate(date) === formatDate(local.value);
                        const isToday =
                            formatDate(date) === formatDate(new Date());
                        const isCurrentMonth =
                            date.getMonth() === viewDate().getMonth();

                        return (
                            <div
                                onClick={() => handleDateSelect(date)}
                                onDblClick={(e) => e.preventDefault()} // 显式阻止双击默认行为
                                class={cn(
                                    "min-h-[80px] p-2 border-r border-b border-[#f0f0f0] transition-all cursor-pointer flex flex-col items-end relative",
                                    "active:bg-[#e6f4ff] active:scale-[0.99]", // 点击瞬间的微弱反馈
                                    !isCurrentMonth
                                        ? "bg-[#fafafa] text-[#00000040]"
                                        : "bg-white hover:bg-[#f0f7ff] text-[#000000d9]",
                                    isSelected &&
                                        "bg-[#e6f4ff] border-[#1677ff] z-10"
                                )}
                            >
                                {/* 日期数字 */}
                                <span
                                    class={cn(
                                        "inline-block w-6 h-6 text-center leading-6 rounded-full text-[12px] transition-colors",
                                        isToday &&
                                            !isSelected &&
                                            "bg-[#1677ff] text-white",
                                        isSelected && "text-[#1677ff] font-bold"
                                    )}
                                >
                                    {date.getDate()}
                                </span>

                                {/* 自定义单元格内容插槽 */}
                                <div class="w-full mt-1 flex-1 overflow-y-auto text-[12px]">
                                    {local.dateCellRender?.(date)}
                                </div>
                            </div>
                        );
                    }}
                </For>
            </div>
        </div>
    );
};
