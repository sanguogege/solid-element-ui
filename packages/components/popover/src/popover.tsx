import {
    splitProps,
    createSignal,
    Show,
    type ParentComponent,
    onCleanup,
    onMount,
} from "solid-js";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";
import { type PopoverProps } from "./setting";

export const SePopover: ParentComponent<PopoverProps> = (props) => {
    const [local, others] = splitProps(props, [
        "title",
        "content",
        "trigger",
        "placement",
        "arrow",
        "class",
        "children",
    ]);

    const [visible, setVisible] = createSignal(false);
    let triggerRef: HTMLDivElement | undefined;
    let popoverRef: HTMLDivElement | undefined;
    let arrowRef: HTMLDivElement | undefined;
    let timer: any;

    // 更新定位逻辑
    const updatePosition = () => {
        if (!triggerRef || !popoverRef) return;

        computePosition(triggerRef, popoverRef, {
            placement: local.placement || "bottom",
            middleware: [
                offset(12), // 留出一点空间给阴影和视觉呼吸感
                flip(),
                shift({ padding: 8 }),
                ...(local.arrow ? [arrow({ element: arrowRef! })] : []),
            ],
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(popoverRef!.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

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

    // 交互逻辑处理
    const open = () => {
        clearTimeout(timer);
        setVisible(true);
        updatePosition();
    };

    const close = () => {
        // hover 模式下增加一小段缓冲时间，方便鼠标移入浮层
        timer = setTimeout(() => setVisible(false), 150);
    };

    const toggle = () => {
        if (local.trigger === "hover") return;
        visible() ? setVisible(false) : open();
    };

    // 点击外部关闭逻辑
    const clickOutside = (e: MouseEvent) => {
        if (
            visible() &&
            !triggerRef?.contains(e.target as Node) &&
            !popoverRef?.contains(e.target as Node)
        ) {
            setVisible(false);
        }
    };

    onMount(() => {
        document.addEventListener("click", clickOutside);
        onCleanup(() => {
            document.removeEventListener("click", clickOutside);
            clearTimeout(timer);
        });
    });

    return (
        <div
            class="inline-block"
            onMouseLeave={() => local.trigger === "hover" && close()}
        >
            {/* 触发器 */}
            <div
                ref={triggerRef}
                class="inline-block"
                onMouseEnter={() => local.trigger === "hover" && open()}
                onClick={toggle}
            >
                {local.children}
            </div>

            {/* 浮层内容 */}
            <Show when={visible()}>
                <div
                    ref={popoverRef}
                    onMouseEnter={() =>
                        local.trigger === "hover" && clearTimeout(timer)
                    }
                    {...others}
                    class={`absolute z-50 bg-white border border-gray-200 shadow-xl rounded-lg w-72 transition-opacity ${
                        local.class || ""
                    }`}
                    style={{ top: 0, left: 0 }}
                >
                    {/* 标题区 */}
                    <Show when={local.title}>
                        <div class="px-4 py-2 border-b border-gray-100 font-semibold text-gray-900">
                            {local.title}
                        </div>
                    </Show>

                    {/* 内容区 */}
                    <div class="px-4 py-3 text-sm text-gray-600">
                        {local.content}
                    </div>

                    {/* 箭头 */}
                    <Show when={local.arrow}>
                        <div
                            ref={arrowRef}
                            class="absolute w-2 h-2 bg-white border-t border-l border-gray-200 rotate-45"
                            style={{
                                "background-color": "inherit",
                                "border-color": "inherit",
                            }}
                        />
                    </Show>
                </div>
            </Show>
        </div>
    );
};
