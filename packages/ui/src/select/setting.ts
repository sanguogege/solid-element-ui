import { tv } from "tailwind-variants";

export const selectVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-1.5",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 data-[disabled]:opacity-70",
        trigger:
            "flex h-10 w-full items-center justify-between rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300",
        content:
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md animate-in fade-in-80 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        listbox: "p-1",
        item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
        itemIndicator:
            "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        sectionTitle:
            "px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400",
        separator: "-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800",
        icon: "h-4 w-4 opacity-50",
    },
});
