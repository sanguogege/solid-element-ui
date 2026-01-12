import { tv } from "tailwind-variants";

export const menubarVariants = tv({
    slots: {
        root: "flex h-10 items-center space-x-1 rounded-md border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950",
        menu: "focus:outline-none",
        trigger:
            "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-50",
        content:
            "z-50 min-w-[12rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md animate-in slide-in-from-top-1 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
        itemIndicator:
            "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        separator: "-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800",
        shortcut: "ml-auto text-xs tracking-widest text-zinc-500",
        subTrigger:
            "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-zinc-100 data-[highlighted]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800 dark:data-[highlighted]:bg-zinc-800",
    },
});
