import { Collapsible as KCollapsible } from "@kobalte/core/collapsible";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";
import { ChevronDown } from "lucide-solid";

const collapsibleStyles = tv(
    {
        slots: {
            root: "w-full space-y-2",
            trigger:
                "flex w-full items-center justify-between border border-base/30 bg-foreground px-4 py-2 text-sm font-medium hover:bg-foreground/80  transition-all group mb-0",
            content:
                "overflow-hidden text-sm transition-all data-[expanded]:animate-collapsible-down data-[closed]:animate-collapsible-up",
            contentInner:
                "px-4 py-3 text-main border border-base/20 !border-t-0",
            icon: "h-4 w-4 text-zinc-500 transition-transform duration-200 group-data-[expanded]:rotate-180",
        },
    },
    {
        twMerge: true,
    },
);

const { root, trigger, content, contentInner, icon } = collapsibleStyles();

interface CollapsibleProps extends ComponentProps<typeof KCollapsible> {
    title: JSX.Element;
    children: JSX.Element;
}

export const Collapsible = (props: CollapsibleProps) => {
    const [local, others] = splitProps(props, ["title", "children", "class"]);

    return (
        <KCollapsible class={root({ class: local.class })} {...others}>
            <KCollapsible.Trigger class={trigger()}>
                <span>{local.title}</span>
                <ChevronDown class={icon()} />
            </KCollapsible.Trigger>

            <KCollapsible.Content class={content()}>
                <div class={contentInner()}>{local.children}</div>
            </KCollapsible.Content>
        </KCollapsible>
    );
};
