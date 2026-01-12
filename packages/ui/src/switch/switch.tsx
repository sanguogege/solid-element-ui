import { Switch as KSwitch } from "@kobalte/core/switch";
import { splitProps, type ComponentProps } from "solid-js";
import { switchVariants } from "./setting";

const styles = switchVariants();

// --- 扁平化组件定义 ---

export const SwitchRoot = (props: ComponentProps<typeof KSwitch>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <KSwitch class={styles.root({ class: local.class })} {...others} />;
};

export const SwitchLabel = (props: ComponentProps<typeof KSwitch.Label>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KSwitch.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const SwitchControl = (
    props: ComponentProps<typeof KSwitch.Control>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KSwitch.Control
            class={styles.control({ class: local.class })}
            {...others}
        >
            <KSwitch.Thumb class={styles.thumb()} />
        </KSwitch.Control>
    );
};

// --- 聚合导出 (Namespace) ---

export const Switch = Object.assign(SwitchRoot, {
    Label: SwitchLabel,
    Control: SwitchControl,
    Thumb: KSwitch.Thumb,
    Input: KSwitch.Input,
    Description: KSwitch.Description,
    ErrorMessage: KSwitch.ErrorMessage,
});
