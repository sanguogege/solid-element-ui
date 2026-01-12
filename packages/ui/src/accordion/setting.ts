import { tv } from "tailwind-variants";

export const accordionVariants = tv({
    slots: {
        root: "w-full border-t border-zinc-200 dark:border-zinc-800",
        item: "border-b border-zinc-200 dark:border-zinc-800",
        header: "flex",
        trigger:
            "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline data-[opened]:text-zinc-950 dark:data-[opened]:text-zinc-50 [&[data-opened]>svg]:rotate-180",
        content:
            "overflow-hidden text-sm transition-all data-[opened]:animate-accordion-down data-[closed]:animate-accordion-up",
        contentInner: "pb-4 pt-0",
        icon: "h-4 w-4 shrink-0 transition-transform duration-200 text-zinc-500",
    },
});
