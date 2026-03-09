import { Tabs as KTabs } from "@kobalte/core/tabs";
import { splitProps, type JSX, For } from "solid-js";
import { tv } from "tailwind-variants";

const tabsStyles = tv(
    {
        slots: {
            root: "flex flex-col w-full",
            list: "relative flex items-center border-b border-base",
            trigger: [
                "relative flex h-9 items-center justify-center px-4 text-sm font-medium transition-colors outline-none select-none cursor-pointer",
                "text-muted hover:text-muted/80 ",
                "data-[selected]:text-main",
            ],
            indicator:
                "absolute bottom-[-1px] h-0.5 bg-reversal-bg transition-all duration-200",
            content:
                "mt-4 text-sm text-main focus-visible:outline-none",
        },
    },
    {
        twMerge: true,
    },
);

const { root, list, trigger, indicator, content } = tabsStyles();

export type TabItem = {
    value: string;
    label: string | JSX.Element;
    content: JSX.Element;
    disabled?: boolean;
};

interface TabsProps {
    items: TabItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    class?: string;
}

export const Tabs = (props: TabsProps) => {
    const [local, others] = splitProps(props, ["items", "class"]);

    return (
        <KTabs class={root({ class: local.class })} {...others}>
            <KTabs.List class={list()}>
                <For each={local.items}>
                    {(item) => (
                        <KTabs.Trigger
                            class={trigger()}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </KTabs.Trigger>
                    )}
                </For>
                <KTabs.Indicator class={indicator()} />
            </KTabs.List>

            <For each={local.items}>
                {(item) => (
                    <KTabs.Content class={content()} value={item.value}>
                        {item.content}
                    </KTabs.Content>
                )}
            </For>
        </KTabs>
    );
};
