import { tv } from "tailwind-variants";

export const colorWheelVariants = tv({
    slots: {
        root: "relative flex shrink-0 items-center justify-center",
        track: "h-full w-full rounded-full border border-zinc-200/20 dark:border-zinc-800/20",
        thumb: "h-5 w-5 rounded-full border-2 border-white bg-zinc-950 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:border-zinc-950 dark:bg-zinc-50",
    },
});
