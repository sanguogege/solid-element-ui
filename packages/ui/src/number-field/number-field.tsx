import { NumberField as KNumberField } from "@kobalte/core/number-field";
import { splitProps, type ComponentProps } from "solid-js";
import { numberFieldVariants } from "./setting";
import { ChevronUp, ChevronDown } from "lucide-solid";

const styles = numberFieldVariants();

// --- 扁平化组件定义 ---

export const NumberFieldLabel = (
    props: ComponentProps<typeof KNumberField.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KNumberField.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const NumberFieldInput = (
    props: ComponentProps<typeof KNumberField.Input>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KNumberField.Input
            class={styles.input({ class: local.class })}
            {...others}
        />
    );
};

export const NumberFieldSteppers = () => {
    return (
        <div class={styles.stepperWrapper()}>
            <KNumberField.IncrementTrigger class={styles.stepper()}>
                <ChevronUp class="h-3 w-3" />
            </KNumberField.IncrementTrigger>
            <div class="h-px bg-zinc-200 dark:bg-zinc-800" />
            <KNumberField.DecrementTrigger class={styles.stepper()}>
                <ChevronDown class="h-3 w-3" />
            </KNumberField.DecrementTrigger>
        </div>
    );
};

export const NumberFieldRoot = (props: ComponentProps<typeof KNumberField>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KNumberField class={styles.root({ class: local.class })} {...others}>
            {local.children}
        </KNumberField>
    );
};

// --- 聚合导出 (Namespace) ---

export const NumberField = Object.assign(NumberFieldRoot, {
    Label: NumberFieldLabel,
    Input: NumberFieldInput,
    Steppers: NumberFieldSteppers,
    Description: KNumberField.Description,
    ErrorMessage: KNumberField.ErrorMessage,
});
