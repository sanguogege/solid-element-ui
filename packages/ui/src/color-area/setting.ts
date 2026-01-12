import { tv } from "tailwind-variants";

export const colorAreaVariants = tv({
    slots: {
        root: "relative h-[160px] w-[160px] shrink-0 rounded-md border border-zinc-200 dark:border-zinc-800",
        background: "h-full w-full rounded-[inherit]",
        thumb: "absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300",
    },
});
