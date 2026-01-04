import { type JSX } from "solid-js";

export interface SpinProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 是否为加载状态 */
    spinning?: boolean;
    /** 自定义描述文案 */
    tip?: JSX.Element;
    /** 延迟显示加载状态的时间 (ms) */
    delay?: number;
    /** 尺寸 */
    size?: "sm" | "md" | "lg";
    /** 自定义加载图标 */
    indicator?: JSX.Element;
    /** 是否全屏展示 */
    fullscreen?: boolean;
}
