import { splitProps, type Component, createSignal, For, Show } from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type RateProps } from "./setting";

// 默认星星图标
const DefaultStar = () => (
    <svg
        viewBox="64 64 896 896"
        data-icon="star"
        width="1em"
        height="1em"
        fill="currentColor"
    >
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 33.3.6 45.6L282.3 588l-43.5 252.9c-1.2 7.1-.4 14.3 2.2 20.8 6.5 16.4 24.8 24.5 41.2 18.1l227.1-119.4 227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 184.1-179.3c5.1-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.1-33.7-26.6-36.5z" />
    </svg>
);

export const SeRate: Component<RateProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "count",
        "value",
        "allowHalf",
        "disabled",
        "allowClear",
        "onChange",
        "character",
        "color",
    ]);

    const count = () => local.count ?? 5;
    const [hoverValue, setHoverValue] = createSignal<number | null>(null);

    // 获取当前应显示的数值（优先显示悬停值）
    const currentValue = () => hoverValue() ?? local.value ?? 0;

    const handleMouseMove = (index: number, isHalf: boolean) => {
        if (local.disabled) return;
        setHoverValue(index + (isHalf ? 0.5 : 1));
    };

    const handleClick = (val: number) => {
        if (local.disabled) return;
        const finalValue = local.allowClear && local.value === val ? 0 : val;
        local.onChange?.(finalValue);
    };

    return (
        <div
            {...others}
            class={cn(
                "inline-flex items-center gap-2 select-none",
                local.disabled ? "cursor-default" : "cursor-pointer",
                local.class
            )}
            onMouseLeave={() => setHoverValue(null)}
        >
            <For each={Array.from({ length: count() })}>
                {(_, index) => {
                    const starIdx = index();
                    return (
                        <div class="relative flex items-center group text-[20px] transition-transform active:scale-110">
                            {/* 背景底色星星 */}
                            <div class="text-[#f0f0f0]">
                                {local.character ?? <DefaultStar />}
                            </div>

                            {/* 交互层：左半部分 (用于半星) */}
                            <Show when={local.allowHalf}>
                                <div
                                    class="absolute left-0 top-0 w-1/2 h-full overflow-hidden transition-colors"
                                    onMouseMove={() =>
                                        handleMouseMove(starIdx, true)
                                    }
                                    onClick={() => handleClick(starIdx + 0.5)}
                                    style={{
                                        color:
                                            currentValue() >= starIdx + 0.5
                                                ? local.color ?? "#fadb14"
                                                : "transparent",
                                    }}
                                >
                                    {local.character ?? <DefaultStar />}
                                </div>
                            </Show>

                            {/* 交互层：整颗星星/右半部分 */}
                            <div
                                class={cn(
                                    "absolute left-0 top-0 w-full h-full transition-all duration-200",
                                    !local.allowHalf && "relative"
                                )}
                                onMouseMove={() =>
                                    handleMouseMove(starIdx, false)
                                }
                                onClick={() => handleClick(starIdx + 1)}
                                style={{
                                    color:
                                        currentValue() >= starIdx + 1
                                            ? local.color ?? "#fadb14"
                                            : "transparent",
                                }}
                            >
                                {local.character ?? <DefaultStar />}
                            </div>
                        </div>
                    );
                }}
            </For>
        </div>
    );
};
