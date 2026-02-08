import { Popover as KPopover } from "@kobalte/core/popover";
import { CrossIcon } from "lucide-solid";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { tv } from "tailwind-variants";

// FIXME 与其他的气泡样式不统一的问题
// Description，而不是内敛。
// trigger用内部，而其他放在标签属性

const popoverStyles = tv(
    {
        slots: {
            content: [
                "z-50 w-72 rounded-md border bg-white p-4 shadow-md outline-none antialiased",
                "dark:bg-slate-950 dark:border-slate-800 dark:text-slate-50",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            arrow: "fill-white stroke-slate-200 dark:fill-slate-950 dark:stroke-slate-800",
        },
    },
    {
        twMerge: true,
    },
);

const {content, arrow} = popoverStyles();

export interface PopoverProps extends ComponentProps<typeof KPopover> {
    trigger: JSX.Element;
    title: string;
}

export const Popover = (props: PopoverProps) => {
    const [local, others] = splitProps(props, ["trigger", "children", "title"]);

    return (
        <KPopover {...others}>
            <KPopover.Trigger class="inline-flex">
                {local.trigger}
            </KPopover.Trigger>

            <KPopover.Portal>
                <KPopover.Content class={content()}>
                    <KPopover.Arrow class={arrow()} />

                    <div class="flex">
                        <KPopover.Title>{local.title}</KPopover.Title>
                        <KPopover.CloseButton>
                            <CrossIcon />
                        </KPopover.CloseButton>
                    </div>
                    <KPopover.Description>
                        {local.children}
                    </KPopover.Description>
                </KPopover.Content>
            </KPopover.Portal>
        </KPopover>
    );
};
