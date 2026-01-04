import { splitProps, type ParentComponent, Show, useContext } from "solid-js";
import { cn } from "@/utils/cn";
import {
    DescriptionContext,
    type DescriptionProps,
    type DescriptionContextValue,
} from "./setting";

export const SeDescription: ParentComponent<DescriptionProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "title",
        "extra",
        "bordered",
        "column",
        "layout",
        "size",
    ]);

    const contextValue: DescriptionContextValue = {
        bordered: () => !!local.bordered,
        layout: () => local.layout || "horizontal",
        column: () => local.column || 3,
        size: () => local.size || "default",
    };

    return (
        <DescriptionContext.Provider value={contextValue}>
            <div {...others} class={cn("w-full text-[14px]", local.class)}>
                {/* Header */}
                <Show when={local.title || local.extra}>
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-[16px] font-semibold text-[#000000d9]">
                            {local.title}
                        </div>
                        <Show when={local.extra}>
                            <div class="text-[#1677ff]">{local.extra}</div>
                        </Show>
                    </div>
                </Show>

                {/* Grid Container */}
                <div
                    class={cn(
                        "grid w-full",
                        local.bordered &&
                            "border-t border-l border-[#f0f0f0] rounded-sm overflow-hidden"
                    )}
                    style={{
                        "grid-template-columns": `repeat(${contextValue.column()}, minmax(0, 1fr))`,
                    }}
                >
                    {local.children}
                </div>
            </div>
        </DescriptionContext.Provider>
    );
};
