import { tv } from "tailwind-variants";

export const numberFieldVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-1.5",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50",
        inputWrapper:
            "relative flex items-center overflow-hidden rounded-md border border-zinc-200 bg-transparent transition-colors focus-within:ring-2 focus-within:ring-zinc-950 focus-within:ring-offset-2 dark:border-zinc-800 dark:focus-within:ring-zinc-300",
        input: "flex h-10 w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50",
        stepperWrapper:
            "flex h-full flex-col border-l border-zinc-200 dark:border-zinc-800",
        stepper:
            "flex flex-1 items-center justify-center px-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
    },
});
