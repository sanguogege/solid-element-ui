import { tv } from "tailwind-variants";

export const colorFieldVariants = tv({
    slots: {
        root: "flex flex-col gap-1.5",
        label: "text-sm font-medium text-zinc-950 dark:text-zinc-50 data-[disabled]:opacity-70",
        inputWrapper: "relative flex items-center",
        input: "flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 pl-9 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
        swatch: "absolute left-3 h-4 w-4 rounded-sm border border-zinc-200 dark:border-zinc-800",
        description: "text-xs text-zinc-500 dark:text-zinc-400",
        errorMessage: "text-xs font-medium text-red-500 dark:text-red-900",
    },
});
