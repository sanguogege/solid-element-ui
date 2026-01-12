import { tv } from "tailwind-variants";

export const searchVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-1.5",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50 data-[disabled]:opacity-70",
        container: "relative flex items-center",
        input: "flex h-10 w-full rounded-md border border-zinc-200 bg-transparent py-2 pl-9 pr-9 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
        icon: "absolute left-3 h-4 w-4 text-zinc-500 dark:text-zinc-400",
        clear: "absolute right-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none text-zinc-500",
    },
});
