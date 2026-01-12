import { tv } from "tailwind-variants";

export const toggleGroupVariants = tv({
    slots: {
        root: "inline-flex items-center justify-center rounded-md border border-zinc-200 p-1 dark:border-zinc-800",
        item: "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-zinc-900 data-[selected]:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300 dark:data-[selected]:bg-zinc-50 dark:data-[selected]:text-zinc-900",
    },
});
