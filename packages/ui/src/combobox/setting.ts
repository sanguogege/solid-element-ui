import { tv } from "tailwind-variants";

export const comboboxVariants = tv({
    slots: {
        root: "flex flex-col gap-1.5 w-full",
        label: "text-sm font-medium text-zinc-950 dark:text-zinc-50",
        control:
            "relative flex h-9 items-center justify-between rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-zinc-950 dark:border-zinc-800 dark:focus-within:ring-zinc-300",
        input: "flex-1 bg-transparent outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed",
        trigger: "h-4 w-4 opacity-50",
        content:
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md animate-in fade-in-80 slide-in-from-top-1 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        listbox: "p-1",
        item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
        itemIndicator:
            "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        sectionTitle:
            "px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400",
    },
});
