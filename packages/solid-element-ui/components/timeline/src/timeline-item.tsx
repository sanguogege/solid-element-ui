import { splitProps, type ParentComponent, Show } from "solid-js";
import { type TimelineItemProps } from "./setting";

export const SeTimelineItem: ParentComponent<TimelineItemProps> = (props) => {
    const [local, others] = splitProps(props, [
        "color",
        "title",
        "dot",
        "isLast",
        "class",
        "children",
    ]);

    // 颜色映射：2026年流行的莫兰迪色系/高对比度边框样式
    const dotColor = () => {
        const maps = {
            primary: "border-blue-500 bg-white",
            success: "border-green-500 bg-white",
            warning: "border-amber-500 bg-white",
            danger: "border-red-500 bg-white",
            info: "border-indigo-500 bg-white",
            default: "border-gray-300 bg-white",
        };
        return maps[local.color || "default"];
    };

    return (
        <div {...others} class={`relative pb-8 group ${local.class || ""}`}>
            {/* 垂直连接线：通过 top 和 calc 高度避开圆点 */}
            <Show when={!local.isLast}>
                <div class="absolute left-[5px] top-[14px] w-[2px] h-[calc(100%-10px)] bg-gray-200" />
            </Show>

            {/* 节点控制层 */}
            <div class="absolute left-0 top-[4px] z-10 flex items-center justify-center">
                <Show
                    when={local.dot}
                    fallback={
                        <div
                            class={`w-3 h-3 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${dotColor()}`}
                        />
                    }
                >
                    <div class="bg-white">{local.dot}</div>
                </Show>
            </div>

            {/* 文本内容层 */}
            <div class="ml-7 flex flex-col gap-1.5">
                <Show when={local.title}>
                    <div class="text-sm font-semibold text-gray-900 leading-none">
                        {local.title}
                    </div>
                </Show>
                <div class="text-sm text-gray-600 leading-relaxed">
                    {local.children}
                </div>
            </div>
        </div>
    );
};
