import { tv } from "tailwind-variants";

export const breadcrumbVariants = tv({
    slots: {
        root: "flex flex-wrap items-center break-words text-sm text-zinc-500 dark:text-zinc-400",
        list: "flex items-center gap-1.5",
        link: "transition-colors hover:text-zinc-950 dark:hover:text-zinc-50 data-[current]:font-normal data-[current]:text-zinc-950 dark:data-[current]:text-zinc-50 disabled:pointer-events-none disabled:opacity-50",
        separator: "flex h-4 w-4 items-center justify-center [&>svg]:size-3.5",
    },
});
