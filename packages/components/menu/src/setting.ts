import { type JSX } from "solid-js";

export interface MenuItemType {
    key: string;
    label: JSX.Element;
    icon?: JSX.Element;
    disabled?: boolean;
    children?: MenuItemType[];
}

export interface MenuProps {
    /** 菜单项数据 */
    items: MenuItemType[];
    /** 当前选中的菜单项 key */
    selectedKey?: string;
    /** 默认展开的子菜单 keys */
    defaultOpenKeys?: string[];
    /** 菜单模式 */
    mode?: "vertical" | "horizontal" | "inline";
    /** 菜单主题 */
    theme?: "light" | "dark";
    /** 选中时的回调 */
    onSelect?: (key: string, item: MenuItemType) => void;
    /** 容器自定义类名 */
    class?: string;
    /** 是否折叠（常用于侧边栏） */
    collapsed?: boolean;
}
