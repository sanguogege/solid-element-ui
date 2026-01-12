import { ColorField as KColorField } from "@kobalte/core/color-field";
import { ColorSwatch as KColorSwatch } from "@kobalte/core/color-swatch";
import { splitProps, type ComponentProps } from "solid-js";
import { colorFieldVariants } from "./setting";

const styles = colorFieldVariants();

// --- 扁平化组件定义 ---

// 这里不直接导出 KColorField，而是包装一层，以便在根部应用样式
export const ColorFieldRoot = (props: ComponentProps<typeof KColorField>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorField class={styles.root({ class: local.class })} {...others} />
    );
};

export const ColorFieldLabel = (
    props: ComponentProps<typeof KColorField.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorField.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const ColorFieldInput = (
    props: ComponentProps<typeof KColorField.Input>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorField.Input
            class={styles.input({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const ColorField = Object.assign(ColorFieldRoot, {
    Label: ColorFieldLabel,
    Input: ColorFieldInput,
    Swatch: KColorSwatch, // 修正：直接映射 KColorSwatch，使用时需传 value
    Description: KColorField.Description,
    ErrorMessage: KColorField.ErrorMessage,
});
