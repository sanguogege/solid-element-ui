import { ColorSlider as KColorSlider } from "@kobalte/core/color-slider";
import { splitProps, type ComponentProps } from "solid-js";
import { colorSliderVariants } from "./setting";

const styles = colorSliderVariants();

// --- 扁平化组件定义 ---

export const ColorSliderRoot = (props: ComponentProps<typeof KColorSlider>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorSlider class={styles.root({ class: local.class })} {...others} />
    );
};

export const ColorSliderTrack = (
    props: ComponentProps<typeof KColorSlider.Track>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorSlider.Track
            class={styles.track({ class: local.class })}
            {...others}
        />
    );
};

export const ColorSliderThumb = (
    props: ComponentProps<typeof KColorSlider.Thumb>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorSlider.Thumb
            class={styles.thumb({ class: local.class })}
            {...others}
        >
            <KColorSlider.Input />
        </KColorSlider.Thumb>
    );
};

// --- 聚合导出 (Namespace) ---

export const ColorSlider = Object.assign(ColorSliderRoot, {
    Track: ColorSliderTrack,
    Thumb: ColorSliderThumb,
    Label: KColorSlider.Label,
    ValueLabel: KColorSlider.ValueLabel,
});
