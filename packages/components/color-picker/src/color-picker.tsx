import { splitProps, type Component, Show } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type ColorPickerProps } from "./setting";

// TODO 十六进制的颜色设置

export const SeColorPicker: Component<ColorPickerProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "label",
        "size",
        "showValue",
        "value",
    ]);

    const sizeMap = {
        sm: "h-6 w-6 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
    };

    return (
        <div class={cn("inline-flex items-center gap-2", local.class)}>
            <div
                class={cn(
                    "relative flex items-center justify-center rounded-(--radius,4px) border border-gray-300 p-1 bg-white ring-offset-2 transition-shadow focus-within:ring-2 focus-within:ring-blue-500/50",
                    local.size === "sm" ? "p-0.5" : "p-1"
                )}
            >
                {/* 颜色预览方块 */}
                <div
                    class={cn(
                        "rounded-[calc(var(--radius,4px)-2px)] shrink-0",
                        sizeMap[local.size ?? "md"]
                    )}
                    style={{
                        "background-color":
                            (local.value as string) || "#000000",
                    }}
                />

                {/* 隐藏的原生 Input，通过 absolute 铺满父级 */}
                <input
                    type="color"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer peer"
                    value={local.value}
                    {...others}
                />

                {/* 边框反馈：当原生 input 交互时，父级边框变色 */}
                <div class="absolute inset-0 rounded-(--radius,4px) border border-transparent pointer-events-none peer-hover:border-blue-400 transition-colors" />
            </div>

            {/* 标签与数值显示 */}
            <div class="flex flex-col justify-center">
                <Show when={local.label}>
                    <span class="text-sm font-medium text-gray-700 leading-none mb-1">
                        {local.label}
                    </span>
                </Show>
                <Show when={local.showValue}>
                    <span class="font-mono text-gray-500 uppercase leading-none">
                        {local.value || "#000000"}
                    </span>
                </Show>
            </div>
        </div>
    );
};
