import { tv } from "tailwind-variants";

export const dropdownMenuVariants = tv({
    slots: {
        content:
            "z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md animate-in fade-in-80 data-[expanded]:zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
        itemIndicator:
            "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        separator: "-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800",
        subTrigger:
            "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-zinc-100 data-[highlighted]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800 dark:data-[highlighted]:bg-zinc-800",
        subTriggerIcon: "ml-auto h-4 w-4 opacity-50",
    },
});
