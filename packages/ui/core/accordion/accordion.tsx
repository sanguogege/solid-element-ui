import { Accordion as KAccordion, type AccordionRootProps } from "@kobalte/core/accordion";
import { For, omit } from "solid-js";
import { ChevronDown } from "../icons";

import { cn } from "../../utils/cn";

// TODO  别忘记如何处理 后端返回的 带标签的数据？强制用户自己处理，组件只用处理jsx就可以了。

export interface AccordionProps extends AccordionRootProps {
  items: Array<any>;
  class?: string;
  itemClass?: string;
  headerClass?: string;
  triggerClass?: string;
  contentClass?: string;
  contentTextClass?: string;
  iconClass?: string;
}

export const Accordion = (props: AccordionProps) => {
  const others = omit(
    props,
    "items",
    "class",
    "itemClass",
    "headerClass",
    "triggerClass",
    "contentClass",
    "contentTextClass",
    "iconClass",
  );
  return (
    <KAccordion
      class={cn(
        " w-50 divide-y divide-base border border-base rounded-lg overflow-hidden",
        props.class,
      )}
      {...others}
    >
      <For each={props.items}>
        {(itemData) => (
          <KAccordion.Item
            value={itemData.value}
            disabled={itemData.disabled}
            class={cn("group", props.itemClass)}
          >
            <KAccordion.Header class={cn("flex", props.headerClass)}>
              <KAccordion.Trigger
                class={cn(
                  "flex flex-1 items-center justify-between cursor-pointer py-4 px-4 text-md font-medium transition-all bg-foreground hover:bg-foreground/80",
                  props.triggerClass,
                )}
              >
                {itemData.title}
                <ChevronDown
                  class={cn(
                    "h-4 w-4 transition-transform duration-200 group-data-expanded:rotate-180",
                    props.iconClass,
                  )}
                  aria-hidden="true"
                />
              </KAccordion.Trigger>
            </KAccordion.Header>
            <KAccordion.Content
              class={cn(
                "overflow-hidden text-md transition-all bg-transparent text-main ata-expanded:animate-accordion-down data-closed:animate-accordion-up",
                props.contentClass,
              )}
            >
              <p class={cn("p-4", props.contentTextClass)}>{itemData.content}</p>
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion>
  );
};
