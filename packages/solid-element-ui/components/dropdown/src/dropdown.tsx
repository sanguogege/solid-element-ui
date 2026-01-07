import {
    splitProps,
    createSignal,
    Show,
    For,
    type ParentComponent,
    onCleanup,
    onMount,
} from "solid-js";
import {
    computePosition,
    flip,
    shift,
    offset,
    arrow as arrowMiddleware,
} from "@floating-ui/dom";
import { type DropdownProps, type DropdownItem } from "./setting";

// TODO 菜单出现的样式有问题

export const SeDropdown: ParentComponent<DropdownProps> = (props) => {
    const [local, others] = splitProps(props, [
        "menu",
        "trigger",
        "placement",
        "arrow",
        "autoClose",
        "class",
        "children",
    ]);

    const [visible, setVisible] = createSignal(false);
    let triggerRef: HTMLDivElement | undefined;
    let menuRef: HTMLDivElement | undefined;
    let arrowRef: HTMLDivElement | undefined;
    let timer: any;

    const updatePosition = () => {
        if (!triggerRef || !menuRef) return;

        computePosition(triggerRef, menuRef, {
            placement: local.placement || "bottom-start",
            middleware: [
                offset(8),
                flip(),
                shift({ padding: 5 }),
                ...(local.arrow
                    ? [arrowMiddleware({ element: arrowRef! })]
                    : []),
            ],
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(menuRef!.style, {
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

    const show = () => {
        clearTimeout(timer);
        setVisible(true);
        updatePosition();
    };

    const hide = () => {
        timer = setTimeout(() => setVisible(false), 150);
    };

    const toggle = () => {
        if (local.trigger === "click") {
            visible() ? setVisible(false) : show();
        }
    };

    const handleItemClick = (item: DropdownItem) => {
        if (item.disabled) return;
        item.onClick?.();
        if (local.autoClose !== false) setVisible(false);
    };

    // 点击外部关闭
    const clickOutside = (e: MouseEvent) => {
        if (
            visible() &&
            !triggerRef?.contains(e.target as Node) &&
            !menuRef?.contains(e.target as Node)
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
            onMouseLeave={() => local.trigger !== "click" && hide()}
        >
            {/* 触发器 */}
            <div
                ref={triggerRef}
                class="inline-block cursor-pointer"
                onMouseEnter={() => local.trigger !== "click" && show()}
                onClick={toggle}
            >
                {local.children}
            </div>

            {/* 下拉菜单层 */}
            <Show when={visible()}>
                <div
                    ref={menuRef}
                    onMouseEnter={() =>
                        local.trigger !== "click" && clearTimeout(timer)
                    }
                    {...others}
                    class={`absolute z-50 bg-white border border-gray-100 shadow-xl rounded-xl p-1.5 min-w-[160px] animate-in fade-in zoom-in-95 duration-200 ${
                        local.class || ""
                    }`}
                    style={{ top: 0, left: 0 }}
                >
                    <For each={local.menu}>
                        {(item) => (
                            <button
                                disabled={item.disabled}
                                onClick={() => handleItemClick(item)}
                                class={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors text-left
                  ${
                      item.disabled
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-gray-50 active:bg-gray-100"
                  }
                  ${
                      item.danger
                          ? "text-red-500 hover:bg-red-50"
                          : "text-gray-700"
                  }
                `}
                            >
                                <Show when={item.icon}>
                                    <span class="shrink-0">{item.icon}</span>
                                </Show>
                                <span class="flex-1 truncate">
                                    {item.label}
                                </span>
                            </button>
                        )}
                    </For>

                    {/* 箭头 */}
                    <Show when={local.arrow}>
                        <div
                            ref={arrowRef}
                            class="absolute w-2 h-2 bg-white border-t border-l border-gray-100 rotate-45"
                        />
                    </Show>
                </div>
            </Show>
        </div>
    );
};
