import {
    createSignal,
    createMemo,
    For,
    Show,
    onMount,
    onCleanup,
    splitProps,
    type Component,
} from "solid-js";
import { type AutocompleteProps, type AutocompleteOption } from "./setting";
import { cn } from "@/utils/cn";

const customAttributes = [
    "options",
    "onSelect",
    "onInputChange",
    "filterOption",
    "class",
    "value",
] as const;

export const SeAutocomplete: Component<AutocompleteProps> = (props) => {
    // 1. 分离自定义属性
    const [local, others] = splitProps(props, customAttributes);

    // 状态管理
    const [inputValue, setInputValue] = createSignal(
        local.value?.toString() || ""
    );
    const [isOpen, setIsOpen] = createSignal(false);
    const [highlightIndex, setHighlightIndex] = createSignal(-1);

    // 引用定义
    let containerRef: HTMLDivElement | undefined;
    let listRef: HTMLUListElement | undefined;

    // 2. 响应式计算过滤后的列表
    const filteredOptions = createMemo(() => {
        const val = inputValue().toLowerCase();
        if (!val) return [];
        if (local.filterOption) {
            return local.options.filter((opt) => local.filterOption!(val, opt));
        }
        return local.options.filter((opt) =>
            (opt.label || opt.value).toLowerCase().includes(val)
        );
    });

    // 3. 辅助函数：确保高亮项在滚动视图内
    const scrollIntoView = (index: number) => {
        requestAnimationFrame(() => {
            if (!listRef) return;
            const activeItem = listRef.children[index] as HTMLElement;
            if (activeItem) {
                activeItem.scrollIntoView({ block: "nearest" });
            }
        });
    };

    // 4. 事件处理
    const handleInput = (
        e: InputEvent & { currentTarget: HTMLInputElement }
    ) => {
        const val = e.currentTarget.value;
        setInputValue(val);
        setIsOpen(true);
        setHighlightIndex(-1); // 输入时重置高亮
        local.onInputChange?.(val);
    };

    const selectOption = (option: AutocompleteOption) => {
        setInputValue(option.value);
        setIsOpen(false);
        setHighlightIndex(-1);
        local.onSelect?.(option);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen() || filteredOptions().length === 0) return;

        const len = filteredOptions().length;

        if (e.key === "ArrowDown") {
            e.preventDefault(); // 阻止浏览器默认滚动
            const nextIndex = (highlightIndex() + 1) % len;
            setHighlightIndex(nextIndex);
            scrollIntoView(nextIndex);
        } else if (e.key === "ArrowUp") {
            e.preventDefault(); // 阻止光标跳到开头
            const nextIndex = (highlightIndex() - 1 + len) % len;
            setHighlightIndex(nextIndex);
            scrollIntoView(nextIndex);
        } else if (e.key === "Enter") {
            if (highlightIndex() >= 0) {
                e.preventDefault();
                selectOption(filteredOptions()[highlightIndex()]);
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    // 5. 点击外部自动关闭
    onMount(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (containerRef && !containerRef.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", onClickOutside);
        onCleanup(() => document.removeEventListener("click", onClickOutside));
    });

    return (
        <div
            ref={containerRef}
            class={cn("se-autocomplete relative w-full", local.class)}
        >
            <input
                {...others}
                type="text"
                value={inputValue()}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                class="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:border-blue-500 transition-colors"
                autocomplete="off"
                aria-expanded={isOpen()}
                role="combobox"
            />

            <Show when={isOpen() && filteredOptions().length > 0}>
                <ul
                    ref={listRef}
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto py-1 list-none"
                >
                    <For each={filteredOptions()}>
                        {(option, index) => (
                            <li
                                onClick={() => selectOption(option)}
                                onMouseEnter={() => setHighlightIndex(index())}
                                class={cn(
                                    "px-4 py-2 cursor-pointer transition-colors text-sm",
                                    highlightIndex() === index()
                                        ? "bg-blue-50 text-blue-600 font-medium"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                {option.label || option.value}
                            </li>
                        )}
                    </For>
                </ul>
            </Show>
        </div>
    );
};
