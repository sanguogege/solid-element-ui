import { type JSX } from "solid-js";

export interface ProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 百分比进度 0-100 */
    percent?: number;
    /** 进度条状态 */
    status?: "normal" | "success" | "error" | "active";
    /** 是否显示进度数值文本 */
    showInfo?: boolean;
    /** 进度条线的宽度 (高度) */
    strokeWidth?: number;
    /** 进度条颜色 (会覆盖 status 默认色) */
    strokeColor?: string;
    /** 轨道颜色 */
    trailColor?: string;
    /** 尺寸 */
    size?: "sm" | "md";
    /** 自定义文本内容 */
    format?: (percent: number) => JSX.Element;
}
