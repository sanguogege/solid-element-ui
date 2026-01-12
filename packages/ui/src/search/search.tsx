import { TextField as KTextField } from "@kobalte/core/text-field";
import { splitProps, type ComponentProps, Show } from "solid-js";
import { searchVariants } from "./setting";
import { Search as SearchIcon, X } from "lucide-solid";

const styles = searchVariants();

// --- 扁平化组件定义 ---

export const SearchRoot = (props: ComponentProps<typeof KTextField>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField class={styles.root({ class: local.class })} {...others} />
    );
};

export const SearchLabel = (props: ComponentProps<typeof KTextField.Label>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTextField.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

interface SearchInputProps extends ComponentProps<typeof KTextField.Input> {
    onClear?: () => void;
    showClear?: boolean;
}

export const SearchInput = (props: SearchInputProps) => {
    const [local, others] = splitProps(props, [
        "class",
        "onClear",
        "showClear",
    ]);

    return (
        <div class={styles.container()}>
            <SearchIcon class={styles.icon()} />
            <KTextField.Input
                type="search"
                class={styles.input({ class: local.class })}
                {...others}
            />
            <Show when={local.showClear}>
                <button
                    type="button"
                    onClick={() => local.onClear?.()}
                    class={styles.clear()}
                >
                    <X class="h-4 w-4" />
                </button>
            </Show>
        </div>
    );
};

// --- 聚合导出 (Namespace) ---

export const Search = Object.assign(SearchRoot, {
    Label: SearchLabel,
    Input: SearchInput,
    Description: KTextField.Description,
    ErrorMessage: KTextField.ErrorMessage,
});
