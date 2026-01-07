import { type JSX } from "solid-js";

export interface CarouselProps extends JSX.HTMLAttributes<HTMLDivElement> {
    autoplay?: boolean; // 是否自动轮播
    dotPosition?: "bottom" | "top" | "left" | "right"; // 面板指示点位置
    dots?: boolean; // 是否显示面板指示点，默认 true
    easing?: string; // 动画效果，默认 ease-in-out
    effect?: "scrollx" | "fade"; // 动画效果，默认 scrollx
    autoplaySpeed?: number; // 轮播间隔（毫秒），默认 3000
}
