import { Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { Check } from "lucide-solid";

// TODO 添加checkbox 的几种形状尺寸,看情况吧


const checkboxStyles = tv(
    {
        slots: {
            root: "group flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            control: [
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-zinc-300 transition-all",
                "group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-zinc-950",
                "data-[checked]:bg-zinc-900 data-[checked]:border-zinc-900 data-[checked]:text-zinc-50",
                "data-[disabled]:bg-zinc-400 data-[disabled]:border-zinc-400",
                "dark:border-zinc-700 dark:data-[checked]:bg-zinc-50 dark:data-[checked]:text-zinc-900 dark:group-focus-visible:ring-zinc-300",
            ],
            label: "text-sm font-medium leading-none select-none data-[disabled]:text-zinc-400",
            indicator: "h-3.5 w-3.5",
            description: "text-sm text-zinc-500",
            errorMessage: "text-sm text-red-500",
        },
    },
    {
        twMerge: true,
    },
);

const { root, control, label, indicator, description, errorMessage } = checkboxStyles();
export interface CheckboxProps extends ComponentProps<typeof KCheckbox> {
    label?: JSX.Element;
}

export const Checkbox = (props: CheckboxProps) => {
    const [local, others] = splitProps(props, [
        "label",
        "class",
        "description",
        "errorMessage",
    ]);

    return (
        <KCheckbox class={root({ class: local.class })} {...others}>
            <KCheckbox.Input />
            <KCheckbox.Control class={control()}>
                <KCheckbox.Indicator class={indicator()}>
                    <Check class={indicator()} stroke-width={3} />
                </KCheckbox.Indicator>
            </KCheckbox.Control>
            {local.label && (
                <KCheckbox.Label class={label()}>{local.label}</KCheckbox.Label>
            )}
            <KCheckbox.Description class={description()}>
                {local.description}
            </KCheckbox.Description>
            <KCheckbox.ErrorMessage class={errorMessage()}>
                {local.errorMessage}
            </KCheckbox.ErrorMessage>
        </KCheckbox>
    );
};
