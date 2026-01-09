import { splitProps, createMemo } from "solid-js";
import { buttonVariants, useButtonGroup, type ButtonProps } from "./setting";

export const Button = (props: ButtonProps) => {
    const group = useButtonGroup();

    // 1. 拆分参数
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "style", "children", "loading"],
        ["variant", "color", "size"]
    );

    // 2. 使用 createMemo 保证响应式
    // 注意：TV 的多插槽(slots)模式下，调用 styles() 会返回一个包含各个 slot 函数的对象
    const styles = createMemo(() =>
        buttonVariants({
            variant: variantProps.variant || group?.variant,
            size: variantProps.size || group?.size,
            color: variantProps.color || group?.color,
            loading: local.loading,
        })
    );

    return (
        <button
            // styles().base({ class: ... }) 会自动合并外部传入的 class 到 base 槽位
            class={styles().base({ class: local.class })}
            style={local.style}
            // 只要是 loading 状态或外部传入了 disabled，按钮就禁用
            disabled={local.loading || others.disabled}
            {...others}
        >
            {local.loading && (
                <svg class={styles().icon()} fill="none" viewBox="0 0 24 24">
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {local.children}
        </button>
    );
};
