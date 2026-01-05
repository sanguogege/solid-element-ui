import {
    splitProps,
    createSignal,
    Show,
    type ParentComponent,
} from "solid-js";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";
import { type TooltipProps } from "./setting";

export const SeTooltip: ParentComponent<TooltipProps> = (props) => {
    const [local] = splitProps(props, [
        "content",
        "trigger",
        "placement",
        "theme",
        "arrow",
        "class",
        "children",
    ]);

    const [visible, setVisible] = createSignal(false);
    let triggerRef: HTMLDivElement | undefined;
    let tooltipRef: HTMLDivElement | undefined;
    let arrowRef: HTMLDivElement | undefined;

    const updatePosition = () => {
        if (!triggerRef || !tooltipRef) return;

        computePosition(triggerRef, tooltipRef, {
            placement: local.placement || "top",
            middleware: [
                offset(8), // 偏移量
                flip(), // 空间不足时自动翻转
                shift({ padding: 5 }), // 空间不足时自动平移
                ...(local.arrow ? [arrow({ element: arrowRef! })] : []),
            ],
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(tooltipRef!.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            // 处理箭头定位
            if (local.arrow && middlewareData.arrow) {
                const { x: ax, y: ay } = middlewareData.arrow;
                const staticSide = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right",
                }[placement.split("-")[0]]!;

                Object.assign(arrowRef!.style, {
                    left: ax != null ? `${ax}px` : "",
                    top: ay != null ? `${ay}px` : "",
                    [staticSide]: "-4px",
                });
            }
        });
    };

    const showTooltip = () => {
        setVisible(true);
        updatePosition();
    };

    const hideTooltip = () => setVisible(false);

    return (
        <div class="inline-block">
            {/* 触发元素 */}
            <div
                ref={triggerRef}
                class="inline-block"
                onMouseEnter={() => local.trigger !== "click" && showTooltip()}
                onMouseLeave={() => local.trigger !== "click" && hideTooltip()}
                onClick={() =>
                    local.trigger === "click" &&
                    (visible() ? hideTooltip() : showTooltip())
                }
            >
                {local.children}
            </div>

            {/* 弹出浮层 */}
            <Show when={visible()}>
                <div
                    ref={tooltipRef}
                    class={`absolute z-50 px-3 py-1.5 text-xs font-medium rounded shadow-lg pointer-events-none whitespace-nowrap transition-opacity ${
                        local.theme === "light"
                            ? "bg-white text-gray-800 border border-gray-200"
                            : "bg-gray-900 text-white"
                    } ${local.class || ""}`}
                    style={{ width: "max-content", top: 0, left: 0 }}
                >
                    {local.content}

                    {/* 箭头 */}
                    <Show when={local.arrow}>
                        <div
                            ref={arrowRef}
                            class={`absolute w-2 h-2 rotate-45 ${
                                local.theme === "light"
                                    ? "bg-white border-b border-r border-gray-200"
                                    : "bg-gray-900"
                            }`}
                        />
                    </Show>
                </div>
            </Show>
        </div>
    );
};
