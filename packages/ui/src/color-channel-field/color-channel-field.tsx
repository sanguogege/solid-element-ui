import { ColorChannelField as KColorChannelField } from "@kobalte/core/color-channel-field";
import { splitProps, type ComponentProps } from "solid-js";
import { colorChannelFieldVariants } from "./setting";

const styles = colorChannelFieldVariants();

// --- 扁平化组件定义 ---

export const ColorChannelFieldRoot = (
    props: ComponentProps<typeof KColorChannelField>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorChannelField
            class={styles.root({ class: local.class })}
            {...others}
        />
    );
};

export const ColorChannelFieldLabel = (
    props: ComponentProps<typeof KColorChannelField.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorChannelField.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const ColorChannelFieldInput = (
    props: ComponentProps<typeof KColorChannelField.Input>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorChannelField.Input
            class={styles.input({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const ColorChannelField = Object.assign(ColorChannelFieldRoot, {
    Label: ColorChannelFieldLabel,
    Input: ColorChannelFieldInput,
    Description: KColorChannelField.Description,
    ErrorMessage: KColorChannelField.ErrorMessage,
});
