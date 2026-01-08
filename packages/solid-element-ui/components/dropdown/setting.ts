import { type JSX } from "solid-js";

export interface DropdownItem {
    key: string;
    label: JSX.Element;
    icon?: JSX.Element;
    disabled?: boolean;
    danger?: boolean;
    onClick?: () => void;
}

export interface DropdownProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 菜单配置项 */
    menu: DropdownItem[];
    /** 触发方式，默认 hover */
    trigger?: "hover" | "click";
    /** 弹出位置 */
    placement?:
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "top"
        | "top-start"
        | "top-end";
    /** 是否显示箭头 */
    arrow?: boolean;
    /** 点击菜单项后是否自动关闭 */
    autoClose?: boolean;
}
