import { tv } from "tailwind-variants";

export const alertVariants = tv({
    base: "relative w-full rounded-lg border p-4 flex gap-3 transition-all",
    variants: {
        intent: {
            info: "bg-blue-50 border-blue-200 text-blue-800",
            success: "bg-green-50 border-green-200 text-green-800",
            warning: "bg-amber-50 border-amber-200 text-amber-800",
            danger: "bg-red-50 border-red-200 text-red-800",
        },
        size: {
            sm: "p-3 text-sm",
            md: "p-4 text-base",
        },
    },
    defaultVariants: {
        intent: "info",
        size: "md",
    },
});
