import {
    splitProps,
    type Component,
    createSignal,
    For,
    Show,
    onCleanup,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type MentionsProps, type MentionOption } from "./setting";

export const SeMentions: Component<MentionsProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "options",
        "prefix",
        "value",
        "onChange",
        "error",
        "size",
    ]);

    const [isOpen, setIsOpen] = createSignal(false);
    const [filterText, setFilterText] = createSignal("");
    const [activeIndex, setActiveIndex] = createSignal(0);
    const prefix = () => local.prefix || "@";

    let textareaRef: HTMLTextAreaElement | undefined;

    // 核心逻辑：过滤选项
    const filteredOptions = () => {
        return local.options.filter((opt) =>
            opt.label.toLowerCase().includes(filterText().toLowerCase())
        );
    };

    // 处理输入
    const handleInput = (
        e: InputEvent & { currentTarget: HTMLTextAreaElement }
    ) => {
        const val = e.currentTarget.value;
        local.onChange?.(val);

        const selectionStart = e.currentTarget.selectionStart;
        const textBeforeCursor = val.slice(0, selectionStart);
        const lastPrefixIndex = textBeforeCursor.lastIndexOf(prefix());

        // 检查光标是否在触发词之后
        if (lastPrefixIndex !== -1) {
            const query = textBeforeCursor.slice(lastPrefixIndex + 1);
            // 如果查询词包含空格，则关闭面板
            if (!query.includes(" ")) {
                setFilterText(query);
                setIsOpen(true);
                setActiveIndex(0);
                return;
            }
        }
        setIsOpen(false);
    };

    // 选择选项
    const selectOption = (option: MentionOption) => {
        if (!textareaRef) return;
        const val = textareaRef.value;
        const start = textareaRef.selectionStart;
        const textBefore = val.slice(0, start);
        const textAfter = val.slice(start);
        const lastPrefixIndex = textBefore.lastIndexOf(prefix());

        const newValue =
            textBefore.slice(0, lastPrefixIndex + 1) +
            option.value +
            " " +
            textAfter;

        local.onChange?.(newValue);
        setIsOpen(false);
        textareaRef.focus();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isOpen()) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) => (prev + 1) % filteredOptions().length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex(
                    (prev) =>
                        (prev - 1 + filteredOptions().length) %
                        filteredOptions().length
                );
            } else if (e.key === "Enter") {
                e.preventDefault();
                const opt = filteredOptions()[activeIndex()];
                if (opt) selectOption(opt);
            } else if (e.key === "Escape") {
                setIsOpen(false);
            }
        }
    };

    const sizeMap = {
        sm: "min-h-[24px] text-sm px-2 py-1",
        md: "min-h-[32px] text-[14px] px-3 py-1.5",
        lg: "min-h-[40px] text-base px-4 py-2",
    };

    return (
        <div class={cn("relative w-full", local.class)}>
            <textarea
                {...others}
                ref={textareaRef}
                value={local.value || ""}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)} // 延时关闭以允许点击列表
                class={cn(
                    "w-full bg-white border border-[#d9d9d9] rounded-md transition-all duration-200 outline-none resize-none",
                    "placeholder:text-[#bfbfbf] text-[#000000d9]",
                    "hover:border-[#4096ff]",
                    "focus:border-[#1677ff] focus:ring-[3px] focus:ring-[#1677ff]/10",
                    local.error && "border-[#ff4d4f] focus:ring-[#ff4d4f]/10",
                    sizeMap[local.size ?? "md"]
                )}
            />

            {/* 下拉选择列表 - AntD 风格 */}
            <Show when={isOpen() && filteredOptions().length > 0}>
                <div class="absolute z-50 bottom-full mb-1 w-48 bg-white border border-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div class="max-h-60 overflow-y-auto p-1">
                        <For each={filteredOptions()}>
                            {(option, index) => (
                                <div
                                    onClick={() => selectOption(option)}
                                    onMouseEnter={() => setActiveIndex(index())}
                                    class={cn(
                                        "px-3 py-2 text-[14px] cursor-pointer rounded transition-colors",
                                        activeIndex() === index()
                                            ? "bg-[#f5f5f5] text-[#1677ff]"
                                            : "text-[#000000d9]"
                                    )}
                                >
                                    {option.label}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
};
