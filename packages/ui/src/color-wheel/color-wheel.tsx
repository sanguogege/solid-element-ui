import { ColorWheel as KColorWheel } from "@kobalte/core/color-wheel";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

// FIXME 颜色选项都有源代码问题，注意查看原始kobalte的问题。

const colorWheelStyles = tv({
    slots: {
        root: "relative flex flex-col items-center justify-center select-none touch-none",
        track: "relative rounded-full border border-black/5 dark:border-white/10",
        thumb: [
            "z-10 h-5 w-5 rounded-full border-2 border-white bg-transparent shadow-md transition-[transform]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
            "hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing",
        ],
    },
});

const { root, track, thumb } = colorWheelStyles();

export interface ColorWheelProps extends ComponentProps<typeof KColorWheel> {
    size?: number;
}

export const ColorWheel = (props: ColorWheelProps) => {
    const [local, others] = splitProps(props, ["size", "class"]);

    return (
        <KColorWheel class={root({ class: local.class })} {...others}>
         
            <KColorWheel.Track
                class={track()}
                style={{
                    width: `${local.size || 160}px`,
                    height: `${local.size || 160}px`,
                    background: "var(--kb-color-wheel-track-background)",
                }}
            >
                <KColorWheel.Thumb class={thumb()}>
                    <KColorWheel.Input />
                </KColorWheel.Thumb>
            </KColorWheel.Track>
        </KColorWheel>
    );
};
