import { tv } from "tailwind-variants";

export const imageVariants = tv({
    slots: {
        root: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        img: "aspect-square h-full w-full object-cover",
        fallback:
            "flex h-full w-full items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium uppercase text-zinc-500 dark:text-zinc-400",
    },
});
