import { type JSX } from "solid-js";

export interface TabItem {
    key: string;
    label: JSX.Element;
    children?: JSX.Element;
    disabled?: boolean;
    icon?: JSX.Element;
}

export interface TabsProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** 当前激活项的 key */
    activeKey?: string;
    /** 默认激活项的 key */
    defaultActiveKey?: string;
    /** 标签页数据 */
    items: TabItem[];
    /** 切换面板的回调 */
    onChange?: (key: string) => void;
    /** 标签页尺寸 */
    size?: "sm" | "md" | "lg";
    /** 风格类型 */
    type?: "line" | "card";
    /** 是否居中展示标签 */
    centered?: boolean;
}
