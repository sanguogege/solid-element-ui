import { type JSX } from "solid-js";

export interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    count?: number | JSX.Element; // 显示的数字或自定义内容
    overflowCount?: number; // 展示封顶数值，默认 99
    dot?: boolean; // 不展示数字，只展示一个小红点
    showZero?: boolean; // 当数值为 0 时，是否展示，默认 false
    status?: "success" | "processing" | "default" | "error" | "warning"; // 状态点模式
    text?: string; // 状态点模式下的文本
    color?: string; // 自定义小点颜色
    offset?: [number, number]; // 设置徽标位置偏移 [x, y]
}
