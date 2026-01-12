import { Accordion as KAccordion } from "@kobalte/core/accordion";
import { splitProps, type ComponentProps } from "solid-js";
import { accordionVariants } from "./setting";
import { ChevronDown } from "lucide-solid";

const styles = accordionVariants();

// --- 扁平化组件定义 ---

export const AccordionRoot = (props: ComponentProps<typeof KAccordion>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KAccordion class={styles.root({ class: local.class })} {...others} />
    );
};

export const AccordionItem = (
    props: ComponentProps<typeof KAccordion.Item>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KAccordion.Item
            class={styles.item({ class: local.class })}
            {...others}
        />
    );
};

export const AccordionHeader = (
    props: ComponentProps<typeof KAccordion.Header>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KAccordion.Header
            class={styles.header({ class: local.class })}
            {...others}
        />
    );
};

export const AccordionTrigger = (
    props: ComponentProps<typeof KAccordion.Trigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KAccordion.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <ChevronDown class={styles.icon()} />
        </KAccordion.Trigger>
    );
};

export const AccordionContent = (
    props: ComponentProps<typeof KAccordion.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KAccordion.Content
            class={styles.content({ class: local.class })}
            {...others}
        >
            <div class={styles.contentInner()}>{local.children}</div>
        </KAccordion.Content>
    );
};

// --- 聚合导出 (Namespace) ---

export const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Header: AccordionHeader,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
});
