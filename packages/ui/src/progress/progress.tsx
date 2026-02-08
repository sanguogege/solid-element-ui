import { Progress as KProgress } from "@kobalte/core/progress";
import { splitProps, type ComponentProps, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

// FIXME  进度条问题，value 直接占满

const progressStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-2 w-full antialiased",
            labelContainer:
                "flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300",
            track: "h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden",
            fill: "h-full bg-blue-600 transition-all duration-300 ease-in-out data-[indeterminate]:animate-progress-indeterminate",
        },
        variants: {
            size: {
                sm: { track: "h-1" },
                md: { track: "h-2" },
                lg: { track: "h-3" },
            },
            radius: {
                none: { track: "rounded-none", fill: "rounded-none" },
                sm: { track: "rounded-sm", fill: "rounded-sm" },
                md: { track: "rounded-md", fill: "rounded-md" },
                lg: { track: "rounded-lg", fill: "rounded-lg" },
                full: { track: "rounded-full", fill: "rounded-full" },
            },
        },
        defaultVariants: {
            size: "md",
            radius: "full",
        },
    },
    {
        twMerge: true,
    },
);

type ProgressVariants = VariantProps<typeof progressStyles>;

export interface ProgressProps
    extends Omit<ComponentProps<typeof KProgress>, "children">,
        ProgressVariants {
    label?: string;
    showValue?: boolean;
}


export const Progress = (props: ProgressProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["label", "showValue", "class"],
        ["size", "radius"]
    );

    const { root, labelContainer, track, fill } = progressStyles({
        size: variantProps.size,
        radius: variantProps.radius,
    });

    return (
        <KProgress class={root({ class: local.class })} {...others}>
            <Show when={local.label || local.showValue}>
                <div class={labelContainer()}>
                    <Show when={local.label}>
                        <KProgress.Label>{local.label}</KProgress.Label>
                    </Show>
                    <Show when={local.showValue}>
                        <KProgress.ValueLabel class="text-xs text-slate-500" />
                    </Show>
                </div>
            </Show>

            <KProgress.Track class={track()}>
                <KProgress.Fill
                    class={fill()}
                    style={{ width: "var(--kb-progress-fill-width)" }}
                />
            </KProgress.Track>
        </KProgress>
    );
};
