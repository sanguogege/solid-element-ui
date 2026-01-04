import { type JSX } from "solid-js";

export interface PopoverProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 弹出层的标题 */
    title?: JSX.Element;
    /** 弹出层的主体内容 */
    content: JSX.Element;
    /** 触发方式，默认为 click */
    trigger?: "hover" | "click";
    /** 弹出位置，默认 bottom */
    placement?: "top" | "bottom" | "left" | "right";
    /** 是否显示箭头 */
    arrow?: boolean;
}
