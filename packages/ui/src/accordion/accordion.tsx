import { Accordion as KAccordion, type AccordionRootProps } from "@kobalte/core/accordion";
import { For, type JSX, splitProps } from "solid-js";
import { ChevronDown } from "lucide-solid";
import { tv, type VariantProps } from "tailwind-variants";

// 1. 定义样式
const accordionStyles = tv({
    slots: {
        root: "w-full divide-y divide-zinc-200 border-y border-zinc-200",
        item: "group",
        header: "flex my-0",
        trigger: [
            "flex flex-1 items-center justify-between py-4 px-2 text-sm font-medium transition-all hover:bg-zinc-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "data-[expanded]:text-blue-600",
        ],
        content: [
            "overflow-hidden text-sm text-zinc-600 transition-all bg-zinc-50/50",
            "data-[expanded]:animate-accordion-down data-[closed]:animate-accordion-up",
        ],
        contentInner: "pb-4 pt-0 px-4",
        icon: "h-4 w-4 transition-transform duration-200 group-data-[expanded]:rotate-180",
    },
});

const { root, item, header, trigger, content, contentInner, icon } =
    accordionStyles();

// 2. 类型定义
export interface AccordionItem {
    value: string;
    title: JSX.Element;
    content: JSX.Element;
    disabled?: boolean;
}

interface AccordionProps extends AccordionRootProps, VariantProps<typeof accordionStyles> {
    items: AccordionItem[];
    class?: string;
}

export const Accordion = (props: AccordionProps) => {
    const [local, others] = splitProps(props, ["items", "class"]);

    return (
        <KAccordion class={root({ class: local.class })} {...others}>
            <For each={local.items}>
                {(itemData) => (
                    <KAccordion.Item
                        value={itemData.value}
                        disabled={itemData.disabled}
                        class={item()}
                    >
                        <KAccordion.Header class={header()}>
                            <KAccordion.Trigger class={trigger()}>
                                {itemData.title}
                                <ChevronDown
                                    class={icon()}
                                    aria-hidden="true"
                                />
                            </KAccordion.Trigger>
                        </KAccordion.Header>

                        <KAccordion.Content class={content()}>
                            <div class={contentInner()}>{itemData.content}</div>
                        </KAccordion.Content>
                    </KAccordion.Item>
                )}
            </For>
        </KAccordion>
    );
};
