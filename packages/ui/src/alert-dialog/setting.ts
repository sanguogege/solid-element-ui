import { tv } from "tailwind-variants";

export const alertDialogVariants = tv({
    slots: {
        overlay:
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[opened]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[opened]:fade-in-0",
        content:
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[opened]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[opened]:fade-in-0 data-[closed]:zoom-out-95 data-[opened]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[opened]:slide-in-from-left-1/2 data-[opened]:slide-in-from-top-[48%] dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-lg",
        header: "flex flex-col space-y-2 text-center sm:text-left",
        footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        title: "text-lg font-semibold text-zinc-950 dark:text-zinc-50",
        description: "text-sm text-zinc-500 dark:text-zinc-400",
        action: "inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2",
        cancel: "mt-2 inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:mt-0",
    },
});
