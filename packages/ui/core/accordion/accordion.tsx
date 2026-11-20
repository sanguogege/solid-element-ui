import { Accordion as KAccordion, type AccordionRootProps } from "@kobalte/core/accordion";
import { For, omit } from "solid-js";

import { ChevronDown } from "@lucide/solid";
import { cn } from "cn";

// TODO  别忘记如何处理 后端返回的 带标签的数据？强制用户自己处理，组件只用处理jsx就可以了。

export interface AccordionProps extends AccordionRootProps {
  items: Array<any>;
  class?: string;
}

export const Accordion = (props: AccordionProps) => {
  const others = omit(
    props,
    "items",
    "class",
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
            data-slot="accordion-item" class="group"
          >
            <KAccordion.Header data-slot="accordion-header" class="flex">
              <KAccordion.Trigger
                data-slot="accordion-trigger" class="flex flex-1 items-center justify-between cursor-pointer py-4 px-4 text-md font-medium transition-all bg-foreground hover:bg-foreground/80"
              >
                {itemData.title}
                <ChevronDown
                  data-slot="accordion-icon" class="h-4 w-4 transition-transform duration-200 group-data-expanded:rotate-180"
                  aria-hidden="true"
                />
              </KAccordion.Trigger>
            </KAccordion.Header>
            <KAccordion.Content
              data-slot="accordion-content" class="overflow-hidden text-md transition-all bg-transparent text-main ata-expanded:animate-accordion-down data-closed:animate-accordion-up"
            >
              <p data-slot="accordion-content-text" class="p-4">{itemData.content}</p>
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion>
  );
};
