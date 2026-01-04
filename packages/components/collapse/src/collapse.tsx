import {
    splitProps,
    type ParentComponent,
    createSignal,
    createMemo,
} from "solid-js";
import { cn } from "@/utils/cn";
import {
    CollapseContext,
    type CollapseProps,
    type CollapseContextValue,
} from "./setting";

export const SeCollapse: ParentComponent<CollapseProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "activeKey",
        "accordion",
        "ghost",
        "bordered",
        "expandIconPosition",
        "onChange",
    ]);

    const [internalKeys, setInternalKeys] = createSignal<string[]>(
        Array.isArray(local.activeKey)
            ? local.activeKey
            : local.activeKey
            ? [local.activeKey]
            : []
    );

    const activeKeys = createMemo(() =>
        local.activeKey !== undefined
            ? Array.isArray(local.activeKey)
                ? local.activeKey
                : [local.activeKey]
            : internalKeys()
    );

    const toggleKey = (key: string) => {
        let nextKeys: string[];
        if (local.accordion) {
            nextKeys = activeKeys().includes(key) ? [] : [key];
        } else {
            nextKeys = activeKeys().includes(key)
                ? activeKeys().filter((k) => k !== key)
                : [...activeKeys(), key];
        }
        setInternalKeys(nextKeys);
        local.onChange?.(local.accordion ? nextKeys[0] || "" : nextKeys);
    };

    const contextValue: CollapseContextValue = {
        activeKeys,
        toggleKey,
        expandIconPosition: () => local.expandIconPosition || "left",
        ghost: () => !!local.ghost,
    };

    return (
        <CollapseContext.Provider value={contextValue}>
            <div
                {...others}
                class={cn(
                    "bg-white rounded-lg",
                    local.bordered !== false &&
                        !local.ghost &&
                        "border border-[#f0f0f0]",
                    local.class
                )}
            >
                {local.children}
            </div>
        </CollapseContext.Provider>
    );
};
