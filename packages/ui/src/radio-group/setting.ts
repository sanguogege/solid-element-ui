import { tv } from "tailwind-variants";

export const radioGroupVariants = tv({
    slots: {
        root: "grid gap-2",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 data-[disabled]:opacity-70",
        item: "flex items-center space-x-2",
        itemInput: "peer",
        itemControl:
            "aspect-square h-4 w-4 rounded-full border border-zinc-200 border-zinc-900 text-zinc-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-50 dark:text-zinc-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
        itemIndicator: "flex items-center justify-center",
        itemIndicatorIcon: "h-2.5 w-2.5 fill-current text-current",
        itemLabel:
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    },
});
