import { ColorField as KColorField } from "@kobalte/core/color-field";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

const colorFieldStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full",
            label: "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none disabled:opacity-50",
            input: [
                "h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-all",
                "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                "data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300",
            ],
            description: "text-[0.8rem] text-zinc-500 dark:text-zinc-400",
            errorMessage: "text-[0.8rem] font-medium text-red-500",
        },
    },
    {
        twMerge: true,
    },
);

const { root, label, input, description, errorMessage } = colorFieldStyles();

export interface ColorFieldProps extends ComponentProps<typeof KColorField> {
    label?: string;
    desc?: string;
    error?: string;
}

export const ColorField = (props: ColorFieldProps) => {
    const [local, others] = splitProps(props, [
        "label",
        "desc",
        "error",
        "class",
    ]);

    return (
        <KColorField
            class={root({ class: local.class })}
            validationState={local.error ? "invalid" : "valid"}
            {...others}
        >
            {local.label && (
                <KColorField.Label class={label()}>
                    {local.label}
                </KColorField.Label>
            )}
            <KColorField.Input class={input()} placeholder="#FFFFFF" />
            {local.desc && !local.error && (
                <KColorField.Description class={description()}>
                    {local.desc}
                </KColorField.Description>
            )}
            <KColorField.ErrorMessage class={errorMessage()}>
                {local.error}
            </KColorField.ErrorMessage>
        </KColorField>
    );
};
