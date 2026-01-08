import { type JSX } from "solid-js";

// 2026年开发规范：使用 Omit 排除所有与原生 HTML 冲突的自定义字段
export interface StatisticProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title" | "prefix"> {
    /** 数值的标题，支持组件或字符串 */
    title?: JSX.Element;
    /** 数值内容 */
    value: string | number;
    /** 设置小数点后的位数 */
    precision?: number;
    /** 设置数值的前缀，支持图标或字符 */
    prefix?: JSX.Element;
    /** 设置数值的后缀 */
    suffix?: JSX.Element;
    /** 自定义数值展示的样式 */
    valueStyle?: string | JSX.CSSProperties;
    /** 尺寸控制 */
    size?: "sm" | "md" | "lg";
}
