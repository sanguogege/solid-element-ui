import { tv } from "tailwind-variants";

export const alertVariants = tv({
    base: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-zinc-950 dark:[&>svg]:text-zinc-50",
    variants: {
        variant: {
            default:
                "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800",
            destructive:
                "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
            success:
                "border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600 dark:text-green-400",
            warning:
                "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-700 dark:text-yellow-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
