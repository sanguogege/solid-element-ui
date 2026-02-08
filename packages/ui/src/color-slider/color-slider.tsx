import { ColorSlider as KColorSlider } from "@kobalte/core/color-slider";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

// TODO defaultValue,还有channel 的问题

const sliderStyles = tv(
    {
        slots: {
            root: "relative flex flex-col items-center select-none touch-none w-full gap-2",
            label: "text-sm font-medium text-zinc-900 dark:text-zinc-100 self-start",
            track: "relative h-3 w-full rounded-full border border-black/5 dark:border-white/10",
            thumb: [
                "z-10 h-5 w-5 rounded-full border-2 border-white bg-transparent shadow-md transition-[transform]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
                "hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing",
            ],
            valueLabel: "text-xs text-zinc-500 dark:text-zinc-400 tabular-nums",
        },
    },
    {
        twMerge: true,
    },
);

const { root, label, track, thumb, valueLabel } = sliderStyles();

export interface ColorSliderProps extends ComponentProps<typeof KColorSlider> {
    label?: string;
    showValue?: boolean;
}

export const ColorSlider = (props: ColorSliderProps) => {
    const [local, others] = splitProps(props, ["label", "showValue", "class"]);

    return (
        <KColorSlider class={root({ class: local.class })} {...others}>
            <div class="flex w-full justify-between items-center">
                {local.label && (
                    <KColorSlider.Label class={label()}>
                        {local.label}
                    </KColorSlider.Label>
                )}
                {local.showValue && (
                    <KColorSlider.ValueLabel class={valueLabel()} />
                )}
            </div>
            <KColorSlider.Track
                class={track()}
                style={{
                    background: "var(--kb-color-slider-track-background)",
                }}
            >
                <KColorSlider.Thumb class={thumb()}>
                    <KColorSlider.Input />
                </KColorSlider.Thumb>
            </KColorSlider.Track>
        </KColorSlider>
    );
};
