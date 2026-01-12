import { TextField as KTextField } from "@kobalte/core/text-field";
import { splitProps, type ComponentProps } from "solid-js";
import { textFieldVariants } from "./setting";

const styles = textFieldVariants();

// --- 扁平化组件定义 ---

export const TextFieldRoot = (props: ComponentProps<typeof KTextField>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField class={styles.root({ class: local.class })} {...others} />
    );
};

export const TextFieldLabel = (
    props: ComponentProps<typeof KTextField.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const TextFieldInput = (
    props: ComponentProps<typeof KTextField.Input>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField.Input
            class={styles.input({ class: local.class })}
            {...others}
        />
    );
};

export const TextFieldDescription = (
    props: ComponentProps<typeof KTextField.Description>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField.Description
            class={styles.description({ class: local.class })}
            {...others}
        />
    );
};

export const TextFieldErrorMessage = (
    props: ComponentProps<typeof KTextField.ErrorMessage>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField.ErrorMessage
            class={styles.errorMessage({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const TextField = Object.assign(TextFieldRoot, {
    Label: TextFieldLabel,
    Input: TextFieldInput,
    Description: TextFieldDescription,
    ErrorMessage: TextFieldErrorMessage,
});
