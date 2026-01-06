import {
    createSignal,
    onMount,
    onCleanup,
    createMemo,
    splitProps,
    type ParentComponent,
} from "solid-js";
import { isServer } from "solid-js/web";
import { type AffixProps } from "./setting";
import { cn } from "@solid-element-ui/utils/cn";

const customAttributes = [
    "offsetTop",
    "offsetBottom",
    "offsetLeft",
    "offsetRight",
    "target",
    "zIndex",
    "class",
    "children",
] as const;

export const SeAffix: ParentComponent<AffixProps> = (props: AffixProps) => {
    // 1. 分离自定义属性
    const [local, others] = splitProps(props, customAttributes);

    // 状态信号
    const [isAffixed, setIsAffixed] = createSignal(false);
    // 存储占位符的实时位置和尺寸
    const [rect, setRect] = createSignal({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
    });

    let placeholderRef: HTMLDivElement | undefined;

    // 2. 声明式计算样式：利用 createMemo 优化性能
    const affixStyles = createMemo(() => {
        if (!isAffixed()) return {};

        const styles: any = {
            position: "fixed",
            width: `${rect().width}px`,
            height: `${rect().height}px`,
            "z-index": local.zIndex ?? 1000,
        };

        // 垂直定位逻辑
        if (local.offsetBottom !== undefined) {
            styles.bottom = `${local.offsetBottom}px`;
        } else {
            // 默认为吸顶逻辑，offsetTop 缺省为 0
            styles.top = `${local.offsetTop ?? 0}px`;
        }

        // 水平定位逻辑：如果用户没传，则锁定在占位符原始水平位置
        if (local.offsetLeft !== undefined) {
            styles.left = `${local.offsetLeft}px`;
        } else if (local.offsetRight !== undefined) {
            styles.right = `${local.offsetRight}px`;
        } else {
            styles.left = `${rect().left}px`;
        }

        return styles;
    });

    // 3. 核心位置计算逻辑
    const updatePosition = () => {
        if (!placeholderRef || isServer) return;

        const currentRect = placeholderRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 更新位置快照
        setRect({
            top: currentRect.top,
            bottom: currentRect.bottom,
            left: currentRect.left,
            right: currentRect.right,
            width: currentRect.width,
            height: currentRect.height,
        });

        // 判断触发条件
        if (local.offsetBottom !== undefined) {
            // 吸底逻辑：视口高度 - 元素底部距离 <= 偏移量
            setIsAffixed(
                windowHeight - currentRect.bottom <= local.offsetBottom
            );
        } else {
            // 吸顶逻辑：元素顶部距离 <= 偏移量
            setIsAffixed(currentRect.top <= (local.offsetTop ?? 0));
        }
    };

    // 4. 事件监听与生命周期
    onMount(() => {
        const scrollTarget = local.target?.() || window;

        scrollTarget.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);

        // 初始执行一次
        updatePosition();

        onCleanup(() => {
            scrollTarget.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        });
    });

    return (
        <div
            ref={placeholderRef}
            // 当固定时，外层占位符必须保持高度，防止下方内容塌陷
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
                class={cn(
                    isAffixed() ? "affix--fixed" : "",
                    // 2026年 v4 建议通过类名微调过渡
                    "transition-[position,top,bottom,left,right] duration-300",
                    local.class
                )}
                style={affixStyles()}
            >
                {local.children}
            </div>
        </div>
    );
};
