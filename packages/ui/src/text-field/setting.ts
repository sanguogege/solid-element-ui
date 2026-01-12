import { tv } from "tailwind-variants";

export const textFieldVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-1.5",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 data-[disabled]:opacity-70",
        input: "flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
        description: "text-xs text-zinc-500 dark:text-zinc-400",
        errorMessage: "text-xs font-medium text-red-500 dark:text-red-900",
    },
});
