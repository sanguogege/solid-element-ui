import { ToggleButton as KToggleButton } from "@kobalte/core/toggle-button";
import { splitProps, type ComponentProps } from "solid-js";
import { toggleButtonVariants } from "./setting";

// --- 扁平化组件定义 ---

export const ToggleButton = (props: ComponentProps<typeof KToggleButton>) => {
    const [local, others] = splitProps(props, ["class"]);

    return (
        <KToggleButton
            class={toggleButtonVariants({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const ToggleButtonRoot = Object.assign(ToggleButton, {
    // 原子组件，Root 即本身
});
