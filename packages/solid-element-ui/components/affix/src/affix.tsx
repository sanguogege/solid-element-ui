// src/components/affix/Affix.tsx
import { createSignal, onMount, onCleanup, splitProps } from "solid-js";
import { AffixProps, AffixState, affixVariants } from "./setting";
import { cn } from "@solid-element-ui/utils/cn";

export const Affix = (props: AffixProps) => {
    // 分离属性：local(样式相关), config(Affix逻辑相关), rest(其他如HTML属性)
    const [local, config] = splitProps(
        props,
        ["class", "style", "children"],
        ["offsetTop", "offsetBottom", "target", "onChange"]
    );

    let placeholderRef: HTMLDivElement | undefined;
    const [state, setState] = createSignal<AffixState>({
        isFixed: false,
    });

    const getTarget = () => config.target?.() || window;

    const updatePosition = () => {
        if (!placeholderRef) return;

        const rect = placeholderRef.getBoundingClientRect();
        const target = getTarget();
        let targetRect: { top: number; bottom: number };

        if (target instanceof Window) {
            targetRect = { top: 0, bottom: window.innerHeight };
        } else {
            const elRect = target.getBoundingClientRect();
            targetRect = { top: elRect.top, bottom: elRect.bottom };
        }

        let newState: AffixState = { isFixed: false };

        // 核心计算逻辑
        if (
            config.offsetTop !== undefined &&
            rect.top - targetRect.top <= config.offsetTop
        ) {
            newState = {
                isFixed: true,
                affixStyle: {
                    top: `${targetRect.top + config.offsetTop}px`,
                    width: `${rect.width}px`,
                },
                placeholderStyle: {
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                },
            };
        } else if (
            config.offsetBottom !== undefined &&
            targetRect.bottom - rect.bottom <= config.offsetBottom
        ) {
            newState = {
                isFixed: true,
                affixStyle: {
                    bottom: `${
                        window.innerHeight -
                        targetRect.bottom +
                        config.offsetBottom
                    }px`,
                    width: `${rect.width}px`,
                },
                placeholderStyle: {
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                },
            };
        }

        if (newState.isFixed !== state().isFixed) {
            config.onChange?.(newState.isFixed);
        }
        setState(newState);
    };

    onMount(() => {
        const target = getTarget();
        target.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);
        updatePosition(); // 初始执行

        onCleanup(() => {
            target.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        });
    });

    return (
        <div
            ref={placeholderRef}
            style={{ ...state().placeholderStyle, ...local.style }}
            class={cn("ant-affix-wrapper", local.class)} // 容器层
        >
            <div
                class={cn(affixVariants({ fixed: state().isFixed }))} // 使用 CVA 处理固定状态
                style={state().affixStyle}
            >
                {local.children}
            </div>
        </div>
    );
};
