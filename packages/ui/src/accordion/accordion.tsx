import {
    Accordion as KAccordion,
    type AccordionRootProps,
} from "@kobalte/core/accordion";
import { For, type JSX, splitProps } from "solid-js";
import { ChevronDown } from "lucide-solid";
import { tv, type VariantProps } from "tailwind-variants";

// 1. 定义样式
const accordionStyles = tv(
    {
        slots: {
            root: "w-full divide-y divide-base border border-base rounded-lg overflow-hidden",
            item: "group",
            header: "flex",
            trigger: [
                "flex flex-1 items-center justify-between cursor-pointer py-4 px-4 text-md font-medium transition-all ",
                "bg-foreground hover:bg-foreground/80",
            ],
            content: [
                "overflow-hidden text-md transition-all bg-transparent text-main",
                "data-[expanded]:animate-accordion-down data-[closed]:animate-accordion-up",
            ],
            contentInner: "pb-4 pt-2 px-4",
            icon: "h-4 w-4 transition-transform duration-200 group-data-[expanded]:rotate-180",
        },
    },
    {
        twMerge: true,
    },
);

const { root, item, header, trigger, content, contentInner, icon } =
    accordionStyles();

// 2. 类型定义
export interface AccordionItem {
    value: string;
    title: JSX.Element;
    content: JSX.Element;
    disabled?: boolean;
}

interface AccordionProps
    extends AccordionRootProps, VariantProps<typeof accordionStyles> {
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
