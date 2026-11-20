import { Skeleton as KSkeleton, type SkeletonRootProps } from "@kobalte/core/skeleton";
import { omit } from "solid-js";

import { cn } from "cn";

// 核心修正：使用 Omit 排除掉冲突的 width 和 height
export interface SkeletonProps extends Omit<SkeletonRootProps, "class" | "width" | "height"> {
  width?: string | number;
  height?: string | number;
  class?: string;
  variant?: string;
  animation?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  // 显式提取这些属性，避免传给 KSkeleton 引起类型或运行时错误
  const others = omit(props, "class", "width", "height", "style", "variant", "animation");

  const mergedStyle = () => ({
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
    height: typeof props.height === "number" ? `${props.height}px` : props.height,
    ...(typeof props.style === "object" ? props.style : {}),
  });

  return <KSkeleton class={cn("bg-foreground", props.class)} style={mergedStyle()} {...others} />;
};
