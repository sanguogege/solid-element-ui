import { type JSX } from "solid-js";

export interface TooltipProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 提示文字内容 */
    content: JSX.Element;
    /** 触发方式 */
    trigger?: "hover" | "click";
    /** 弹出位置 */
    placement?: "top" | "bottom" | "left" | "right";
    /** 背景颜色主题 */
    theme?: "dark" | "light";
    /** 箭头是否显示 */
    arrow?: boolean;
}
