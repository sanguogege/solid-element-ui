import { tv } from "tailwind-variants";

export const colorSliderVariants = tv({
    slots: {
        root: "relative flex w-full touch-none select-none flex-col items-center gap-2",
        labelWrapper: "flex w-full items-center justify-between",
        label: "text-sm font-medium text-zinc-950 dark:text-zinc-50",
        valueText: "text-sm text-zinc-500",
        track: "relative h-4 w-full grow rounded-full border border-zinc-200 dark:border-zinc-800",
        thumb: "top-[-2px] h-5 w-5 rounded-full border-2 border-white bg-zinc-950 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:border-zinc-950 dark:bg-zinc-50",
    },
});
