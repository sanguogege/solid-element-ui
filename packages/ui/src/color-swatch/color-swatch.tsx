import { ColorSwatch as KColorSwatch } from "@kobalte/core/color-swatch";
import { splitProps, type ComponentProps } from "solid-js";
import { colorSwatchVariants } from "./setting";

// --- 扁平化组件定义 ---

export const ColorSwatch = (props: ComponentProps<typeof KColorSwatch>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KColorSwatch
            class={colorSwatchVariants({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 ---

export const ColorSwatchRoot = ColorSwatch;
