import { ToggleGroup as KToggleGroup } from "@kobalte/core/toggle-group";
import { splitProps, type ComponentProps } from "solid-js";
import { toggleGroupVariants } from "./setting";

const styles = toggleGroupVariants();

// --- 扁平化组件定义 ---

export const ToggleGroupRoot = (props: ComponentProps<typeof KToggleGroup>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KToggleGroup class={styles.root({ class: local.class })} {...others} />
    );
};

export const ToggleGroupItem = (
    props: ComponentProps<typeof KToggleGroup.Item>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KToggleGroup.Item
            class={styles.item({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
    Item: ToggleGroupItem,
});
