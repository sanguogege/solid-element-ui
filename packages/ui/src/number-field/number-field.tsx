import { NumberField as KNumberField } from "@kobalte/core/number-field";
import { splitProps, type ComponentProps, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { ChevronUp, ChevronDown } from "lucide-solid";

const numberFieldStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full antialiased",
            label: "text-sm font-medium text-slate-700 dark:text-slate-300 ml-1",
            container: [
                "relative flex items-center rounded-md border border-slate-200 bg-white transition-shadow shadow-sm",
                "focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
                "dark:bg-slate-950 dark:border-slate-800",
            ],
            input: "flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed",
            controls:
                "flex flex-col border-l border-slate-200 dark:border-slate-800",
            stepper: [
                "flex h-1/2 w-8 items-center justify-center transition-colors hover:bg-slate-50 active:bg-slate-100",
                "dark:hover:bg-slate-900 dark:active:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none",
            ],
            errorMessage: "text-xs text-red-500 font-medium ml-1 mt-1",
        },
    },
    {
        twMerge: true,
    },
);

type NumberFieldVariants = VariantProps<typeof numberFieldStyles>;

export interface NumberFieldProps
    extends Omit<ComponentProps<typeof KNumberField>, "class">,
        NumberFieldVariants {
    label?: string;
    description?: string;
    class?: string;
}

export const NumberField = (props: NumberFieldProps) => {
    // 严格处理属性，防止 TS 报错“已声明但未使用”
    const [local, others] = splitProps(props, [
        "label",
        "description",
        "class",
    ]);
    const s = numberFieldStyles();

    return (
        <KNumberField class={s.root({ class: local.class })} {...others}>
            <Show when={local.label}>
                <KNumberField.Label class={s.label()}>
                    {local.label}
                </KNumberField.Label>
            </Show>

            <div class={s.container()}>
                <KNumberField.Input class={s.input()} />
                <div class={s.controls()}>
                    <KNumberField.IncrementTrigger class={s.stepper()}>
                        <ChevronUp size={14} />
                    </KNumberField.IncrementTrigger>
                    <KNumberField.DecrementTrigger
                        class={s.stepper({
                            class: "border-t border-slate-200 dark:border-slate-800",
                        })}
                    >
                        <ChevronDown size={14} />
                    </KNumberField.DecrementTrigger>
                </div>
            </div>

            <Show when={local.description}>
                <KNumberField.Description class="text-xs text-slate-500 ml-1 mt-1" />
            </Show>
            <KNumberField.ErrorMessage class={s.errorMessage()} />
        </KNumberField>
    );
};
