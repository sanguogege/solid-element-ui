import { Tabs as KTabs } from "@kobalte/core/tabs";
import { splitProps, type JSX, For } from "solid-js";
import { tv } from "tailwind-variants";

const tabsStyles = tv(
    {
        slots: {
            root: "flex flex-col w-full",
            list: "relative flex items-center border-b border-zinc-200 dark:border-zinc-800",
            trigger: [
                "relative flex h-9 items-center justify-center px-4 text-sm font-medium transition-colors outline-none select-none cursor-pointer",
                "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                "data-[selected]:text-zinc-950 dark:data-[selected]:text-zinc-50",
            ],
            indicator:
                "absolute bottom-[-1px] h-0.5 bg-zinc-950 dark:bg-zinc-50 transition-all duration-200",
            content:
                "mt-4 text-sm text-zinc-600 dark:text-zinc-400 focus-visible:outline-none",
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
