import { tv } from "tailwind-variants";

export const badgeVariants = tv({
    base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300",
    variants: {
        variant: {
            default:
                "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80",
            secondary:
                "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
            destructive:
                "border-transparent bg-red-500 text-zinc-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
            outline:
                "text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800",
            success:
                "border-transparent bg-green-500 text-white dark:bg-green-600",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
