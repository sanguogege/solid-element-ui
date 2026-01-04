import { type JSX } from "solid-js";

/**
 * 排除 title 和 onCancel 以避免与原生 HTML 属性类型冲突
 */
export interface PopconfirmProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title" | "onCancel"> {
    /** 确认框的标题 */
    title: JSX.Element;
    /** 确认框的内容描述 */
    description?: JSX.Element;
    /** 点击确认的回调 */
    onConfirm?: (e: MouseEvent) => void;
    /** 点击取消的回调 */
    onCancel?: (e: MouseEvent) => void;
    /** 确认按钮文字 */
    okText?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 弹出位置 */
    placement?: "top" | "bottom" | "left" | "right";
    /** 状态图标 */
    icon?: JSX.Element;
}
