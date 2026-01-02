import { createContext, type JSX } from "solid-js";

// 定义组件的 Props 类型
// TODO: 根据需要修改继承的 HTML 元素类型
export interface AnchorProps extends JSX.HTMLAttributes<HTMLDivElement> {
    target?: () => HTMLElement | Window; // 滚动容器
    offset?: number; // 距离顶部的偏移量（触发高亮的阈值）
    bounds?: number; // 锚点区域边界
}

export interface AnchorLinkProps {
    href: string; // 锚点链接（如 #section1）
    title: JSX.Element; // 显示文字或图标
}


export const AnchorContext = createContext<{
    activeLink: () => string;
    scrollTo: (link: string) => void;
}>();