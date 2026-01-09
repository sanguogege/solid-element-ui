import { splitProps, type ParentComponent, createMemo } from "solid-js";
import {
    buttonGroupVariants,
    ButtonGroupContext,
    type ButtonGroupProps,
} from "./setting";

export const ButtonGroup: ParentComponent<ButtonGroupProps> = (props) => {
    // 1. 拆分参数
    const [local, variantProps, others] = splitProps(
        props,
        ["size", "variant", "color", "class", "children"],
        ["vertical"] // 如果有 TV 变体属性放在这里
    );

    // 2. 样式计算
    const classes = createMemo(() =>
        buttonGroupVariants({
            ...variantProps,
            class: local.class,
        })
    );

    return (
        <ButtonGroupContext.Provider
            value={{
                // 使用 getter 保持响应式追踪
                get size() {
                    return local.size;
                },
                get variant() {
                    return local.variant;
                },
                get color() {
                    return local.color;
                },
            }}
        >
            <div {...others} role="group" class={classes()}>
                {local.children}
            </div>
        </ButtonGroupContext.Provider>
    );
};
