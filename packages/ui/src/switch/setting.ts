import { tv } from "tailwind-variants";

export const switchVariants = tv({
    slots: {
        root: "group flex items-center gap-2",
        label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950 dark:text-zinc-50",
        control:
            "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300 ring-offset-white dark:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-zinc-900 dark:data-[checked]:bg-zinc-50 bg-zinc-200 dark:bg-zinc-800",
        thumb: "pointer-events-none block h-4 w-4 rounded-full bg-white dark:bg-zinc-950 shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 translate-x-0",
    },
});
