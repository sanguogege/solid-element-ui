import { tv } from "tailwind-variants";

export const meterVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-2",
        labelWrapper: "flex items-center justify-between gap-2",
        label: "text-sm font-medium text-zinc-950 dark:text-zinc-50",
        valueText: "text-sm text-zinc-500 dark:text-zinc-400",
        track: "h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800",
        fill: "h-full bg-zinc-900 transition-all duration-300 dark:bg-zinc-50 data-[low]:bg-red-500 data-[optimum]:bg-green-500 data-[high]:bg-yellow-500",
    },
});
