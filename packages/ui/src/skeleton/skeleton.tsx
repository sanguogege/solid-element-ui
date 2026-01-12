import { Skeleton as KSkeleton } from "@kobalte/core/skeleton";
import { splitProps, type ComponentProps } from "solid-js";
import { skeletonVariants } from "./setting";

const styles = skeletonVariants();

// --- 扁平化组件定义 ---

export const Skeleton = (props: ComponentProps<typeof KSkeleton>) => {
    const [local, others] = splitProps(props, ["class", "radius"]);

    return (
        <KSkeleton
            class={styles.root({
                class: local.class,
                // 如果你需要通过 props 动态控制样式，可以在这里映射
            })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const SkeletonRoot = Object.assign(Skeleton, {
    // Kobalte 的 Skeleton 结构非常简单，通常直接使用 Root
});
