import { tv } from "tailwind-variants";

export const popoverVariants = tv({
    slots: {
        content:
            "z-50 w-72 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        header: "mb-2 flex flex-col space-y-1.5 text-center sm:text-left",
        title: "text-sm font-semibold leading-none tracking-tight",
        description: "text-sm text-zinc-500 dark:text-zinc-400",
        close: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-zinc-950 dark:focus:ring-zinc-300",
        arrow: "fill-white dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800",
    },
});
