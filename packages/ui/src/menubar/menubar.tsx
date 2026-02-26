import { Menubar as KMenubar } from "@kobalte/core/menubar";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

// TODO 1. 格式

const menubarStyles = tv(
    {
        slots: {
            root: "flex h-10 items-center space-x-1 rounded-md border bg-white p-1 shadow-sm dark:bg-slate-950 dark:border-slate-800",
            trigger:
                "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-800 dark:data-[state=open]:bg-slate-800",
            content: [
                "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:bg-slate-950 dark:border-slate-800 animate-in fade-in zoom-in-95",
                "border-zinc-200 dark:border-zinc-600",
                "data-[expanded]:animate-in data-[closed]:animate-out",
            ],
            item: [
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ",

                "focus:bg-slate-100 data-[disabled]:opacity-50 dark:focus:bg-slate-800",
            ],
            separator: "-mx-1 my-1 h-px border-zinc-200 dark:border-zinc-600",
            shortcut: "ml-auto text-xs tracking-widest text-slate-500",
        },
    },
    {
        twMerge: true,
    },
);

const s = menubarStyles();

export const Menubar = Object.assign(
    (props: ComponentProps<typeof KMenubar>) => {
        const [local, others] = splitProps(props, ["class"]);
        return <KMenubar class={s.root({ class: local.class })} {...others} />;
    },
    {
        Menu: KMenubar.Menu,
        Trigger: (props: ComponentProps<typeof KMenubar.Trigger>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMenubar.Trigger
                    class={s.trigger({ class: local.class })}
                    {...others}
                />
            );
        },
        Content: (props: ComponentProps<typeof KMenubar.Content>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMenubar.Portal>
                    <KMenubar.Content
                        class={s.content({ class: local.class })}
                        {...others}
                    />
                </KMenubar.Portal>
            );
        },
        Item: (props: ComponentProps<typeof KMenubar.Item>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMenubar.Item
                    class={s.item({ class: local.class })}
                    {...others}
                />
            );
        },
        Separator: (props: ComponentProps<typeof KMenubar.Separator>) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <KMenubar.Separator
                    class={s.separator({ class: local.class })}
                    {...others}
                />
            );
        },
        Shortcut: (props: ComponentProps<"span">) => {
            const [local, others] = splitProps(props, ["class"]);
            return (
                <span class={s.shortcut({ class: local.class })} {...others} />
            );
        },
    },
);
