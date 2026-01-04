import { type JSX } from "solid-js";

/**
 * 排除所有冲突属性：
 * 1. title: 我们需要 JSX.Element 而非原生 string
 * 2. onClose: 排除继承自原生可能存在的事件冲突，定义我们自己的 button 事件
 */
export interface AlertProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title" | "onClose"> {
    /** 提示类型 */
    type?: "info" | "success" | "warning" | "error";
    /** 标题 */
    title?: JSX.Element;
    /** 内容描述 */
    description?: JSX.Element;
    /** 是否显示辅助图标 */
    showIcon?: boolean;
    /** 自定义图标 */
    icon?: JSX.Element;
    /** 是否可关闭 */
    closable?: boolean;
    /**
     * 关闭按钮的事件处理器
     * 明确目标为 HTMLButtonElement
     */
    onClose?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    /** 是否应用顶部横幅样式 */
    banner?: boolean;
}
