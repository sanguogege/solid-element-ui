import { ColorChannelField as KColorChannelField } from "@kobalte/core/color-channel-field";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

const fieldStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full",
            label: "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none",
            input: [
                "h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors",
                "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300",
            ],
        },
    },
    {
        twMerge: true,
    },
);

const { root, label, input } = fieldStyles();

export interface ColorChannelFieldProps
    extends ComponentProps<typeof KColorChannelField> {
    label?: string;
}


// TODO channel 问题

export const ColorChannelField = (props: ColorChannelFieldProps) => {
    const [local, others] = splitProps(props, ["label", "class"]);

    return (
        <KColorChannelField class={root({ class: local.class })} {...others}>
            {local.label && (
                <KColorChannelField.Label class={label()}>
                    {local.label}
                </KColorChannelField.Label>
            )}
            <KColorChannelField.Input class={input()} />
        </KColorChannelField>
    );
};
