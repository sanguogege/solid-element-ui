import { tv } from "tailwind-variants";

export const toastVariants = tv({
    slots: {
        list: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        root: "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all border-zinc-200 bg-white text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 data-[opened]:animate-in data-[closed]:animate-out data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-right-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full",
        title: "text-sm font-semibold",
        description: "text-sm opacity-90",
        close: "absolute right-2 top-2 rounded-md p-1 text-zinc-950/50 opacity-0 transition-opacity hover:text-zinc-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-zinc-50/50 dark:hover:text-zinc-50",
        content: "grid gap-1",
    },
});
