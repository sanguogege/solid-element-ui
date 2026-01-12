import { ColorWheel as KColorWheel } from "@kobalte/core/color-wheel";
import { splitProps, type ComponentProps } from "solid-js";
import { colorWheelVariants } from "./setting";

const styles = colorWheelVariants();

// --- 扁平化组件定义 ---

export const ColorWheelRoot = (props: ComponentProps<typeof KColorWheel>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KColorWheel class={styles.root({ class: local.class })} {...others}>
            <KColorWheel.Track class={styles.track()} />
            {local.children}
        </KColorWheel>
    );
};

export const ColorWheelThumb = (
    props: ComponentProps<typeof KColorWheel.Thumb>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorWheel.Thumb
            class={styles.thumb({ class: local.class })}
            {...others}
        >
            <KColorWheel.Input />
        </KColorWheel.Thumb>
    );
};

// --- 聚合导出 (Namespace) ---

export const ColorWheel = Object.assign(ColorWheelRoot, {
    Track: KColorWheel.Track,
    Thumb: ColorWheelThumb,
});
