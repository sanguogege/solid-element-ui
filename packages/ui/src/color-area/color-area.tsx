import { ColorArea as KColorArea } from "@kobalte/core/color-area";
import { splitProps, type ComponentProps } from "solid-js";
import { colorAreaVariants } from "./setting";

const styles = colorAreaVariants();

// --- 扁平化组件定义 ---

export const ColorAreaRoot = (props: ComponentProps<typeof KColorArea>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KColorArea class={styles.root({ class: local.class })} {...others}>
            <KColorArea.Background class={styles.background()} />
            {local.children}
        </KColorArea>
    );
};

export const ColorAreaThumb = (
    props: ComponentProps<typeof KColorArea.Thumb>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorArea.Thumb
            class={styles.thumb({ class: local.class })}
            {...others}
        >
            {/* 修正：需要同时渲染 X 和 Y 的隐藏输入框 */}
            <KColorArea.HiddenInputX />
            <KColorArea.HiddenInputY />
        </KColorArea.Thumb>
    );
};

// --- 聚合导出 (Namespace) ---

export const ColorArea = Object.assign(ColorAreaRoot, {
    Background: KColorArea.Background,
    Thumb: ColorAreaThumb,
});
