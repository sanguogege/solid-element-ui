import { splitProps, Show, createMemo } from "solid-js";
import { dividerVariants, type DividerProps } from "./setting";

// 对应 Tailwind 主题配置的预设名
const PRESET_COLORS = ["primary", "success", "warning", "danger", "info"];

export const Divider = (props: DividerProps) => {
    // 1. 拆分参数：style 必须分到 local 中以修复 TS2339
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "style", "children", "color"],
        ["direction", "contentPosition", "dashed"]
    );

    const isVertical = () => variantProps.direction === "vertical";

    // 2. 判断是否为自定义颜色（如 #fff, rgb...）
    const isCustomColor = createMemo(
        () => local.color && !PRESET_COLORS.includes(local.color)
    );

    // 3. 生成 TV 样式类
    const styles = createMemo(() =>
        dividerVariants({
            ...variantProps,
            // 如果是预设色，传给 TV；如果是自定义色，TV 不处理
            color: !isCustomColor() ? (local.color as any) : undefined,
            hasChildren: !!local.children && !isVertical(),
        })
    );

    // 4. 处理 Style 逻辑：合并自定义颜色
    const resolveStyles = createMemo(() => {
        const baseStyle = typeof local.style === "object" ? local.style : {};

        if (isCustomColor()) {
            return {
                "border-color": local.color,
                color: local.color, // 让 text-inherit 和 border-inherit 生效
                ...baseStyle,
            };
        }

        // 无颜色且无文字时的默认兜底色（Tailwind v4 默认透明，需指定）
        if (!local.color && !local.children) {
            return {
                "border-color": "var(--color-gray-200, #e5e7eb)",
                ...baseStyle,
            };
        }

        return baseStyle;
    });

    return (
        <div
            {...others}
            role="separator"
            style={resolveStyles() as any}
            class={styles().base({ class: local.class })}
        >
            <Show when={!isVertical() && local.children}>
                <div class={styles().container()}>
                    <span class={styles().text()}>{local.children}</span>
                </div>
            </Show>
        </div>
    );
};
