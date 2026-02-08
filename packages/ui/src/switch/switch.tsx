import { Switch as KSwitch } from "@kobalte/core/switch";
import { splitProps, type ComponentProps, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const switchStyles = tv(
    {
        slots: {
            root: "inline-flex items-center gap-2 group",
            control: [
                "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "bg-slate-200 dark:bg-slate-800 data-[checked]:bg-blue-600 dark:data-[checked]:bg-blue-500",
            ],
            thumb: [
                "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                "data-[checked]:translate-x-5 translate-x-0",
            ],
            label: "text-sm font-medium leading-none group-data-[disabled]:opacity-70",
            description: "text-xs text-slate-500 dark:text-slate-400",
        },
        variants: {
            size: {
                sm: {
                    control: "h-5 w-9",
                    thumb: "h-4 w-4 data-[checked]:translate-x-4",
                },
                md: {
                    control: "h-6 w-11",
                    thumb: "h-5 w-5 data-[checked]:translate-x-5",
                },
                lg: {
                    control: "h-7 w-13",
                    thumb: "h-6 w-6 data-[checked]:translate-x-6",
                },
            },
            variant: {
                primary: {
                    control:
                        "data-[checked]:bg-blue-600 dark:data-[checked]:bg-blue-500",
                },
                success: {
                    control:
                        "data-[checked]:bg-emerald-600 dark:data-[checked]:bg-emerald-500",
                },
                danger: {
                    control:
                        "data-[checked]:bg-red-600 dark:data-[checked]:bg-red-500",
                },
            },
        },
        defaultVariants: {
            size: "md",
            variant: "primary",
        },
    },
    {
        twMerge: true,
    },
);

type SwitchVariants = VariantProps<typeof switchStyles>;

export interface SwitchProps
    extends Omit<ComponentProps<typeof KSwitch>, "class">,
        SwitchVariants {
    label?: string;
    description?: string;
    class?: string;
}

export const Switch = (props: SwitchProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["label", "description", "class"],
        ["size", "variant"]
    );

    const styles = switchStyles(variantProps);

    return (
        <KSwitch class={styles.root({ class: local.class })} {...others}>
            <KSwitch.Input />
            <KSwitch.Control class={styles.control()}>
                <KSwitch.Thumb class={styles.thumb()} />
            </KSwitch.Control>

            <Show when={local.label || local.description}>
                <div class="flex flex-col gap-0.5">
                    <Show when={local.label}>
                        <KSwitch.Label class={styles.label()}>
                            {local.label}
                        </KSwitch.Label>
                    </Show>
                    <Show when={local.description}>
                        <KSwitch.Description class={styles.description()}>
                            {local.description}
                        </KSwitch.Description>
                    </Show>
                </div>
            </Show>
        </KSwitch>
    );
};
