import {
    createSignal,
    onMount,
    onCleanup,
    createMemo,
    splitProps,
    type Component,
} from "solid-js";
import { isServer } from "solid-js/web";
import { cn } from "@solid-element-ui/utils/cn"; // 你的工具类
import { type AffixProps } from "./variants";
import { affixVariants, type AffixVariants } from "./variants";

// 扩展 Props 以包含 CVA 变体
export interface SeAffixProps extends AffixProps, AffixVariants {}

const customAttributes = [
    "offsetTop",
    "offsetBottom",
    "offsetLeft",
    "offsetRight",
    "target",
    "zIndex",
    "class",
    "children",
    "shadow", // CVA 属性
    "speed", // CVA 属性
] as const;

export const SeAffix: Component<SeAffixProps> = (props) => {
    // 1. 分离：local(自定义+CVA), others(原生HTML属性)
    const [local, others] = splitProps(props, customAttributes);

    const [isAffixed, setIsAffixed] = createSignal(false);
    const [rect, setRect] = createSignal({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
    });

    let placeholderRef: HTMLDivElement | undefined;

    // 2. 样式计算 (保持原有逻辑，注入 zIndex)
    const affixStyles = createMemo(() => {
        if (!isAffixed()) return {};
        const styles: any = {
            position: "fixed",
            width: `${rect().width}px`,
            height: `${rect().height}px`,
            "z-index": local.zIndex ?? 1000,
        };

        if (local.offsetBottom !== undefined) {
            styles.bottom = `${local.offsetBottom}px`;
        } else {
            styles.top = `${local.offsetTop ?? 0}px`;
        }

        // 水平锁定
        if (local.offsetLeft !== undefined)
            styles.left = `${local.offsetLeft}px`;
        else if (local.offsetRight !== undefined)
            styles.right = `${local.offsetRight}px`;
        else styles.left = `${rect().left}px`;

        return styles;
    });

    const updatePosition = () => {
        if (!placeholderRef || isServer) return;
        const currentRect = placeholderRef.getBoundingClientRect();
        setRect({
            top: currentRect.top,
            bottom: currentRect.bottom,
            left: currentRect.left,
            right: currentRect.right,
            width: currentRect.width,
            height: currentRect.height,
        });

        if (local.offsetBottom !== undefined) {
            setIsAffixed(
                window.innerHeight - currentRect.bottom <= local.offsetBottom
            );
        } else {
            setIsAffixed(currentRect.top <= (local.offsetTop ?? 0));
        }
    };

    onMount(() => {
        const scrollTarget = local.target?.() || window;
        scrollTarget.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);
        updatePosition();
        onCleanup(() => {
            scrollTarget.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        });
    });

    return (
        <div
            ref={placeholderRef}
            style={
                isAffixed()
                    ? {
                          width: `${rect().width}px`,
                          height: `${rect().height}px`,
                      }
                    : {}
            }
        >
            <div
                {...others}
                // 3. 使用 CVA 函数生成类名，并与用户自定义的 local.class 融合
                class={cn(
                    affixVariants({
                        shadow: local.shadow,
                        speed: local.speed,
                    }),
                    isAffixed() ? "affix--fixed" : "relative",
                    local.class
                )}
                style={affixStyles()}
            >
                {local.children}
            </div>
        </div>
    );
};
