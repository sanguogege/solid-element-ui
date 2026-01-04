import { type JSX } from "solid-js";

export interface MasonryProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 数据源 */
    items: any[];
    /** 列数，默认 3 */
    columns?: number;
    /** 列间距 (Tailwind spacing unit)，默认 4 (1rem) */
    gap?: number;
    /** 自定义渲染每一项的函数 */
    renderItem: (item: any, index: number) => JSX.Element;
}
