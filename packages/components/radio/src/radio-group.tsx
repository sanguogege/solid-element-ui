import { splitProps, type ParentComponent } from "solid-js";
import { cn } from "@/utils/cn";
import {
    RadioGroupContext,
    type RadioGroupProps,
    type RadioGroupContextValue,
} from "./setting";

export const SeRadioGroup: ParentComponent<RadioGroupProps> = (props) => {
    const [local, others] = splitProps(props, [
        "value",
        "onChange",
        "name",
        "disabled",
        "children",
        "class",
    ]);

    // 构造上下文数据
    const contextValue: RadioGroupContextValue = {
        value: () => local.value,
        onChange: (val: string | number) => local.onChange?.(val),
        name: () => local.name,
        disabled: () => !!local.disabled,
    };

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div
                {...others}
                class={cn(
                    "inline-flex flex-wrap items-center gap-2",
                    local.class
                )}
            >
                {local.children}
            </div>
        </RadioGroupContext.Provider>
    );
};
