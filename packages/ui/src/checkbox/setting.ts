import { tv } from "tailwind-variants";

export const checkboxVariants = tv({
    slots: {
        root: "group flex items-center space-x-2",
        control:
            "peer h-4 w-4 shrink-0 rounded-sm border border-zinc-200 ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-zinc-900 data-[checked]:text-zinc-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[checked]:bg-zinc-50 dark:data-[checked]:text-zinc-900",
        indicator: "flex items-center justify-center text-current",
        label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950 dark:text-zinc-50",
    },
});
