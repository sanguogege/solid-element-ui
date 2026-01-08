import { type JSX } from "solid-js";

export interface ColumnType<T = any> {
    /** 列标题 */
    title: JSX.Element;
    /** 对应数据源的字段名 */
    dataIndex?: keyof T | string;
    /** 列宽度 */
    width?: string | number;
    /** 自定义渲染函数 */
    render?: (value: any, record: T, index: number) => JSX.Element;
    /** 文字对齐方向 */
    align?: "left" | "center" | "right";
}

export interface TableProps<T = any>
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 数据源 */
    dataSource: T[];
    /** 列定义 */
    columns: ColumnType<T>[];
    /** 是否显示边框 */
    bordered?: boolean;
    /** 尺寸 */
    size?: "sm" | "md" | "lg";
    /** 行唯一标识字段 */
    rowKey?: keyof T | string;
}
