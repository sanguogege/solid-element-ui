import { tv } from "tailwind-variants";

export const separatorVariants = tv({
    base: "shrink-0 bg-zinc-200 dark:bg-zinc-800",
    variants: {
        orientation: {
            horizontal: "h-[1px] w-full",
            vertical: "h-full w-[1px]",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});
