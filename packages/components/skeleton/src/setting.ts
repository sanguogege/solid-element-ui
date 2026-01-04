import { type JSX } from "solid-js";

export interface SkeletonElementProps
    extends JSX.HTMLAttributes<HTMLDivElement> {
    shape?: "circle" | "square" | "rect" | "button" | "input";
    active?: boolean;
    width?: string | number;
    height?: string | number;
    size?: "sm" | "md" | "lg";
}

/**
 * 使用 Omit 排除 HTML 原生的 title 属性，
 * 这样我们才能将其定义为 boolean 类型。
 */
export interface SkeletonProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 是否显示加载中 */
    loading?: boolean;
    /** 是否显示头像占位 */
    avatar?: boolean;
    /** 是否显示标题占位（此处为 boolean） */
    title?: boolean;
    /** 段落行数 */
    paragraph?: number | { rows: number; width?: string | string[] };
    /** 是否启用动画 */
    active?: boolean;
}
