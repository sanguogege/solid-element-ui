import { ColorSwatch as KColorSwatch } from "@kobalte/core/color-swatch";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

const colorSwatchStyles = tv(
    {
        base: [
            "h-8 w-8 rounded-md border border-black/10 shadow-sm transition-transform",
            "hover:scale-105 select-none dark:border-white/20",
        ],
    },
    {
        twMerge: true,
    },
);


// TODO 源代码问题

// FIXME 源代码问题

export interface ColorSwatchProps extends ComponentProps<typeof KColorSwatch> {}

export const ColorSwatch = (props: ColorSwatchProps) => {
    const [local, others] = splitProps(props, ["class", "style"]);

    return (
        <KColorSwatch
            class={colorSwatchStyles({ class: local.class })}
            {...others}
        />
    );
};
