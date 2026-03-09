import { Slider as KSlider } from "@kobalte/core/slider";
import { splitProps, type ComponentProps, For, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

// FIXME 点击轨道时报错

const sliderStyles = tv(
    {
        slots: {
            root: "relative flex flex-col items-center select-none touch-none w-full gap-2",
            labelWrapper: "flex w-full justify-between items-center",
            label: "text-sm font-medium text-muted",
            value: "text-sm text-muted font-mono",
            track: "relative h-2 w-full grow rounded-full bg-foreground",
            fill: "absolute h-full rounded-full ",
            thumb: [
                "block h-5 w-5 rounded-full border-2 bg-app ring-offset-white transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-95 transition-transform",
            ],
        },
        variants: {
            variant: {
                default: { fill: "bg-primary", thumb: "border-primary" },
                danger: { fill: "bg-danger", thumb: "border-danger" },
                warning: { fill: "bg-warning", thumb: "border-warning" },
                success: {
                    fill: "bg-success",
                    thumb: "border-success",
                },
            },
            size: {
                sm: { track: "h-1", thumb: "h-4 w-4" },
                md: { track: "h-2", thumb: "h-5 w-5" },
                lg: { track: "h-3", thumb: "h-6 w-6" },
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    },
    {
        twMerge: true,
    },
);

type SliderVariants = VariantProps<typeof sliderStyles>;

export interface SliderProps
    extends Omit<ComponentProps<typeof KSlider>, "class">,
        SliderVariants {
    label?: string;
    showValue?: boolean;
    class?: string;
}

export const Slider = (props: SliderProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["label", "showValue", "class"],
        ["variant", "size"]
    );

    const styles = sliderStyles(variantProps);

    return (
        <KSlider class={styles.root({ class: local.class })} {...others}>
            <Show when={local.label || local.showValue}>
                <div class={styles.labelWrapper()}>
                    <Show when={local.label}>
                        <KSlider.Label class={styles.label()}>
                            {local.label}
                        </KSlider.Label>
                    </Show>
                    <Show when={local.showValue}>
                        <KSlider.ValueLabel class={styles.value()} />
                    </Show>
                </div>
            </Show>

            <KSlider.Track class={styles.track()}>
                <KSlider.Fill class={styles.fill()} />
                <For each={others.value ?? [others.defaultValue]}>
                    {() => (
                        <KSlider.Thumb class={styles.thumb()}>
                            <KSlider.Input />
                        </KSlider.Thumb>
                    )}
                </For>
            </KSlider.Track>
        </KSlider>
    );
};
