import {
    splitProps,
    createSignal,
    Show,
    type Component,
    createEffect,
    onCleanup
} from "solid-js";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";
import { type TourProps } from "./setting";

export const SeTour: Component<TourProps> = (props) => {
    const [local] = splitProps(props, [
        "steps",
        "current",
        "open",
        "onChange",
        "onClose",
        "onFinish",
    ]);

    const [currentIndex, setCurrentIndex] = createSignal(local.current || 0);
    const [rect, setRect] = createSignal({ x: 0, y: 0, width: 0, height: 0 });

    let popoverRef: HTMLDivElement | undefined;
    let arrowRef: HTMLDivElement | undefined;

    // 计算当前目标的位置
    const updateStep = () => {
        const step = local.steps[currentIndex()];
        const target = step?.target();

        if (!target || !local.open) return;

        // 1. 获取目标元素矩形信息用于遮罩
        const targetRect = target.getBoundingClientRect();
        setRect({
            x: targetRect.left,
            y: targetRect.top,
            width: targetRect.width,
            height: targetRect.height,
        });

        // 2. 计算浮层定位
        if (popoverRef) {
            computePosition(target, popoverRef, {
                placement: step.placement || "bottom",
                middleware: [
                    offset(15),
                    flip(),
                    shift({ padding: 10 }),
                    arrow({ element: arrowRef! }),
                ],
            }).then(({ x, y, placement, middlewareData }) => {
                Object.assign(popoverRef!.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });

                if (middlewareData.arrow) {
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
        }
    };

    createEffect(() => {
        if (local.open) {
            updateStep();
            window.addEventListener("resize", updateStep);
            window.addEventListener("scroll", updateStep);
        }
    });

    onCleanup(() => {
        window.removeEventListener("resize", updateStep);
        window.removeEventListener("scroll", updateStep);
    });

    const handleNext = () => {
        if (currentIndex() < local.steps.length - 1) {
            const next = currentIndex() + 1;
            setCurrentIndex(next);
            local.onChange?.(next);
            updateStep();
        } else {
            local.onFinish?.();
        }
    };

    const handlePrev = () => {
        if (currentIndex() > 0) {
            const prev = currentIndex() - 1;
            setCurrentIndex(prev);
            local.onChange?.(prev);
            updateStep();
        }
    };

    return (
        <Show when={local.open}>
            <div class="fixed inset-0 z-[1000] pointer-events-none">
                {/* 全屏 SVG 遮罩 */}
                <svg class="absolute inset-0 w-full h-full pointer-events-auto">
                    <defs>
                        <mask id="tour-mask">
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="white"
                            />
                            {/* 高亮“洞”：rx 是圆角 */}
                            <rect
                                x={rect().x - 4}
                                y={rect().y - 4}
                                width={rect().width + 8}
                                height={rect().height + 8}
                                fill="black"
                                rx="4"
                                class="transition-all duration-300"
                            />
                        </mask>
                    </defs>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="rgba(0,0,0,0.5)"
                        mask="url(#tour-mask)"
                    />
                </svg>

                {/* 引导卡片 */}
                <div
                    ref={popoverRef}
                    class="absolute z-[1001] bg-white rounded-xl shadow-2xl p-5 w-72 pointer-events-auto transition-all duration-300"
                    style={{ top: 0, left: 0 }}
                >
                    <div class="font-bold text-lg text-gray-900 mb-1">
                        {local.steps[currentIndex()]?.title}
                    </div>
                    <div class="text-sm text-gray-600 mb-6">
                        {local.steps[currentIndex()]?.description}
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-400">
                            {currentIndex() + 1} / {local.steps.length}
                        </div>
                        <div class="flex gap-2">
                            <Show when={currentIndex() > 0}>
                                <button
                                    onClick={handlePrev}
                                    class="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                                >
                                    上一步
                                </button>
                            </Show>
                            <button
                                onClick={handleNext}
                                class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {currentIndex() === local.steps.length - 1
                                    ? "结束"
                                    : "下一步"}
                            </button>
                        </div>
                    </div>

                    {/* 箭头 */}
                    <div
                        ref={arrowRef}
                        class="absolute w-2 h-2 bg-white rotate-45"
                    />
                </div>
            </div>
        </Show>
    );
};
