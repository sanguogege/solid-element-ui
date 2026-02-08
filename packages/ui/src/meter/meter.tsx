import { Meter as KMeter } from "@kobalte/core/meter";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

// TODO 1. 格式

const meterStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-2 w-full antialiased",
            labelContainer:
                "flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300",
            track: "h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden",
            fill: "h-full transition-all duration-500 ease-out rounded-full",
        },
        variants: {
            color: {
                primary: { fill: "bg-blue-600" },
                success: { fill: "bg-emerald-500" },
                warning: { fill: "bg-amber-500" },
                danger: { fill: "bg-red-500" },
            },
        },
        defaultVariants: {
            color: "primary",
        },
    },
    {
        twMerge: true,
    },
);

type MeterVariants = VariantProps<typeof meterStyles>;

export const Meter = Object.assign(
    (props: ComponentProps<typeof KMeter> & MeterVariants) => {
        const [local, variantProps, others] = splitProps(
            props,
            ["class"],
            ["color"]
        );
        const s = () => meterStyles({ color: variantProps.color });

        return (
            <KMeter class={s().root({ class: local.class })} {...others}>
                {others.children}
            </KMeter>
        );
    },
    {
        Label: (props: ComponentProps<typeof KMeter.Label>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMeter.Label
                    class={meterStyles().labelContainer({ class: local.class })}
                    {...others}
                />
            );
        },
        ValueLabel: (props: ComponentProps<typeof KMeter.ValueLabel>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMeter.ValueLabel
                    class={`text-xs text-slate-500 ${local.class}`}
                    {...others}
                />
            );
        },
        Track: (props: ComponentProps<typeof KMeter.Track>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMeter.Track
                    class={meterStyles().track({ class: local.class })}
                    {...others}
                />
            );
        },
        Fill: (props: ComponentProps<typeof KMeter.Fill>) => {
            const [local, others] = splitProps(props, ["class"]);
            // 注意：Fill 不需要手动设置宽度，Kobalte 会通过 style 注入百分比
            return (
                <KMeter.Fill
                    class={meterStyles().fill({ class: local.class })}
                    {...others}
                />
            );
        },
    }
);
