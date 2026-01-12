import { tv } from "tailwind-variants";

export const tooltipVariants = tv({
    slots: {
        content:
            "z-50 overflow-hidden rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[exit]:animate-out data-[exit]:fade-out-0 data-[exit]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        arrow: "fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800",
    },
});
