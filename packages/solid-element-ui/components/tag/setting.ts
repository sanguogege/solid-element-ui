import { type JSX } from "solid-js";

/**
 * 使用 Omit 排除冲突属性：
 * 1. color: 排除原生属性名冲突
 * 2. onClose: 排除原生事件类型冲突
 */
export interface TagProps
    extends Omit<JSX.HTMLAttributes<HTMLSpanElement>, "color" | "onClose"> {
    /** 标签颜色类型 */
    color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
    /** 是否为空心模式 */
    outline?: boolean;
    /** 是否可关闭 */
    closable?: boolean;
    /**
     * 关闭时的回调
     * 使用 JSX.EventHandlerUnion 来兼容 Solid 的事件处理器格式
     */
    onClose?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    /** 图标 */
    icon?: JSX.Element;
    /** 尺寸 */
    size?: "sm" | "md";
}
