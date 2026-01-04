import { splitProps, type Component, createSignal, For, Show } from "solid-js";
import { cn } from "@/utils/cn";
import { type InputTagProps } from "./setting";

export const SeInputTag: Component<InputTagProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "value",
        "onChange",
        "placeholder",
        "disabled",
        "error",
        "size",
    ]);

    const [inputValue, setInputValue] = createSignal("");
    let inputRef: HTMLInputElement | undefined;

    const tags = () => local.value || [];

    // 添加标签逻辑
    const addTag = () => {
        const val = inputValue().trim();
        if (val && !tags().includes(val)) {
            const newTags = [...tags(), val];
            local.onChange?.(newTags);
            setInputValue("");
        }
    };

    // 删除指定标签
    const removeTag = (index: number) => {
        const newTags = tags().filter((_, i) => i !== index);
        local.onChange?.(newTags);
    };

    // 处理键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        } else if (
            e.key === "Backspace" &&
            inputValue() === "" &&
            tags().length > 0
        ) {
            removeTag(tags().length - 1);
        }
    };

    const sizeMap = {
        sm: "min-h-[24px] text-sm py-0.5 px-1.5",
        md: "min-h-[32px] text-[14px] py-1 px-2",
        lg: "min-h-[40px] text-base py-1.5 px-3",
    };

    return (
        <div
            onClick={() => inputRef?.focus()}
            class={cn(
                // 容器样式：模拟 AntD Input
                "flex flex-wrap items-center gap-1.5 w-full bg-white border border-[#d9d9d9] rounded-[6px] transition-all duration-200 cursor-text",
                "hover:border-[#4096ff]",
                "focus-within:border-[#1677ff] focus-within:ring-[3px] focus-within:ring-[#1677ff]/10",
                local.error &&
                    "border-[#ff4d4f] focus-within:border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10",
                local.disabled && "bg-[#f5f5f5] cursor-not-allowed",
                sizeMap[local.size ?? "md"],
                local.class
            )}
        >
            {/* 已渲染的标签列表 */}
            <For each={tags()}>
                {(tag, index) => (
                    <span class="flex items-center gap-1 bg-[#f5f5f5] border border-[#f0f0f0] rounded-[4px] px-2 py-0.5 text-[#000000d9] text-[12px] animate-in fade-in zoom-in-95 duration-200">
                        {tag}
                        <Show when={!local.disabled}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTag(index());
                                }}
                                class="hover:text-[#ff4d4f] transition-colors flex items-center justify-center"
                            >
                                <svg
                                    class="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Show>
                    </span>
                )}
            </For>

            {/* 隐形输入框 */}
            <input
                ref={inputRef}
                disabled={local.disabled}
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                placeholder={tags().length === 0 ? local.placeholder : ""}
                class="flex-1 min-w-[60px] bg-transparent border-none outline-none text-[#000000d9] placeholder:text-[#bfbfbf]"
                style={{ height: "100%" }}
            />
        </div>
    );
};
