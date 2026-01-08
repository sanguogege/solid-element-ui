import { splitProps, JSX } from "solid-js";
import {
    buttonVariants,
    ButtonProps,
} from "./setting";

// 扩展 Props


export const Button = (props: ButtonProps) => {
    // 1. 拆分参数
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "style", "children", "loading"],
        ["variant","color", "size"]
    );

    // 2. 调用 TV (传入 variant 和自定义 class)
    // TV 会自动把 local.class 合并到 base 槽位
    const styles = () =>
        buttonVariants({
            ...variantProps,
            loading: local.loading,
            class: local.class,
        });

        console.log("local",local);
        console.log("variantProps", variantProps);
        console.log("others", others);
        console.log(styles().base());
    return (
        <button
            class={styles().base()} // 使用 base 槽位生成的类名
            style={local.style}
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
