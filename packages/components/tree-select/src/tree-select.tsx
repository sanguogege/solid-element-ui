import {
    splitProps,
    type Component,
    createSignal,
    For,
    Show,
    onCleanup
} from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type TreeSelectProps, type TreeOption } from "./setting";

// 递归项组件
const TreeItem: Component<{
    item: TreeOption;
    level: number;
    selectedValue?: string | number;
    onSelect: (item: TreeOption) => void;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(true);
    const hasChildren = () =>
        !!(props.item.children && props.item.children.length > 0);

    return (
        <div>
            <div
                class={cn(
                    "flex items-center px-3 py-1.5 cursor-pointer transition-colors text-[14px]",
                    props.item.value === props.selectedValue
                        ? "bg-[#e6f4ff] text-[#1677ff] font-medium"
                        : "hover:bg-[#f5f5f5] text-[#000000d9]",
                    props.item.disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{ "padding-left": `${props.level * 16 + 12}px` }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!props.item.disabled) props.onSelect(props.item);
                }}
            >
                {/* 展开/收起箭头 */}
                <div
                    class="w-4 h-4 flex items-center justify-center mr-1 transition-transform"
                    style={{
                        transform: isOpen() ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen());
                    }}
                >
                    <Show when={hasChildren()}>
                        <svg
                            class="w-3 h-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Show>
                </div>
                <span class="truncate">{props.item.label}</span>
            </div>

            {/* 递归渲染子节点 */}
            <Show when={hasChildren() && isOpen()}>
                <For each={props.item.children}>
                    {(child) => (
                        <TreeItem
                            item={child}
                            level={props.level + 1}
                            selectedValue={props.selectedValue}
                            onSelect={props.onSelect}
                        />
                    )}
                </For>
            </Show>
        </div>
    );
};

export const SeTreeSelect: Component<TreeSelectProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "value",
        "options",
        "placeholder",
        "disabled",
        "error",
        "size",
        "onChange",
    ]);

    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;

    // 递归查找当前选中的 Label
    const findLabel = (
        options: TreeOption[],
        val?: string | number
    ): string => {
        for (const opt of options) {
            if (opt.value === val) return opt.label;
            if (opt.children) {
                const found = findLabel(opt.children, val);
                if (found) return found;
            }
        }
        return "";
    };

    const selectedLabel = () => findLabel(local.options, local.value);

    // 点击外部关闭
    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef && !containerRef.contains(e.target as Node))
            setIsOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    onCleanup(() => window.removeEventListener("click", handleClickOutside));

    const sizeMap = {
        sm: "h-6 text-sm px-2",
        md: "h-8 text-[14px] px-3",
        lg: "h-10 text-base px-4",
    };

    return (
        <div
            ref={containerRef}
            class={cn("relative inline-block w-full select-none", local.class)}
            {...others}
        >
            {/* 触发区域 */}
            <div
                onClick={() => !local.disabled && setIsOpen(!isOpen())}
                class={cn(
                    "flex items-center justify-between bg-white border border-[#d9d9d9] rounded-[6px] transition-all duration-200 cursor-pointer",
                    "hover:border-[#4096ff]",
                    isOpen() &&
                        "border-[#1677ff] ring-[3px] ring-[#1677ff]/10 shadow-sm",
                    local.disabled &&
                        "bg-[#f5f5f5] cursor-not-allowed opacity-60",
                    local.error &&
                        "border-[#ff4d4f] focus-within:ring-[#ff4d4f]/10",
                    sizeMap[local.size ?? "md"]
                )}
            >
                <span
                    class={cn("truncate", !selectedLabel() && "text-[#bfbfbf]")}
                >
                    {selectedLabel() || local.placeholder || "请选择"}
                </span>
                <svg
                    class={cn(
                        "w-3 h-3 text-[#00000040] transition-transform",
                        isOpen() && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {/* 树形下拉面板 */}
            <Show when={isOpen()}>
                <div class="absolute z-50 mt-1 w-full bg-white border border-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] rounded-lg py-1 max-h-[300px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <For each={local.options}>
                        {(option) => (
                            <TreeItem
                                item={option}
                                level={0}
                                selectedValue={local.value}
                                onSelect={(item) => {
                                    local.onChange?.(item.value, item.label);
                                    setIsOpen(false);
                                }}
                            />
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};
