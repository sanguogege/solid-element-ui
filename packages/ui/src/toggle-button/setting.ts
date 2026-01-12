import { tv } from "tailwind-variants";

export const toggleButtonVariants = tv({
    base: "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-zinc-900 data-[pressed]:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300 dark:data-[pressed]:bg-zinc-50 dark:data-[pressed]:text-zinc-900",
});
