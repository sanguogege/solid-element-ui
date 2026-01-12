import { tv } from "tailwind-variants";

export const skeletonVariants = tv({
    slots: {
        root: "animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800",
        content: "visible",
        // 当加载完成时，隐藏占位背景，显示内容
        isLoaded: "animate-none bg-transparent",
    },
});
