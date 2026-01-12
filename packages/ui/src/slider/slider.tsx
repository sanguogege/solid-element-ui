import { Slider as KSlider } from "@kobalte/core/slider";
import { splitProps, type ComponentProps } from "solid-js";
import { sliderVariants } from "./setting";

const styles = sliderVariants();

// --- 扁平化组件定义 ---

export const SliderLabel = (props: ComponentProps<typeof KSlider.Label>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KSlider.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const SliderValueLabel = (
    props: ComponentProps<typeof KSlider.ValueLabel>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KSlider.ValueLabel
            class={styles.valueText({ class: local.class })}
            {...others}
        />
    );
};

export const SliderTrack = (props: ComponentProps<typeof KSlider.Track>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KSlider.Track class={styles.track({ class: local.class })} {...others}>
            <KSlider.Fill class={styles.fill()} />
            {local.children}
        </KSlider.Track>
    );
};

export const SliderThumb = (props: ComponentProps<typeof KSlider.Thumb>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KSlider.Thumb class={styles.thumb({ class: local.class })} {...others}>
            <KSlider.Input />
        </KSlider.Thumb>
    );
};

export const SliderRoot = (props: ComponentProps<typeof KSlider>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KSlider class={styles.root({ class: local.class })} {...others}>
            {local.children}
        </KSlider>
    );
};

// --- 聚合导出 (Namespace) ---

export const Slider = Object.assign(SliderRoot, {
    Label: SliderLabel,
    ValueLabel: SliderValueLabel,
    Track: SliderTrack,
    Thumb: SliderThumb,
});
