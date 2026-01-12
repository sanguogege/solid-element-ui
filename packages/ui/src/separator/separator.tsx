import { Separator as KSeparator } from "@kobalte/core/separator";
import { splitProps, type ComponentProps } from "solid-js";
import { separatorVariants } from "./setting";

// --- 扁平化组件定义 ---

export const Separator = (props: ComponentProps<typeof KSeparator>) => {
    const [local, others] = splitProps(props, ["class", "orientation"]);

    return (
        <KSeparator
            orientation={local.orientation ?? "horizontal"}
            class={separatorVariants({
                orientation: local.orientation,
                class: local.class,
            })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const SeparatorRoot = Object.assign(Separator, {
    // 对于单一功能原子组件，Root 即本身
});
