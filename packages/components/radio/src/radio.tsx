import { splitProps, type Component, Show, useContext } from "solid-js";
import { cn } from "@/utils/cn";
import { RadioGroupContext, type RadioProps } from "./setting";

export const SeRadio: Component<RadioProps> = (props) => {
    // 消费来自 SeRadioGroup 的 Context
    const group = useContext(RadioGroupContext);
    const [local, others] = splitProps(props, [
        "class",
        "label",
        "children",
        "value",
        "checked",
        "disabled",
    ]);

    // 状态计算逻辑
    const isChecked = () => {
        if (group && local.value !== undefined)
            return group.value() === local.value;
        return local.checked;
    };

    const isDisabled = () => group?.disabled() || local.disabled;

    return (
        <label
            class={cn(
                "inline-flex items-center cursor-pointer group select-none mr-4 last:mr-0",
                isDisabled() && "cursor-not-allowed opacity-50",
                local.class
            )}
        >
            <div class="relative flex items-center justify-center">
                {/* 原生隐藏 Input 用于状态联动 */}
                <input
                    type="radio"
                    name={group?.name() || others.name}
                    value={local.value}
                    checked={isChecked()}
                    disabled={isDisabled()}
                    onChange={() => {
                        if (local.value !== undefined)
                            group?.onChange(local.value);
                    }}
                    class="peer sr-only"
                    {...others}
                />

                {/* 外圈：Ant Design 5.0 风格 */}
                <div
                    class={cn(
                        "w-4 h-4 rounded-full border border-[#d9d9d9] bg-white transition-all duration-200",
                        "peer-checked:border-[#1677ff]",
                        "group-hover:border-[#1677ff]",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-[#1677ff]/30"
                    )}
                />

                {/* 内圆点：缩放动画 */}
                <div
                    class={cn(
                        "absolute w-2 h-2 rounded-full bg-[#1677ff] transition-all duration-200 transform scale-0 opacity-0",
                        "peer-checked:scale-100 peer-checked:opacity-100"
                    )}
                />
            </div>

            <Show when={local.label || local.children}>
                <span class="ml-2 text-[14px] text-[#000000d9]">
                    {local.label ?? local.children}
                </span>
            </Show>
        </label>
    );
};
