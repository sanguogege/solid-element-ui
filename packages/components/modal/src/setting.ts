import { type JSX } from "solid-js";

export interface ModalProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 对话框是否可见 */
    open: boolean;
    /** 对话框标题 */
    title?: JSX.Element;
    /** 宽度，默认 520px */
    width?: string | number;
    /** 确认按钮文字 */
    okText?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 点击确认回调 */
    onOk?: () => void;
    /** 点击取消/关闭回调 */
    onCancel?: () => void;
    /** 底部内容，传 null 则隐藏底部 */
    footer?: JSX.Element | null;
    /** 是否垂直居中展示 */
    centered?: boolean;
    /** 是否显示遮罩层 */
    mask?: boolean;
    /** 点击遮罩层是否允许关闭 */
    maskClosable?: boolean;
    /** 是否显示右上角关闭按钮 */
    closable?: boolean;
}
