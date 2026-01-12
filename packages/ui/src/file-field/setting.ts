import { tv } from "tailwind-variants";

export const fileFieldVariants = tv({
    slots: {
        root: "flex w-full flex-col gap-2",
        label: "text-sm font-medium leading-none text-zinc-950 dark:text-zinc-50",
        dropzone:
            "relative flex min-h-[150px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-transparent transition-colors hover:bg-zinc-50 data-[dragover]:border-zinc-950 data-[dragover]:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:data-[dragover]:border-zinc-300",
        trigger:
            "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        itemList: "mt-2 flex flex-col gap-2",
        item: "relative flex items-center gap-3 rounded-md border border-zinc-200 p-2 dark:border-zinc-800",
        itemPreview:
            "h-10 w-10 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800",
        itemPreviewImage: "h-full w-full object-cover",
        itemName: "flex-1 truncate text-sm font-medium",
        itemSize: "text-xs text-zinc-500",
        itemDelete:
            "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none",
    },
});
