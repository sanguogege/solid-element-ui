import { type JSX } from "solid-js";

/**
 * 排除原生的 title 属性，以支持自定义 JSX 结构的 Popover 标题
 */
export interface PopoverProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    content: JSX.Element;
    title?: JSX.Element;
    trigger?: "hover" | "click";
    placement?: "top" | "bottom" | "left" | "right";
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
}
