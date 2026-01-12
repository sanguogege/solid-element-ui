import { tv } from "tailwind-variants";

export const sliderVariants = tv({
    slots: {
        root: "relative flex w-full touch-none select-none flex-col items-center gap-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto",
        labelWrapper: "flex w-full items-center justify-between",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50",
        valueText: "text-sm text-zinc-500 dark:text-zinc-400",
        track: "relative h-1.5 w-full grow rounded-full bg-zinc-100 dark:bg-zinc-800 data-[orientation=vertical]:w-1.5",
        fill: "absolute h-full rounded-full bg-zinc-900 dark:bg-zinc-50 data-[orientation=vertical]:w-full",
        thumb: "block h-4 w-4 rounded-full border border-zinc-200 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300",
    },
});
