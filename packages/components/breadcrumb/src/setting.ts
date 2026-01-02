import { type JSX } from "solid-js";

// 定义组件的 Props 类型
// TODO: 根据需要修改继承的 HTML 元素类型
export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {
    separator?: string | JSX.Element; // 自定义分隔符，默认为 "/"
}

export interface BreadcrumbItemProps
    extends JSX.HTMLAttributes<HTMLDivElement> {
    href?: string; // 跳转链接
    last?: boolean; // 是否为最后一项（内部逻辑使用）
}
