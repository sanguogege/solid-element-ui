import { Show, splitProps, type ParentComponent } from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { useFormContext } from "./form";
import { type FormItemProps } from "./setting";

export const SeFormItem: ParentComponent<FormItemProps> = (props) => {
    const ctx = useFormContext();
    const [local, others] = splitProps(props, [
        "label",
        "required",
        "error",
        "help",
        "children",
        "class",
    ]);

    // 这里的布局计算模拟 AntD 的网格系统逻辑
    const isHorizontal = () => ctx?.layout() === "horizontal";

    return (
        <div
            class={cn(
                "flex flex-col mb-4 last:mb-0",
                isHorizontal() && "flex-row items-start",
                local.class
            )}
            {...others}
        >
            {/* Label 部分 */}
            <Show when={local.label}>
                <div
                    class={cn(
                        "text-[14px] text-[#000000d9] pb-2 flex items-center",
                        isHorizontal() && "pb-0 pr-4 pt-1.5 shrink-0",
                        isHorizontal() &&
                            (ctx?.labelAlign() === "right"
                                ? "justify-end"
                                : "justify-start")
                    )}
                    style={
                        isHorizontal()
                            ? {
                                  width: `${
                                      (ctx?.labelCol().span || 0) * 4.16
                                  }%`,
                              }
                            : {}
                    }
                >
                    <Show when={local.required}>
                        <span class="text-[#ff4d4f] mr-1 font-serif">*</span>
                    </Show>
                    {local.label}
                </div>
            </Show>

            {/* 内容和错误反馈部分 */}
            <div
                class={cn("flex-1 min-w-0")}
                style={
                    isHorizontal()
                        ? { width: `${(ctx?.wrapperCol().span || 0) * 4.16}%` }
                        : {}
                }
            >
                <div
                    class={cn(
                        "relative",
                        local.error &&
                            "[&_input]:border-[#ff4d4f] [&_input]:focus:ring-[#ff4d4f]/10"
                    )}
                >
                    {local.children}
                </div>

                {/* 错误提示 - 仿 AntD 的渐现效果 */}
                <Show when={local.error}>
                    <div class="text-[#ff4d4f] text-[12px] pt-1 transition-all animate-in fade-in slide-in-from-top-1">
                        {local.error}
                    </div>
                </Show>

                {/* 辅助文本 */}
                <Show when={!local.error && local.help}>
                    <div class="text-[#00000073] text-[12px] pt-1">
                        {local.help}
                    </div>
                </Show>
            </div>
        </div>
    );
};
