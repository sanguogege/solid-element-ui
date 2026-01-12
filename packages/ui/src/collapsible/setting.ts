import { tv } from "tailwind-variants";

export const collapsibleVariants = tv({
    slots: {
        root: "w-full",
        trigger:
            "flex w-full items-center justify-between rounded-md py-4 text-sm font-medium transition-all hover:underline data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        content:
            "overflow-hidden text-sm transition-all data-[opened]:animate-collapsible-down data-[closed]:animate-collapsible-up",
        icon: "h-4 w-4 shrink-0 transition-transform duration-200 group-data-[opened]:rotate-180",
    },
});
