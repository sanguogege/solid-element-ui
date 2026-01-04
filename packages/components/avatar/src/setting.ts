import { type JSX } from "solid-js";

export interface AvatarProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    src?: string; // 图片地址
    alt?: string; // 图像无法显示时的替代文本
    shape?: "circle" | "square"; // 形状，默认 circle
    size?: "sm" | "md" | "lg" | number; // 尺寸，支持数字自定义 px
    icon?: JSX.Element; // 自定义图标
    gap?: number; // 字符头像距离左右两侧的间距（单位 px）
}
