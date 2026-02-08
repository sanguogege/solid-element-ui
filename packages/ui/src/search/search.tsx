import { TextField as KSearch } from "@kobalte/core/text-field";
import { splitProps, type ComponentProps, Show } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { Search as SearchIcon, CircleX } from "lucide-solid";

const searchStyles = tv(
    {
        slots: {
            root: "relative flex flex-col gap-1.5 w-full",
            inputWrapper: "relative flex items-center transition-all",
            input: [
                "flex h-10 w-full rounded-md border border-slate-200 bg-white px-9 py-2 text-sm",
                "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2",
                "disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950",
            ],
            icon: "absolute left-3 h-4 w-4 text-slate-500 pointer-events-none",
            clear: "absolute right-3 h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors",
        },
        variants: {
            size: {
                sm: {
                    input: "h-8 text-xs px-8",
                    icon: "h-3.5 w-3.5",
                    clear: "h-3.5 w-3.5",
                },
                md: {
                    input: "h-10 text-sm",
                    icon: "h-4 w-4",
                    clear: "h-4 w-4",
                },
                lg: {
                    input: "h-12 text-base px-10",
                    icon: "h-5 w-5",
                    clear: "h-5 w-5",
                },
            },
            ringColor: {
                primary: { input: "focus-visible:ring-blue-500" },
                danger: { input: "focus-visible:ring-red-500" },
            },
        },
        defaultVariants: {
            size: "md",
            ringColor: "primary",
        },
    },
    {
        twMerge: true,
    },
);

type SearchVariants = VariantProps<typeof searchStyles>;

export interface SearchProps
    extends Omit<ComponentProps<typeof KSearch>, "class">, SearchVariants {
    class?: string;
    placeholder?: string;
    allowClear?: boolean;
    onClear?: () => void;
}

export const Search = (props: SearchProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "placeholder", "allowClear", "onClear", "value", "onChange"],
        ["size", "ringColor"],
    );

    const styles = searchStyles(variantProps);

    return (
        <KSearch
            class={styles.root({ class: local.class })}
            value={local.value}
            onChange={local.onChange}
            {...others}
        >
            <div class={styles.inputWrapper()}>
                <SearchIcon class={styles.icon()} />
                <KSearch.Input
                    class={styles.input()}
                    placeholder={local.placeholder ?? "搜索..."}
                />
                <Show when={local.allowClear && local.value}>
                    <button
                        onClick={() => local.onClear?.()}
                        class={styles.clear()}
                    >
                        <CircleX
                            fill="currentColor"
                            class="text-white dark:text-slate-950"
                        />
                    </button>
                </Show>
            </div>
        </KSearch>
    );
};
