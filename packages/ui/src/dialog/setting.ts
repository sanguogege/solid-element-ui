import { tv } from "tailwind-variants";

export const dialogVariants = tv({
    slots: {
        overlay:
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200",
        content:
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] rounded-lg dark:border-zinc-800 dark:bg-zinc-950",
        header: "flex flex-col space-y-1.5 text-center sm:text-left",
        footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        title: "text-lg font-semibold leading-none tracking-tight",
        description: "text-sm text-zinc-500 dark:text-zinc-400",
        closeButton:
            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-zinc-950 dark:focus:ring-zinc-300",
    },
});
