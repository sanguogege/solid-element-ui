import { tv } from "tailwind-variants";

export const tabsVariants = tv({
    slots: {
        root: "flex flex-col",
        list: "inline-flex items-center justify-start border-b border-zinc-200 dark:border-zinc-800",
        trigger:
            "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all hover:text-zinc-900 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[selected]:border-b-2 data-[selected]:border-zinc-900 data-[selected]:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 dark:data-[selected]:border-zinc-50 dark:data-[selected]:text-zinc-50",
        content:
            "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
        indicator:
            "absolute bottom-[-1px] h-[2px] w-[var(--kb-tabs-indicator-width)] translate-x-[var(--kb-tabs-indicator-x)] bg-zinc-900 transition-all duration-250 dark:bg-zinc-50",
    },
});
