import {
    splitProps,
    type ParentComponent,
    createSignal,
    Show,
    onCleanup,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type PopoverProps } from "./setting";

export const SePopover: ParentComponent<PopoverProps> = (props) => {
    // 分离自定义属性与 HTML 属性
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "content",
        "title",
        "trigger",
        "placement",
    ]);

    const [visible, setVisible] = createSignal(false);
    let timer: any;

    const trigger = () => local.trigger || "hover";
    const placement = () => local.placement || "top";

    // 处理气泡显示隐藏逻辑
    const handleToggle = (val: boolean) => {
        if (timer) clearTimeout(timer);
        if (trigger() === "hover") {
            // 增加防抖延迟，提升交互顺滑感
            timer = setTimeout(() => setVisible(val), val ? 100 : 200);
        } else {
            setVisible(val);
        }
    };

    onCleanup(() => clearTimeout(timer));

    // 位置映射表
    const placementClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-3 origin-bottom",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-3 origin-top",
        left: "right-full top-1/2 -translate-y-1/2 mr-3 origin-right",
        right: "left-full top-1/2 -translate-y-1/2 ml-3 origin-left",
    };

    // 小箭头样式
    const arrowClasses = {
        top: "bottom-[-5.5px] left-1/2 -translate-x-1/2 border-t-[#fff] border-l-transparent border-r-transparent border-b-transparent",
        bottom: "top-[-5.5px] left-1/2 -translate-x-1/2 border-b-[#fff] border-l-transparent border-r-transparent border-t-transparent",
        left: "right-[-5.5px] top-1/2 -translate-y-1/2 border-l-[#fff] border-t-transparent border-b-transparent border-r-transparent",
        right: "left-[-5.5px] top-1/2 -translate-y-1/2 border-r-[#fff] border-t-transparent border-b-transparent border-l-transparent",
    };

    return (
        <div
            {...others}
            class={cn("relative inline-block", local.class)}
            onMouseEnter={() => trigger() === "hover" && handleToggle(true)}
            onMouseLeave={() => trigger() === "hover" && handleToggle(false)}
            onClick={() => trigger() === "click" && setVisible(!visible())}
        >
            {/* 触发点元素 */}
            {local.children}

            {/* 气泡面板 */}
            <Show when={visible()}>
                <div
                    class={cn(
                        "absolute z-50 min-w-[170px] bg-white rounded-lg",
                        // AntD 5.0 三层扩散阴影
                        "shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]",
                        "animate-in zoom-in-95 fade-in duration-200",
                        placementClasses[placement()]
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* 气泡箭头 */}
                    <div
                        class={cn(
                            "absolute w-0 h-0 border-[6px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
                            arrowClasses[placement()]
                        )}
                    />

                    {/* 标题栏 */}
                    <Show when={local.title}>
                        <div class="px-3 py-2 border-b border-[#f0f0f0] font-semibold text-[14px] text-[#000000d9]">
                            {local.title}
                        </div>
                    </Show>

                    {/* 内容区 */}
                    <div class="px-3 py-3 text-[14px] text-[#000000a6] leading-relaxed">
                        {local.content}
                    </div>
                </div>
            </Show>
        </div>
    );
};
