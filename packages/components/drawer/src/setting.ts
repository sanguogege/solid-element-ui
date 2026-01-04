import { type JSX } from "solid-js";

export interface DrawerProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 是否显示抽屉 */
    open: boolean;
    /** 关闭时的回调 */
    onClose?: () => void;
    /** 抽屉的标题 */
    title?: JSX.Element;
    /** 抽屉打开的方向 */
    placement?: "top" | "right" | "bottom" | "left";
    /** 抽屉的宽度或高度 */
    size?: string | number;
    /** 是否显示背景遮罩 */
    mask?: boolean;
    /** 是否在点击遮罩时关闭抽屉 */
    maskClosable?: boolean;
    /** 是否显示右上角关闭按钮 */
    closable?: boolean;
}
