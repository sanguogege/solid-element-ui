import { tv } from "tailwind-variants";

export const hoverCardVariants = tv({
    slots: {
        content:
            "z-50 w-64 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        arrow: "fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800",
    },
});
