import { Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import { splitProps, type ComponentProps } from "solid-js";
import { checkboxVariants } from "./setting";
import { Check } from "lucide-solid";

const styles = checkboxVariants();

// --- 扁平化组件定义 ---

export const CheckboxRoot = (props: ComponentProps<typeof KCheckbox>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KCheckbox class={styles.root({ class: local.class })} {...others} />
    );
};

export const CheckboxControl = (
    props: ComponentProps<typeof KCheckbox.Control>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KCheckbox.Control
            class={styles.control({ class: local.class })}
            {...others}
        >
            <KCheckbox.Indicator class={styles.indicator()}>
                {local.children ?? <Check class="h-3.5 w-3.5" />}
            </KCheckbox.Indicator>
        </KCheckbox.Control>
    );
};

export const CheckboxLabel = (
    props: ComponentProps<typeof KCheckbox.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KCheckbox.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Checkbox = Object.assign(CheckboxRoot, {
    Control: CheckboxControl,
    Label: CheckboxLabel,
    Indicator: KCheckbox.Indicator,
    Input: KCheckbox.Input,
    Description: KCheckbox.Description,
    ErrorMessage: KCheckbox.ErrorMessage,
});
