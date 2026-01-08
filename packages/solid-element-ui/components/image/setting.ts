import { type JSX } from "solid-js";

export interface ImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    fallback?: string; // 加载失败时的占位图地址
    placeholder?: JSX.Element; // 加载过程中的占位元素
    preview?: boolean; // 是否启用点击预览
}
