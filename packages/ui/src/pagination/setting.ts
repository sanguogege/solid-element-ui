import { tv } from "tailwind-variants";

export const paginationVariants = tv({
    slots: {
        root: "mx-auto flex w-full justify-center",
        list: "flex flex-row items-center gap-1",
        item: "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-zinc-100 data-[selected]:bg-zinc-900 data-[selected]:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[selected]:bg-zinc-50 dark:data-[selected]:text-zinc-900",
        ellipsis: "flex h-9 w-9 items-center justify-center text-zinc-400",
        navButton:
            "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-zinc-800",
    },
});
