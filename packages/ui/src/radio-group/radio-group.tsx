import { RadioGroup as KRadioGroup } from "@kobalte/core/radio-group";
import { splitProps, type ComponentProps } from "solid-js";
import { radioGroupVariants } from "./setting";
import { Circle } from "lucide-solid";

const styles = radioGroupVariants();

// --- 扁平化组件定义 ---

export const RadioGroupRoot = (props: ComponentProps<typeof KRadioGroup>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KRadioGroup class={styles.root({ class: local.class })} {...others} />
    );
};

export const RadioGroupLabel = (
    props: ComponentProps<typeof KRadioGroup.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KRadioGroup.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const RadioGroupItem = (
    props: ComponentProps<typeof KRadioGroup.Item>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KRadioGroup.Item
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KRadioGroup.ItemInput class={styles.itemInput()} />
            <KRadioGroup.ItemControl class={styles.itemControl()}>
                <KRadioGroup.ItemIndicator class={styles.itemIndicator()}>
                    <Circle class={styles.itemIndicatorIcon()} />
                </KRadioGroup.ItemIndicator>
            </KRadioGroup.ItemControl>
            {local.children}
        </KRadioGroup.Item>
    );
};

export const RadioGroupItemLabel = (
    props: ComponentProps<typeof KRadioGroup.ItemLabel>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KRadioGroup.ItemLabel
            class={styles.itemLabel({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const RadioGroup = Object.assign(RadioGroupRoot, {
    Label: RadioGroupLabel,
    Item: RadioGroupItem,
    ItemLabel: RadioGroupItemLabel,
    Description: KRadioGroup.Description,
    ErrorMessage: KRadioGroup.ErrorMessage,
});
