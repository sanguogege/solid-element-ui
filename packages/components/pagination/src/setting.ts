import { type JSX } from "solid-js";

export interface PaginationProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** 当前页数 */
    current: number;
    /** 数据总数 */
    total: number;
    /** 每页条数，默认 10 */
    pageSize?: number;
    /** 页码改变的回调 */
    onChange?: (page: number, pageSize: number) => void;
    /** 是否显示快速跳转输入框 */
    showQuickJumper?: boolean;
    /** 是否显示总数 */
    showTotal?: (total: number, range: [number, number]) => JSX.Element;
    /** 尺寸 */
    size?: "sm" | "md";
    /** 简单模式 */
    simple?: boolean;
}
