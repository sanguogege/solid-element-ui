import { TextField as KTextField } from "@kobalte/core/text-field";
import { splitProps, type ComponentProps, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const textFieldStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full",
            label: "text-sm font-medium text-slate-700 dark:text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            input: [
                "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-shadow",
                "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                "disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950",
                "data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500",
            ],
            description: "text-xs text-slate-500 dark:text-slate-400",
            errorMessage:
                "text-xs text-red-500 animate-in fade-in-50 slide-in-from-top-1",
        },
        variants: {
            size: {
                sm: { input: "h-8 px-2 text-xs" },
                md: { input: "h-10 px-3 text-sm" },
                lg: { input: "h-12 px-4 text-base" },
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
    {
        twMerge: true,
    },
);

type TextFieldVariants = VariantProps<typeof textFieldStyles>;

export interface TextFieldProps
    extends Omit<ComponentProps<typeof KTextField>, "class">,
        TextFieldVariants {
    label?: string;
    description?: string;
    errorMessage?: string;
    placeholder?: string;
    type?: string;
    class?: string;
}

export const TextField = (props: TextFieldProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        [
            "label",
            "description",
            "errorMessage",
            "placeholder",
            "type",
            "class",
        ],
        ["size"]
    );

    const styles = textFieldStyles(variantProps);

    return (
        <KTextField
            class={styles.root({ class: local.class })}
            validationState={local.errorMessage ? "invalid" : "valid"}
            {...others}
        >
            <Show when={local.label}>
                <KTextField.Label class={styles.label()}>
                    {local.label}
                </KTextField.Label>
            </Show>

            <KTextField.Input
                class={styles.input()}
                type={local.type}
                placeholder={local.placeholder}
            />

            <Show when={local.description}>
                <KTextField.Description class={styles.description()}>
                    {local.description}
                </KTextField.Description>
            </Show>

            <Show when={local.errorMessage}>
                <KTextField.ErrorMessage class={styles.errorMessage()}>
                    {local.errorMessage}
                </KTextField.ErrorMessage>
            </Show>
        </KTextField>
    );
};
