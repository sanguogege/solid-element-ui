import { tv } from "tailwind-variants";

export const timeFieldVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-1.5",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 data-[disabled]:opacity-70",
        input: "flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-white focus-within:ring-2 focus-within:ring-zinc-950 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus-within:ring-zinc-300",
        segment:
            "rounded-sm px-0.5 text-zinc-950 outline-none focus:bg-zinc-900 focus:text-zinc-50 dark:text-zinc-50 dark:focus:bg-zinc-50 dark:focus:text-zinc-900 data-[placeholder]:text-zinc-500",
        description: "text-xs text-zinc-500 dark:text-zinc-400",
        errorMessage: "text-xs font-medium text-red-500 dark:text-red-900",
    },
});
