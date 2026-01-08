import { splitProps, type ParentComponent } from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type ButtonGroupProps } from "./setting";
import { ButtonGroupContext } from "./setting";

export const ButtonGroup: ParentComponent<ButtonGroupProps> = (
    props: ButtonGroupProps
) => {
    const [local, others] = splitProps(props, [
        "size",
        "variant",
        "class",
        "children",
    ]);

    return (
        // 将父组件接收到的属性通过 Provider 传递
        <ButtonGroupContext.Provider
            value={{
                get size() {
                    return local.size;
                },
                get variant() {
                    return local.variant;
                },
            }}
        >
            <div
                {...others}
                class={cn(
                    "inline-flex items-center shadow-sm rounded-(--radius,4px)",
                    // 1. 处理圆角：让中间的按钮变方
                    "[&>button:first-child]:rounded-r-none",
                    "[&>button:not(:first-child):not(:last-child)]:rounded-none",
                    "[&>button:last-child]:rounded-l-none",
                    // 2. 核心分割线逻辑：
                    // 让所有非第一个按钮左移 1px，使其左边框覆盖前一个按钮的右边框
                    "[&>button:not(:first-child)]:-ml-px",

                    // 3. 悬停优化 (非常重要)：
                    // 当鼠标悬停时，通过 z-index 让当前按钮的边框“浮”在分割线上
                    "[&>button]:relative hover:[&>button]:z-10 focus-visible:[&>button]:z-10",

                    local.class
                )}
            >
                {local.children}
            </div>
        </ButtonGroupContext.Provider>
    );
};
