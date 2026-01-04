import { splitProps, type Component, Show, createMemo } from "solid-js";
import { cn } from "@/utils/cn"; // 确保你的路径别名配置正确
import { type StatisticProps } from "./setting";

export const SeStatistic: Component<StatisticProps> = (props) => {
    // 从 props 中拆分出组件特有属性和剩余 HTML 属性
    const [local, others] = splitProps(props, [
        "title",
        "value",
        "precision",
        "prefix",
        "suffix",
        "valueStyle",
        "class",
        "size",
    ]);

    const formattedValue = createMemo(() => {
        let num = local.value;
        if (typeof num === "number") {
            if (local.precision !== undefined) {
                num = num.toFixed(local.precision);
            }
            const parts = num.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
        return num;
    });

    const sizeClasses = {
        sm: { title: "text-xs", value: "text-lg" },
        md: { title: "text-sm", value: "text-2xl" },
        lg: { title: "text-base", value: "text-3xl" },
    };

    const currentSize = () => sizeClasses[local.size || "md"];

    return (
        <div {...others} class={cn("font-sans", local.class)}>
            <Show when={local.title}>
                <div
                    class={cn(
                        "text-gray-500 mb-1 transition-colors",
                        currentSize().title
                    )}
                >
                    {local.title}
                </div>
            </Show>

            <div
                class={cn(
                    "text-gray-900 font-semibold flex items-baseline",
                    currentSize().value
                )}
                style={local.valueStyle as any}
            >
                <Show when={local.prefix}>
                    <span class="mr-1 inline-flex items-center text-[0.8em]">
                        {local.prefix}
                    </span>
                </Show>

                <span class="tabular-nums">{formattedValue()}</span>

                <Show when={local.suffix}>
                    <span class="ml-1 inline-flex items-center text-[0.8em]">
                        {local.suffix}
                    </span>
                </Show>
            </div>
        </div>
    );
};
